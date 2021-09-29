contents = [
  'story.html?scene=1',
  'battle.html?scene=1',
  'story.html?scene=2',
];

function drawNav() {
  $('.footer').append(`
  <div class="menu pages">
    <a class="first-page" href="#"><< First</a>
    <a class="prev-page" href="#">< Prev</a>
    <a class="next-page" href="#">Next ></a>
    <a class="latest-page" href="#">Latest >></a>
  </div>
  <div class="menu nav">
    <a href="index.html">Home</a>
    <a href="#" disabled>Party Status</a>
    <a href="about.html">About</a>
    <a href="#" disabled>Archive</a>
    <a href="#" disabled>Updates</a>
  </div>
`);

$('.header').append(`
  <div class="menu nav">
    <a href="index.html">Home</a>
    <a href="#" disabled>Party Status</a>
    <a href="about.html">About</a>
    <a href="#" disabled>Archive</a>
    <a href="#" disabled>Updates</a>
  </div>
  <div class="menu pages">
    <a class="first-page" href="#"><< First</a>
    <a class="prev-page" href="#">< Prev</a>
    <a class="next-page" href="#">Next ></a>
    <a class="latest-page" href="#">Latest >></a>
  </div>
`);
}

function populateLinks() {
  const currentPage = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  const contentIndex = contents.indexOf(currentPage);
  if (contentIndex === 0) {
    $('a.first-page').attr('disabled', 'disabled');
    $('a.prev-page').attr('disabled', 'disabled');
    $('a.next-page').attr('href', contents[contentIndex+1]);
    $('a.latest-page').attr('href', contents[contents.length-1]);
  }
  else if (contentIndex === contents.length - 1 || currentPage === 'index.html' || currentPage === '') {
    $('a.first-page').attr('href', contents[0]);
    $('a.prev-page').attr('href', contents[contentIndex-1]);
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
    $('a.first').attr('href', contents[0]);
    $('a.prev').attr('disabled', 'disabled');
    $('a.next').attr('disabled', 'disabled');
    $('a.latest').attr('href', contents[contents.length-1]);
  }
  
  $(`a[href="${currentPage}"]`).addClass('active');  
}