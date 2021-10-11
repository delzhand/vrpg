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
  {type: 'system', date: '10/03/2021', txt: 'Bestiary page unlocked!'},
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