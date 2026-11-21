/* סרטון אינטראקטיבי: נגן YouTube שנעצר בזמנים שהוגדרו, מציג שאלה ומשוב, וממשיך רק אחרי תשובה נכונה.
   ההגדרות (מזהה סרטון, זמנים ושאלות) נמצאות ב-<script type="application/json" class="iv-data"> בדף. */
(function () {
  var root = document.querySelector('.iv');
  if (!root) return;
  var cfg = JSON.parse(root.querySelector('.iv-data').textContent);
  var items = cfg.items.slice().sort(function (a, b) { return a.t - b.t; });
  var done = items.map(function () { return false; });
  var panel = root.querySelector('.iv-panel');
  var steps = root.querySelector('.iv-steps');
  var status = root.querySelector('.iv-status');
  var player = null, timer = null, active = -1, finished = false;

  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }

  function drawSteps() {
    steps.innerHTML = '';
    items.forEach(function (it, i) {
      var li = document.createElement('li');
      li.className = done[i] ? 'done' : (i === active ? 'now' : '');
      li.textContent = (done[i] ? '✓ ' : '') + 'שאלה ' + (i + 1) + ' · ' + fmt(it.t);
      steps.appendChild(li);
    });
    var n = done.filter(Boolean).length;
    status.textContent = 'נענו ' + n + ' מתוך ' + items.length + ' שאלות';
  }

  function complete() {
    if (finished) return;
    finished = true;
    if (window.courseProgress && root.getAttribute('data-lesson')) window.courseProgress.complete(root.getAttribute('data-lesson'));
  }

  function hidePanel() { panel.hidden = true; panel.innerHTML = ''; active = -1; drawSteps(); }

  function show(i) {
    active = i; var it = items[i];
    var h = '<fieldset class="iv-q"><legend>' + it.q + '</legend>';
    it.opts.forEach(function (o, k) {
      h += '<label><input type="radio" name="ivq" value="' + k + '"> <span>' + o + '</span></label>';
    });
    h += '</fieldset><p class="iv-fb" role="status" aria-live="polite"></p><div class="iv-actions"><button type="button" class="btn iv-check">בדיקה</button><button type="button" class="btn iv-go" hidden>המשך בצפייה</button></div>';
    panel.innerHTML = h; panel.hidden = false; drawSteps();
    var first = panel.querySelector('input'); if (first) first.focus({ preventScroll: true });
    panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    var fb = panel.querySelector('.iv-fb'), chk = panel.querySelector('.iv-check'), go = panel.querySelector('.iv-go');
    chk.addEventListener('click', function () {
      var s = panel.querySelector('input:checked');
      if (!s) { fb.textContent = 'בחרו תשובה.'; return; }
      if (+s.value === it.ok) {
        fb.textContent = '✓ נכון. ' + it.why; done[i] = true;
        panel.querySelectorAll('input').forEach(function (x) { x.disabled = true; });
        chk.hidden = true; go.hidden = false; go.focus(); drawSteps();
        if (done.every(Boolean)) complete();
      } else {
        fb.textContent = '✗ לא מדויק. נסו שוב.';
      }
    });
    go.addEventListener('click', function () { hidePanel(); if (player) player.playVideo(); });
  }

  function tick() {
    if (!player || active !== -1 || !player.getCurrentTime) return;
    var t = player.getCurrentTime();
    for (var i = 0; i < items.length; i++) {
      if (!done[i] && t >= items[i].t) {
        player.pauseVideo();
        if (t > items[i].t + 2) player.seekTo(items[i].t, true);
        show(i); return;
      }
    }
  }

  function init() {
    player = new YT.Player(root.querySelector('.iv-player'), {
      videoId: cfg.videoId, host: 'https://www.youtube-nocookie.com',
      playerVars: { rel: 0, fs: 0, modestbranding: 1, hl: 'he', playsinline: 1 },
      events: {
        onReady: function () { root.classList.add('ready'); timer = setInterval(tick, 300); },
        onStateChange: function (e) {
          if (e.data === 0) { tick(); if (done.every(Boolean)) complete(); }
        }
      }
    });
  }

  drawSteps();
  if (window.YT && YT.Player) init();
  else {
    window.onYouTubeIframeAPIReady = init;
    var s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  }
})();
