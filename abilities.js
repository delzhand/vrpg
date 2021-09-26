const abilities = {
  'weapon': {
    name: 'Attack',
    type: 'attack',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('def'));
      dmg *= 5;
      dmg = target.mitigateDef(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
      target.react(unit, animate);
      if (animate) {
        animateStandardAttack(0, unit, 'Attack', target, dmg);
      }
    },
  },
  'magic': {
    name: 'Attack',
    type: 'magic',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('res'));
      dmg *= 5;
      dmg = target.mitigateRes(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
      target.react(unit, animate);
      if (animate) {
        animateStandardAttack(0, unit, 'Attack', target, dmg);
      }
    }
  },
  'thrust': {
    name: 'Thrust',
    type: 'attack',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('def'));
      dmg *= 5;
      dmg = Math.floor(dmg * 1.5);
      dmg = target.mitigateDef(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Thrust for ${dmg}</div>`);
      target.react(unit, animate);
      if (animate) {
        animateStandardAttack(0, unit, 'Thrust', target, dmg);
      }
    },
  },
  'flank': {
    name: 'Flank',
    type: 'attack',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      target.addStatus('flanked');
      log(`<div>${unit.name} targets ${target.name} with Flank</div>`);
      target.react(unit, animate);
    },
  },
  'ice spear': {
    name: 'Ice Spear',
    type: 'magic',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('res'));
      dmg *= 5;
      dmg = target.mitigateRes(dmg);
      target.takeDamage(dmg);
      target.addStatus('atk -1', 1);
      log(`<div>${unit.name} targets ${target.name} with Ice Spear for ${dmg}</div>`);
      target.react(unit, animate);
      if (animate) {
        animateStandardAttack(0, unit, 'Ice Spear', target, dmg + ' | ATK -1');
      }
    },
  },
  'hailstorm': {
    name: 'Hailstorm',
    type: 'magic',
    fn: function(unit, animate = false) {
      let dmg = unit.getStat('atk');
      let targets = [];
      for (let i = 0; i < units.length; i++) {
        if (units[i].team != unit.team && units[i].chp > 0) {
          const target = units[i];
          dmg = Math.max(0, dmg - target.getStat('res'));
          dmg *= 5;
          dmg *= .3;
          dmg = Math.floor(dmg);
          dmg = target.mitigateRes(dmg);
          target.takeDamage(dmg);
          targets.push({unit: units[i], text: dmg});
        }
      }
      log(`<div>${unit.name} targets foes with Hailstorm</div>`);
      if (animate) {
        animateMultiple(0, unit, 'Hailstorm', targets, true);
      }
    },
  },
  'crushing blow': {
    name: 'Crushing Blow',
    type: 'attack',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('def'));
      dmg *= 5;
      dmg = target.mitigateDef(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Crushing Blow for ${dmg}</div>`);
      target.react(unit, animate);
    },
  },
  'protect': {
    name: 'Protect',
    type: 'support',
    fn: function(unit, animate = false) {
      const target = unit.chooseLowestHpAlly();
      target.addStatus('shield 15', false);
      log(`<div>${unit.name} shields ${target.name}</div>`);
      if (animate) {
        animateBuff(0, unit, 'Protect', target, 'Shield');
      }
    },
  },
  'blazing fist': {
    name: 'Blazing Fist',
    type: 'hybrid',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      let dmg = unit.getStat('atk');
      if (target.getStat('res') < target.getStat('def')) {
        dmg = Math.max(0, dmg - target.getStat('res'));
        dmg *= 5;
        dmg *= 2;
        dmg = target.mitigateRes(dmg);
      }
      else {
        dmg = Math.max(0, dmg - target.getStat('def'));
        dmg *= 5;
        dmg *= 2;
        dmg = target.mitigateDef(dmg);
      }
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Blazing Fist for ${dmg}</div>`);
      target.react(unit, animate);
      if (animate) {
        animateStandardAttack(0, unit, 'Blazing Fist', target, dmg);
      }
    },
  },
  'mantra': {
    name: 'Mantra',
    type: 'support',
    fn: function(unit, animate = false) {
      const targets = [];
      for (let i = 0; i < units.length; i++) {
        if (units[i].team == unit.team) {
          units[i].healDamage(10);
          targets.push({unit: units[i], text: '+10'});
        }
      }
      log(`<div>${unit.name} heals all allies for 10</div>`);
      if (animate) {
        animateMultiple(0, unit, 'Mantra', targets, false);
      }
    },
  },
  'grave dirt': {
    name: 'Grave Dirt',
    type: 'support',
    fn: function(unit, animate = false) {
      unit.addStatus('atk +2', 2);
      log(`<div>${unit.name} uses Grave Dirt - ATK increased`);
      if (animate) {
        animateBuff(0, unit, 'Grave Dirt', unit, 'ATK +2');
      }
    },
  },
  'bootslop': {
    name: 'Bootslop',
    type: 'magic',
    fn: function(unit, animate = false) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      target.addStatus('spd -1', 2);
      log(`<div>${unit.name} targets ${target.name} with Bootslop - SPD decreased</div>`);
      target.react(unit, animate);
    },
  },
  'counter': {
    name: 'Counter',
    type: 'reaction',
    fn: function(unit, target, animate) {
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('def'));
      dmg *= 5;
      dmg = Math.floor(dmg * .5);
      dmg = target.mitigateDef(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} counters ${target.name} for ${dmg}</div>`);
      if (animate) {
        animateStandardAttack(1500, unit, 'Counter', target, dmg);
      }
    }
  },
  'parry': {
    name: 'Parry',
    type: 'reaction',
    fn: function(unit, target) {
      target.addStatus('atk -2', 2);
    }
  },
  'absorb': {
    name: 'Absorb',
    type: 'reaction',
    fn: function(unit, target, animate) {
      let text = '';
      if (unit.hasStatus('res +3')) {
        text = 'RES +3';
      }
      else if (unit.hasStatus('res +2')) {
        unit.removeStatus('res +2');
        unit.addStatus('res +3');
        text = 'RES +3';
      }
      else if (unit.hasStatus('res +1')) {
        unit.removeStatus('res +1');
        unit.addStatus('res +2');
        text = 'RES +2';
      }
      else {
        unit.addStatus('res +1');
        text = 'RES +1';
      }
      if (animate) {
        animateBuff(1500, unit, 'Absorb', unit, text);
      }
    }
  },
  'momentum': {
    name: 'Momentum',
    type: 'reaction',
    fn: function(unit, target, animate) {
      let text = '';
      if (unit.hasStatus('spd +3')) {
        text = "SPD +3";
      }
      else if (unit.hasStatus('spd +2')) {
        unit.removeStatus('spd +2');
        unit.addStatus('spd +3');
        text = "SPD +3";
      }
      else if (unit.hasStatus('spd +1')) {
        unit.removeStatus('spd +1');
        unit.addStatus('spd +2');
        text = "SPD +2";
      }
      else {
        unit.addStatus('spd +1');
        text = "SPD +1";
      }
      if (animate) {
        animateBuff(1500, unit, 'Momentum', unit, text);        
      }
    }
  },
  'determination': {
    name: 'Determination',
    type: 'passive',
  },
  'armored': {
    name: 'Armored',
    type: 'passive',
  },
  'second wind': {
    name: 'Second Wind',
    type: 'passive',
  },
  'frost armor': {
    name: 'Frost Armor',
    type: 'passive',
  },
  'undead': {
    name: 'Undead',
    type: 'passive',
  },
  'regen': {
    name: 'Regen',
    type: 'passive'
  }
};

