/* =========================================================
   مزعفره — كروت آراء العملاء (ثيم رائد)
   يقرأ الآراء من مكوّن سلة <salla-reviews> بعد تحميله
   ويعرضها في كروت بهوية مزعفره بدل السلايدر الافتراضي.
   إذا لم تتوفر آراء يبقى قسم الثيم الأصلي كما هو.
   يُلصق في خانة JavaScript بعد كود الأقسام
   ========================================================= */
(function () {
  var NAJDI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'%3E" +
    "%3Cg fill='none' stroke='%23A6592E' stroke-width='1.3'%3E%3Cpath d='M5 3.5l7 7M12 3.5l-7 7'/%3E" +
    "%3Crect x='24' y='4' width='6' height='6' transform='rotate(45 27 7)'/%3E%3C/g%3E%3Ccircle cx='27' cy='7' r='1.3' fill='%23A6592E'/%3E%3C/svg%3E\")";
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>';
  var QUOTE = '<svg viewBox="0 0 48 36" aria-hidden="true"><path d="M20 0C9 3 2 11 2 22c0 8 5 14 12 14 6 0 10-4 10-10s-4-10-9-10c-1 0-2 0-3 .5C13 10 17 6 22 4zM46 0C35 3 28 11 28 22c0 8 5 14 12 14 6 0 10-4 10-10s-4-10-9-10c-1 0-2 0-3 .5C39 10 43 6 48 4z"/></svg>';

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function css() {
    if (document.getElementById('mz-reviews-style')) return;
    var s = document.createElement('style');
    s.id = 'mz-reviews-style';
    s.textContent =
      '#mz-reviews{max-width:1280px;margin:0 auto;padding:0 16px;box-sizing:border-box;color:#353B1A}' +
      '#mz-reviews *{box-sizing:border-box}' +
      '#mz-reviews .mz-rv-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:28px;flex-wrap:wrap}' +
      '#mz-reviews .mz-rv-kicker{display:block;font-size:13px;letter-spacing:.18em;color:#A6592E;font-weight:700;margin-bottom:6px}' +
      '#mz-reviews h2{margin:0;font-size:clamp(26px,3vw,38px);font-weight:800;color:#353B1A;line-height:1.25}' +
      '#mz-reviews h2::after{content:"";display:block;width:96px;height:14px;margin-top:10px;background:' + NAJDI + ' repeat-x 0 0/40px 14px}' +
      '#mz-reviews .mz-rv-all{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:999px;border:1.5px solid #353B1A;' +
        'color:#353B1A;font-weight:700;font-size:15px;text-decoration:none;transition:background-color .25s,color .25s}' +
      '#mz-reviews .mz-rv-all:hover{background:#353B1A;color:#F4D7B8}' +
      '#mz-reviews .mz-rv-track{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 48px)/3);gap:24px;overflow-x:auto;' +
        'scroll-snap-type:x mandatory;scrollbar-width:none;padding:8px 2px 28px}' +
      '#mz-reviews .mz-rv-track::-webkit-scrollbar{display:none}' +
      '#mz-reviews .mz-rv-card{scroll-snap-align:start;position:relative;background:#FBF1E5;border:1px solid rgba(201,164,120,.55);border-radius:28px;' +
        'padding:34px 30px 26px;display:flex;flex-direction:column;min-height:250px;overflow:hidden;' +
        'box-shadow:0 18px 40px -30px rgba(53,59,26,.55);transition:transform .4s cubic-bezier(.2,.7,.2,1),box-shadow .4s}' +
      '#mz-reviews .mz-rv-card::before{content:"";position:absolute;inset-inline:0;top:0;height:14px;background:' + NAJDI + ' repeat-x center/40px 14px;opacity:.55}' +
      '#mz-reviews .mz-rv-card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -30px rgba(53,59,26,.6)}' +
      '#mz-reviews .mz-rv-quote{position:absolute;top:26px;inset-inline-end:26px;width:46px;height:34px;fill:#A6592E;opacity:.16}' +
      '#mz-reviews .mz-rv-stars{display:flex;gap:3px;margin-bottom:14px}' +
      '#mz-reviews .mz-rv-stars svg{width:18px;height:18px;fill:#C9A478}' +
      '#mz-reviews .mz-rv-stars svg.on{fill:#A6592E}' +
      '#mz-reviews .mz-rv-text{margin:0 0 22px;font-size:18px;line-height:1.85;font-weight:600;color:#353B1A;flex:1}' +
      '#mz-reviews .mz-rv-rate{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:6px;margin-bottom:22px}' +
      '#mz-reviews .mz-rv-stars--big{margin:0}#mz-reviews .mz-rv-stars--big svg{width:26px;height:26px}' +
      '#mz-reviews .mz-rv-score{font-size:44px;font-weight:800;line-height:1.1;color:#353B1A}#mz-reviews .mz-rv-score small{font-size:18px;color:#A6592E;font-weight:700}' +
      '#mz-reviews .mz-rv-rated{font-size:14px;font-weight:600;color:#4A4D2C}' +
      '#mz-reviews .mz-rv-card--rate{background:#fff}' +
      '#mz-reviews .mz-rv-who{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px dashed rgba(166,89,46,.35)}' +
      '#mz-reviews .mz-rv-av{width:46px;height:46px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' +
        'background:#353B1A;color:#F4D7B8;font-weight:800;font-size:19px;overflow:hidden;border:2px solid #C9A478}' +
      '#mz-reviews .mz-rv-av img{width:100%;height:100%;object-fit:cover}' +
      '#mz-reviews .mz-rv-name{font-weight:800;font-size:15px;color:#4A2B1C}' +
      '#mz-reviews .mz-rv-tag{display:block;font-size:12.5px;color:#A6592E;font-weight:600;margin-top:2px}' +
      '#mz-reviews .mz-rv-nav{display:flex;gap:10px}' +
      '#mz-reviews .mz-rv-nav button{width:44px;height:44px;border-radius:50%;border:1.5px solid #353B1A;background:transparent;color:#353B1A;' +
        'display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background-color .25s,color .25s}' +
      '#mz-reviews .mz-rv-nav button:hover{background:#353B1A;color:#F4D7B8}' +
      '#mz-reviews .mz-rv-nav button:focus-visible,#mz-reviews .mz-rv-all:focus-visible{outline:3px solid #A6592E;outline-offset:2px}' +
      '#mz-reviews .mz-rv-actions{display:flex;align-items:center;gap:12px}' +
      '#mz-reviews .mz-rv-card{opacity:0;transform:translateY(24px)}' +
      '#mz-reviews.mz-in .mz-rv-card{opacity:1;transform:none;transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1),box-shadow .4s}' +
      '#mz-reviews.mz-in .mz-rv-card:hover{transform:translateY(-6px)}' +
      '@media (max-width:1023px){#mz-reviews .mz-rv-track{grid-auto-columns:calc((100% - 24px)/2)}}' +
      '@media (max-width:640px){#mz-reviews .mz-rv-track{grid-auto-columns:84%;gap:16px}#mz-reviews .mz-rv-nav{display:none}' +
        '#mz-reviews .mz-rv-card{padding:30px 22px 22px;min-height:220px}#mz-reviews .mz-rv-text{font-size:16.5px}}' +
      '@media (prefers-reduced-motion:reduce){#mz-reviews .mz-rv-card,#mz-reviews.mz-in .mz-rv-card{opacity:1;transform:none!important;transition:none}}';
    document.head.appendChild(s);
  }

  function read(host) {
    var out = [];
    host.querySelectorAll('.s-reviews-testimonial').forEach(function (t) {
      var p = t.querySelector('.s-reviews-testimonial__text p');
      var n = t.querySelector('.s-reviews-testimonial__info h2');
      var text = p ? p.textContent.trim() : '';
      var name = n ? n.textContent.trim() : '';
      if (!name) return;
      var stars = t.querySelectorAll('.s-rating-stars-selected').length || 5;
      var img = t.querySelector('.s-reviews-testimonial__avatar img');
      var src = img ? (img.getAttribute('data-src') || img.getAttribute('src') || '') : '';
      if (/avatar_(male|female)/.test(src)) src = '';
      var key = name + '|' + text;
      if (out.some(function (o) { return o.key === key; })) return;
      out.push({ key: key, text: text, name: name, stars: Math.min(5, stars), img: src });
    });
    /* الآراء المكتوبة أولاً، ثم التقييمات بالنجوم فقط */
    return out.filter(function (o) { return o.text; }).concat(out.filter(function (o) { return !o.text; }));
  }

  function build(block, host, list) {
    var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var T = isEn
      ? { kicker: 'FROM OUR GUESTS', title: 'What our guests say', all: 'All reviews', tag: 'Musafarra customer', prev: 'Previous', next: 'Next', stars: ' out of 5 stars', rated: function (n) { return 'Rated Musafarra ' + n + ' out of 5'; } }
      : { kicker: 'من ضيوفنا', title: 'وش قالوا عن مزعفره؟', all: 'كل الآراء', tag: 'عميل مزعفره', prev: 'السابق', next: 'التالي', stars: ' من 5 نجوم', rated: function (n) { return 'قيّم مزعفره ' + n + ' من 5'; } };
    var allLink = host.querySelector('.s-reviews-display-all');
    var allHref = (allLink && allLink.getAttribute('href')) || (isEn ? '/en/testimonials' : '/ar/testimonials');

    var cards = list.map(function (r) {
      var st = '';
      for (var i = 1; i <= 5; i++) st += STAR.replace('<svg', '<svg class="' + (i <= r.stars ? 'on' : '') + '"');
      var av = r.img ? '<img src="' + esc(r.img) + '" alt="" loading="lazy">' : esc(r.name.charAt(0));
      var body = r.text
        ? '<div class="mz-rv-stars" role="img" aria-label="' + r.stars + T.stars + '">' + st + '</div><p class="mz-rv-text">' + esc(r.text) + '</p>'
        : '<div class="mz-rv-rate"><div class="mz-rv-stars mz-rv-stars--big" role="img" aria-label="' + r.stars + T.stars + '">' + st + '</div>' +
          '<span class="mz-rv-score">' + r.stars + '<small>/5</small></span><span class="mz-rv-rated">' + T.rated(r.stars) + '</span></div>';
      return '<article class="mz-rv-card' + (r.text ? '' : ' mz-rv-card--rate') + '">' + (r.text ? QUOTE.replace('<svg', '<svg class="mz-rv-quote"') : '') + body +
        '<div class="mz-rv-who"><span class="mz-rv-av" aria-hidden="true">' + av + '</span>' +
        '<span><span class="mz-rv-name">' + esc(r.name) + '</span><span class="mz-rv-tag">' + T.tag + '</span></span></div>' +
        '</article>';
    }).join('');

    var arrowR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    var arrowL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    var wrap = document.createElement('div');
    wrap.id = 'mz-reviews';
    wrap.innerHTML =
      '<div class="mz-rv-head"><div><span class="mz-rv-kicker">' + T.kicker + '</span><h2>' + T.title + '</h2></div>' +
      '<div class="mz-rv-actions">' +
        (list.length > 3 ? '<div class="mz-rv-nav"><button type="button" class="mz-rv-prev" aria-label="' + T.prev + '">' + (isEn ? arrowL : arrowR) + '</button>' +
          '<button type="button" class="mz-rv-next" aria-label="' + T.next + '">' + (isEn ? arrowR : arrowL) + '</button></div>' : '') +
        '<a class="mz-rv-all" href="' + esc(allHref) + '">' + T.all + '</a></div></div>' +
      '<div class="mz-rv-track" tabindex="0" role="list">' + cards + '</div>';

    host.style.display = 'none';
    block.insertBefore(wrap, host);

    var track = wrap.querySelector('.mz-rv-track');
    var step = function (dir) {
      var card = track.querySelector('.mz-rv-card');
      var w = card ? card.getBoundingClientRect().width + 24 : 300;
      var rtl = getComputedStyle(track).direction === 'rtl';
      track.scrollBy({ left: dir * w * (rtl ? -1 : 1), behavior: 'smooth' });
    };
    var prev = wrap.querySelector('.mz-rv-prev'), next = wrap.querySelector('.mz-rv-next');
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { wrap.classList.add('mz-in'); io.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(wrap);
      [].forEach.call(wrap.querySelectorAll('.mz-rv-card'), function (c, i) { c.style.transitionDelay = (i * 0.08) + 's'; });
    } else {
      wrap.classList.add('mz-in');
    }
  }

  function init() {
    if (document.getElementById('mz-reviews')) return;
    var block = document.querySelector('.s-block--testimonials');
    var host = block && block.querySelector('salla-reviews');
    if (!host) return;
    css();
    var done = false;
    var tryBuild = function () {
      if (done) return;
      var list = read(host);
      if (!list.length) return;
      done = true;
      if (mo) mo.disconnect();
      build(block, host, list);
    };
    var mo = 'MutationObserver' in window ? new MutationObserver(function () { setTimeout(tryBuild, 150); }) : null;
    if (mo) mo.observe(host, { childList: true, subtree: true });
    tryBuild();
    setTimeout(function () { if (mo && !done) mo.disconnect(); }, 20000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
