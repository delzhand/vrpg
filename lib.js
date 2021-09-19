String.prototype.safeCSS = function() {
  return encodeURIComponent(this)
    .toLowerCase()
    .replace('\'', '')
    .replace(/\.|%[0-9a-z]{2}/gi, '');
}

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function drawProfile(unit) {
  return `
    <div class="profile unit-${unit.name.safeCSS()}">
      ${drawPicture(unit)}
      <div class="data">
        <div class="name">${unit.name}</div>
        <div class="level">Lv <b>${level(unit)}</b> ${unit.class}</div>
        ${drawMeter('HP', unit.chp ? unit.chp : null, unit.mhp + getBonus('mhp', unit))}
        <div class="stats">
          ${drawStat('Attack', unit.attack, getBonus('attack', unit), 8)}
          ${drawStat('Special', unit.special, getBonus('special', unit), 8)}
          ${drawStat('Assist', unit.assist, getBonus('assist', unit), 8)}
          ${drawStat('Defend', unit.defend, getBonus('defend', unit), 8)}
        </div>
        ${drawMeter('XP', unit.xp, level(unit) * 5)}
        ${drawArms(unit)}
        ${drawStatus(unit)}
      </div>
    </div>
  `;
}

function drawPicture(unit) {
  if (unit.picture) {
    return `<div class="picture"><img src="./images/${unit.picture}"></div>`;
  }
  else {
    return `<div class="picture" style="background-color: ${unit.color};"></div>`
  }
}

function drawMeter(label, c, m) {
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
    <div class="curmax"><span class="current">${c}</span>/<span class="max">${m}</span></div>
  </div>
  `;
}

function drawArms(unit) {
  let output = '';
  if (unit.arms) {
    output += `<div class="arms"><img src="./images/sword.png">${unit.arms.name}</div>`;
  }
  if (unit.armor) {
    output += `<div class="armor"><img src="./images/armor.png">${unit.armor.name}</div>`;
  }
  return output;
}

function drawStatus(unit) {
  if (!unit.effects || unit.effects.length === 0) {
    return '';
  }
  let output = '<div class="status">';
  for (let i = 0; i < unit.effects.length; i++) {
    output += `<span class="effect ${statusType(unit.effects[i])}">${unit.effects[i]}</span>`;
  }
  output += '</div>';
  return output;
}

function statusType(status) {
  switch(status){
    case 'advantage':
      return 'pos';
    case 'down':
    case 'disadvantage':
      return 'neg';
  }
}

function getBonus(stat, unit) {
  let bonus = 0;
  switch (stat) {
    case 'attack':
      bonus += (unit.arms && unit.arms.attack ? unit.arms.attack : 0);
      if (unit.effects && unit.effects.indexOf('advantage') > -1) {
        bonus += 1;
      }
      if (unit.effects && unit.effects.indexOf('disadvantage') > -1) {
        bonus -= 1;
      }
      if (unit.effects && unit.effects.indexOf('down') > -1) {
        bonus -= 3;
      }
      break;
    case 'defend':
      bonus += (unit.arms && unit.arms.defend ? unit.arms.defend : 0);
      if (unit.effects && unit.effects.indexOf('advantage') > -1) {
        bonus += 1;
      }
      if (unit.effects && unit.effects.indexOf('disadvantage') > -1) {
        bonus -= 1;
      }
      if (unit.effects && unit.effects.indexOf('down') > -1) {
        bonus -= 3;
      }
      break;
    case 'assist':
      bonus += (unit.arms && unit.arms.assist ? unit.arms.assist : 0);
      if (unit.effects && unit.effects.indexOf('advantage') > -1) {
        bonus += 1;
      }
      if (unit.effects && unit.effects.indexOf('disadvantage') > -1) {
        bonus -= 1;
      }
      if (unit.effects && unit.effects.indexOf('down') > -1) {
        bonus -= 3;
      }
      break;
    case 'special':
      bonus += (unit.arms && unit.arms.special ? unit.arms.special : 0);
      if (unit.effects && unit.effects.indexOf('advantage') > -1) {
        bonus += 1;
      }
      if (unit.effects && unit.effects.indexOf('disadvantage') > -1) {
        bonus -= 1;
      }
      if (unit.effects && unit.effects.indexOf('down') > -1) {
        bonus -= 3;
      }
      break;
    case 'mhp':
      bonus += unit.armor ? unit.armor.hp : 0;
      break;
  }
  return bonus;
}

function getStat(stat, unit) {
  return unit[stat] + getBonus(stat, unit);
}

function drawStat(label, base, bonus, max) {
  let drawn = 0;
  if (bonus < 0) {
    base = Math.max(base + bonus, 0);
  }
  let output = `<div class="stat ${label.toLowerCase()}"><span class="label">${label}</span>`;
  for (let i = 0; i < base; i++) {
    drawn++;
    output += '<span class="bar filled"></span>';
  }
  if (bonus > 0) {
    for (let i = 0; i < bonus; i++) {
      drawn++;
      output += '<span class="bar bonus"></span>';
    }
  }
  if (bonus < 0) {
    for (let i = 0; i < -bonus; i++) {
      drawn++;
      output += '<span class="bar penalty"></span>'
    }
  }
  for (let i = drawn; i < max; i++) {
    output += '<span class="bar empty"></span>'
  }
  output += '</div>';
  return output;
}

function level(unit) {
  return -10 + unit.mhp + unit.attack + unit.special + unit.defend + unit.assist;
}

function getRandomInt(max) {
  return Math.floor(seedRand() * max);
}

function getCoinFlip() {
  return (Math.floor(seedRand() * 2)) === 0;
}

function getDiceRoll() {
  return getRandomInt(6)+1;
}

function getSuccesses(count) {
  const threshold = 3;
  let successes = 0;
  for (let i = 0; i < count; i++) {
    const roll = getDiceRoll();
    if (roll > threshold) {
      successes++;
    }
  }
  return successes;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = getRandomInt(currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function splitCommand(command) {
  return {
    unitName: command.split(':')[0],
    action: command.split(':')[1]
  };
}

function logMessage(m, c) {
  if (c) {
    $('#log').append(`<div class="${c}">${m}</div>`);
  }
  else {
    $('#log').append(`<div>${m}</div>`);
  }
  height = $('#log').innerHeight();
  $('#output').css('height', height);
}
