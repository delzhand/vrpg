const scenes = [
  `SCENE: The First Vision
  EXPO: Saoirse crouched near the middle of the ancient subterranean plaza, near a crumbling stone wall. A skeleton hobbled past her clumsily, dim embers in its eyes.
  EXPO: She ignored it, and surveyed the area. The skeletons weren't a <i>huge</i> threat alone, for the most part they could just be knocked over, or if you wanted a laugh, you could grab their skulls and punt them into the pools of milky cave water nearby.
  EXPO: The statues were another story. The stone sentinels patrolled these ruins, even centuries after the fall of their kingdom. Had their creators intended them to wander the dark indefinitely, or was it just an oversight?
  EXPO: Saoirse shook her head. She could ponder the mysteries of the ancients once she'd retrieved the Kingsword from the shrine at the center of the plaza. She set her lantern down and held out her palm.
  SAOIRSE|L: Limini, I need a distraction.
  EXPO: A pair of feline eyes opened in a nearby shadow.
  LIMINI|R: Hmph. Making me do your dirty work?
  SAOIRSE|L: I thought cats were naturally curious. Don't you want to see the Kingsword?
  EXPO: The eyes turned towards the shrine. There was a flicker in the shadow, the merest suggestion of a twitching tail.
  LIMINI|R: <span class="smaller">...a little bit.</span>
  EXPO: The spectral cat took on a more substantial form and bounded off towards the patrolling automaton, which mindlessly gave chase. Saoirse grinned and tightened her cloak, then sprinted for the shrine.
  NEXT`,

  `SCENE: The Second Vision
  EXPO: Saoirse stood at the top of the sand dune and looked east, over the rooftops of the fishing village. The ocean was choppy, and summer's heat had given way to more moderate weather. But the wind was high, which was exactly what she wanted. Today was the day.
  EXPO: She'd discovered the craft while mapping the woods further inland. It had been badly damaged, abandoned long ago. Long ago enough that the forest had almost claimed it entirely, much like its former rider's bones. But it called to her, begged to be restored.
  EXPO: Several other residents of the fishing village had come to the dune to watch. There was a general sense of optimism - Saoirse's previous attempts had met with halting, cautious success. But today was the real test.
  EXPO: She pulled her goggles down and knocked back the kickstand with her heel. She placed a gloved palm on the machine's nameplate. The whirring magical engine at the heart of the machine whispered to her.
  ???|L: Are you ready to fly, rider?
  SAOIRSE|R: Are <i>you</i>, Branford?
  BRANFORD|L: I was <i>made</i> to fly.
  EXPO: The engine flared, and the arc-halo lifted the craft off the ground. This was going to make charting the island much easier.
  NEXT`,

  `SCENE: The Third Vision
  EXPO: Saoirse swatted a tree branch out of the way and gripped her reins tightly. She was on edge - the blood panther had been spotted in this forest only a few days ago. It had killed two cows and wounded a farmer in the nearby village. But she'd pursued it this far, and she wasn't about to let a tangle of scrub and fallen logs stop her now.
  EXPO: A hart, previously still with fear, darted away somewhere to her left. Her wyvern turned to follow it, and she gently tugged on the reins to bring its focus back to <i>her</i> hunt.
  SAOIRSE|L: I know you're hungry, Ambrose. You can hunt once we're done.
  EXPO: She'd taken the job reluctantly. She didn't need the money at the moment, and blood panthers tended to hide during the day. But the village didn't have anyone capable of taking down a beast like this on their own. And left to their own devices, blood panthers would mate with regular panthers, always passing down their voracious appetite and wild strength to their offspring through some cruel trick of heredity.
  EXPO: Ambrose stopped and sniffed at the ground. His nostrils flared. Saoirse checked the straps on her scale mail and grabbed one of her spear from the saddle harness. Her prey was near. She clenched her teeth and dropped down from Ambrose's back. The growl from the overhang was unmistakable, and she dug in her heels as the panther dropped towards her.
  NEXT`,

  `SCENE: Prologue
  EXPO: Saoirse rolled over in her bed, away from the morning sunlight. She had slept fitfully, and her dreams, though vivid in sleep, began to fade into the clarity of consciousness. She sat up after a moment, throwing off the heavy comforter.
  PROMPT: One of these is not a dream, but a memory. Who is Saoirse?
  VOTE-OPEN: A machine-flying cartographer|A dungeon-delving relic seeker|A wyvern-riding monster hunter
  VOTE-TW: <blockquote class="twitter-tweet"><p lang="en" dir="ltr">The prologue has started - vote on the hero&#39;s backstory!<br><br>Who is Saoirse?</p>&mdash; chaosquest (@chaos_quest) <a href="https://twitter.com/chaos_quest/status/1443694245227945989?ref_src=twsrc%5Etfw">September 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
];
const actors = {
  'SAOIRSE': {
    name: 'Saoirse',
    picture: 'surtia.jpeg',
  },
  'PARZEVAL': {
    name: 'Parzeval',
    picture: 'areval.jpeg',
  },
  'GARVEN': {
    name: 'Garven',
    picture: 'graven.jpeg',
  },
  'HANYA': {
    name: 'Hanya',
    picture: 'hanya.jpeg',
  },
  'LIMINI': {
    name: 'Limini',
    picture: 'limini.jpeg',
  },
  'BRANFORD': {
    name: 'Branford',
  }
}