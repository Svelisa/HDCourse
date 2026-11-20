/* ==========================================================================
   tiles.js – אריחי תחומי אחריות + חלון פירוט
   כל פרק (.chapter) מכיל רשימת אריחים (.tiles) וחלון (<dialog class="dlg">).
   לחיצה על אריח פותחת את הפירוט שלו (התוכן שב-<template> של האריח).
   ========================================================================== */
document.querySelectorAll(".chapter").forEach(function (chapter) {
  "use strict";

  var list = chapter.querySelector(".tiles");
  var dialog = chapter.querySelector(".dlg:not(.dlg-role)");
  if (!list || !dialog) return;

  var tiles = [].slice.call(list.querySelectorAll(".tile"));
  var body = dialog.querySelector(".dlg-body");
  var prevBtn = dialog.querySelector(".prevd");
  var nextBtn = dialog.querySelector(".nextd");
  var counter = chapter.querySelector(".seen-count");
  tiles.forEach(function (t) { t.dataset.title = t.querySelector(".t").textContent.trim(); });
  var current = 0;

  // אזור הכרזה לקוראי מסך: משמיע איזה תחום מוצג בעת מעבר קודם/הבא
  var live = document.createElement("div");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  dialog.querySelector(".dlg-in").appendChild(live);
  var seen = {};

  // הצגת האריח במקום i בחלון
  function show(i) {
    var tile = tiles[i];
    current = i;

    dialog.querySelector(".dlg-ic").innerHTML = tile.querySelector(".ic").innerHTML;
    dialog.querySelector("h3").textContent = tile.dataset.title;
    body.innerHTML = tile.parentNode.querySelector("template").innerHTML;
    body.scrollTop = 0;
    dialog.querySelector(".pos").textContent = (i + 1) + " / " + tiles.length;

    // אם הכפתור שהיה בפוקוס הפך ללא פעיל, מעבירים את הפוקוס לכפתור השני
    var hadFocus = document.activeElement;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === tiles.length - 1;
    if (hadFocus === prevBtn && prevBtn.disabled) nextBtn.focus();
    if (hadFocus === nextBtn && nextBtn.disabled) prevBtn.focus();

    // הכרזה לקוראי מסך
    live.textContent = tile.dataset.title + ", תחום " + (i + 1) + " מתוך " + tiles.length;

    // סימון האריח כנקרא (גם לקוראי מסך) ועדכון המונה
    seen[i] = true;
    tile.classList.add("seen");
    if (!tile.querySelector(".sr-only")) {
      var note = document.createElement("span");
      note.className = "sr-only";
      note.textContent = " (נקרא)";
      tile.querySelector(".t").appendChild(note);
    }
    if (counter) counter.textContent = Object.keys(seen).length;
  }

  tiles.forEach(function (tile, i) {
    tile.addEventListener("click", function () {
      show(i);
      if (!dialog.open) dialog.showModal();
    });
  });

  prevBtn.addEventListener("click", function () {
    if (current > 0) show(current - 1);
  });

  nextBtn.addEventListener("click", function () {
    if (current < tiles.length - 1) show(current + 1);
  });

  dialog.querySelector(".x").addEventListener("click", function () {
    dialog.close();
  });

  // לחיצה על הרקע האפור סוגרת את החלון
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
});

/* חלון הסבר על תפקיד: נפתח מהאוואטאר שבראש הכרטיס */
document.querySelectorAll("[data-role-dialog]").forEach(function (btn) {
  var dialog = document.getElementById(btn.dataset.roleDialog);
  if (!dialog) return;
  btn.addEventListener("click", function () { dialog.showModal(); });
  dialog.querySelector(".x").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
});
