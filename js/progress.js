/* ==========================================================================
   progress.js – התקדמות הלומד
   שומר בדפדפן (localStorage) מה הושלם:
   - פרקים (state.lessons, מפתח "יחידה-פרק", למשל "1-2") ביחידות המודולריות
   - יחידות שלמות (state.done) – יחידה מודולרית נחשבת הושלמה כשכל פרקיה הושלמו
   מעדכן את פס ההתקדמות, את סימוני ה-✓ בתפריט הצד ואת הכפתור "סימון כהושלם".
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "helpdesk-course-v1";
  var state = { done: {}, lessons: {}, seen: {} };

  // טעינה מהדפדפן
  try {
    var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (saved.done) state.done = saved.done;
    if (saved.lessons) state.lessons = saved.lessons;
    if (saved.seen) state.seen = saved.seen;
  } catch (e) { /* localStorage חסום – ממשיכים בלי שמירה */ }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  var progress = document.querySelector(".prog");
  var label = document.getElementById("pt");
  var fill = document.getElementById("pb");
  var markBtn = document.querySelector(".mark");
  var moduleNo = progress && progress.dataset.module;   // יחידה מודולרית (פרקים)

  // מוסיף/מסיר "(הושלם)" לקוראי מסך על קישור פרק
  function flag(link, isDone) {
    link.classList.toggle("done", isDone);
    var note = link.querySelector(".sr-only");
    if (isDone && !note) {
      note = document.createElement("span");
      note.className = "sr-only";
      note.textContent = " (הושלם)";
      link.appendChild(note);
    } else if (!isDone && note) {
      note.remove();
    }
  }

  function paintBar(count, total, noun) {
    if (label) label.textContent = "הושלמו " + count + " מתוך " + total + (noun ? " " + noun : "");
    if (fill && total) fill.style.width = (count / total * 100) + "%";
    var bar = fill && fill.parentNode;
    if (bar) bar.setAttribute("aria-valuenow", count);
  }

  function paint() {
    if (moduleNo) {
      // יחידה מודולרית: ספירת פרקים
      var total = Number(progress.dataset.lessons);
      var count = 0;
      document.querySelectorAll("a[data-lesson]").forEach(function (link) {
        var isDone = !!state.lessons[link.dataset.lesson];
        flag(link, isDone);
        if (link.closest(".side-menu") && isDone) count++;
      });
      paintBar(count, total, "פרקים");
      state.done[Number(moduleNo) - 1] = count === total;

      if (markBtn) {
        var on = !!state.lessons[markBtn.dataset.lesson];
        // התווית קבועה; המצב מוכרז דרך aria-pressed והסימון ✓ מגיע מה-CSS
        markBtn.setAttribute("aria-pressed", on ? "true" : "false");
      }
      return;
    }

    // יחידות רגילות (עמוד אחד): ספירת יחידות שהושלמו
    var units = 0;
    for (var key in state.done) {
      if (state.done[key]) units++;
    }
    var all = progress ? Number(progress.dataset.total) : 0;
    paintBar(units, all, "");

    if (markBtn) {
      var isDone = !!state.done[markBtn.dataset.done];
      markBtn.setAttribute("aria-pressed", isDone ? "true" : "false");
    }
  }

  if (markBtn) {
    markBtn.addEventListener("click", function () {
      if (moduleNo) {
        var k = markBtn.dataset.lesson;
        state.lessons[k] = !state.lessons[k];
      } else {
        var unit = markBtn.dataset.done;
        state.done[unit] = !state.done[unit];
      }
      paint();
      save();
    });
  }

  paint();

  /* ממשק לסקריפטים אחרים (למשל tiles.js) – מעקב אוטומטי:
     - getSeen/setSeen: אילו פריטים בפרק כבר נצפו (נשמר בדפדפן)
     - complete: סימון פרק כהושלם אוטומטית, למשל אחרי שצפו בכל התכנים שבו */
  window.courseProgress = {
    getSeen: function (key) { return state.seen[key] || []; },
    setSeen: function (key, list) { state.seen[key] = list; save(); },
    part: function (key, id, need) {
      var p = (window.__parts = window.__parts || {});
      p[key] = p[key] || {}; p[key][id] = true;
      if (Object.keys(p[key]).length >= need) this.complete(key);
    },
    complete: function (key) {
      if (state.lessons[key]) return;
      state.lessons[key] = true;
      paint();
      save();
    }
  };
})();
