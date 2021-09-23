const actions = {
  'weapon': {
    name: 'Attack',
    type: 'attack',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.def);
      dmg *= 5;
      target.takeDamage(dmg);
      log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
    },
  },
  'magic': {
    name: 'Attack',
    type: 'magic',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.res);
      dmg *= 5;
      target.takeDamage(dmg);
      log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
    }
  },
  'thrust': {
    name: 'Thrust',
    type: 'attack',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.def);
      dmg *= 5;
      dmg *= 1.5;
      dmg = Math.floor(dmg);
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Thrust for ${dmg}</div>`);
    },
  },
  'flank': {
    name: 'Flank',
    type: 'attack',
    fn: function(unit) {
      const target = unit.chooseFoe();
      target.addStatus('flanked');
      log(`<div>${unit.name} targets ${target.name} with Flank</div>`);
    },
  },
  'ice spear': {
    name: 'Ice Spear',
    type: 'magic',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.res);
      dmg *= 5;
      target.addStatus('attack -1');
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Ice Spear for ${dmg}</div>`);
    },
  },
  'hailstorm': {
    name: 'Hailstorm',
    type: 'magic',
    fn: function(unit) {
     const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.res);
      dmg *= 5;
      dmg *= .3;
      dmg = Math.floor(dmg);
      for (let i = 0; i < units.length; i++) {
        if (units[i].team != unit.team) {
          units[i].takeDamage(dmg);
        }
      }
      log(`<div>${unit.name} targets foes with Hailstorm for ${dmg}</div>`);
    },
  },
  'crushing blow': {
    name: 'Crushing Blow',
    type: 'attack',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.def);
      dmg *= 5;
      target.takeDamage(dmg);
      log(`<div>${unit.name} targets ${target.name} with Crushing Blow for ${dmg}</div>`);
    },
  },
  'protect': {
    name: 'Protect',
    type: 'support',
    fn: function(unit) {
      const target = unit.chooseLowestHpAlly();
      target.addStatus('shield 15');
      log(`<div>${unit.name} shields ${target.name}</div>`);
    },
  },
  'blazing fist': {
    name: 'Blazing Fist',
    type: 'hybrid',
    fn: function(unit) {
      const target = unit.chooseFoe();
      let dmg = unit.atk;
      dmg = Math.max(0, dmg - target.res);
      dmg *= 5;
      dmg *= 2;
      log(`<div>${unit.name} targets ${target.name} with Blazing Fist for ${dmg}</div>`);
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
      unit.addStatus('spd -2', 2);
      log(`<div>${unit.name} targets ${target.name} with Bootslop - SPD decreased</div>`);
    },
  }
};