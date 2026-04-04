// =============================================
// CampusSphere — App Controller
// =============================================

var appState = {
  page: 'feed',
  likes: {},
  follows: {},
  messages: {},
  currentChat: 0,
  registrations: {},
  joins: {},
  selectedDay: 28,
  eventCat: 'all',
  commTab: 'threads',
  selectedComm: 0,
  posts: JSON.parse(JSON.stringify(POSTS)) // clone
};

function goPage(p) {
  document.querySelectorAll('.page').forEach(function(el) { el.classList.remove('on'); });
  document.querySelectorAll('.ni').forEach(function(el) { el.classList.remove('on'); });
  document.getElementById('page-' + p).classList.add('on');
  var ni = document.getElementById('ni-' + p);
  if (ni) ni.classList.add('on');
  appState.page = p;
  if (p === 'feed') renderFeed();
  if (p === 'chat') renderChatList();
  if (p === 'events') renderEvents();
  if (p === 'communities') renderComms();
}

function setTab(el) {
  document.querySelectorAll('#feed-tabs .tab').forEach(function(t) { t.classList.remove('on'); });
  el.classList.add('on');
}

// Init
window.addEventListener('DOMContentLoaded', function() {
  renderFeed();
});
