/* ==========================================================================
   toc.js – תפריט הצד של העמוד
   בונה את התפריט מכותרות הפרקים שבעמוד: כל <h2> בתוך כרטיס (.card)
   וכותרת <h2 class="sec">. כשמוסיפים פרק חדש הוא מופיע בתפריט לבד.
   הפרק שבו נמצאים מסומן תוך כדי גלילה.
   ========================================================================== */
(function () {
  "use strict";

  var menu = document.querySelector(".menu-list");
  var headings = [].slice.call(document.querySelectorAll("main .card > h2, main > h2.sec"));
  if (!menu || !headings.length) return;

  // האלמנט שאליו גוללים: הכרטיס של הכותרת (או הכותרת עצמה)
  var targets = headings.map(function (h) {
    return h.parentNode.tagName === "MAIN" ? h : h.parentNode;
  });
  var links = [];

  headings.forEach(function (heading, i) {
    var target = targets[i];
    if (!target.id) target.id = "ch-" + (i + 1);

    var link = document.createElement("a");
    link.href = "#" + target.id;
    link.textContent = heading.textContent;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      target.scrollIntoView();
      // מעבירים גם את הפוקוס לפרק, כדי שמשתמשי מקלדת וקורא מסך ימשיכו משם
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });

    menu.appendChild(link);
    links.push(link);
  });

  // סימון הפרק הפעיל בזמן גלילה
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var active = targets.indexOf(entry.target);
        links.forEach(function (link, k) {
          if (k === active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -70% 0px" });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }
})();
