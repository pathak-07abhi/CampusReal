// =============================================
// CampusSphere — Feed Component
// =============================================

function renderFeed() {
  var c = document.getElementById('posts-container');
  if (!c) return;
  c.innerHTML = appState.posts.map(function(p) { return renderPost(p); }).join('');

  var sc = document.getElementById('suggestions-container');
  sc.innerHTML = SUGGESTIONS.map(function(s, i) {
    var following = appState.follows[i];
    return '<div class="sug">' +
      '<div class="av" style="width:30px;height:30px;font-size:11px;' + s.style + '">' + s.initials + '</div>' +
      '<div class="si"><div class="sn">' + s.name + '</div><div class="sd">' + s.detail + '</div></div>' +
      '<button class="fbtn' + (following ? ' following' : '') + '" onclick="toggleFollow(this,' + i + ')">' + (following ? 'Following' : 'Follow') + '</button>' +
      '</div>';
  }).join('');
}

function renderPost(p) {
  var liked = appState.likes[p.id];
  var lc = p.likes + (liked ? 1 : 0);
  var badgeHtml = p.badge ? '<span class="pill ' + p.badgeClass + '">' + p.badge + '</span>' : '';

  var eventHtml = '';
  if (p.event) {
    var regKey = 'p' + p.id;
    var registered = appState.registrations[regKey];
    eventHtml = '<div class="evc">' +
      '<div class="edb"><div class="edd">' + p.event.day + '</div><div class="edm">' + p.event.mon + '</div></div>' +
      '<div class="ei"><div class="et">' + p.event.title + '</div><div class="el">' + p.event.loc + '</div></div>' +
      '<button class="rbtn" onclick="registerFromPost(this,\'' + regKey + '\')">' + (registered ? 'Registered ✓' : 'Register') + '</button>' +
      '</div>';
  }

  var pollHtml = '';
  if (p.poll) {
    pollHtml = '<div>' +
      p.poll.map(function(o) {
        return '<div class="poll-opt"><div class="pbar" style="width:' + o.pct + '%"></div>' +
          '<span class="plabel">' + o.label + '</span><span class="ppct">' + o.pct + '%</span></div>';
      }).join('') +
      '<div style="font-size:10px;color:var(--mut);margin:6px 0">' + p.pollVotes.toLocaleString() + ' votes</div>' +
      '</div>';
  }

  return '<div class="post">' +
    '<div class="ph">' +
      '<div class="av" style="width:34px;height:34px;font-size:12px;' + p.avStyle + '">' + p.av + '</div>' +
      '<div class="pm"><div class="pn">' + p.name + badgeHtml + '</div><div class="ps">' + p.sub + '</div></div>' +
      '<span style="color:var(--mut);font-size:18px;cursor:pointer;line-height:1">···</span>' +
    '</div>' +
    '<div class="pc">' + p.content + '</div>' +
    eventHtml + pollHtml +
    '<div class="actions">' +
      '<button class="act' + (liked ? ' liked' : '') + '" onclick="toggleLike(this,' + p.id + ')">' +
        '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' + lc + '</button>' +
      '<button class="act"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' + p.comments + '</button>' +
      '<button class="act"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>Share</button>' +
      '<button class="act"><svg viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>' +
    '</div>' +
  '</div>';
}

function toggleLike(el, id) {
  appState.likes[id] = !appState.likes[id];
  renderFeed();
}

function toggleFollow(el, i) {
  appState.follows[i] = !appState.follows[i];
  renderFeed();
}

function registerFromPost(el, key) {
  appState.registrations[key] = true;
  renderFeed();
}

function publishPost() {
  var input = document.getElementById('compose-input');
  var txt = input.value.trim();
  if (!txt) return;
  appState.posts.unshift({
    id: Date.now(),
    av: 'AK',
    avStyle: 'background:linear-gradient(135deg,#667eea,#764ba2)',
    name: 'Arjun Kumar',
    badge: null,
    sub: 'Just now · IIT Kanpur',
    content: txt,
    likes: 0,
    comments: 0
  });
  input.value = '';
  renderFeed();
}

function handleCompose(e) {
  if (e.key === 'Enter') publishPost();
}
