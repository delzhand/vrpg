const abilities = {
  'weapon': {
    name: 'Attack',
    type: 'attack',
    fn: function(unit) {
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
      target.react(unit);
    },
  },
  'magic': {
    name: 'Attack',
    type: 'magic',
    fn: function(unit) {
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
      target.react(unit);
    }
  },
  'thrust': {
    name: 'Thrust',
    type: 'attack',
    fn: function(unit) {
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
      target.react(unit);
    },
  },
  'flank': {
    name: 'Flank',
    type: 'attack',
    fn: function(unit) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      target.addStatus('flanked');
      log(`<div>${unit.name} targets ${target.name} with Flank</div>`);
      target.react(unit);
    },
  },
  'ice spear': {
    name: 'Ice Spear',
    type: 'magic',
    fn: function(unit) {
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
      target.react(unit);
    },
  },
  'hailstorm': {
    name: 'Hailstorm',
    type: 'magic',
    fn: function(unit) {
      let dmg = unit.getStat('atk');
      for (let i = 0; i < units.length; i++) {
        if (units[i].team != unit.team && units[i].chp > 0) {
          const target = units[i];
          dmg = Math.max(0, dmg - target.getStat('res'));
          dmg *= 5;
          dmg *= .3;
          dmg = Math.floor(dmg);
          dmg = target.mitigateRes(dmg);
          target.takeDamage(dmg);
        }
      }
      log(`<div>${unit.name} targets foes with Hailstorm</div>`);
    },
  },
  'crushing blow': {
    name: 'Crushing Blow',
    type: 'attack',
    fn: function(unit) {
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
      target.react(unit);
    },
  },
  'protect': {
    name: 'Protect',
    type: 'support',
    fn: function(unit) {
      const target = unit.chooseLowestHpAlly();
      target.addStatus('shield 15', false);
      log(`<div>${unit.name} shields ${target.name}</div>`);
    },
  },
  'blazing fist': {
    name: 'Blazing Fist',
    type: 'hybrid',
    fn: function(unit) {
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
      target.react(unit);
    },
  },
  'mantra': {
    name: 'Mantra',
    type: 'support',
    fn: function(unit) {
      for (let i = 0; i < units.length; i++) {
        if (units[i].team == unit.team) {
          units[i].healDamage(10);
        }
      }
      log(`<div>${unit.name} heals all allies for 10</div>`);
    },
  },
  'grave dirt': {
    name: 'Grave Dirt',
    type: 'support',
    fn: function(unit) {
      unit.addStatus('atk +2', 2);
      log(`<div>${unit.name} uses Grave Dirt - ATK increased`);
    },
  },
  'bootslop': {
    name: 'Bootslop',
    type: 'magic',
    fn: function(unit) {
      const target = unit.chooseFoe();
      if (!target) {
        return;
      }
      target.addStatus('spd -1', 2);
      log(`<div>${unit.name} targets ${target.name} with Bootslop - SPD decreased</div>`);
      target.react(unit);
    },
  },
  'counter': {
    name: 'Counter',
    type: 'reaction',
    fn: function(unit, target) {
      let dmg = unit.getStat('atk');
      dmg = Math.max(0, dmg - target.getStat('def'));
      dmg *= 5;
      dmg = Math.floor(dmg * .5);
      dmg = target.mitigateDef(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} counters ${target.name} for ${dmg}</div>`);
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
    fn: function(unit, target) {
      if (unit.hasStatus('res +3')) {
        return;
      }
      else if (unit.hasStatus('res +2')) {
        unit.removeStatus('res +2');
        unit.addStatus('res +3');
      }
      else if (unit.hasStatus('res +1')) {
        unit.removeStatus('res +1');
        unit.addStatus('res +2');
      }
      else {
        unit.addStatus('res +1');
      }
    }
  },
  'momentum': {
    name: 'Momentum',
    type: 'reaction',
    fn: function(unit, target) {
      if (unit.hasStatus('spd +3')) {
        return;
      }
      else if (unit.hasStatus('spd +2')) {
        unit.removeStatus('spd +2');
        unit.addStatus('spd +3');
      }
      else if (unit.hasStatus('spd +1')) {
        unit.removeStatus('spd +1');
        unit.addStatus('spd +2');
      }
      else {
        unit.addStatus('spd +1');
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