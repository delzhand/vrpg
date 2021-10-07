contents = [
  'story.html?scene=0',
  'story.html?scene=1',
  'story.html?scene=2',
  'story.html?scene=3',
  'story.html?scene=4',
  'battle.html?data=0',
  'story.html?scene=5',
  'story.html?scene=6',
  'story.html?scene=7',
  'story.html?scene=8',
  'battle.html?data=2',
];

function drawNav() {
  $('.header').append(`
    <div class="menu nav">
      <a href="index.html">Home</a>
      <a href="status.html">Party Status</a>
      <a href="about.html">About</a>
      <a href="https://twitter.com/chaos_quest" class="twitter">Twitter</a>
    </div>
    <div class="menu pages">
      <a class="first-page"><< First</a>
      <a class="prev-page">< Prev</a>
      <a class="next-page">Next ></a>
      <a class="latest-page">Latest >></a>
    </div>
  `);
}

function populateLinks() {
  let currentPage = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  const contentIndex = contents.indexOf(currentPage);
  if (currentPage.length === 0) {
    currentPage = 'index.html';
  }
  if (contentIndex === 0) {
    $('a.first-page').attr('disabled', 'disabled');
    $('a.prev-page').attr('disabled', 'disabled');
    $('a.next-page').attr('href', contents[contentIndex+1]);
    $('a.latest-page').attr('href', contents[contents.length-1]);
  }
  else if (contentIndex === contents.length - 1) {
    $('a.first-page').attr('href', contents[0]);
    $('a.prev-page').attr('href', contents[contents.length-2]);
    $('a.next-page').attr('disabled', 'disabled');
    $('a.latest-page').attr('disabled', 'disabled');
  }
  else if (contentIndex > 0) {
    $('a.first-page').attr('href', contents[0]);
    $('a.prev-page').attr('href', contents[contentIndex-1]);
    $('a.next-page').attr('href', contents[contentIndex+1]);
    $('a.latest-page').attr('href', contents[contents.length-1]);
  }
  else {
    $('a.first-page').attr('href', contents[0]);
    $('a.prev-page').attr('disabled', 'disabled');
    $('a.next-page').attr('disabled', 'disabled');
    $('a.latest-page').attr('href', contents[contents.length-1]);
  }
  
  $(`a[href="${currentPage}"]`).addClass('active');  
}