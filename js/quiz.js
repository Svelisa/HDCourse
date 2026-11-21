/* תרגול רב-ברירה: בדיקה מיידית, משוב לכל שאלה, וסימון הפרק כהושלם בסיום */
(function () {
  document.querySelectorAll('.qz').forEach(function (root) {
    var key = root.getAttribute('data-lesson');
    var qs = Array.prototype.slice.call(root.querySelectorAll('.qz-q'));
    var res = root.querySelector('.qz-result');
    var btn = root.querySelector('.qz-check');
    var again = root.querySelector('.qz-again');
    function check() {
      var ok = 0, empty = 0;
      qs.forEach(function (q) {
        var sel = q.querySelector('input:checked');
        var fb = q.querySelector('.qz-fb');
        q.classList.remove('good', 'bad');
        if (!sel) { empty++; fb.textContent = 'בחרו תשובה.'; return; }
        var right = sel.hasAttribute('data-ok');
        if (right) ok++;
        q.classList.add(right ? 'good' : 'bad');
        fb.textContent = (right ? '✓ נכון. ' : '✗ לא מדויק. ') + q.getAttribute('data-why');
      });
      if (empty) { res.textContent = 'ענו על כל השאלות ולחצו שוב על "בדיקה".'; return; }
      res.textContent = 'ענית נכון על ' + ok + ' מתוך ' + qs.length + (ok === qs.length ? ' – כל הכבוד!' : '. אפשר לתקן ולבדוק שוב.');
      if (ok === qs.length && key && window.courseProgress) { var need = +root.getAttribute('data-parts') || 1; if (need > 1) window.courseProgress.part(key, 'qz', need); else window.courseProgress.complete(key); }
    }
    btn.addEventListener('click', check);
    again.addEventListener('click', function () {
      qs.forEach(function (q) {
        q.classList.remove('good', 'bad');
        q.querySelector('.qz-fb').textContent = '';
        var s = q.querySelector('input:checked'); if (s) s.checked = false;
      });
      res.textContent = '';
    });
  });
})();
