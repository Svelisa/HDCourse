/* hotspots.js – נקודות חמות על תמונה. לחיצה פותחת פופאפ עם הפירוט; צפייה בכל הרכיבים מסמנת את הפרק כהושלם. */
(function () {
  var root = document.querySelector(".hs");
  if (!root) return;
  var key = root.dataset.lesson;
  var pts = [].slice.call(root.querySelectorAll(".hs-pt"));
  var dlg = root.querySelector(".dlg");
  var title = dlg.querySelector("h3");
  var body = dlg.querySelector(".dlg-body");
  var icons = [].slice.call(dlg.querySelectorAll(".dlg-ic"));
  var ids = [];
  pts.forEach(function (p) { if (ids.indexOf(p.dataset.id) < 0) ids.push(p.dataset.id); });
  var seen = {}, opener = null;

  function markSeen(id) {
    seen[id] = true;
    pts.forEach(function (p) {
      if (p.dataset.id !== id) return;
      p.classList.add("seen");
      if (!p.querySelector(".sr-only")) {
        var s = document.createElement("span"); s.className = "sr-only"; s.textContent = " (נצפה)"; p.appendChild(s);
      }
    });
  }
  function show(id, btn) {
    var t = document.getElementById("hs-" + id);
    title.innerHTML = t.dataset.title;
    body.innerHTML = "";
    body.appendChild(t.content.cloneNode(true));
    icons.forEach(function (i) { i.hidden = i.dataset.for !== id; });
    opener = btn;
    dlg.showModal();
    markSeen(id);
    if (ids.every(function (i) { return seen[i]; }) && window.courseProgress) window.courseProgress.complete(key);
  }
  pts.forEach(function (p) { p.addEventListener("click", function () { show(p.dataset.id, p); }); });
  dlg.querySelector(".x").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () { if (opener) opener.focus(); });
})();
