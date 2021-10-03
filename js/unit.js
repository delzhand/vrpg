class Unit {
  constructor(name, level, job, picture, team, hp, vit, atk, def, res, spd, xp, pool, abilities, arms, armor) {
    this.name = name;
    this.job = job;
    this.level = level;
    this.xp = xp;
    this.picture = picture;
    this.team = team;
    this.color = team === 'ally' ? '#4d4dff' : '#cc4141';
    this.vit = vit;
    this.atk = atk;
    this.def = def;
    this.res = res;
    this.spd = spd;
    this.pool = pool;
    this.abilities = abilities;
    this.arms = arms;
    this.armor = armor;
    this.status = [];

    this.ct = getRandomInt(50);
    this.mhp = this.getStat('mhp');
    this.getStartHP(hp);
  }
  getStartHP(val) {
    if (val !== undefined) {
      this.chp = val;
    }
    else {
      this.chp = this.mhp;
    }
  }
  addStatus(status, duration = false) {
    let hasStatus = false;
    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].status === status) {
        this.status[i].duration = duration;
        hasStatus = true;
      }
    }
    if (!hasStatus) {
      this.status.push({status, duration});
    }
  }
  removeStatus(status) {
    for (let i = this.status.length - 1; i >= 0;  --i) {
      if (this.status[i].status === status) {
        this.status.splice(i, 1);
        return;
      }
    }
  }
  clearAllStatus() {
    this.status = [];
  }
  hasStatus(status) {
    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].status === status && (this.status[i].duration === false || this.status[i].duration > 0)) {
        return true;
      }
    }  
    return false;
  }
  hasReaction() {
    for (let i = 0; i < this.abilities.length; i++) {
      const ability = abilities[this.abilities[i]];
      if (ability.type === 'reaction') {
        return true;
      }
    }
    return false;
  }
  react(target, animate) {
    if (this.chp > 0) {
      for (let i = 0; i < this.abilities.length; i++) {
        const ability = abilities[this.abilities[i]];
        if (ability.type === 'reaction') {
          ability.fn(this, target, animate);
        }
      }
    }
  }
  chooseAbility() {
    const r = getRandomInt(this.pool.length);
    return this.pool[r];
  }
  chooseFoe() {
    let foes = [];
    for (let i = 0; i < units.length; i++) {
      if (units[i].team != this.team && units[i].chp > 0) {
        foes.push(units[i]);
      }
    }
    return foes[getRandomInt(foes.length)];
  }
  chooseLowestHpAlly() {
    let ally = this;
    for (let i = 0; i < units.length; i++) {
      if (units[i].team === this.team && units[i].chp < ally.chp) {
        ally = units[i];
      }
    }
    return ally;
  }
  tick() {
    if (this.chp === 0) {
      return;
    }
    this.ct += 12 + this.getStat('spd');
    if (this.ct >= 100) {
      const ability = this.chooseAbility();
      queue.push({unit: this.name, ability});
      if (this.hasStatus('flanked')) {
        this.removeStatus('flanked');
        log(`<div>${this.name}'s action failed</div>`);
      }
      else {
        abilities[ability].fn(this);          
        if (this.team === 'ally') {
          let xp = 5;
          xp = Math.floor(xp * input.xpMultiplier);
          if (ability.name === 'weapon' || ability.name === 'magic') {
            xp = Math.floor(xp / 2);
          }
          this.xp += 5 * input.xpMultiplier;
        }
      }
      this.endRound();
    }
  }
  mitigateDef(value) {
    for (let i = 0; i < this.status.length; i++) {
      if (this.hasStatus('shield 15')) {
        value = Math.max( value - 15, 0);
        this.removeStatus('shield 15');
      }
    }
    return value;
  }
  mitigateRes(value) {
    for (let i = 0; i < this.status.length; i++) {
      if (this.hasStatus('shield 15')) {
        value = Math.max( value - 15, 0);
        this.removeStatus('shield 15');
      }
    }
    return value;
  }
  takeDamage(value) {
    this.chp -= value;
    if (this.chp <= 0) {
      this.chp = 0;
      this.clearAllStatus();
      this.addStatus('down');
    }
  }
  healDamage(value) {
    if (this.chp > 0) {
      this.chp += value;
      if (this.chp > this.mhp) {
        this.chp = this.mhp;
      }
    }
  }
  drawProfile(h = false, full = false) {
    return `
      <div class="profile ${h ? 'hz' : ''} unit-${this.name.safeCSS()}">
        ${this.drawPicture()}
        <div class="data">
          <div class="name">${this.name}</div>
          <div class="level">Lv <b>${this.level}</b> ${this.job}</div>
          ${this.drawMeter('HP', this.chp ? this.chp : null, this.mhp)}
          ${/*this.drawMeter('CT', this.ct, 100)*/ ''}
          <div class="stats">
            ${this.drawStat('atk')}
            ${this.drawStat('def')}
            ${this.drawStat('res')}
            ${this.drawStat('spd')}
          </div>
          ${this.team === 'ally' ? this.drawMeter('XP', this.xp, this.level * 5) : ''}
        </div>
        <div class="loadout">
          ${this.drawGear()}
          ${this.drawSkills()}
        </div>
        <div class="status"></div>
      </div>
    `;
  }
  endRound() {
    this.ct -= 100;
    this.xp += 5 * input.xpMultiplier;
    this.statusFalloff();
  }
  statusFalloff() {
    for (let i = this.status.length - 1; i >= 0;  --i) {
      if (this.status[i].duration !== false && this.status[i].duration !== false) {
        this.status[i].duration--;
        if (this.status[i].duration <= 0) {
          this.status.splice(i, 1);
        }
      }
    }
  }
  updateProfile() {
    const $profile = $(`.unit-${this.name.safeCSS()}`);
    if (this.chp === 0) {
      $profile.addClass('down');
    }
    $profile.find('.atk').replaceWith(this.drawStat('atk'));
    $profile.find('.def').replaceWith(this.drawStat('def'));
    $profile.find('.res').replaceWith(this.drawStat('res'));
    $profile.find('.spd').replaceWith(this.drawStat('spd'));
    $profile.find('.hp .curmax .current').html(this.chp);
    $profile.find('.hp .bar .inner').css('width', this.chp/this.mhp*100 + '%')
    $profile.find('.xp .curmax .current').html(this.xp);
    $profile.find('.xp .bar .inner').css('width', Math.min(this.xp/(this.level*5)*100, 100) + '%')
    $profile.find('.ct .curmax .current').html(this.ct);
    $profile.find('.ct .bar .inner').css('width', Math.min(this.ct, 100) + '%');
    $profile.find('.status').replaceWith(this.drawStatus());
  }
  getStat(stat) {
    if (stat === 'mhp') {
      return this['vit'] * 5 + this.getBonus(stat);
    }
    return this[stat] + this.getBonus(stat);
  }
  getBonus(stat) {
    let bonus = 0;
    bonus += this.arms && gear[this.arms][stat] ? gear[this.arms][stat] : 0;
    bonus += this.armor && gear[this.armor][stat] ? gear[this.armor][stat] : 0;
    if (stat === 'spd' && this.hasStatus('spd -1')) {
      bonus -= 1;
    }
    if (stat === 'spd' && this.hasStatus('spd +1')) {
      bonus += 1;
    }
    if (stat === 'spd' && this.hasStatus('spd +2')) {
      bonus += 2;
    }
    if (stat === 'spd' && this.hasStatus('spd +3')) {
      bonus += 3;
    }
    if (stat === 'atk' && this.hasStatus('atk -2')) {
      bonus -= 2;
    }
    if (stat === 'atk' && this.hasStatus('atk -1')) {
      bonus -= 1;
    }
    if (stat === 'atk' && this.hasStatus('atk +1')) {
      bonus += 1;
    }
    if (stat === 'res' && this.hasStatus('res +1')) {
      bonus += 1;
    }
    if (stat === 'res' && this.hasStatus('res +2')) {
      bonus += 2;
    }
    if (stat === 'res' && this.hasStatus('res +3')) {
      bonus += 3;
    }
    return bonus;
  }
  drawPicture() {
    if (this.picture) {
      return `<div class="picture"><img src="./images/${this.picture}"></div>`;
    }
    else {
      return `<div class="picture" style="background-color: ${this.color};"></div>`
    }
  }
  drawGear() {
    let output = '';
    if (this.arms) {
      output += `<div class="equip"><span class="icon weapon"></span> ${gear[this.arms].name}</div>`;
    }
    if (this.armor) {
      output += `<div class="equip"><span class="icon armor"></span> ${gear[this.armor].name}</div>`;
    }
    return output;
  }
  drawSkills(detail = false) {
    let output = '';
    for (let i = 0; i < this.abilities.length; i++) {
      const ability = abilities[this.abilities[i]];
      if (detail) {
        output += `<div class="equip"><span class="icon ${ability.type}"></span> ${ability.name}: ${ability.desc}</div>`
      }
      else {
        output += `<div class="equip"><span class="icon ${ability.type}"></span> ${ability.name}</div>`        
      }
    }
    return output;
  }
  drawStat(stat) {
    return `<div class="stat ${stat}"><span class="label">${stat.toUpperCase()}</span><span class="num">${this[stat]}${this.drawBonus(this.getBonus(stat))}</span></div>`;
  }
  drawBonus(value) {
    if (value > 0) {
      return `<span class="bonus pos">+${value}</span>`;
    }
    if (value < 0) {
      return `<span class="bonus neg">${value}</span>`;
    }
    return '';
  }
  drawMeter(label, c, m) {
    if (c === undefined) {
      return '';
    }
    if (c === null) {
      c = m;
    }
    return `
    <div class="meter ${label.safeCSS()}">
      <div class="label">${label}</div>
      <div class="bar">
        <span class="inner" style="width: ${c / m * 100}%"></span>
        <span class="inner alt" style="width: ${c / m * 100}%"></span>
      </div>
      <div class="curmax">
        <span class="current">${c}</span>/<span class="max">${m}</span>
      </div>
    </div>
  `;
  }
  drawStatus() {
    if (!this.status || this.status.length === 0) {
      return '<div class="status"></div>';
    }
    let output = '<div class="status">';
    for (let i = 0; i < this.status.length; i++) {
      output += `<span class="effect">${this.status[i].status}</span>`;
    }
    output += '</div>';
    return output;
  }
}