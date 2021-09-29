q = getUrlVars();
s = q.scene;
if (!s) {
  s = scenes.length-1;
}
let scene = scenes[s];
let index = 0;
let lines = scene.split('\n');
let interval = null;

function rescroll() {
  clearInterval(interval);
  $('.line.temp').remove();
  $('.twitter-tweet').last()[0].scrollIntoView(false);
}

function advance() {
  $('#story .start').remove();
  if (index > lines.length - 1) {
    return;
  }
  let line = lines[index].trim();
  if (line.length === 0) {
    index++;
    line = lines[index].trim();
  }
  line = line.split(': ');
  switch (line[0]) {
    case 'EXPO':
    case 'SCENE':
    case 'ACTION':
      $('#story').append(`<div class="line ${line[0].toLowerCase()}">${line[1]}</div>`);
      break;
    case 'MUSIC':
      let link = line[1].split('|');
      $('#story').append(`<div class="line music"><span class="inner"><span class="title"><span class="note"></span>${link[0]}</span><a href="${link[1]}" target="_blank"><img src="./images/play.svg"></a></span></div>`);
      break;
    case 'VOTE-TW':
      $('#story').append('<div class="line temp"><span class="spinner"></span></div>')
      $('#story').append(line[1]);
      interval = setInterval(rescroll, 2000);
      break;
    case 'VOTE-OPEN':
    case 'VOTE-CLOSED':
      $('#story').append(`<div class="line vote"><div class="title">${line[0]}</div></div>`);
      let options = line[1].split('|');
      for (let i = 0; i < options.length; i++) {
        const data = options[i].split('%');
        if (data.length === 2) {
          $('#story .vote').last().append(`<div class="option"><span class="num">${i + 1}</span><span class="text">${data[0].trim()}</span><span class="inner" style="width: ${data[1]}%;"></span></div>`);
        }
        else {
          $('#story .vote').last().append(`<div class="option"><span class="num">${i + 1}</span><span class="text">${options[i].trim()}</span></div>`);
        }
      }
      break;
    case 'NEXT':
      $('#story').append(`<div class="line next-nav"><a class="next-page" href="#">Next ></a></div>`);
      populateLinks();
      break;
    default:
      let spos = line[0].split('|');
      const pos = (spos[1] === 'R') ? '' : 'rev';
      const actor = actors[spos[0]];
      if (actor) {
        $('#story').append(`
          <div class="line dialog ${pos}">
            <div class="speaker">
              <div class="image"><img src="./images/${actor.picture}"></div>
              <div class="name">${actor.name}</div>
            </div>
            <div class="text">${line[1]}</div>
          </div>`);
      } else {
        $('#story').append(`
          <div class="line dialog ${pos}">
            <div class="speaker">
              <div class="name">${spos[0]}</div>
            </div>
            <div class="text">${line[1]}</div>
          </div>`);
      }
      break;
  }
  index++;
  $('.line').last()[0].scrollIntoView(false);
  if (index > lines.length - 1) {
    $('.line').last().after('<div class="scene-end"></div>');
  }
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
