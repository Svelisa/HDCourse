/* אייקונים פנימיים (SVG) - אין תלות באינטרנט או בספריה חיצונית.
   בכל מקום שבו כתוב <i class="bi bi-שם"></i> הסקריפט מחליף את התגית באייקון בשם הזה.
   להוספת אייקון חדש: מוסיפים שורה לרשימה למטה (שם + תוכן SVG בקנבס 24x24). */
(function () {
  var I = {
    "scroll": '<path d="M7 4h11a2 2 0 0 1 2 2v1.5h-3"/><path d="M7 4a2 2 0 0 0-2 2v11"/><path d="M17 7.5V18a2 2 0 0 0 2 2H8a3 3 0 0 1-3-3v-1h9v1.5"/><path d="M10 9h4M10 12.5h4"/>',
    "file-search": '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><path d="M14 3l5 5v3"/><path d="M14 3v5h5"/><path d="M8.5 12h4M8.5 15.5h2"/><circle cx="16.5" cy="17" r="2.5"/><path d="M18.4 19l2 2"/>',
    "power-off": '<path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>',
    "list-ul": '<circle cx="4.5" cy="6.5" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="17.5" r="1.2"/><path d="M9 6.5h11M9 12h11M9 17.5h11"/>',
    "list-check": '<path d="M3.5 6.5l1.8 1.8L8.5 5"/><rect x="3.5" y="11" width="4.5" height="4.5" rx="1"/><rect x="3.5" y="17" width="4.5" height="4.5" rx="1"/><path d="M11 7h9M11 13h9M11 19h9"/>',
    "info-circle": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5h.01"/>',
    "gear": '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
    "ping-route": '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h7a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h7"/>',
    "geo-route": '<path d="M7 3a3.5 3.5 0 0 1 3.5 3.5C10.5 9.5 7 13 7 13S3.5 9.5 3.5 6.5A3.5 3.5 0 0 1 7 3z"/><circle cx="7" cy="6.5" r="1.1"/><path d="M7 17h8a2.5 2.5 0 0 0 0-5"/><path d="M3 21h8"/><path d="M17 21V12M17 12h4.5l-1.5 2.2 1.5 2.3H17"/>',
    "search": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
    "person-headset": '<circle cx="12" cy="11" r="3.5"/><path d="M5 21c.6-4 3.2-6 7-6s6.4 2 7 6"/><path d="M7 11a5 5 0 0 1 10 0"/><rect x="5" y="10" width="2.2" height="4.2" rx="1.1"/><rect x="16.8" y="10" width="2.2" height="4.2" rx="1.1"/><path d="M18 14.2c0 1.4-1.6 2-4 2"/>',
    "person-hardhat": '<circle cx="12" cy="12.8" r="3"/><path d="M5 21c.6-4 3.2-6 7-6s6.4 2 7 6"/><path d="M7.5 9.8a4.5 4.5 0 0 1 9 0z"/><path d="M6 9.8h12"/>',
    "image": '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
    "person-badge": '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M7.5 17c.8-2 2.4-3 4.5-3s3.7 1 4.5 3"/>',
    "pc-display": '<rect x="2.5" y="5" width="13" height="10" rx="1.5"/><path d="M6 19h6M9 15v4"/><rect x="17.5" y="5" width="4" height="14" rx="1"/><path d="M19.5 16h.01"/>',
    "keyboard": '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    "projector": '<rect x="2.5" y="8" width="19" height="9" rx="2"/><circle cx="15.5" cy="12.5" r="2.5"/><path d="M6 17v2M18 17v2M6 12h4"/>',
    "gamepad": '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4M16 11h.01M18 14h.01"/>',
    "touchscreen": '<rect x="3" y="3.5" width="18" height="12" rx="2"/><path d="M10 21v-7.5a1.5 1.5 0 013 0V18l3 .5V21"/>',
    "scanner": '<path d="M3 14l3-7h12l3 7"/><rect x="3" y="14" width="18" height="5" rx="1.5"/><path d="M17 16.5h.01"/>',
    "speaker": '<rect x="6" y="2.5" width="12" height="19" rx="2"/><circle cx="12" cy="15" r="3"/><circle cx="12" cy="7.5" r="1"/>',
    "power": '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    "hdd": '<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M5 13l2.5-8h9L19 13M17 16.5h.01"/>',
    "fan": '<circle cx="12" cy="12" r="2"/><path d="M12 10c-2-6 3-8 4-5M14 12c6-2 8 3 5 4M12 14c2 6-3 8-4 5M10 12c-6 2-8-3-5-4"/>',
    "ram": '<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6 16v3M10 16v3M14 16v3M18 16v3M6 11.5h2M11 11.5h2M16 11.5h2"/>',
    "card": '<rect x="3" y="5" width="18" height="11" rx="1.5"/><circle cx="9" cy="10.5" r="2.5"/><path d="M14 9h4M14 12h4M6 16v3M18 16v3"/>',
    "plug": '<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 01-12 0zM12 17v5"/>',
    "rom": '<rect x="5" y="7" width="14" height="10" rx="1.5"/><path d="M8 7V4M12 7V4M16 7V4M8 20v-3M12 20v-3M16 20v-3"/>',
    "battery": '<rect x="2.5" y="8" width="17" height="8" rx="1.5"/><path d="M22 11v2M6 11v2M10 11v2"/>',
    "cloud-down": '<path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5a4.2 4.2 0 0 1 0 8.5"/><path d="M12 11v8M9 16l3 3 3-3"/>',
    "tray-down": '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4 16v4h16v-4"/>',
    "deploy": '<rect x="2.5" y="5" width="14" height="10" rx="1.5"/><path d="M6.5 19h6M9.5 15v4"/><circle cx="18" cy="6.5" r="3.5"/><path d="M14.5 6.5h7M18 3v7"/>',
    "usb": '<rect x="8" y="2.5" width="8" height="5" rx="1"/><path d="M10.5 4.5v1M13.5 4.5v1"/><rect x="7" y="7.5" width="10" height="13" rx="2"/>',
    "display": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    "windows": '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1"/><rect x="13" y="13" width="7.5" height="7.5" rx="1"/>',
    "window": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/>',
    "printer": '<path d="M7 9V4h10v5"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><rect x="7" y="14" width="10" height="6" rx="1"/>',
    "router": '<rect x="3" y="13" width="18" height="6" rx="2"/><path d="M7 16h.01M11 16h.01M8 13L6 8M16 13l2-5"/>',
    "diagram-3": '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2.5" y="16" width="6" height="5" rx="1"/><rect x="15.5" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5.5 16v-4h13v4"/>',
    "folder2-open": '<path d="M3 18V6a1 1 0 0 1 1-1h5l2 2h7a1 1 0 0 1 1 1v2"/><path d="M3 18l2.6-7.2a1 1 0 0 1 .94-.8H21a.5.5 0 0 1 .47.67L19 18.2a1 1 0 0 1-.94.8H4"/>',
    "file-earmark-word": '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 12l1.3 5 1.7-4.5 1.7 4.5 1.3-5"/>',
    "exclamation-triangle": '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v5M12 17.5h.01"/>',
    "wrench": '<path d="M20.5 7.5a5 5 0 0 1-6.7 5.6L6 21a2 2 0 0 1-3-3l7.9-7.8A5 5 0 0 1 16.5 3.5l-3 3 .5 3 3 .5z"/>',
    "cpu": '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    "wifi": '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.6 16a5 5 0 0 1 6.8 0"/><path d="M12 19.5h.01"/>',
    "person-gear": '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.5-3.8 3-6 6.5-6 1 0 1.9.2 2.7.5"/><circle cx="18" cy="17" r="2"/><path d="M18 13v1.2M18 19.8V21M14.5 17h1.2M20.3 17h1.2M15.5 14.5l.9.9M19.6 18.6l.9.9M20.5 14.5l-.9.9M16.4 18.6l-.9.9"/>',
    "shield-check": '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    "file-earmark-text": '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h7"/>',
    "headset": '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.7-2 2.5-5 2.5"/>',
    "book": '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/>',
    "chat-dots": '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
    "database": '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    "box-seam": '<path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9M7.8 5.3l8.5 4.6"/>'
  };
  document.querySelectorAll("i.bi").forEach(function (el) {
    var name = "";
    el.classList.forEach(function (c) { if (c.indexOf("bi-") === 0) name = c.slice(3); });
    var body = I[name] || I.image;
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("class", "icon");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.8");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.innerHTML = body;
    el.replaceWith(s);
  });
})();
