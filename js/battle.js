let seedRand = null;
let units = null;
let queue = [];

q = getUrlVars();
d = q.data;
if (!d) {
  d = party.length-1;
}
let input = encounters[d];

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
  for (let i = 0; i < party[input.partyData].length; i++) {
    const unit = party[input.partyData][i];
    units.push(new Unit(unit.name, unit.level, unit.job, unit.picture, unit.team, unit.hp, unit.vit, unit.atk, unit.def, unit.res, unit.spd, unit.xp, unit.pool, unit.abilities, unit.arms, unit.armor));    
  }
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

function drawField() {
  let enemyCount = 0;
  let allyCount = 0;
  let posMap = [
    30,
    45,
    60,
    15,
  ]
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    if (unit.team === 'ally') {
      allyCount++;
      $('.visualizer .allies').append(`<div class="unit ${unit.name.safeCSS()}">
        <div class="name">${unit.name}</div>
        <div class="hp">${unit.chp}</div><div class="mhp">/${unit.mhp}</div>
      </div>`);
    }
    else {
      enemyCount++;
      $('.visualizer .enemies').append(`<div class="unit ${unit.name.safeCSS()}"><div class="name">${unit.name}</div></div>`);
    }
    $('.visualizer').append(`<div class="${unit.name.safeCSS()} sprite ${unit.team === 'ally' ? 'right' : 'left'}" style="top: ${unit.team === 'ally' ? posMap[allyCount-1] : posMap[enemyCount-1]}%;"><div class="hp"><span class="num">${unit.chp}</span></div><div class="image"></div></div>`);
  }
}