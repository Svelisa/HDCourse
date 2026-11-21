/* dragdrop.js – תרגיל מיון בגרירה (עם חלופה למקלדת ולנגיעה: בחירה ואז "הוסף לכאן").
   סימון הפרק כהושלם אוטומטית כשכל הפריטים שובצו נכון. */
(function () {
  var root = document.querySelector(".dd");
  if (!root) return;
  var key = root.dataset.lesson;
  var pool = root.querySelector(".dd-pool");
  var bins = Array.prototype.slice.call(root.querySelectorAll(".dd-bin"));
  var items = Array.prototype.slice.call(root.querySelectorAll(".dd-item"));
  var status = root.querySelector(".dd-result");
  var selected = null;

  function listOf(bin) { return bin.querySelector(".dd-list"); }
  function say(t) { status.textContent = t; }

  function select(item) {
    if (selected) selected.setAttribute("aria-pressed", "false");
    selected = (item && selected !== item) ? item : null;
    if (selected) selected.setAttribute("aria-pressed", "true");
    bins.forEach(function (b) { b.querySelector(".dd-place").disabled = !selected; });
  }

  function place(item, target) {   // target: .dd-bin או null (חזרה למאגר)
    item.classList.remove("ok", "bad");
    clearMark(item);
    (target ? listOf(target) : pool).appendChild(item);
    if (selected === item) select(null);
    say(target ? "“" + label(item) + "” הוצב בתא " + target.dataset.name : "“" + label(item) + "” הוחזר למאגר");
  }

  function label(item) { return item.dataset.label || item.firstChild.textContent; }
  function clearMark(item) { var m = item.querySelector(".mk"); if (m) m.remove(); }
  function mark(item, ok) {
    clearMark(item);
    var m = document.createElement("span");
    m.className = "mk";
    m.textContent = ok ? " ✓" : " ✗";
    var s = document.createElement("span");
    s.className = "sr-only";
    s.textContent = ok ? " (נכון)" : " (שגוי)";
    item.appendChild(m); item.appendChild(s);
  }

  bins.forEach(function (bin) {
    bin.querySelector(".dd-place").addEventListener("click", function () {
      if (selected) place(selected, bin);
    });
  });

  // גרירה בעזרת Pointer Events (עכבר, מגע, עט)
  items.forEach(function (item) {
    var start = null, dragging = false;
    item.addEventListener("pointerdown", function (e) {
      if (item.classList.contains("ok")) return;
      start = { x: e.clientX, y: e.clientY, w: item.offsetWidth };
      dragging = false;
      item.setPointerCapture(e.pointerId);
    });
    item.addEventListener("pointermove", function (e) {
      if (!start) return;
      if (!dragging && Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) > 8) {
        dragging = true;
        item.classList.add("dragging");
        item.style.width = start.w + "px";
      }
      if (dragging) {
        item.style.left = (e.clientX - start.w / 2) + "px";
        item.style.top = (e.clientY - 20) + "px";
        var over = binAt(e.clientX, e.clientY);
        bins.forEach(function (b) { b.classList.toggle("over", b === over); });
      }
    });
    function end(e) {
      if (!start) return;
      var was = dragging; start = null; dragging = false;
      if (was) {
        var target = binAt(e.clientX, e.clientY);
        item.classList.remove("dragging");
        item.style.cssText = "";
        bins.forEach(function (b) { b.classList.remove("over"); });
        if (target) place(item, target);
        else if (e.type === "pointerup" && poolAt(e.clientX, e.clientY)) place(item, null);
        item.focus();
        item.dataset.dragged = "1";
      }
    }
    item.addEventListener("pointerup", end);
    item.addEventListener("pointercancel", end);
    item.addEventListener("click", function () {
      if (item.dataset.dragged) { delete item.dataset.dragged; return; }
      if (item.classList.contains("ok")) return;
      select(item);
    });
  });

  function binAt(x, y) {
    for (var i = 0; i < bins.length; i++) {
      var r = bins[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return bins[i];
    }
    return null;
  }
  function poolAt(x, y) {
    var r = pool.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  // כפתור החזרה למאגר לפריט שנבחר
  root.querySelector(".dd-back").addEventListener("click", function () {
    if (selected) place(selected, null); else say("בחרו קודם פריט.");
  });

  root.querySelector(".dd-check").addEventListener("click", function () {
    if (pool.children.length) { say("עוד " + pool.querySelectorAll(".dd-item").length + " פריטים ממתינים לשיבוץ. שבצו את כולם ואז בדקו."); return; }
    var wrong = 0;
    bins.forEach(function (bin) {
      Array.prototype.forEach.call(listOf(bin).children, function (item) {
        var ok = item.dataset.answer === bin.dataset.id;
        item.classList.toggle("ok", ok);
        item.classList.toggle("bad", !ok);
        mark(item, ok);
        if (!ok) wrong++;
      });
    });
    if (!wrong) {
      say("כל הכבוד! כל הפריטים שובצו נכון.");
      if (window.courseProgress) { var need = +root.dataset.parts || 1; if (need > 1) window.courseProgress.part(key, "dd", need); else window.courseProgress.complete(key); }
    } else {
      say("יש " + wrong + " שיבוצים שגויים (מסומנים ב-✗). העבירו אותם לתא אחר ובדקו שוב.");
    }
  });

  root.querySelector(".dd-reset").addEventListener("click", function () {
    items.forEach(function (it) { it.classList.remove("ok", "bad"); clearMark(it); pool.appendChild(it); });
    select(null); say("התרגיל אופס.");
  });
})();
