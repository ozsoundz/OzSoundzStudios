/* ==========================================================================
   OZ SOUNDZ STUDIOS — shared site script
   Builds header/footer, icons, and all interactive widgets.
   ========================================================================== */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  var D = window.OZS || {};
  var S = D.site || {};
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var NAVKEY = body.getAttribute('data-nav') || '';
  var HERE = (location.pathname.split('/').pop() || 'index.html');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function url(p) { return /^(https?:|mailto:|#)/.test(p) ? p : ROOT + p; }

  /* ---------------- ICONS ---------------- */
  var P = {
    mic: '<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8 21.5h8"/>',
    sliders: '<path d="M6 3v18M12 3v18M18 3v18"/><rect x="4" y="13" width="4" height="3.5"/><rect x="10" y="6" width="4" height="3.5"/><rect x="16" y="10" width="4" height="3.5"/>',
    speaker: '<rect x="5" y="2" width="14" height="20" rx="1"/><circle cx="12" cy="15" r="4"/><circle cx="12" cy="15" r="1"/><circle cx="12" cy="6.5" r="1.6"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7"/><rect x="17" y="14" width="4" height="7"/>',
    wave: '<path d="M2 12h2.5l2-6 3 12 3-9 2 6 1.5-3H22"/>',
    doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 12h8M9 16h8M9 20h5"/>',
    camera: '<rect x="3" y="7" width="18" height="13"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13.5" r="3.5"/>',
    film: '<rect x="3" y="4" width="18" height="16"/><path d="M3 8h18M3 16h18M7.5 4v4M12 4v4M16.5 4v4M7.5 16v4M12 16v4M16.5 16v4"/><path d="M10.5 10.2l3.5 1.8-3.5 1.8z"/>',
    question: '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6v.8M12 17.2v.3"/>',
    pin: '<path d="M12 22s7-6.6 7-12a7 7 0 0 0-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14"/><path d="M3 6.5l9 6.5 9-6.5"/>',
    plan: '<rect x="5" y="4" width="14" height="18"/><path d="M9 2h6v4H9zM8.5 11h7M8.5 15h7M8.5 19h4"/>',
    ruler: '<path d="M2.5 16.5L16.5 2.5l5 5-14 14z"/><path d="M6.5 12.5l2 2M9.5 9.5l2 2M12.5 6.5l2 2"/>',
    hammer: '<path d="M13 3.5l7.5 7.5-3 3L10 6.5z"/><path d="M11.8 8.3L3 17l3.5 3.5 8.7-8.8"/>',
    flask: '<path d="M9 2.5h6M10 2.5v6L4 20.5h16L14 8.5v-6"/><path d="M7 15h10"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20.5c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c3 0 5.5 1.8 5.5 5.5"/>',
    heart: '<path d="M12 21s-8.5-5.2-8.5-11.2A4.6 4.6 0 0 1 12 7.1a4.6 4.6 0 0 1 8.5 2.7C20.5 15.8 12 21 12 21z"/>',
    sprout: '<path d="M12 22V11"/><path d="M12 12C12 7 8.5 4 3 4c0 5 3.5 8 9 8zM12 14.5c0-4.2 3-7.5 9-7.5 0 4.2-3 7.5-9 7.5z"/>',
    tag: '<path d="M21 12.5l-8.5 8.5L3 11.5V3h8.5z"/><circle cx="7.5" cy="7.5" r="1.6"/>',
    flag: '<path d="M5 22V3M5 4h13l-2.5 4L18 12H5"/>',
    guitar: '<path d="M18.5 2.5l3 3-1.8 1.2-5 5"/><path d="M14.5 9.5a3 3 0 0 0-4-.8c-1 .6-1.1 1.9-2.2 2.4C6.8 11.8 3 11.8 3 15.4 3 19 5 21 8.6 21c3.6 0 3.6-3.8 4.3-5.3.5-1.1 1.8-1.2 2.4-2.2a3 3 0 0 0-.8-4z"/><circle cx="9" cy="15" r="1.6"/>',
    disc: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 5a7 7 0 0 1 7 7"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    broadcast: '<circle cx="12" cy="12" r="2"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.1 5.1a9.8 9.8 0 0 0 0 13.8M18.9 5.1a9.8 9.8 0 0 1 0 13.8"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5L16 16"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3.2 4.3 6.6 4.3 10S15 18.8 12 22c-3-3.2-4.3-6.6-4.3-10S9 5.2 12 2z"/>',
    city: '<path d="M2 21.5h20M5 21.5V9l5-3v15.5M10 21.5V3h9v18.5M13 7h3M13 11h3M13 15h3"/>',
    coast: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="16" cy="6" r="3"/>',
    knob: '<circle cx="12" cy="13" r="7"/><path d="M12 13l3.5-3.5M12 2.5v1.5M3.5 6l1.2 1M20.5 6l-1.2 1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    megaphone: '<path d="M3 10v4h4l8 5V5L7 10z"/><path d="M18.5 9a4 4 0 0 1 0 6"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/>',
    wrench: '<path d="M14.5 6.5a4.5 4.5 0 0 0 6 5.5L12 20.5a2.1 2.1 0 0 1-3-3L17.5 9a4.5 4.5 0 0 1-3-2.5z"/><path d="M14.5 6.5A4.5 4.5 0 0 1 20 3"/>',
    plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
    keys: '<rect x="2" y="5" width="20" height="14"/><path d="M7 5v9M12 5v9M17 5v9M2 14h20"/>',
    home: '<path d="M3 11l9-8 9 8M5 9.5V21h14V9.5"/>',
    facebook: '<path d="M14 8.5h3.2V4.2H14a4.3 4.3 0 0 0-4.3 4.3v2.8H7v4.2h2.7V22h4.2v-6.5h3l.8-4.2h-3.8V9a.5.5 0 0 1 .5-.5z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.6 3 2.6 5 6 5.2"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>'
  };
  function icon(n, cls) { return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || P.wave) + '</svg>'; }
  window.OZSicon = icon;
  function paintIcons(scope) { $$('i[data-i]', scope).forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-i'), el.className); }); }

  var MARK = '<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M1 1h38l8 8v38H9l-8-8z" fill="#101413" stroke="#4FB8A0" stroke-width="2"/><path d="M10 31a14 14 0 0 1 28 0" fill="none" stroke="#E8E2D2" stroke-width="2"/><path d="M13 22l2 2M24 16v3M35 22l-2 2" stroke="#E8E2D2" stroke-width="2"/><path d="M31 21l2.5-2.5" stroke="#E3321F" stroke-width="2.4"/><path d="M24 31L32 20" stroke="#FFB23F" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="31" r="3" fill="#FFB23F"/><path d="M10 38h28" stroke="#4FB8A0" stroke-width="1.5" stroke-dasharray="2 2"/></svg>';

  /* ---------------- NAV + FOOTER ---------------- */
  var NAV = [
    { k: 'home', label: 'Home', href: 'index.html' },
    { k: 'about', label: 'About', href: 'about-us/index.html', kids: [['About Us', 'about-us/index.html'], ['Our Purpose', 'about-us/our-purpose.html'], ['Our Team', 'about-us/our-team.html']] },
    { k: 'studio', label: 'The Studio', href: 'the-studio/index.html', kids: [['The Rooms', 'the-studio/index.html'], ['Services', 'the-studio/services.html'], ['Session Planner', 'the-studio/services.html#planner'], ['Gear Locker', 'the-studio/gear.html']] },
    { k: 'dev', label: 'Dev Progress', href: 'dev-progress/index.html', kids: [['Overview', 'dev-progress/index.html'], ['Plan', 'dev-progress/plan.html'], ['Design', 'dev-progress/design.html'], ['Build', 'dev-progress/build.html'], ['Test', 'dev-progress/test.html'], ['Documents', 'dev-progress/documents.html'], ['Photos & Videos', 'dev-progress/gallery.html'], ['Q&A', 'dev-progress/qa.html']] },
    { k: 'media', label: 'Media', href: 'our-media/index.html', kids: [['Blogs & Articles', 'our-media/index.html'], ['Social Media', 'our-media/social.html']] },
    { k: 'group', label: 'The Group', href: 'the-group/index.html' }
  ];
  window.OZSnav = NAV;

  function buildHeader() {
    var host = $('#site-header'); if (!host) return;
    var path = location.pathname.replace(/\/$/, '/index.html');
    function isHere(p) { return p.indexOf('#') < 0 && (path === '/' + p || path.slice(-(p.length + 1)) === '/' + p); }
    var items = NAV.map(function (n) {
      var kids = '';
      if (n.kids) {
        kids = '<ul class="drop">' + n.kids.map(function (c) {
          var here = n.k === NAVKEY && isHere(c[1]);
          return '<li><a href="' + url(c[1]) + '"' + (here ? ' class="here" aria-current="page"' : '') + '>' + esc(c[0]) + '</a></li>';
        }).join('') + '</ul>';
      }
      return '<li class="' + (n.k === NAVKEY ? 'active ' : '') + (n.kids ? 'has-kids' : '') + '"><a href="' + url(n.href) + '">' + esc(n.label) +
        (n.kids ? ' <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>' : '') + '</a>' + kids + '</li>';
    }).join('');
    var strip = 'Recording Studio · Central Coast NSW · Opening ' + S.opening + ' ◆ Recording · Mixing · Mastering ◆ Built for independent artists ◆ 100% Australian owned ◆ Part of The Oz Soundz Group ◆ ';
    host.outerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="topstrip" aria-hidden="true"><div class="run"><span>' + strip + '</span><span>' + strip + '</span><span>' + strip + '</span><span>' + strip + '</span></div></div>' +
      '<header class="nav" id="nav"><div class="container">' +
      '<a class="brand" href="' + url('index.html') + '" aria-label="Oz Soundz Studios home">' + MARK + '<span class="brand-txt">Oz Soundz<b>Studios</b></span></a>' +
      '<nav aria-label="Main"><ul class="menu" id="menu">' + items +
      '<li class="cta' + (NAVKEY === 'contact' ? ' active' : '') + '"><a href="' + url('contact.html') + '"><span class="rec-dot"></span> Register Interest</a></li></ul></nav>' +
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>' +
      '</div></header>';
  }

  function buildFooter() {
    var host = $('#site-footer'); if (!host) return;
    var socials = (S.socials || []).map(function (s) { return '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + icon(s.k) + '</a>'; }).join('');
    function col(title, list) { return '<div><h4>' + title + '</h4><ul>' + list.map(function (l) { return '<li><a href="' + url(l[1]) + '"' + (/^https?:/.test(l[1]) ? ' target="_blank" rel="noopener"' : '') + '>' + l[0] + '</a></li>'; }).join('') + '</ul></div>'; }
    host.outerHTML =
      '<footer class="foot"><div class="container"><div class="foot-grid">' +
      '<div><a class="brand" href="' + url('index.html') + '">' + MARK + '<span class="brand-txt">Oz Soundz<b>Studios</b></span></a>' +
      '<p class="about">A fully functioning recording space for independent artists and audio engineers. Central Coast, NSW. Opening ' + S.opening + '.</p><div class="socials">' + socials + '</div></div>' +
      col('The Studio', [['The Rooms', 'the-studio/index.html'], ['Services', 'the-studio/services.html'], ['Session Planner', 'the-studio/services.html#planner'], ['Gear Locker', 'the-studio/gear.html']]) +
      col('Dev Progress', [['Overview', 'dev-progress/index.html'], ['Plan', 'dev-progress/plan.html'], ['Design', 'dev-progress/design.html'], ['Build', 'dev-progress/build.html'], ['Test', 'dev-progress/test.html'], ['Q&A', 'dev-progress/qa.html']]) +
      col('The Group', (S.group || []).map(function (g) { return [g.name, g.url]; }).concat([['About Us', 'about-us/index.html'], ['Contact', 'contact.html']])) +
      '<div><h4>Stay In The Loop</h4><p class="about" style="margin:0 0 .6rem">Build updates and first word when bookings open. No spam.</p>' +
      '<form class="news-form" data-form="newsletter" novalidate><input class="hp" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="hp" for="nl-email">Email</label><input id="nl-email" type="email" name="email" placeholder="your@email.com" required aria-label="Email address"><button type="submit">Join</button></form><div class="news-msg" aria-live="polite"></div></div>' +
      '</div>' +
      '<div class="foot-sig" aria-hidden="true">Oz Soundz Studios</div>' +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Oz Soundz Studios · A subsidiary of <a href="' + S.parent.url + '" target="_blank" rel="noopener">' + S.parent.name + '</a></span>' +
      '<span>ABN ' + S.abn + ' · ' + S.hq + ' · <a href="mailto:' + S.email + '">' + S.email + '</a></span></div>' +
      '</div></footer><div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }

  function navBehaviour() {
    var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
    function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 30); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    if (burger) burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      body.style.overflow = open ? 'hidden' : '';
    });
    $$('.menu > li.has-kids > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 980) { e.preventDefault(); a.parentNode.classList.toggle('sub-open'); }
      });
    });
    $$('.menu .drop a').forEach(function (a) { a.addEventListener('click', function () { if (menu.classList.contains('open')) { menu.classList.remove('open'); body.style.overflow = ''; burger.setAttribute('aria-expanded', false); } }); });
  }

  function buildSubnav() {
    $$('[data-subnav]').forEach(function (host) {
      var n = NAV.filter(function (x) { return x.k === host.getAttribute('data-subnav'); })[0]; if (!n) return;
      var path = location.pathname.replace(/\/$/, '/index.html');
      host.setAttribute('aria-label', n.label + ' sections');
      host.innerHTML = '<div class="container">' + n.kids.map(function (c) {
        var here = path.slice(-(c[1].length + 1)) === '/' + c[1];
        return '<a href="' + url(c[1]) + '"' + (here ? ' class="here" aria-current="page"' : '') + '>' + esc(c[0]) + '</a>';
      }).join('') + '</div>';
      var h = $('.here', host); if (h) host.firstChild.scrollLeft = h.offsetLeft - 20;
    });
  }

  /* ---------------- UTILITIES ---------------- */
  function toast(msg) { var t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 4200); }
  window.OZStoast = toast;

  function reveal() {
    var els = $$('.rv');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = ((i % 4) * 70) + 'ms'; io.observe(e); });
  }

  function onVisible(el, fn) {
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { fn(); io.disconnect(); } }, { threshold: .3 });
    io.observe(el);
  }

  function countUp() {
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = end + suf; return; }
      onVisible(el, function () {
        var t0 = null;
        function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    });
  }

  /* ---------------- LED METERS ---------------- */
  function leds(el, pct) {
    var n = 20, on = Math.round(pct / 100 * n), html = '';
    for (var i = 0; i < n; i++) html += '<i class="' + (i >= 18 ? 'r' : i >= 14 ? 'y' : '') + '"></i>';
    el.innerHTML = html;
    var cells = $$('i', el);
    onVisible(el, function () {
      cells.forEach(function (c, i) { if (i < on) setTimeout(function () { c.classList.add('on'); }, reduceMotion ? 0 : i * 55); });
    });
  }
  function renderProgress() {
    $$('[data-progress]').forEach(function (host) {
      host.innerHTML = (D.progress || []).map(function (p, i) {
        return '<div class="meter"><div class="meter-top"><span>' + esc(p.label) + '</span><b>' + p.pct + '%</b></div><div class="leds" data-pct="' + p.pct + '" role="progressbar" aria-label="' + esc(p.label) + '" aria-valuenow="' + p.pct + '" aria-valuemin="0" aria-valuemax="100"></div></div>';
      }).join('');
      $$('.leds', host).forEach(function (l) { leds(l, +l.getAttribute('data-pct')); });
    });
    $$('[data-overall]').forEach(function (el) {
      var arr = D.progress || [], tot = 0; arr.forEach(function (p) { tot += p.pct; });
      el.setAttribute('data-count', Math.round(tot / (arr.length || 1))); el.setAttribute('data-suffix', '%');
    });
    $$('[data-updated]').forEach(function (el) { el.textContent = D.lastUpdated || ''; });
  }

  /* ---------------- TIMELINE ---------------- */
  function renderTimeline() {
    var host = $('#timeline'); if (!host) return;
    host.innerHTML = (D.phases || []).map(function (p, i) {
      var st = p.status === 'done' ? 'Complete' : p.status === 'active' ? 'In progress' : 'Queued';
      var tasks = p.tasks.map(function (t) { return '<li class="' + t[1] + '">' + esc(t[0]) + '</li>'; }).join('');
      return '<div class="tl-item ' + p.status + ' rv"><div class="tl-dot">' + p.n + '</div><div class="tl-card' + (p.status === 'active' ? ' open' : '') + '">' +
        '<button aria-expanded="' + (p.status === 'active') + '" aria-controls="ph' + i + '"><div><span class="st">' + (p.status === 'active' ? '<span class="rec-dot"></span>' : '') + 'Phase ' + p.n + ' · ' + st + '</span><h3>' + esc(p.title) + '</h3></div><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="tl-body" id="ph' + i + '"><div><div class="tl-inner"><p>' + esc(p.body) + '</p><ul>' + tasks + '</ul>' +
        (p.page ? '<p style="margin-top:1rem"><a class="mono" style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase" href="' + p.page + '">Deep dive →</a></p>' : '') +
        '</div></div></div></div></div>';
    }).join('');
    $$('.tl-card > button', host).forEach(function (b) {
      b.addEventListener('click', function () { var c = b.parentNode; var o = c.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
    });
  }

  /* ---------------- ACCORDION (generic) ---------------- */
  function wireAcc(scope) {
    $$('.acc-item > button', scope).forEach(function (b) {
      if (b._w) return; b._w = 1;
      b.addEventListener('click', function () { var o = b.parentNode.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
    });
  }

  /* ---------------- FILTERABLE LISTS ---------------- */
  function filterable(opts) {
    var host = $(opts.host); if (!host) return;
    var items = opts.items || [];
    var cats = ['All'].concat(items.map(function (x) { return x.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var bar = $(opts.bar), state = { cat: 'All', q: '' };
    bar.innerHTML = cats.map(function (c) { return '<button class="chip' + (c === 'All' ? ' on' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + (c === 'All') + '">' + esc(c) + '</button>'; }).join('') +
      '<div class="search">' + icon('search') + '<input type="search" placeholder="' + (opts.placeholder || 'Search…') + '" aria-label="Search"></div>';
    var empty = $(opts.empty), counter = $(opts.count);
    function draw() {
      var q = state.q.toLowerCase();
      var list = items.filter(function (x) {
        return (state.cat === 'All' || x.cat === state.cat) && (!q || JSON.stringify(x).toLowerCase().indexOf(q) > -1);
      });
      host.innerHTML = list.map(opts.render).join('');
      if (empty) empty.style.display = list.length ? 'none' : 'block';
      if (counter) counter.textContent = list.length + ' / ' + items.length + ' shown';
      if (opts.after) opts.after(host);
    }
    $$('.chip', bar).forEach(function (ch) {
      ch.addEventListener('click', function () {
        $$('.chip', bar).forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
        ch.classList.add('on'); ch.setAttribute('aria-pressed', 'true'); state.cat = ch.getAttribute('data-cat'); draw();
      });
    });
    $('input', bar).addEventListener('input', function (e) { state.q = e.target.value; draw(); });
    draw();
  }

  var CAT_ICON = { Monitoring: 'speaker', Microphones: 'mic', Outboard: 'knob', Recording: 'sliders', Backline: 'guitar', Infrastructure: 'plug',
    Business: 'tag', Acoustics: 'wave', Gear: 'sliders', Build: 'hammer', Community: 'users', Location: 'pin' };

  function postArt(p, i) {
    // generative "waveform poster" art per post — unique but on-brand
    var seed = 0; for (var k = 0; k < p.title.length; k++) seed = (seed * 31 + p.title.charCodeAt(k)) >>> 0;
    function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    var bars = '', w = 400, h = 200, n = 64;
    for (var j = 0; j < n; j++) { var a = (Math.sin(j / 5 + i) * .5 + .5) * rnd() * 80 + 6; bars += '<rect x="' + (j * (w / n)) + '" y="' + (h / 2 - a / 2) + '" width="' + (w / n - 2) + '" height="' + a + '" fill="' + (j % 11 === 0 ? '#FFB23F' : '#2C8272') + '" opacity="' + (0.35 + rnd() * .6).toFixed(2) + '"/>'; }
    return '<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="200" fill="#0B0E0D"/>' + bars +
      '<text x="388" y="188" text-anchor="end" font-family="Big Shoulders Stencil Display, sans-serif" font-weight="900" font-size="64" fill="rgba(232,226,210,.07)">' + String(i + 1).padStart(2, '0') + '</text></svg>';
  }

  function renderGear() {
    filterable({
      host: '#gear-list', bar: '#gear-bar', empty: '#gear-empty', count: '#gear-count', items: D.gear, placeholder: 'Search the locker…',
      render: function (g) {
        var cls = g.status === 'Spec’d' || g.status === 'Owned' ? '' : g.status === 'Researching' ? 'amb' : 'rec';
        return '<article class="gear"><span class="cat">' + icon(CAT_ICON[g.cat] || 'wave').replace('class="ico ', 'style="width:14px;height:14px;display:inline;vertical-align:-2px;margin-right:6px" class="ico ') + esc(g.cat) + '</span><h4>' + esc(g.name) + '</h4><p>' + esc(g.note) + '</p><div class="st"><span class="tag ' + cls + '">' + esc(g.status) + '</span></div></article>';
      }
    });
  }

  function renderPosts() {
    filterable({
      host: '#post-list', bar: '#post-bar', empty: '#post-empty', count: '#post-count', items: D.posts, placeholder: 'Search articles…',
      render: function (p) {
        var i = D.posts.indexOf(p);
        var link = p.url ? '<a class="more" href="' + esc(p.url) + '">Read the article →</a>' : '<span class="more" style="color:var(--td)">Full article coming soon</span>';
        return '<article class="post"><div class="post-art">' + postArt(p, i) + '<span class="tape">' + esc(p.cat) + '</span></div><div class="post-body"><div class="post-meta"><span>' + esc(p.date) + '</span><span>' + String(i + 1).padStart(2, '0') + '</span></div><h3>' + esc(p.title) + '</h3><p>' + esc(p.body) + '</p>' + link + '</div></article>';
      }
    });
  }

  function renderFaq() {
    filterable({
      host: '#faq-list', bar: '#faq-bar', empty: '#faq-empty', count: '#faq-count', items: D.faq, placeholder: 'Search questions…',
      render: function (f) {
        var id = 'q' + D.faq.indexOf(f);
        return '<div class="acc-item"><button aria-expanded="false" aria-controls="' + id + '"><div><span class="cat">' + esc(f.cat) + '</span><span>' + esc(f.q) + '</span></div><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="tl-body" id="' + id + '"><div><div>' + esc(f.a) + '</div></div></div></div>';
      },
      after: wireAcc
    });
  }

  /* ---------------- FLOOR PLAN ---------------- */
  function floorPlan() {
    var svg = $('#plan-svg'), info = $('#room-info'); if (!svg || !info) return;
    function show(k) {
      var r = D.rooms[k]; if (!r) return;
      $$('.room', svg).forEach(function (x) { x.classList.toggle('sel', x.getAttribute('data-room') === k); });
      info.innerHTML = '<span class="k mono" style="font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--verdi)">' + esc(r.tag) + '</span><h3>' + esc(r.name) + '</h3><p class="body">' + esc(r.purpose) + '</p>' +
        '<dl><dt>Treatment</dt><dd>' + esc(r.treat) + '</dd><dt>Size</dt><dd>' + esc(r.size) + '</dd><dt>Status</dt><dd><span class="tag amb">' + esc(r.status) + '</span></dd></dl>' +
        '<p class="form-note">Tap another room on the plan →</p>';
    }
    $$('.room', svg).forEach(function (r) {
      r.setAttribute('tabindex', '0'); r.setAttribute('role', 'button');
      r.setAttribute('aria-label', (D.rooms[r.getAttribute('data-room')] || {}).name || 'room');
      r.addEventListener('click', function () { show(r.getAttribute('data-room')); });
      r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(r.getAttribute('data-room')); } });
    });
    show('control');
  }

  /* ---------------- SESSION PLANNER ---------------- */
  function planner() {
    var f = $('#planner-form'); if (!f) return;
    var C = D.planner, out = $('#plan-out');
    var types = $('#plan-types');
    types.innerHTML = Object.keys(C.projectTypes).map(function (k, i) {
      var t = C.projectTypes[k];
      return '<label class="opt"><input type="radio" name="ptype" value="' + k + '"' + (i === 1 ? ' checked' : '') + '><div><b>' + esc(t.label) + '</b><small>' + esc(t.note) + '</small></div></label>';
    }).join('');
    $('#plan-extras').innerHTML = Object.keys(C.extras).map(function (k) {
      return '<label><input type="checkbox" name="extra" value="' + k + '"' + (k === 'vocals' ? ' checked' : '') + '><span>' + esc(C.extras[k].label) + '</span></label>';
    }).join('');
    function fmt(h) { return (Math.round(h * 4) / 4).toString().replace(/\.0+$/, '') + ' h'; }
    function money(v) { return '$' + Math.round(v).toLocaleString('en-AU'); }
    function calc() {
      var type = (f.querySelector('input[name=ptype]:checked') || {}).value || 'live';
      var n = +f.songs.value; $('#songs-out').textContent = n;
      var voice = type === 'voice';
      $('#songs-lbl').textContent = voice ? 'Episodes' : 'Songs';
      $$('#plan-extras input').forEach(function (x) { x.disabled = voice; x.parentNode.style.opacity = voice ? .35 : 1; });
      var stages = {}; $$('input[name=stage]', f).forEach(function (x) { stages[x.value] = x.checked; });
      var track = 0, mix = 0, master = 0;
      if (stages.tracking) {
        track = C.projectTypes[type].trackPerSong * n;
        if (!voice) $$('input[name=extra]:checked', f).forEach(function (x) { track += C.extras[x.value].perSong * n; });
      }
      if (stages.mixing) mix = (voice ? C.voiceMixPerEp : C.mixPerSong) * n;
      if (stages.mastering) master = C.masterPerSong * n;
      var trackDays = track ? Math.max(1, Math.ceil(track / (C.dayLength - C.setupPerDay))) : 0;
      var setup = trackDays * C.setupPerDay;
      var total = track + setup + mix + master;
      var days = Math.max(total ? 1 : 0, Math.ceil(total / C.dayLength * 2) / 2);
      var R = C.rates, hasRates = R.tracking != null && R.mixing != null && R.mastering != null;
      var cost = hasRates ? (track + setup) * R.tracking + mix * R.mixing + master * R.mastering : null;
      var lines = [];
      if (stages.tracking) { lines.push(['Tracking', track]); lines.push(['Setup & soundcheck', setup]); }
      if (stages.mixing) lines.push(['Mixing', mix]);
      if (stages.mastering) lines.push(['Mastering', master]);
      out.innerHTML = '<div class="eyebrow">Estimated studio time</div>' +
        '<div class="total" aria-live="polite">' + (Math.round(total * 2) / 2) + '<small> HRS</small></div>' +
        '<div class="mono" style="color:var(--verdi);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;margin-top:.4rem">≈ ' + days + ' studio day' + (days === 1 ? '' : 's') + '</div>' +
        '<ul class="est-lines">' + (lines.length ? lines.map(function (l) { return '<li><span>' + l[0] + '</span><b>' + fmt(l[1]) + '</b></li>'; }).join('') : '<li><span>Pick at least one stage</span><b>—</b></li>') +
        '<li><span>Estimated cost</span><b style="color:' + (hasRates ? 'var(--valve)' : 'var(--td)') + '">' + (hasRates ? money(cost) : 'Rates TBA') + '</b></li></ul>' +
        '<a class="btn verdi" id="plan-send" href="#">Send this plan ' + icon('arrow') + '</a>' +
        '<p class="form-note">Attaches your plan to a register-interest form.</p>';
      var summary = C.projectTypes[type].label + ' · ' + n + ' ' + (voice ? 'episodes' : 'songs') + ' · ' +
        Object.keys(stages).filter(function (k) { return stages[k]; }).join(' + ') + ' · approx ' + (Math.round(total * 2) / 2) + ' hrs (' + days + ' days)';
      $('#plan-send').setAttribute('href', ROOT + 'contact.html?tab=register&plan=' + encodeURIComponent(summary) + '#forms');
    }
    f.addEventListener('input', calc); f.addEventListener('change', calc); calc();
  }

  /* ---------------- CONSOLE HERO WIDGET ---------------- */
  function vuSVG(id) {
    var ticks = '', labels = [-20, -10, -7, -5, -3, -1, 0, 1, 2, 3];
    labels.forEach(function (v) {
      var a = mapDb(v), r1 = 78, r2 = v >= 0 ? 90 : 88;
      var x1 = 100 + r1 * Math.sin(a), y1 = 118 - r1 * Math.cos(a), x2 = 100 + r2 * Math.sin(a), y2 = 118 - r2 * Math.cos(a);
      var lx = 100 + 66 * Math.sin(a), ly = 118 - 66 * Math.cos(a);
      ticks += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + (v >= 0 ? '#b3261a' : '#3b2a0a') + '" stroke-width="1.6"/>' +
        '<text x="' + lx.toFixed(1) + '" y="' + (ly + 3).toFixed(1) + '" font-size="8" text-anchor="middle" fill="' + (v >= 0 ? '#b3261a' : '#3b2a0a') + '" font-family="IBM Plex Mono, monospace">' + Math.abs(v) + '</text>';
    });
    var a0 = mapDb(0), a1 = mapDb(3);
    var arcRed = 'M' + (100 + 84 * Math.sin(a0)).toFixed(1) + ' ' + (118 - 84 * Math.cos(a0)).toFixed(1) + ' A84 84 0 0 1 ' + (100 + 84 * Math.sin(a1)).toFixed(1) + ' ' + (118 - 84 * Math.cos(a1)).toFixed(1);
    var aa = mapDb(-20);
    var arc = 'M' + (100 + 84 * Math.sin(aa)).toFixed(1) + ' ' + (118 - 84 * Math.cos(aa)).toFixed(1) + ' A84 84 0 0 1 ' + (100 + 84 * Math.sin(a0)).toFixed(1) + ' ' + (118 - 84 * Math.cos(a0)).toFixed(1);
    return '<svg viewBox="0 0 200 130" aria-hidden="true"><path d="' + arc + '" stroke="#3b2a0a" stroke-width="1.2" fill="none"/><path d="' + arcRed + '" stroke="#b3261a" stroke-width="5" fill="none"/>' + ticks +
      '<line id="' + id + '" x1="100" y1="118" x2="100" y2="30" stroke="#1a1208" stroke-width="1.6" stroke-linecap="round" style="transform-origin:100px 118px;transform:rotate(-48deg)"/><circle cx="100" cy="118" r="7" fill="#1a1208"/></svg>';
  }
  function mapDb(db) { // -20..+3 dB -> radians
    var t = (Math.pow(10, db / 20) - 0.1) / (Math.pow(10, 3 / 20) - 0.1); return (-48 + t * 96) * Math.PI / 180;
  }
  function consoleWidget() {
    var c = $('#console'); if (!c) return;
    $('#vuL').innerHTML = vuSVG('needleL') + '<span class="lbl">VU · L</span>';
    $('#vuR').innerHTML = vuSVG('needleR') + '<span class="lbl">VU · R</span>';
    var names = ['KICK', 'SNR', 'OH', 'BASS', 'GTR', 'KEYS', 'VOX', 'BV'];
    $('#faders').innerHTML = names.map(function (n, i) {
      var v = [72, 64, 55, 70, 58, 46, 80, 50][i];
      return '<div class="fader"><input type="range" min="0" max="100" value="' + v + '" aria-label="' + n + ' fader"><span>' + n + '</span></div>';
    }).join('');
    var faders = $$('#faders input'), nL = $('#needleL'), nR = $('#needleR'), vuL = $('#vuL'), vuR = $('#vuR');
    var lamp = $('#rec-lamp'), armed = false, cnv = $('#scope'), ctx = cnv.getContext('2d');
    var clock = $('#tc');
    lamp.addEventListener('click', function () { armed = !armed; lamp.classList.toggle('on', armed); lamp.setAttribute('aria-pressed', armed); lamp.lastChild.textContent = armed ? ' REC' : ' ARM'; if (armed) t0 = performance.now(); });
    var t0 = performance.now(), lvL = 0, lvR = 0, running = true;
    function size() { var r = cnv.getBoundingClientRect(); cnv.width = r.width * (window.devicePixelRatio || 1); cnv.height = r.height * (window.devicePixelRatio || 1); }
    size(); window.addEventListener('resize', size);
    function mix() { var s = 0; faders.forEach(function (f) { s += +f.value; }); return s / (faders.length * 100); }
    function frame(t) {
      if (!running) return;
      var m = mix(), beat = Math.pow(Math.max(0, Math.sin(t / 260)), 6), base = armed ? .72 : .5;
      var tL = m * (base + beat * .35 + Math.random() * .12), tR = m * (base + beat * .32 + Math.random() * .12);
      lvL += (tL - lvL) * .18; lvR += (tR - lvR) * .16;
      function deg(l) { var db = 20 * Math.log10(Math.max(.001, l * 1.25)); db = Math.max(-20, Math.min(3, db + 3)); return mapDb(db) * 180 / Math.PI; }
      nL.style.transform = 'rotate(' + deg(lvL) + 'deg)'; nR.style.transform = 'rotate(' + deg(lvR) + 'deg)';
      vuL.classList.toggle('lit', armed); vuR.classList.toggle('lit', armed);
      // scope
      var w = cnv.width, h = cnv.height; ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(79,184,160,.18)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      ctx.strokeStyle = armed ? '#FFB23F' : '#4FB8A0'; ctx.lineWidth = 1.6 * (window.devicePixelRatio || 1);
      ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 8; ctx.beginPath();
      var amp = h * .42 * Math.min(1, (lvL + lvR));
      for (var x = 0; x <= w; x += 2) {
        var p = x / w * Math.PI * 2, tt = t / 1000;
        var y = Math.sin(p * 3 + tt * 5) * .55 + Math.sin(p * 7.3 - tt * 8) * .28 + Math.sin(p * 17 + tt * 13) * .12 + (Math.random() - .5) * .08;
        ctx.lineTo(x, h / 2 + y * amp);
      }
      ctx.stroke(); ctx.shadowBlur = 0;
      if (clock) { var s = Math.floor((t - t0) / 1000), fr = Math.floor(((t - t0) % 1000) / 40); clock.textContent = '00:' + String(Math.floor(s / 60) % 60).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0') + ':' + String(fr).padStart(2, '0'); }
      requestAnimationFrame(frame);
    }
    if (reduceMotion) { nL.style.transform = 'rotate(-5deg)'; nR.style.transform = 'rotate(-8deg)'; return; }
    requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) requestAnimationFrame(frame); });
  }

  /* ---------------- FORMS ---------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate(scope) {
    var ok = true, first = null;
    $$('input[required], select[required], textarea[required]', scope).forEach(function (el) {
      if (el.offsetParent === null && !el.closest('.step.on') && el.closest('.step')) return;
      var bad = !el.value.trim() || (el.type === 'email' && !EMAIL_RE.test(el.value.trim()));
      el.classList.toggle('bad', bad);
      var err = el.nextElementSibling && el.nextElementSibling.classList.contains('err') ? el.nextElementSibling : null;
      if (bad && !err && el.closest('label.f')) { err = document.createElement('div'); err.className = 'err'; el.insertAdjacentElement('afterend', err); }
      if (err) err.textContent = el.type === 'email' ? 'Enter a valid email address' : 'Required';
      if (bad) { ok = false; first = first || el; }
    });
    if (first) first.focus();
    return ok;
  }
  function collect(form) {
    var data = {}; var fd = new FormData(form);
    fd.forEach(function (v, k) { if (k === '_gotcha') return; data[k] = data[k] ? data[k] + ', ' + v : v; });
    return data;
  }
  function send(form, subject, done) {
    var data = collect(form);
    if (form._gotcha && form._gotcha.value) return done(true); // bot
    data._subject = subject;
    if (S.formEndpoint) {
      fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { done(r.ok); }).catch(function () { done(false); });
    } else {
      var lines = Object.keys(data).filter(function (k) { return k[0] !== '_'; }).map(function (k) { return k.replace(/_/g, ' ').replace(/^./, function (m) { return m.toUpperCase(); }) + ': ' + data[k]; });
      location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n') + '\n\n— sent from ozsoundzstudios.com.au');
      done(true, true);
    }
  }
  function successHTML(title, msg, viaMail) {
    return '<div class="sent"><div class="big">' + title + '</div><p class="body" style="margin:0 auto 1.4rem">' + msg + (viaMail ? '<br><br><span class="form-note">Your email app should have opened with everything filled in — just hit send. Nothing opened? Email us at <a href="mailto:' + S.email + '">' + S.email + '</a>.</span>' : '') + '</p><button class="btn ghost sm" type="button" onclick="location.reload()">Send another</button></div>';
  }
  function forms() {
    // newsletter
    $$('form[data-form=newsletter]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var msg = f.parentNode.querySelector('.news-msg');
        var em = f.email.value.trim();
        if (!EMAIL_RE.test(em)) { f.email.classList.add('bad'); msg.style.color = 'var(--rec-hi)'; msg.textContent = 'Enter a valid email'; return; }
        f.email.classList.remove('bad');
        send(f, 'Newsletter signup — Oz Soundz Studios', function (ok, mail) { msg.style.color = ok ? 'var(--verdi)' : 'var(--rec-hi)'; msg.textContent = ok ? (mail ? 'Email app opened — hit send to join.' : 'You’re on the list. Welcome aboard.') : 'Something went wrong — try again.'; if (ok && !mail) f.reset(); });
      });
    });
    // simple forms
    $$('form[data-form=simple]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault(); if (!validate(f)) return;
        var subj = f.getAttribute('data-subject') || 'Website enquiry';
        if (f.type && f.type.value) subj += ' — ' + f.type.value;
        var btn = f.querySelector('[type=submit]'); btn.disabled = true;
        send(f, subj, function (ok, mail) {
          btn.disabled = false;
          if (ok) f.parentNode.innerHTML = successHTML(f.getAttribute('data-done') || 'Received.', 'Thanks for getting in touch — we’ll get back to you as soon as we can.', mail);
          else toast('Couldn’t send just now. Please email ' + S.email);
        });
      });
    });
    // multi-step register form
    var reg = $('#register-form');
    if (reg) {
      var steps = $$('.step', reg), bars = $$('.steps i', reg), cur = 0;
      function go(n) {
        cur = n; steps.forEach(function (s, i) { s.classList.toggle('on', i === n); }); bars.forEach(function (b, i) { b.classList.toggle('on', i <= n); });
        var first = steps[n].querySelector('input:not([type=checkbox]):not([type=radio]), select, textarea'); if (first && n) first.focus({ preventScroll: true });
      }
      $$('[data-next]', reg).forEach(function (b) { b.addEventListener('click', function () { if (validate(steps[cur])) go(cur + 1); }); });
      $$('[data-prev]', reg).forEach(function (b) { b.addEventListener('click', function () { go(cur - 1); }); });
      reg.addEventListener('submit', function (e) {
        e.preventDefault(); if (!validate(steps[cur])) return;
        var btn = reg.querySelector('[type=submit]'); btn.disabled = true;
        send(reg, 'Register interest — Oz Soundz Studios', function (ok, mail) {
          btn.disabled = false;
          if (ok) reg.parentNode.innerHTML = successHTML('You’re on the list.', 'Thanks for registering — early registrations get priority access when bookings open, and help shape what we build.', mail);
          else toast('Couldn’t send just now. Please email ' + S.email);
        });
      });
      go(0);
    }
    // tabs
    $$('[role=tablist]').forEach(function (tl) {
      var tabs = $$('[role=tab]', tl);
      function sel(t) { tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; }); }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { sel(t); });
        t.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; sel(n); n.focus(); } });
      });
      // URL param preselect
      var q = new URLSearchParams(location.search), want = q.get('tab');
      var match = tabs.filter(function (t) { return t.getAttribute('data-tab') === want; })[0];
      sel(match || tabs[0]);
      var plan = q.get('plan');
      if (plan && $('#reg-plan')) { $('#reg-plan').value = 'My session plan: ' + plan; var pn = $('#plan-note'); if (pn) { pn.hidden = false; pn.querySelector('b').textContent = plan; } }
      var type = q.get('type');
      if (type && $('#enq-type')) $('#enq-type').value = type;
    });
  }

  /* ---------------- INIT ---------------- */
  buildHeader(); buildFooter(); buildSubnav(); paintIcons(document); navBehaviour();
  renderProgress(); renderTimeline(); renderGear(); renderPosts(); renderFaq();
  floorPlan(); planner(); consoleWidget(); forms(); wireAcc(document);
  countUp(); reveal();
  if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.scrollIntoView(); }, 60); }
})();
