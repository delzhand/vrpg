contents = [
  'story.html?scene=1',
  'battle.html?scene=1',
  'story.html?scene=2',
];

const currentPage = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
const contentIndex = contents.indexOf(currentPage);
if (contentIndex === 0) {
  $('.menu.pages .first').attr('disabled', 'disabled');
  $('.menu.pages .prev').attr('disabled', 'disabled');
  $('.menu.pages .next').attr('href', contents[contentIndex+1]);
  $('.menu.pages .latest').attr('href', contents[contents.length-1]);
}
else if (contentIndex === contents.length - 1 || currentPage === 'index.html') {
  $('.menu.pages .first').attr('href', contents[0]);
  $('.menu.pages .prev').attr('href', contents[contentIndex-1]);
  $('.menu.pages .next').attr('disabled', 'disabled');
  $('.menu.pages .latest').attr('disabled', 'disabled');
}
else {
  $('.menu.pages .first').attr('href', contents[0]);
  $('.menu.pages .prev').attr('href', contents[contentIndex-1]);
  $('.menu.pages .next').attr('href', contents[contentIndex+1]);
  $('.menu.pages .latest').attr('href', contents[contents.length-1]);
}

$(`a[href="${currentPage}"]`).addClass('active');