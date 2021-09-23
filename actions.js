const actionMap = [
  'weapon', //0
  'magic',
  'thrust',
  'flank',
  'ice_spear',
  'hailstorm', // 5
  'crushing_blow',
  'shield',
  'blazing_fist',
  'mantra',
  'grave_dirt', // 10
  'bootslop'
];

const actions = {
  'weapon': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.def);
    dmg *= 5;
    target.takeDamage(dmg);
    log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
  },
  'magic': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.res);
    dmg *= 5;
    target.takeDamage(dmg);
    log(`<div>${unit.name} attacks ${target.name} for ${dmg}</div>`);
  },
  'thrust': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.def);
    dmg *= 5;
    dmg *= 1.5;
    dmg = Math.floor(dmg);
    target.takeDamage(dmg);
    log(`<div>${unit.name} targets ${target.name} with Thrust for ${dmg}</div>`);
  },
  'flank': function(unit) {
    const target = unit.chooseFoe();
    target.addStatus('flanked');
    log(`<div>${unit.name} targets ${target.name} with Flank</div>`);
  },
  'ice_spear': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.res);
    dmg *= 5;
    target.addStatus('attack -1');
    target.takeDamage(dmg);
    log(`<div>${unit.name} targets ${target.name} with Ice Spear for ${dmg}</div>`);
  },
  'hailstorm': function(unit) {
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
  'crushing_blow': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.def);
    dmg *= 5;
    target.takeDamage(dmg);
    log(`<div>${unit.name} targets ${target.name} with Crushing Blow for ${dmg}</div>`);
  },
  'shield': function(unit) {
    const target = unit.chooseLowestHpAlly();
    target.addStatus('shield 15');
    log(`<div>${unit.name} shields ${target.name}</div>`);
  },
  'blazing_fist': function(unit) {
    const target = unit.chooseFoe();
    let dmg = unit.atk;
    dmg = Math.max(0, dmg - target.res);
    dmg *= 5;
    dmg *= 2;
    log(`<div>${unit.name} targets ${target.name} with Blazing Fist for ${dmg}</div>`);
  },
  'mantra': function(unit) {
    for (let i = 0; i < units.length; i++) {
      if (units[i].team == unit.team) {
        units[i].healDamage(10);
      }
    }
    log(`<div>${unit.name} heals all allies for 10</div>`);
  },
  'grave_dirt': function(unit) {
    unit.addStatus('atk +2', 2);
    log(`<div>${unit.name} uses Grave Dirt - ATK increased`);
  },
  'bootslop': function(unit) {
    const target = unit.chooseFoe();
    unit.addStatus('spd -2', 2);
    log(`<div>${unit.name} targets ${target.name} with Bootslop - SPD decreased</div>`);
  },
};
