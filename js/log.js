log = [
  {type: 'system', date: '9/30/2021', txt: 'Chaos Quest II started!'},
  {type: 'story', date: '9/30/2021', txt: 'Saoirse has many dreams, but only one is a memory. Who is Saoirse?<br><a href="story.html?scene=0">Page 1 of 4</a>'},
  {type: 'party', date: '10/02/2021', txt: `Saoirse's class set to <b>Explorer</b>`},
  {type: 'party', date: '10/02/2021', txt: `Parzeval joined the party`},
  {type: 'party', date: '10/02/2021', txt: `Saoirse gained 15 XP`},
  {type: 'party', date: '10/02/2021', txt: `Parzeval gained 15 XP`},
  {type: 'story', date: '10/02/2021', txt: 'Saoirse awakens at home in the fishing village of Bolba - but what of her test flight on Branford?<br><a href="story.html?scene=4">Page 1 of 3</a>'},
  {type: 'system', date: '10/03/2021', txt: 'Party Status page unlocked!'},
  {type: 'story', date: '10/04/2021', txt: 'Saoirse begins thinking of a way to repair Branford and get airborne again.<br><a href="story.html?scene=6">Page 1 of 2</a>'},
  {type: 'party', date: '10/07/2021', txt: `Saoirse gained 18 XP and leveled up! (+5 HP)`},
  {type: 'story', date: '10/07/2021', txt: 'Saoirse decides to help out a village farmer, even if it means tackling a small predator.<br><a href="story.html?scene=8">Page 1 of 3</a>'},
  {type: 'party', date: '10/09/2021', txt: `Saoirse learned [Arc-Flash]`},
  {type: 'story', date: '10/09/2021', txt: `Saoirse takes shelter in a cave, but there's something else in here...<br><a href="story.html?scene=10">Page 1 of 3</a>`},
  {type: 'system', date: '10/10/2021', txt: 'Bestiary page unlocked!'},
  {type: 'story', date: '10/11/2021', txt: `The crypt housed a terrifying guardian! Though wounded from earlier, Saoirse fights back...<br><a href="story.html?scene=13">Page 1 of 1</a>`},
  {type: 'party', date: '10/09/2021', txt: `Saoirse learned [Skull Smasher]`},
  {type: 'party', date: '10/09/2021', txt: `Saoirse gained 30 XP and leveled up! (+1 RES)`},
  {type: 'party', date: '10/09/2021', txt: `Saoirse acquired a [Regal Rapier]`},
  {type: 'story', date: '10/11/2021', txt: `Saoirse defeats the Tomb Guardian, but will she survive? And later, a new player appears...<br><a href="battle.html?data=3">Page 1 of 3</a>`},
  {type: 'party', date: '10/14/2021', txt: `Hanya is now the party leader`},
  {type: 'story', date: '10/14/2021', txt: `Hanya, a monk from the far side of the island, is tasked with healing Saoirse by her master...<br><a href="story.html?scene=16">Page 1 of 1</a>`},
  {type: 'party', date: '10/17/2021', txt: `Hanya learned [Blazing Fist]`},
  {type: 'story', date: '10/17/2021', txt: `Hanya contemplates her task and meets a stranger on the road...<br><a href="story.html?scene=17">Page 1 of 2</a>`},
  {type: 'party', date: '10/19/2021', txt: `Azakir joined the party`},
  {type: 'story', date: '10/19/2021', txt: `An obstacle threatens Hanya's journey, but Azakir's reappearance keeps them both moving.<br><a href="story.html?scene=19">Page 1 of 1</a>`},  
  {type: 'story', date: '10/21/2021', txt: `Azakir and Hanya discuss the problems caused by the goddesses.<br><a href="story.html?scene=20">Page 1 of 1</a>`},  
  {type: 'party', date: '10/24/2021', txt: `Azakir has left the party`},
  {type: 'story', date: '10/24/2021', txt: `Hanya finds Azakir gone in the morning. Later, in the village, she finds him at the center of a crowd...<br><a href="story.html?scene=21">Page 1 of 1</a>`},  
  {type: 'story', date: '11/02/2021', txt: `Hanya and the elders discuss the situation, and Hanya must make a decision...<br><a href="story.html?scene=22">Page 1 of 1</a>`},  
];

function drawUpdates() {
  for (let i = log.length - 1; i >= log.length - 20; i--) {
    if (i >= 0) {
      $('#system-log').append(drawUpdate(log[i]));
    }
  }
}

function drawUpdate(item) {
  return `<div class="item ${item.type}">
    <div class="date">${item.date}</div>
    <div class="txt">${item.txt}</div>
  </div>`;
}