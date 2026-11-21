/* tabs.js – לשוניות נגישות (חצים, Home/End). צפייה בכל הלשוניות מסמנת את הפרק כהושלם. */
(function () {
  var root = document.querySelector(".tabs");
  if (!root) return;
  var key = root.dataset.lesson;
  var tabs = [].slice.call(root.querySelectorAll('[role="tab"]'));
  var seen = {};

  function select(i, focus) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    seen[i] = true;
    tabs[i].classList.add("seen");
    if (!tabs[i].querySelector(".sr-only")) {
      var s = document.createElement("span"); s.className = "sr-only"; s.textContent = " (נצפה)"; tabs[i].appendChild(s);
    }
    if (focus) tabs[i].focus();
    if (tabs.every(function (_, k) { return seen[k]; }) && window.courseProgress) window.courseProgress.complete(key);
  }
  seen[0] = true; tabs[0].classList.add("seen");
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(i); });
    t.addEventListener("keydown", function (e) {
      var n = tabs.length, to = null, rtl = getComputedStyle(root).direction === "rtl";
      if (e.key === "ArrowRight") to = (i + (rtl ? -1 : 1) + n) % n;
      else if (e.key === "ArrowLeft") to = (i + (rtl ? 1 : -1) + n) % n;
      else if (e.key === "Home") to = 0;
      else if (e.key === "End") to = n - 1;
      if (to !== null) { e.preventDefault(); select(to, true); }
    });
  });
})();
