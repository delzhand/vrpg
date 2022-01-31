function projectTurnOrder(roster) {
  const projection = [];
  for (let i = 0; i < roster.length; i++) {
    roster[i].pct = roster[i].ct;
    roster[i].eff = getEffectiveStats(roster[i]);
  }
  for (let j = 0; j < 100; j++) {
    for (let i = 0; i < roster.length; i++) {
      let ctMod = Math.floor(roster[i].eff.luck/10);
      if (roster[i].status.indexOf('LCK Down') >= 0) {
        ctMod -= 3;
      }
      if (roster[i].status.indexOf('LCK Up') >= 0) {
        ctMod += 3;
      }
      if (roster[i].status.indexOf('Stop') >= 0) {
        ctMod = 0;
      }
      if (roster[i].status.indexOf('KO') >= 0) {
        ctMod = 0;
      }
      if (ctMod < 0) {
        ctMod = 0;
      }

      roster[i].pct += ctMod;
      if (roster[i].pct >= 100) {
        projection.push(roster[i].name);
        roster[i].pct -= 100;
      }
    }
  }
  return projection;
}

function giveXP(slot, value) {
  roster[slot].xp += value;
  if (roster[slot].xp >= 100) {
    levelUp(roster[slot]);
  }
}

function levelUp(unit) {
  unit.xp -= 100;
  unit.level++;
  const growth = getJobGrowth(unit.job);
  unit.hp += growth.hp * 3;
  unit.luck += growth.luck * 1;
  unit.strength += growth.strength * 2;
  unit.skill += growth.skill * 2;
}

function getEffectiveStats(unit) {
  const bonus = getJobBonus(unit.job);
  return {
    hp: Math.round(unit.hp * bonus.hp),
    move: bonus.mov,
    luck: Math.round(unit.luck * bonus.luck),
    strength: Math.round(unit.strength * bonus.strength),
    skill: Math.round(unit.skill * bonus.skill),
    evade: bonus.evd,
  }
}

function getBaseUnit(job) {
  if (!job) {
    job = getJobs()[randomInt(getJobs().length)].name;
  }
  const unit = {
    name: '',
    hp: 100,
    move: 4,
    luck: 60,
    strength: 60,
    skill: 60,
    evade: 6,
    xp: 0,
    level: 1,
    job: job,
    chp: 100,
    thp: 0,
    status: [],
    ct: 0,
    pct: 0,
  }
  let names = getNames();
  unit.name = names[randomInt(names.length)];
  return unit;
}

function getNames() {
  return [
    'Abel',
    'Abigale',
    'Abner',
    'Abraham',
    'Ada',
    'Adam',
    'Addison',
    'Alex',
    'Alistair',
    'Ambrose',
    'Amelia',
    'Amos',
    'Andy',
    'Anselm',
    'Arizona',
    'Ashley',
    'Ashton',
    'Austin',
    'Bailey',
    'Bart',
    'Beau',
    'Belle',
    'Betsy',
    'Billy',
    'Blaze',
    'Bo',
    'Boone',
    'Bowie',
    'Brent',
    'Bret',
    'Brooks',
    'Buck',
    'Cal',
    'Calvin',
    'Cameron',
    'Carson',
    'Casey',
    'Cash',
    'Cassidy',
    'Chance',
    'Chandler',
    'Charlotte',
    'Cheyenne',
    'Claire',
    'Clay',
    'Clementine',
    'Clint',
    'Cody',
    'Colt',
    'Colton',
    'Cooper',
    'Cora',
    'Cord',
    'Cort',
    'Daisy',
    'Dakota',
    'Dallas',
    'Dana',
    'Dash',
    'Deacon',
    'Decker',
    'Delilah',
    'Denver',
    'Douglas',
    'Dustin',
    'Dylan',
    'Earl',
    'Edwina',
    'Eleanor',
    'Elijah',
    'Eliza',
    'Ella',
    'Ellie',
    'Elvira',
    'Emma',
    'Esther',
    'Etta',
    'Eudora',
    'Evan',
    'Fischer',
    'Flint',
    'Flora',
    'Frances',
    'Frank',
    'George',
    'Georgia',
    'Grace',
    'Grayson',
    'Greer',
    'Hank',
    'Hannah',
    'Hattie',
    'Heath',
    'Helen',
    'Hitch',
    'Hope',
    'Houston',
    'Isaac',
    'Isabel',
    'Jace',
    'Jaime',
    'Jane',
    'Jeb',
    'Jed',
    'Jessamine',
    'Jesse',
    'Jethro',
    'Josephine',
    'Judith',
    'Kelsey',
    'King',
    'Knight',
    'Laird',
    'Lenora',
    'Levi',
    'Little',
    'Lorraine',
    'Lucy',
    'Luke',
    'Lydia',
    'Mae',
    'Manning',
    'Maxwell',
    'Maybelle',
    'Mayfield',
    'Maynard',
    'McCoy',
    'Miller',
    'Minerva',
    'Montana',
    'Morgan',
    'Myra',
    'Nash',
    'Nelly',
    'Nettie',
    'Nora',
    'Palmer',
    'Pearl',
    'Pickett',
    'Pierce',
    'Quint',
    'Rachel',
    'Rebecca',
    'Reeves',
    'Reno',
    'Roderick',
    'Rogers',
    'Rope',
    'Rosie',
    'Rowena',
    'Ruth',
    'Selina',
    'Shane',
    'Shirley',
    'Stella',
    'Susannah',
    'Theodore',
    'Vern',
    'Wade',
    'Walker',
    'Wesley',
    'Westin',
    'Willa',
    'Winnifred',
    'Zeke',
    'Zylphia',
  ]
}

