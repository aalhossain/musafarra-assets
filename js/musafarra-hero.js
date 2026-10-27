/* =========================================================
   مزعفره — هيرو الفيديو للصفحة الرئيسية (ثيم رائد) — الإصدار 2
   بنمط ارتشاف: فيديو بعرض الشاشة كاملاً، بدون نصوص،
   الفيديو كله رابط للتسوق، والهيدر فوق الفيديو على سطح المكتب.
   الفيديو مستضاف على GitHub ويُقدَّم عبر jsDelivr
   ========================================================= */
(function () {
  var BASE = 'https://cdn.jsdelivr.net/gh/aalhossain/musafarra-assets@ef296a8/hero/';
  var SHOP_URL = '/ar/-/c174356049';

  function init() {
    if (!document.body || !document.body.classList.contains('index')) return;
    if (document.getElementById('mz-hero')) return;

    var header = document.querySelector('header.store-header');
    var anchor = document.querySelector('section.s-block--fixed-banner') ||
                 document.querySelector('main section.s-block, section.s-block');
    if (!anchor || !anchor.parentNode) return;

    var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var shopHref = isEn ? SHOP_URL.replace('/ar/', '/en/') : SHOP_URL;
    var label = isEn ? 'Shop Musafarra coffee' : 'تسوّق قهوة مزعفره';
    var pauseLabel = isEn ? 'Pause video' : 'إيقاف الفيديو مؤقتاً';
    var playLabel = isEn ? 'Play video' : 'تشغيل الفيديو';

    var mq = window.matchMedia;
    var isMobile = mq && mq('(max-width: 767px)').matches;
    var reduce = mq && mq('(prefers-reduced-motion: reduce)').matches;
    var conn = navigator.connection || {};
    var lowData = !!conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
    var poster = BASE + (isMobile ? 'mobile-wide-poster.webp' : 'desktop-poster.webp');

    var style = document.createElement('style');
    style.id = 'mz-hero-style';
    style.textContent =
      '#mz-hero{position:relative;display:block;width:100%;aspect-ratio:16/9;max-height:100vh;overflow:hidden;' +
        'background:#1E2210 center/cover no-repeat;margin:0}' +
      '#mz-hero .mz-link{position:absolute;inset:0;z-index:1}' +
      '#mz-hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block}' +
      '#mz-hero .mz-toggle{position:absolute;z-index:2;bottom:16px;inset-inline-start:16px;width:40px;height:40px;border-radius:20px;' +
        'border:1px solid rgba(244,215,184,.6);background:rgba(21,24,10,.45);color:#F4D7B8;display:flex;align-items:center;' +
        'justify-content:center;cursor:pointer;padding:0;opacity:.75;transition:opacity .2s}' +
      '#mz-hero .mz-toggle:hover,#mz-hero .mz-toggle:focus-visible{opacity:1}' +
      '#mz-hero .mz-toggle:focus-visible,#mz-hero .mz-link:focus-visible{outline:3px solid #C9A478;outline-offset:-3px}' +
      /* الهيدر فوق الفيديو على سطح المكتب فقط */
      '@media (min-width:768px){' +
        'body.mz-hero-overlay header.store-header{position:relative;z-index:20;' +
          'background:linear-gradient(180deg,rgba(251,241,229,.95) 0%,rgba(251,241,229,.75) 55%,rgba(251,241,229,0) 100%)!important}' +
        'body.mz-hero-overlay header.store-header .top-navbar,' +
        'body.mz-hero-overlay header.store-header #mainnav{background:transparent!important;box-shadow:none!important}' +
        'body.mz-hero-overlay header.store-header #mainnav::after{display:none!important}' +
      '}';
    document.head.appendChild(style);

    var hero = document.createElement('section');
    hero.id = 'mz-hero';
    hero.style.backgroundImage = 'url("' + poster + '")';
    hero.innerHTML = '<a class="mz-link" href="' + shopHref + '" aria-label="' + label + '"></a>';

    var overlay = !isMobile && header && header.parentNode;
    if (overlay) {
      header.parentNode.insertBefore(hero, header.nextSibling);
      document.body.classList.add('mz-hero-overlay');
      var fit = function () { hero.style.marginTop = (-header.offsetHeight) + 'px'; };
      fit();
      window.addEventListener('resize', fit);
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(header);
    } else {
      anchor.parentNode.insertBefore(hero, anchor);
    }

    addMarquee(hero, isEn);

    if (reduce || lowData) return;

    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('preload', 'metadata');
    v.setAttribute('aria-hidden', 'true');
    v.poster = poster;
    v.innerHTML = isMobile
      ? '<source src="' + BASE + 'mobile-wide.mp4" type="video/mp4">'
      : '<source src="' + BASE + 'desktop.webm" type="video/webm">' +
        '<source src="' + BASE + 'desktop.mp4" type="video/mp4">';
    hero.insertBefore(v, hero.firstChild);
    var p = v.play();
    if (p && p.catch) p.catch(function () {});

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mz-toggle';
    var pauseIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    var playIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>';
    var setBtn = function () {
      btn.innerHTML = v.paused ? playIcon : pauseIcon;
      btn.setAttribute('aria-label', v.paused ? playLabel : pauseLabel);
    };
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      if (v.paused) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else { v.pause(); }
    });
    v.addEventListener('play', setBtn);
    v.addEventListener('pause', setBtn);
    setBtn();
    hero.appendChild(btn);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting && !v.paused) { v.dataset.autoPaused = '1'; v.pause(); }
          else if (e.isIntersecting && v.dataset.autoPaused) { delete v.dataset.autoPaused; var r = v.play(); if (r && r.catch) r.catch(function () {}); }
        });
      }, { threshold: 0.1 }).observe(hero);
    }
  }

  /* ---------- شريط الماركيو تحت الفيديو بنقش مزعفره ---------- */
  function addMarquee(hero, isEn) {
    if (document.getElementById('mz-marquee')) return;

    var items = isEn
      ? ['Saudi coffee with the spirit of hospitality', 'The true taste is Musafarra', 'Cardamom · Saffron · Clove', 'From the majlis to your cup', 'Hospitality worthy of your guests']
      : ['قهوة سعودية بروح الضيافة', 'أصل الكيف مزعفر', 'هيل · زعفران · قرنفل', 'من المجلس إلى فنجانك', 'ضيافة تليق بضيوفك'];

    /* زهرة الزعفران من شعار مزعفره كفاصل بين العبارات */
    var flower = '<svg class="mz-mq-flower" viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">' +
      '<path d="M50 8C60 22 62 40 50 62 38 40 40 22 50 8Z"/><path d="M50 62C40 50 28 34 32 22 42 28 48 44 50 62Z"/>' +
      '<path d="M50 62C60 50 72 34 68 22 58 28 52 44 50 62Z"/><path d="M50 66C36 64 18 56 10 40 24 40 40 48 50 66Z"/>' +
      '<path d="M50 66C64 64 82 56 90 40 76 40 60 48 50 66Z"/><path d="M50 66 46 74 50 82 54 74Z"/></g></svg>';

    var group = '';
    for (var i = 0; i < items.length; i++) {
      group += '<span class="mz-mq-item">' + items[i] + '</span>' + flower;
    }

    /* النقش النجدي من دليل الهوية: تقاطعات ومعيّنات */
    var najdi = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'%3E" +
      "%3Cg fill='none' stroke='%23C9A478' stroke-width='1.3'%3E%3Cpath d='M0 .7h40M0 13.3h40'/%3E%3Cpath d='M5 3.5l7 7M12 3.5l-7 7'/%3E" +
      "%3Crect x='24' y='4' width='6' height='6' transform='rotate(45 27 7)'/%3E%3C/g%3E%3Ccircle cx='27' cy='7' r='1.3' fill='%23C9A478'/%3E%3C/svg%3E\")";

    var css = document.createElement('style');
    css.id = 'mz-marquee-style';
    css.textContent =
      '#mz-marquee{position:relative;background:#353B1A;color:#F4D7B8;overflow:hidden;margin:0 0 36px;padding:14px 0;direction:ltr}' +
      '#mz-marquee::before,#mz-marquee::after{content:"";position:absolute;left:0;right:0;height:14px;background:' + najdi + ' repeat-x 0 0/40px 14px;opacity:.9}' +
      '#mz-marquee::before{top:0}#mz-marquee::after{bottom:0}' +
      '#mz-marquee .mz-mq-track{display:flex;width:max-content;animation:mzMarquee 38s linear infinite;padding:16px 0}' +
      '#mz-marquee:hover .mz-mq-track{animation-play-state:paused}' +
      '#mz-marquee .mz-mq-group{display:flex;align-items:center;gap:28px;padding-inline-end:28px;flex-shrink:0}' +
      '#mz-marquee .mz-mq-item{direction:' + (isEn ? 'ltr' : 'rtl') + ';white-space:nowrap;font-size:clamp(17px,1.7vw,22px);font-weight:700;letter-spacing:.01em}' +
      '#mz-marquee .mz-mq-flower{width:26px;height:26px;color:#C9A478;flex-shrink:0}' +
      '#mz-marquee .mz-mq-group > .mz-mq-flower:nth-of-type(even){color:#A6592E}' +
      (isEn
        ? '@keyframes mzMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'
        : '@keyframes mzMarquee{from{transform:translateX(-50%)}to{transform:translateX(0)}}') +
      '@media (max-width:767px){#mz-marquee{padding:12px 0}#mz-marquee .mz-mq-track{padding:13px 0;animation-duration:30s}' +
        '#mz-marquee .mz-mq-group{gap:20px;padding-inline-end:20px}#mz-marquee .mz-mq-flower{width:22px;height:22px}}' +
      '@media (prefers-reduced-motion:reduce){#mz-marquee .mz-mq-track{animation:none;transform:none}}';
    document.head.appendChild(css);

    var bar = document.createElement('div');
    bar.id = 'mz-marquee';
    bar.setAttribute('role', 'marquee');
    bar.setAttribute('aria-label', items.join(' — '));
    /* نسختان متطابقتان من العبارات لتكرار سلس بلا انقطاع */
    bar.innerHTML = '<div class="mz-mq-track" aria-hidden="true">' +
      '<div class="mz-mq-group">' + group + group + '</div>' +
      '<div class="mz-mq-group">' + group + group + '</div>' +
    '</div>';

    hero.parentNode.insertBefore(bar, hero.nextSibling);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
