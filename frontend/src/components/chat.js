// =============================================
// CampusSphere — Chat Component
// =============================================

function renderChatList() {
  var c = document.getElementById('chat-list-items');
  if (!c) return;
  c.innerHTML = CHATS.map(function(ch, i) {
    var on = i === appState.currentChat;
    var extra = appState.messages[i] || [];
    var allMsgs = ch.msgs.concat(extra);
    var preview = allMsgs.length ? allMsgs[allMsgs.length - 1].text.substring(0, 32) + '...' : ch.preview;
    var unreadHtml = (!on && ch.unread && !extra.length) ? '<div class="cunr">' + ch.unread + '</div>' : '';
    return '<div class="ci' + (on ? ' on' : '') + '" onclick="selectChat(' + i + ')">' +
      '<div class="av" style="width:36px;height:36px;font-size:12px;' + ch.style + '">' + ch.initials + '</div>' +
      '<div class="ci-info"><div class="cin2">' + ch.name + '</div><div class="cip">' + preview + '</div></div>' +
      '<div class="ci-meta"><div class="cit">' + ch.time + '</div>' + unreadHtml + '</div>' +
      '</div>';
  }).join('');
  renderChatWindow();
}

function selectChat(i) {
  appState.currentChat = i;
  renderChatList();
}

function renderChatWindow() {
  var ch = CHATS[appState.currentChat];
  var avEl = document.getElementById('cw-av');
  var nameEl = document.getElementById('cw-name');
  if (!avEl || !nameEl) return;
  avEl.textContent = ch.initials;
  avEl.style.cssText = 'width:34px;height:34px;font-size:12px;' + ch.style;
  nameEl.textContent = ch.name;

  var extra = appState.messages[appState.currentChat] || [];
  var allMsgs = ch.msgs.concat(extra);
  var c = document.getElementById('cw-msgs');
  c.innerHTML = allMsgs.map(function(m) {
    return '<div class="msg ' + (m.me ? 'me' : 'them') + '">' +
      '<div class="bbl">' + m.text + '</div>' +
      '<div class="mt">' + m.time + '</div>' +
      '</div>';
  }).join('');
  c.scrollTop = c.scrollHeight;
}

function sendMsg(e) {
  if (e.key === 'Enter') sendMsgClick();
}

function sendMsgClick() {
  var inp = document.getElementById('chat-input');
  var txt = inp.value.trim();
  if (!txt) return;
  if (!appState.messages[appState.currentChat]) appState.messages[appState.currentChat] = [];
  var now = new Date();
  var timeStr = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + ' PM';
  appState.messages[appState.currentChat].push({ me: true, text: txt, time: timeStr });
  inp.value = '';
  renderChatList();
}
