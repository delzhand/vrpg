const encounters = [
  { //0
    xpMultiplier: 1,
    seed: '5',
    partyData: 0,
    units: [
      {
        name: 'Ocean Jelly A',
        level: 2,
        job: 'Monster',
        team: 'enemy',
        vit: 8,
        atk: 7,
        def: 6,
        res: 6,
        spd: 3,
        pool: ['magic', 'magic', 'bootslop'],
        abilities: ['bootslop'],
      },
      {
        name: 'Ocean Jelly B',
        level: 2,
        job: 'Monster',
        team: 'enemy',
        vit: 8,
        atk: 7,
        def: 6,
        res: 6,
        spd: 3,
        pool: ['magic', 'magic', 'bootslop'],
        abilities: ['bootslop'],
      },
      {
        name: 'Ocean Jelly C',
        level: 2,
        job: 'Monster',
        team: 'enemy',
        vit: 8,
        atk: 6,
        def: 6,
        res: 6,
        spd: 3,
        pool: ['magic', 'magic', 'bootslop'],
        abilities: ['bootslop'],
      },
    ]
  },
  { //1
    xpMultiplier: 1,
    seed: '5',
    partyData: 1,
    units: [
      {
        name: 'Bone Wraith',
        level: 5,
        job: 'Monster',
        team: 'enemy',
        vit: 12,
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
        vit: 10,
        atk: 6,
        def: 6,
        res: 6,
        spd: 4,
        pool: ['magic', 'magic', 'bootslop'],
        abilities: ['bootslop', 'absorb'],
      }  
    ]
  },  
  { //2
    xpMultiplier: 1.2,
    seed: '',
    partyData: 2,
    units: [
      {
        name: 'Moss Fox',
        level: 6,
        job: 'Beast',
        team: 'enemy',
        vit: 14,
        atk: 8,
        def: 7,
        res: 5,
        spd: 6,
        pool: ['weapon', 'weapon'],
        abilities: ['counter'],
      },
    ]
  },  
  { //3
    xpMultiplier: 1.2,
    seed: '1',
    partyData: 4,
    bg: 'cave-bg.png',
    units: [
      {
        name: 'Tomb Guardian',
        level: 6,
        job: 'Undead',
        team: 'enemy',
        vit: 17,
        atk: 5,
        def: 6,
        res: 5,
        spd: 4,
        pool: ['weapon', 'weapon'],
        abilities: [],
        arms: 'regal rapier'
      },
    ]
  },  

];