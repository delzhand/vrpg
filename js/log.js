log = [
  {type: 'system', date: '9/30/2021', txt: 'Chaos Quest II started!'},
  {type: 'story', date: '9/30/2021', txt: 'Saoirse has many dreams, but only one is a memory. Who is Saoirse?<br><a href="story.html?scene=0">Page 1 of 4</a>'},
  {type: 'party', date: '10/02/2021', txt: `Saoirse's class set to <b>Explorer</b>`},
  {type: 'story', date: '10/02/2021', txt: 'Saoirse awakens at home in the fishing village of Bolba - but what of her test flight on Branford?<br><a href="story.html?scene=4">Page 1 of 3</a>'},
  {type: 'party', date: '10/02/2021', txt: `Parzeval joined the party`},
  {type: 'party', date: '10/02/2021', txt: `Saoirse gained 15 XP`},
  {type: 'party', date: '10/02/2021', txt: `Parzeval gained 15 XP`},
  {type: 'system', date: '10/03/2021', txt: 'Party Status screen unlocked!'},
  {type: 'vote', date: '', txt: '<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Branford doesn&#39;t want to talk about his origins. What does Saoirse ask instead?</p>&mdash; Chaos Quest II (@chaos_quest) <a href="https://twitter.com/chaos_quest/status/1444509571310043137?ref_src=twsrc%5Etfw">October 3, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'}
];

function drawUpdates() {
  for (let i = log.length - 1; i >= log.length - 10; i--) {
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