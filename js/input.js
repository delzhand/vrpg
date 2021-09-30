const input = {
  0: {
      music: 'Sanova - the time has come|https://www.youtube.com/watch?v=dP2_8Gt4fIk',
      xpMultiplier: 1,
      moves: [
        {user: '@delzhand', actions: ['Saoirse:attack', 'Garven:attack', 'Hanya:special']},
        {user: '@dummy1', actions: ['Hanya:assist', 'Parzeval:special', 'Garven:defend']},    
        {user: '@dummy2', actions: ['Parzeval:defend', 'Hanya:attack', 'Saoirse:special']},    
      ],
      actionDistribution: [
        'attack',
        'attack',
        'special',
        'defend',
        'assist',
      ],
      enemies: [
        {
          name: 'Ichor',
          color: '#4b884b',
          class: 'Monster',
          mhp: 7,
          attack: 1,
          special: 3,
          defend: 1,
          assist: 2,
        },
        {
          name: 'Bone Wraith',
          color: '#4b884b',
          class: 'Monster',
          mhp: 4,
          attack: 3,
          special: 3,
          defend: 3,
          assist: 2,
        }
      ]
    },
    1: {
      music: 'Sanova - the time has come|https://www.youtube.com/watch?v=dP2_8Gt4fIk',
      xpMultiplier: 1,
      moves: [
        {user: '@delzhand', actions: ['Saoirse:attack', 'Garven:defend', 'Hanya:special']},
        {user: '@dummy1', actions: ['Hanya:assist', 'Parzeval:special', 'Garven:defend']},    
        {user: '@dummy2', actions: ['Parzeval:defend', 'Hanya:attack', 'Saoirse:special']},    
      ],
      actionDistribution: [
        'attack',
        'attack',
        'special',
        'defend',
        'assist',
      ],
      enemies: [
        {
          name: 'Wheel-Eater',
          color: '#4b884b',
          class: 'Monster',
          mhp: 18,
          attack: 6,
          special: 7,
          defend: 5,
          assist: 5,
        }
      ]
    }
}