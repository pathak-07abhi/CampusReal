// =============================================
// CampusSphere — Communities Component
// =============================================

function renderComms() {
  var c = document.getElementById('comm-list');
  if (!c) return;
  c.innerHTML =
    '<div style="padding:12px 14px;font-family:\'Syne\',sans-serif;font-size:14px;font-weight:700;border-bottom:1px solid var(--bdr)">Communities</div>' +
    COMMUNITIES.map(function(cm, i) {
      var on = i === appState.selectedComm;
      return '<div class="com-item' + (on ? ' on' : '') + '" onclick="selectComm(' + i + ')">' +
        '<div class="com-logo" style="' + cm.style + '">' + cm.initials + '</div>' +
        '<div class="com-info"><div class="com-name">' + cm.name + '</div><div class="com-members">' + cm.members + '</div></div>' +
        '</div>';
    }).join('');
  renderCommDetail();
}

function selectComm(i) {
  appState.selectedComm = i;
  appState.commTab = 'threads';
  renderComms();
}

function renderCommDetail() {
  var cm = COMMUNITIES[appState.selectedComm];
  var cdAv = document.getElementById('cd-av');
  if (!cdAv) return;
  cdAv.textContent = cm.initials;
  cdAv.style.cssText = 'width:50px;height:50px;border-radius:14px;border:3px solid var(--bg);display:flex;align-items:center;justify-content:center;font-family:\'Syne\',sans-serif;font-size:14px;font-weight:700;color:#fff;position:absolute;bottom:-25px;left:16px;' + cm.style;
  document.getElementById('cd-name').textContent = cm.name;
  document.getElementById('cd-meta').textContent = cm.members + ' · ' + cm.desc;

  var jb = document.getElementById('join-btn');
  var joined = appState.joins[appState.selectedComm] !== undefined ? appState.joins[appState.selectedComm] : cm.joined;
  jb.textContent = joined ? 'Joined' : 'Join';
  jb.style.background = joined ? '#00D4AA' : '#6C63FF';
  jb.style.color = joined ? '#0D2B22' : '#fff';

  // Reset tabs UI
  document.querySelectorAll('.ctabs .ctab').forEach(function(t, idx) {
    t.classList.remove('on');
    var tabs = ['threads', 'events', 'members'];
    if (tabs[idx] === appState.commTab) t.classList.add('on');
  });

  renderCommContent();
}

function toggleJoin(el) {
  var cm = COMMUNITIES[appState.selectedComm];
  var cur = appState.joins[appState.selectedComm] !== undefined ? appState.joins[appState.selectedComm] : cm.joined;
  appState.joins[appState.selectedComm] = !cur;
  renderCommDetail();
}

function setCTab(el, tab) {
  appState.commTab = tab;
  document.querySelectorAll('.ctabs .ctab').forEach(function(t) { t.classList.remove('on'); });
  el.classList.add('on');
  renderCommContent();
}