function getJobGrowth(job) {
  const jobs = getJobs();
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].name === job) {
      return jobs[i].growth;
    }
  }
}

function getJobBonus(job) {
  const jobs = getJobs();
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].name === job) {
      return jobs[i].bonus;
    }
  }
}

function getJobs() {
  return [
    {
      name: 'brawler',
      desc: 'Anyone can throw a punch, but brawlers seem to take a certain pride in doing it better than anyone else.',
      bonus: {hp: 1.3, luck: 1.1, strength: 1.2, skill: 1.1, mov: 4, evd: 5},
      growth: {hp: 3, luck: 1, strength: 3, skill: 2},
      abilities: [
        {name: 'Haymaker', desc: 'Attack *powSTRpow* an adjacent target and inflict SKL Down'},
        {name: 'Bull Rush', desc: 'Move up to three tiles in a straight line and attack *powSTRpow* first target with a chance to inflict LCK Down'},
        {name: 'Grapple', desc: 'Inflict Stop on self and an adjacent target, inflicts HP Down on target'}
      ]
    },
    {
      name: 'hunter',
      desc: 'The same tools that can take down a wild animal can take down a man just as easily.',
      bonus: {hp: 1.2, luck: 1.2, strength: 1.1, skill: 1.1, mov: 3, evd: 10},
      growth: {hp: 3, luck: 2, strength: 1, skill: 3},
      abilities: [
        {name: 'Arrow Shot', desc: 'Attack *powSTR/SKLpow* a target in LOS within 9 tiles'},
        {name: 'Snare', desc: 'Inflict Stop on target within 3 tiles'},
        {name: 'Hatchet', desc: 'Attack *powSTRpow* an adjacent target and inflict ATK Down on target'},
      ]
    },
    {
      name: 'butcher',
      desc: 'The knights of eld used swords, but a machete will work just as well for those with a strong arm.',
      bonus: {hp: 1.2, luck: 1.2, strength: 1.2, skill: 1.1, mov: 3, evd: 5},
      growth: {hp: 2, luck: 1, strength: 4, skill: 2},
      abilities: [
        {name: 'Cleave', 'desc': 'Attack *powSTRpow* an adjacent target and deal 20% damage to targets adjacent to target'},
        {name: 'Flying Cutter', 'desc': 'Attack *powSKLpow* all targets in a straight line'},
        {name: 'Killing Blow', 'desc': 'Attack *powSTRpow* an adjacent target with a chance to inflict KO on target'},
      ]
    },
    {
      name: 'brewer', 
      desc: 'Their concoctions might not be backed by science, but you can\'t deny their effectiveness.',
      bonus: {hp: 1.2, luck: 1.3, strength: 1.1, skill: 1.1, mov: 3, evd: 5},
      growth: {hp: 2, luck: 1, strength: 2, skill: 4},
      abilities: [
        {name: 'Smooth Medicine', desc: 'Restore 30% of Max HP and grant HP Up to target in LOS within 4 tiles'},
        {name: 'Rough Draught', desc: 'Grant LCK Up and ATK Up and inflicts Berserk on target in LOS within 4 tiles'},
        {name: 'Pep Tonic', desc: 'Remove KO status from target in LOS within 4 tiles and grant Quick to target'},
      ]
    },
    {
      name: 'shadow',
      desc: 'Nobody likes a sneak, until you need to get somewhere without anyone noticin\'.',
      bonus: {hp: 1.1, luck: 1.2, strength: 1.1, skill: 1.1, mov: 5, evd: 20},
      growth: {hp: 1, luck: 4, strength: 2, skill: 2},
      abilities: [
        {name: 'Sickle', desc: 'Attack *powSTR/SKLpow* an adjacent target, deals 200% damage if target has no allies within 3 tiles'},
        {name: 'Sneakstep', desc: 'Grant Stride and EVD Up to self'},
        {name: 'Pepper Bomb', desc: 'Inflict Blind and LCK Down on all adjacent targets'},
      ]
    },
    {
      name: 'harvester',
      desc: 'The scythe might be a cumbersome weapon, but what it lacks in ease it makes up for in reach.',
      bonus: {hp: 1.2, luck: 1.3, strength: 1.1, skill: 1.1, mov: 4, evd: 10},
      growth: {hp: 3, luck: 2, strength: 2, skill: 2},
      abilities: [
        {name: 'Scythe', desc: 'Attack *powSTRpow* a target within 2 tiles'},
        {name: 'Bounty', desc: 'Restore 25% of max HP and remove negative status effects from target within 4 tiles'},
        {name: 'Bonfire', desc: 'Attack *powSKLpow* a target within 4 tiles'},
      ]
    },
    {
      name: 'switchblade',
      desc: 'Knives ain\'t the most honorable weapon, but they\'re plentiful, cheap, and easy to hide.',
      bonus: {hp: 1, luck: 1.3, strength: 1, skill: 1.2, mov: 5, evd: 20},
      growth: {hp: 1, luck: 3, strength: 2, skill: 3},
      abilities: [
        {name: 'Perforate', desc: 'Attack *powSTRpow* an adjacent target and inflict HP Down'},
        {name: 'Disarm', desc: 'Attack an *powSKLpow* an adjacent target and inflict ATK Down'},
        {name: 'Knife Throw', desc: 'Attack *powSKLpow* a target in LOS within 3 tiles, chance for ±50% damage'},
      ]
    },
    {
      name: 'flowerchild', 
      desc: 'A song and a smile are handy at makin\' people feel whole, but not much for fighting. Usually.',
      bonus: {hp: 1.2, luck: 1.1, strength: 1.2, skill: 1.2, mov: 3, evd: 5},
      growth: {hp: 2, luck: 2, strength: 2, skill: 2},
      abilities: [
        {name: 'Harmony', desc: 'Restore 30% of Max HP to all allies in a 5 tile area within 3 tiles'},
        {name: 'Revivify', desc: 'Remove KO status and restore 40% of Max HP to target within 3 tiles'},
        {name: 'Heartbreaker', desc: 'Inflict 3 random status effects on target within 5 tiles'},
      ]
    },
    {
      name: 'witch',
      desc: 'Ain\'t just women what practice arcane magic, but somehow the name just stuck.',
      bonus: {hp: 1.1, luck: 1.1, strength: 1.2, skill: 1.3, mov: 3, evd: 5},
      growth: {hp: 2, luck: 2, strength: 1, skill: 4},
      abilities: [
        {name: 'Wicked Wisp', desc: 'Attack *powSKLpow* a target within 3 tiles'},
        {name: 'Lunar Scream', desc: 'Attack *powSKLpow* all targets in a 5 tile area within 4 tiles'},
        {name: 'Misfire', desc: 'Inflict Misfire on all targets in a 5 tile area'},
      ]
    },
    {
      name: 'totema', 
      desc: 'Beware the bestial fury of the land\'s spirits, these are the weapons of the Totema.',
      bonus: {hp: 1.1, luck: 1.2, strength: 1.2, skill: 1.2, mov: 4, evd: 5},
      growth: {hp: 2, luck: 3, strength: 1, skill: 3},
      abilities: [
        {name: 'Winter Wolf', desc: 'Attack *powSKLpow* all adjacent enemies'},
        {name: 'Red Hawk', desc: 'Grant MOV Up to target within 4 tiles'},
        {name: 'Black Bear', desc: 'Grant Shield to allies and inflict HP Down on enemies in a 5 tile area within 3 tiles'},
      ]
    },
    {
      name: 'guardian', 
      desc: 'When there\'s no cover to keep you safe, you\'ll be glad for the guardian\'s shield.',
      bonus: {hp: 1.4, luck: 1.1, strength: 1.1, skill: 1.1, mov: 4, evd: 0},
      growth: {hp: 4, luck: 1, strength: 3, skill: 1},
      abilities: [
        {name: 'Crushing Blow', desc: 'Attack *powSTRpow* an adjacent target'},
        {name: 'Toughen Up', desc: 'Grants Shield to all allies within 2 tiles'},
        {name: 'Defend', desc: 'Switch places with adjacent target and grant Shield to self'},
      ]
    },
    {
      name: 'peacemaker',
      desc: 'You can\'t always talk your way out of trouble, but sometimes you can even the odds.',
      bonus: {hp: 1.1, luck: 1.2, strength: 1.1, skill: 1.2, mov: 5, evd: 15},
      growth: {hp: 3, luck: 2, strength: 1, skill: 2},
      abilities: [
        {name: 'Intimidate', desc: 'Inflicts Cowardice on enemy within 5 tiles'},
        {name: 'Stall', desc: 'Inflicts Stop on all enemies within 5 tiles'},
        {name: 'Persuade', desc: 'Chance to inflict Turncoat on enemy within 5 tiles (chance increases as target HP decreases)'},
      ]
    },
  ];
}

function getJobDetails() {
  let jobs = getJobs();
  const jobDetail = [];
  for (let i = 0; i < jobs.length; i++) {
    let name = jobs[i].name;
    let bonus = jobs[i].bonus;
    let growth = jobs[i].growth;
    jobDetail.push({
      name,
      description: jobs[i].desc,
      abilities: jobs[i].abilities,
      hpGrowth: growth.hp,
      hpBonus: bonus.hp * 10 - 10,
      strGrowth: growth.strength,
      strBonus: bonus.strength * 10 - 10,
      sklGrowth: growth.skill,
      sklBonus: bonus.skill * 10 - 10,
      lckGrowth: growth.luck,
      lckBonus: bonus.luck * 10 - 10,
      move: bonus.mov,
      evade: bonus.evd,
    });
  }
  return jobDetail;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
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