// =============================================
// CampusSphere — Events Component
// =============================================

function renderEvents() {
  var filtered = EVENTS.filter(function(ev) {
    return appState.eventCat === 'all' || ev.cat === appState.eventCat;
  });
  filtered.sort(function(a, b) { return a.dateDay - b.dateDay; });

  var c = document.getElementById('ev-right');
  if (!c) return;

  if (!filtered.length) {
    c.innerHTML = '<div style="color:var(--mut);font-size:13px;padding:20px">No events found for this category.</div>';
    return;
  }

  c.innerHTML = '<div class="rl" style="margin-bottom:14px">' + filtered.length + ' events found</div>' +
    filtered.map(function(ev) {
      var regKey = 'ev' + ev.id;
      var registered = appState.registrations[regKey];
      var btnStyle = registered ? 'background:#00D4AA;color:#0D2B22' : ev.btnStyle;
      var btnLabel = registered ? 'Registered ✓' : 'Register';
      return '<div class="evcard">' +
        '<div class="ev-db" style="background:rgba(108,99,255,.1)">' +
          '<div class="ev-dday" style="color:#6C63FF">' + ev.day + '</div>' +
          '<div class="ev-dmon" style="color:#A09BFF">' + ev.mon + '</div>' +
        '</div>' +
        '<div class="ev-i">' +
          '<div class="ev-t">' + ev.title + '</div>' +
          '<div class="ev-d">' + ev.detail + '</div>' +
          '<div class="ev-pills"><span class="pill" style="' + ev.tagStyle + '">' + ev.tag + '</span></div>' +
        '</div>' +
        '<button class="reg-big" style="' + btnStyle + '" onclick="regEvent(this,\'' + regKey + '\')">' + btnLabel + '</button>' +
      '</div>';
    }).join('');
}

function regEvent(el, key) {
  appState.registrations[key] = true;
  renderEvents();
}

function filterDay(d) {
  appState.selectedDay = d;
  document.querySelectorAll('.cd').forEach(function(el) { el.classList.remove('sel'); });
  var target = document.getElementById('cd' + d);
  if (target) target.classList.add('sel');
}

function filterCat(el, cat) {
  appState.eventCat = cat;
  document.querySelectorAll('.ev-left .ctab').forEach(function(t) { t.classList.remove('on'); });
  el.classList.add('on');
  renderEvents();
}
