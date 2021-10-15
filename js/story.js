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
  if (index === 0) {
    $('#pa-log').append(`<p>[url="${window.location.href}"]Interactive Version[/url]</p>`)
    $('#story .start').remove();
  }
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
    case 'PROMPT':
    case 'EXPO':
    case 'SCENE':
    case 'ACTION':
      $('#story').append(`<div class="line ${line[0].toLowerCase()}">${line[1]}</div>`);
      if (line[0] === 'SCENE') {
        $('#pa-log').append(`<p>[b]${line[1].toPA()}[/b]</p>`);
      }
      else if (line[0] === 'PROMPT') {
        $('#pa-log').append(`<p>[b][color=red]${line[1].toPA()}[/color][/b]</p>`);
      }
      else {
        $('#pa-log').append(`<p>${line[1].toPA()}</p>`);
      }
      break;
    case 'MUSIC':
      let link = line[1].split('|');
      $('#story').append(`<div class="line music"><span class="inner"><span class="title"><span class="note"></span>${link[0]}</span><a href="${link[1]}" target="_blank"><img src="./images/play.svg"></a></span></div>`);
      $('#pa-log').append(`<p>${link[0]}<br>${link[1]}</p>`);
      break;
    case 'VOTE-TW':
      $('#story').append('<div class="line temp"><span class="spinner"></span></div>')
      $('#story').append(line[1]);
      interval = setInterval(rescroll, 2000);
      break;
    case 'IMAGE':
      $('#story').append(`<div class="line image"><img src="./images/story/${line[1]}"/></div>`);
      break;
    case 'VOTE-OPEN':
    case 'VOTE-CLOSED':
      $('#story').append(`<div class="line vote"><div class="title">${line[0]}</div></div>`);
      let options = line[1].split('|');
      $('#pa-log').append('[list=1]<br>');
      for (let i = 0; i < options.length; i++) {
        const data = options[i].split('%');
        if (data.length === 2) {
          $('#story .vote').last().append(`<div class="option"><span class="num">${i + 1}</span><span class="text">${data[0].trim()}</span><span class="inner" style="width: ${data[1]}%;"></span></div>`);
        }
        else {
          $('#story .vote').last().append(`<div class="option"><span class="num">${i + 1}</span><span class="text">${options[i].trim()}</span></div>`);
        }
        $('#pa-log').append(`[*] ${options[i].trim()}<br/>`);
      }
      $('#pa-log').append('[/list]');
      break;
    case 'BREAK':
      $('#story').append('<div class="line break">---</div>');
      break;
    case 'NEXT':
      $('#story').append(`<div class="line next-nav"><a class="next-page" href="#">Next ></a></div>`);
      populateLinks();
      break;
    default:
      let spos = line[0].split('|');
      const pos = (spos[1] === 'L') ? '' : 'rev';
      const actor = actors[spos[0]];
      if (actor && actor.picture) {
        $('#story').append(`
          <div class="line dialog ${pos}">
            <div class="speaker">
              <div class="image"><img src="./images/${actor.picture}"></div>
              <div class="name">${actor.name}</div>
            </div>
            <div class="text">${line[1]}</div>
          </div>`);
        } else if (actor) {
          $('#story').append(`
          <div class="line dialog ${pos}">
            <div class="speaker">
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
      $('#pa-log').append(`<p>${spos[0]}: ${line[1].toPA()}</p>`);
      break;
  }
  index++;
  // $('.line').last()[0].scrollIntoView(false);
  window.scrollTo(0,document.body.scrollHeight);
  if (index > lines.length - 1) {
    $('.line').last().after('<div class="scene-end"></div>');
  }
}

String.prototype.toPA = function() {
  return this.replaceAll('<i>', '[i]')
    .replaceAll('</i>', '[/i]')
    .replaceAll('<b>', '[b]')
    .replaceAll('</b>', '[/b]');
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