function animateBuff(timer, unit, ability, target, text) {
  startAnimate(unit, ability);
  setTimeout(() => {
    $(`.sprite.${target.name.safeCSS()}`).append(`<div class="pop-text">${text}</div>`);
  }, timer + 1000);
  setTimeout(() => {
    finishAnimate();
  }, timer + 2000);

}

function animateStandardAttack(timer, unit, ability,  target, text) {
  startAnimate(unit, ability);
  setTimeout(() => {
    $(`.sprite.${unit.name.safeCSS()}`).addClass('attack');
  }, timer + 1000);
  setTimeout(() => {
    $(`.sprite.${target.name.safeCSS()}`).append('<div class="hit sprite"><div class="image"></div></div>');
  }, timer + 1250);
  setTimeout(() => {
    $('.hit.sprite').remove();
    $(`.sprite.${target.name.safeCSS()}`).append(`<div class="pop-text">${text}</div>`);
    $(`.sprite.${target.name.safeCSS()} .hp`).css('height', `calc(14px * ${target.chp / target.mhp})`);
    if (target.chp <= 0) {
      $(`.sprite.${target.name.safeCSS()}`).addClass('down');
    }
  }, timer + 1500);
  let finishTimer = 2500;
  if (target.hasReaction() && target.chp > 0) {
    finishTimer = 4000;
  }
  setTimeout(() => {
    finishAnimate();
  }, finishTimer);
}

function animateMultiple(timer, unit, ability,  targets, isAttack) {
  startAnimate(unit, ability);
  setTimeout(() => {
    $(`.sprite.${unit.name.safeCSS()}`).addClass('attack');
  }, 1000);
  setTimeout(() => {
    if (isAttack) {
      for (let i = 0; i < targets.length; i++) {
        $(`.sprite.${targets[i].unit.name.safeCSS()}`).append('<div class="hit sprite"><div class="image"></div></div>');
      }
    }
  }, 1250);
  setTimeout(() => {
    $('.hit.sprite').remove();
    for (let i = 0; i < targets.length; i++) {
      $(`.sprite.${targets[i].unit.name.safeCSS()}`).append(`<div class="pop-text">${targets[i].text}</div>`);
      $(`.sprite.${targets[i].unit.name.safeCSS()} .hp`).css('height', `calc(14px * ${targets[i].unit.chp/targets[i].unit.mhp})`);
      if (targets[i].unit.chp <= 0) {
        $(`.sprite.${targets[i].unit.name.safeCSS()}`).addClass('down');
      }  
    }
  }, 1500);
  setTimeout(() => {
    finishAnimate();
  }, 2500);

}

function startAnimate(unit, ability) {
  animationLocks++;
  $('.skills').append(`<div class="skill ${unit.team === 'ally' ? 'left' : 'right'}">${ability}</div>`);
  $(`.sprite.${unit.name.safeCSS()}`).addClass('active');
}

function finishAnimate() {
  animationLocks--;
  $('.sprite').removeClass('active attack');
  $('.pop-text').remove();
  $('.skill').remove();
}