let seedRand = null;
let units = null;
let queue = [];

const input = {
  xpMultiplier: 1,
  seed: '5',
  units: [
    {
      name: 'Saoirse',
      level: 5,
      job: 'Fencer',
      picture: 'surtia.jpeg',
      team: 'ally',
      vit: 10,
      atk: 10,
      def: 6,
      res: 3,
      spd: 6,
      pool: ['weapon', 'thrust', 'thrust', 'flank'],
      abilities: ['thrust', 'flank', 'counter'],
      arms: 'estoc',
      armor: 'doublet',
      xp: 0,
    },
    {
      name: 'Parzeval',
      level: 5,
      job: 'Mage',
      picture: 'areval.jpeg',
      team: 'ally',
      vit: 9,
      atk: 10,
      def: 6,
      res: 6,
      spd: 4,
      pool: ['magic', 'ice spear', 'hailstorm'],
      abilities: ['ice spear', 'hailstorm', 'absorb'],
      arms: 'frost staff',
      armor: 'tunic',
      xp: 0,
    },
    {
      name: 'Garven',
      level: 5,
      job: 'Knight',
      picture: 'graven.jpeg',
      team: 'ally',
      vit: 13,
      atk: 5,
      def: 8,
      res: 5,
      spd: 4,
      pool: ['weapon', 'crushing blow', 'protect'],
      abilities: ['crushing blow', 'protect', 'parry'],
      arms: 'halberd',
      armor: 'chainmail',
      xp: 0,
    },
    {
      name: 'Hanya',
      level: 5,
      job: 'Monk',
      picture: 'hanya.jpeg',
      team: 'ally',
      vit: 9,
      atk: 10,
      def: 6,
      res: 6,
      spd: 4,
      pool: ['weapon', 'blazing fist', 'blazing fist', 'mantra'],
      abilities:  ['blazing fist', 'mantra', 'momentum'],
      arms: 'tunic',
      armor: 'baghnakhs',
      xp: 0,
    },
    {
      name: 'Bone Wraith',
      level: 5,
      job: 'Monster',
      team: 'enemy',
      vit: 30,
      atk: 8,
      def: 7,
      res: 5,
      spd: 4,
      pool: ['weapon', 'weapon', 'grave dirt'],
      abilities: ['grave dirt', 'counter'],
      arms: 'rusted sword'
    },
    {
      name: 'Ichor',
      level: 5,
      job: 'Monster',
      team: 'enemy',
      vit: 33,
      atk: 6,
      def: 6,
      res: 6,
      spd: 4,
      pool: ['magic', 'magic', 'bootslop'],
      abilities: ['bootslop', 'absorb'],
    }
  ]
};

let getCount = 0;
function getRandomInt(max) {
  const r = Math.floor(seedRand() * max);
  return r;
}

function isVictory() {
  for (let i = 0; i < units.length; i++) {
    if (units[i].team === 'enemy' && units[i].chp > 0) {
      return false;
    }
  }
  return true;
}

function isDefeat() {
  for (let i = 0; i < units.length; i++) {
    if (units[i].team === 'ally' && units[i].chp > 0) {
      return false;
    }
  }
  return true;
}

function tick() {
  if (isDefeat()) {
    return;
  }
  if (isVictory()) {
    return;
  }

  for (let i = 0; i < units.length; i++) {
    if (!isDefeat() && !isVictory()) {
      units[i].tick();
    }
  }
}

function findUnit(name) {
  for (let i = 0; i < units.length; i++) {
    if (units[i].name === name) {
      return units[i];
    }
  }
  return false;
}

function fillQueue() {
  while (!isDefeat() && !isVictory()) {
    tick();
  }
  init();
}

function init() {
  seedRand =  new Math.seedrandom(input.seed);
  units = [];
  for (let i = 0; i < input.units.length; i++) {
    const unit = input.units[i];
    units.push(new Unit(unit.name, unit.level, unit.job, unit.picture, unit.team, unit.hp, unit.vit, unit.atk, unit.def, unit.res, unit.spd, unit.xp, unit.pool, unit.abilities, unit.arms, unit.armor));
  }
  width = $('.frame').outerWidth();
  width /= 160;
  if (width > 5) {
    width = 5;
    $('.frame').css('padding-top', '720px');
  }
  $('.visualizer').css('transform', `translateX(-50%) scale(${width})`);

}

function drawInit() {
  for (let i = 0; i < units.length; i++) {
    $('.profiles').append(units[i].drawProfile());
  }
}

function drawQueue() {
  for (let i = 0; i < queue.length; i++) {
    $('.queue').append(drawQueueItem(queue[i]));
  }
}

function drawQueueItem(item) {
  const unit = findUnit(item.unit);
  return `
    <div class="item ${unit.team}">
      <div class="unit">${unit.name}</div>
      <div class="ability">${abilities[item.ability].name}</div>
    </div>
  `;
}

let index = 0;
let animationLocks = 0;
function advance() {
  $('.tap-msg').remove();
  if (index >= queue.length) {
    return;
  }
  if (animationLocks > 0) {
    return;
  }
  $('.queue .item.active').addClass('done');
  $('.queue .item.active').removeClass('active');
  $(`.queue .item:nth-child(${index+1})`).addClass('active');

  const item = queue[index];
  unit = findUnit(item.unit);
  unit.chooseAbility(); // just to increment seedrandom to match queue
  abilities[item.ability].fn(unit, true);
  unit.endRound();
  index++;
  updateAllProfiles();
  if (index >= queue.length) {
    if (isVictory()) {
      log('<div>Victory</div>');
    }
    if (isDefeat()) {
      log('<div>Defeated</div>');
    }
  }
}

let logIndex = 1;
function log(message) {
  $(`.log-${logIndex}`).append(message);
}

function updateAllProfiles() {
  for (let i = 0; i < units.length; i++) {
    units[i].updateProfile();
  }
}

String.prototype.safeCSS = function() {
return encodeURIComponent(this)
  .toLowerCase()
  .replace('\'', '')
  .replace(/\.|%[0-9a-z]{2}/gi, '');
}