function renderCommContent() {
  var c = document.getElementById('comm-content');
  if (!c) return;

  if (appState.commTab === 'threads') {
    c.innerHTML =
      '<div class="ann">' +
        '<div class="ann-icon"><svg viewBox="0 0 24 24"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.47"/></svg></div>' +
        '<div><div class="ann-t">Pinned announcement</div><div class="ann-b">HackSphere 2025 registrations open! Apply before June 15. Check the events tab for details.</div></div>' +
      '</div>' +
      renderThread('RS', 'background:linear-gradient(135deg,#667eea,#764ba2)', 'Riya Sharma', '2h ago',
        'Resources for system design prep?',
        'Looking for good books and YT channels ahead of placement season. Any recommendations?', 14, 42) +
      renderThread('KP', 'background:linear-gradient(135deg,#FFB347,#854F0B)', 'Kunal Patil', '5h ago',
        'Team formation for HackSphere',
        'Need a UI/UX person and ML engineer for HackSphere. DM me if interested!', 29, 88) +
      renderThread('MN', 'background:linear-gradient(135deg,#4facfe,#00f2fe)', 'Mihir Nair', '1d ago',
        'Open source contribution guide for beginners',
        'Wrote a step-by-step guide on how to make your first PR. Link in comments!', 41, 156);
  } else if (appState.commTab === 'events') {
    c.innerHTML =
      '<div class="evcard" style="margin-bottom:8px">' +
        '<div class="ev-db" style="background:rgba(108,99,255,.1)"><div class="ev-dday" style="color:#6C63FF">28</div><div class="ev-dmon" style="color:#A09BFF">Jun</div></div>' +
        '<div class="ev-i"><div class="ev-t">HackSphere 2025</div><div class="ev-d">IIT Kanpur · 48 hrs</div><div class="ev-pills"><span class="pill p-hack">Hackathon</span></div></div>' +
        '<button class="reg-big" style="background:#6C63FF" onclick="this.textContent=\'Registered ✓\';this.style.background=\'#00D4AA\';this.style.color=\'#0D2B22\'">Register</button>' +
      '</div>' +
      '<div class="evcard">' +
        '<div class="ev-db" style="background:rgba(0,212,170,.1)"><div class="ev-dday" style="color:#00D4AA">15</div><div class="ev-dmon" style="color:#00D4AA">Jun</div></div>' +
        '<div class="ev-i"><div class="ev-t">Weekly Dev Meetup</div><div class="ev-d">IITK LHC · Every Tuesday</div><div class="ev-pills"><span class="pill p-hack">Meetup</span></div></div>' +
        '<button class="reg-big" style="background:#00D4AA;color:#0D2B22">Attending</button>' +
      '</div>';
  } else {
    var members = [
      { i: 'RS', s: 'background:linear-gradient(135deg,#667eea,#764ba2)', n: 'Riya S.', r: 'Core Team' },
      { i: 'KP', s: 'background:linear-gradient(135deg,#FFB347,#854F0B)', n: 'Kunal P.', r: 'Member' },
      { i: 'MN', s: 'background:linear-gradient(135deg,#4facfe,#00f2fe)', n: 'Mihir N.', r: 'Member' },
      { i: 'AK', s: 'background:linear-gradient(135deg,#667eea,#764ba2)', n: 'Arjun K.', r: 'Core Team' },
      { i: 'PR', s: 'background:linear-gradient(135deg,#f093fb,#f5576c)', n: 'Prerna R.', r: 'Member' },
      { i: 'VM', s: 'background:linear-gradient(135deg,#00D4AA,#0F6E56)', n: 'Varun M.', r: 'Lead' }
    ];
    c.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
      members.map(function(m) {
        return '<div style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px;background:var(--card);border:1px solid var(--bdr);border-radius:10px;width:80px;cursor:pointer">' +
          '<div class="av" style="width:36px;height:36px;font-size:12px;' + m.s + '">' + m.i + '</div>' +
          '<div style="font-size:10px;font-weight:500;color:var(--txt);text-align:center">' + m.n + '</div>' +
          '<div style="font-size:9px;color:var(--mut)">' + m.r + '</div>' +
          '</div>';
      }).join('') + '</div>';
  }
}

function renderThread(initials, style, name, time, title, preview, replies, likes) {
  return '<div class="thread">' +
    '<div class="th-head">' +
      '<div class="ta" style="' + style + ';color:#fff">' + initials + '</div>' +
      '<div class="tn">' + name + '</div>' +
      '<div class="tt2">' + time + '</div>' +
    '</div>' +
    '<div class="ttitle">' + title + '</div>' +
    '<div class="tprev">' + preview + '</div>' +
    '<div class="tfoot">' +
      '<div class="tstat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' + replies + ' replies</div>' +
      '<div class="tstat"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' + likes + '</div>' +
    '</div>' +
  '</div>';
}
