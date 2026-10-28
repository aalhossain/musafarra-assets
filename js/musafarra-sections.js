/* =========================================================
   مزعفره — أقسام إضافية للصفحة الرئيسية (ثيم رائد) — الإصدار 1
   من التصور: شريط الثقة · «وش كيفك؟» · من المجلس إلى فنجانك · طريقة التحضير
   يُلصق في خانة JavaScript بعد كود الهيرو (لا يغيّر الهيرو أو الماركيو أو البانرات)
   ========================================================= */
(function () {
  var ASSETS = 'https://cdn.jsdelivr.net/gh/aalhossain/musafarra-assets@ef6936f/';
  var STORY_IMG = 'https://cdn.jsdelivr.net/gh/aalhossain/musafarra-assets@108adeb/brand/majlis-user.webp';

  /* ---- نصوص قابلة للتعديل ---- */
  var TXT_AR = {
    trust: [
      ['leaf', 'مكونات طبيعية 100%', 'قهوة وبهارات طبيعية'],
      ['spice', 'هيل · زعفران · قرنفل', 'في كل كيس'],
      ['heart', 'صُنعت بعناية في السعودية', 'خلطة سعودية فاخرة'],
      ['shield', 'دفع آمن', 'عبر بوابات سلة الموثّقة']
    ],
    finderKicker: 'اختر كيفك', finderTitle: 'وش كيفك؟',
    finderText: 'اختر ما تحبه في فنجانك، ونرشّح لك قهوتك.',
    recommend: 'ننصحك بـ', add: 'أضف إلى السلة', added: 'أُضيفت ✓', view: 'عرض المنتج',
    oos: 'غير متوفرة حالياً — اطلب إشعاراً عند توفرها', currency: 'ر.س',
    tastes: [
      { key: 'ثقيل', label: 'أحبها ثقيلة وقوية', why: 'حمسة ثقيلة بنكهة أعمق وحضور أقوى، لعشّاق القهوة الثقيلة.' },
      { key: 'وسط', label: 'متوازنة تناسب الكل', why: 'حمسة وسط متوازنة، تناسب أغلب الأذواق والضيوف.' },
      { key: 'قرنفل', label: 'بدون قرنفل', why: 'خلطة مزعفره نفسها بدون قرنفل، لمن يفضّل نكهة أنعم.' }
    ],
    storyKicker: 'تراثنا', storyTitle: 'من المجلس<br>إلى فنجانك',
    storyText: 'القهوة في المملكة ليست مشروباً فحسب؛ هي أول ما يُقدَّم للضيف، وعنوان الكرم في كل بيت. في مزعفره نحمل هذا الإرث في كل كيس: من اختيار البن، إلى الهيل والزعفران، إلى الفنجان الذي يُقدَّم باليمين.',
    pillars: [['الدلّة', 'رمز الضيافة الأول'], ['الهيل والزعفران', 'نكهة البيت السعودي'], ['الفنجان', 'يُقدَّم باليمين']],
    brewKicker: 'طريقة التحضير', brewTitle: 'قهوتك السعودية في أربع خطوات',
    brew: [
      ['اغلِ الماء في الدلّة', 'ابدأ بماء نقي على نار متوسطة.'],
      ['أضف خلطة مزعفره', 'الهيل والزعفران والقرنفل فيها جاهزة.'],
      ['اتركها على نار هادئة', 'دعها تغلي قليلاً ثم ترْكد.'],
      ['قدّمها بالفنجان', 'باليمين، ومع التمر — كما جرت العادة.']
    ],
    quality: 'جودة عالية'
  };
  var TXT_EN = {
    trust: [
      ['leaf', '100% natural ingredients', 'Coffee and natural spices'],
      ['spice', 'Cardamom · Saffron · Clove', 'In every bag'],
      ['heart', 'Crafted with care in Saudi Arabia', 'A premium Saudi blend'],
      ['shield', 'Secure checkout', 'Through Salla’s trusted gateways']
    ],
    finderKicker: 'Find your blend', finderTitle: 'How do you like it?',
    finderText: 'Tell us what you love in your cup and we’ll suggest your coffee.',
    recommend: 'We recommend', add: 'Add to cart', added: 'Added ✓', view: 'View product',
    oos: 'Currently out of stock — get notified when it’s back', currency: 'SAR',
    tastes: [
      { key: 'ثقيل', label: 'Strong & bold', why: 'A darker roast with a deeper, bolder taste.' },
      { key: 'وسط', label: 'Balanced', why: 'A medium roast that suits most tastes and guests.' },
      { key: 'قرنفل', label: 'No clove', why: 'The same Musafarra blend, without clove, for a softer taste.' }
    ],
    storyKicker: 'Our heritage', storyTitle: 'From the majlis<br>to your cup',
    storyText: 'In Saudi Arabia, coffee is more than a drink — it is the first thing offered to a guest. Musafarra carries that heritage in every bag.',
    pillars: [['The dallah', 'The symbol of hospitality'], ['Cardamom & saffron', 'The taste of home'], ['The finjan', 'Served with the right hand']],
    brewKicker: 'How to brew', brewTitle: 'Saudi coffee in four steps',
    brew: [
      ['Boil water in the dallah', 'Start with fresh water on medium heat.'],
      ['Add Musafarra blend', 'Cardamom, saffron and clove are already in.'],
      ['Simmer gently', 'Let it boil briefly, then settle.'],
      ['Serve in the finjan', 'With the right hand, and with dates.']
    ],
    quality: 'High quality'
  };

  var ICONS = {
    leaf: '<path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z"/><path d="M5 19l7-7"/>',
    spice: '<path d="M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-4 2-6 5-10z"/><path d="M12 9v8"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };

  var NAJDI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'%3E" +
    "%3Cg fill='none' stroke='%23A6592E' stroke-width='1.3'%3E%3Cpath d='M5 3.5l7 7M12 3.5l-7 7'/%3E" +
    "%3Crect x='24' y='4' width='6' height='6' transform='rotate(45 27 7)'/%3E%3C/g%3E%3Ccircle cx='27' cy='7' r='1.3' fill='%23A6592E'/%3E%3C/svg%3E\")";

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function css() {
    if (document.getElementById('mz-sections-style')) return;
    var st = document.createElement('style');
    st.id = 'mz-sections-style';
    st.textContent =
      '.mz-sec{max-width:1280px;margin:0 auto;padding:0 16px;box-sizing:border-box;color:#353B1A}' +
      '.mz-sec *{box-sizing:border-box}' +
      '.mz-kicker{display:block;font-size:13px;letter-spacing:.18em;color:#A6592E;font-weight:600;margin-bottom:8px}' +
      '.mz-h2{margin:0;font-size:clamp(28px,3.4vw,44px);line-height:1.25;font-weight:700;color:#353B1A}' +
      '.mz-h2::after{content:"";display:block;width:84px;height:14px;margin-top:10px;background:' + NAJDI + ' repeat-x 0 0/40px 14px}' +
      '.mz-center{text-align:center}.mz-center .mz-h2::after{margin-inline:auto}' +
      '.mz-lead{margin:12px 0 0;font-size:17px;line-height:1.9;color:#4A4D2C}' +
      '.mz-reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}' +
      '.mz-reveal.mz-in{opacity:1;transform:none}' +
      /* شريط الثقة */
      '#mz-trust{margin-top:28px;margin-bottom:28px}' +
      '#mz-trust .mz-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
      '#mz-trust .mz-item{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #EFE0CC;border-radius:18px;padding:16px 18px}' +
      '#mz-trust .mz-ic{flex:none;width:46px;height:46px;border-radius:23px;background:#F4D7B8;color:#A6592E;display:flex;align-items:center;justify-content:center}' +
      '#mz-trust strong{display:block;font-size:15px;color:#353B1A}#mz-trust span{font-size:13px;color:#4A4D2C}' +
      /* وش كيفك */
      '#mz-finder{margin-top:48px;margin-bottom:56px}' +
      '#mz-finder .mz-box{background:#F4D7B8;border-radius:32px;padding:clamp(24px,4vw,48px);display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:36px;align-items:center;position:relative;overflow:hidden}' +
      '#mz-finder .mz-box::before{content:"";position:absolute;inset-inline-start:-60px;bottom:-80px;width:320px;height:290px;opacity:.10;background:#353B1A;' +
        '-webkit-mask:url("' + ASSETS + 'brand/flower-mask.png") center/contain no-repeat;mask:url("' + ASSETS + 'brand/flower-mask.png") center/contain no-repeat}' +
      '#mz-finder .mz-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}' +
      '#mz-finder .mz-chip{min-height:48px;padding:0 22px;border-radius:999px;border:1px solid #353B1A;background:transparent;color:#353B1A;font:inherit;font-size:16px;font-weight:500;cursor:pointer;transition:background-color .2s,color .2s}' +
      '#mz-finder .mz-chip[aria-pressed="true"]{background:#353B1A;color:#F4D7B8}' +
      '#mz-finder .mz-chip:focus-visible{outline:3px solid #A6592E;outline-offset:2px}' +
      '#mz-finder .mz-rec{background:#fff;border-radius:24px;padding:20px;display:flex;gap:20px;align-items:center;position:relative;z-index:1;box-shadow:0 20px 40px -28px rgba(53,59,26,.5);transition:opacity .25s}' +
      '#mz-finder .mz-rec img{width:150px;height:150px;object-fit:cover;border-radius:16px;background:#F7E6D3;flex:none}' +
      '#mz-finder .mz-rec small{color:#A6592E;font-weight:600;font-size:14px}' +
      '#mz-finder .mz-rec h3{margin:4px 0 6px;font-size:21px;color:#353B1A}' +
      '#mz-finder .mz-rec p{margin:0 0 10px;font-size:15px;line-height:1.7;color:#4A4D2C}' +
      '#mz-finder .mz-price{font-weight:700;font-size:18px;color:#A6592E;margin-bottom:10px;display:block}' +
      '#mz-finder .mz-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}' +
      '#mz-finder .mz-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 22px;border-radius:999px;border:none;font:inherit;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none}' +
      '#mz-finder .mz-btn--solid{background:#353B1A;color:#F4D7B8}#mz-finder .mz-btn--solid:hover{background:#A6592E}' +
      '#mz-finder .mz-btn--link{background:transparent;color:#353B1A;text-decoration:underline;padding:0 6px}' +
      '#mz-finder .mz-oos{font-size:14px;color:#A6592E;font-weight:600}' +
      /* من المجلس إلى فنجانك */
      '#mz-story{margin-top:64px;margin-bottom:64px}' +
      '#mz-story .mz-wrap{background:#F4D7B8;border-radius:32px;padding:clamp(24px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:48px;align-items:center}' +
      '#mz-story .mz-arch{justify-self:center;width:min(380px,100%);aspect-ratio:380/522;border:2px solid #353B1A;border-radius:190px 190px 0 0;padding:12px}' +
      '#mz-story .mz-arch-in{width:100%;height:100%;border-radius:176px 176px 0 0;background:radial-gradient(circle at 50% 70%,#5b5a2c 0,#353B1A 55%,#23270F 100%);position:relative;overflow:visible;display:flex;align-items:flex-end;justify-content:center}' +
      '#mz-story .mz-arch-in{overflow:hidden}' +
      '#mz-story .mz-arch-in img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:50% 100%;display:block}' +
      '#mz-story .mz-arch-in::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(201,164,120,.35),inset 0 -60px 60px -40px rgba(35,39,15,.55);pointer-events:none}' +
      '#mz-story .mz-pillars{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:22px}' +
      '#mz-story .mz-pillars div{border-top:2px solid #A6592E;padding-top:12px}#mz-story .mz-pillars strong{display:block;font-size:17px}#mz-story .mz-pillars span{font-size:14px;color:#4A4D2C}' +
      /* طريقة التحضير */
      '#mz-brew{background:#353B1A;color:#F4D7B8;padding:clamp(48px,6vw,88px) 0;margin:64px 0;position:relative}' +
      '#mz-brew::before,#mz-brew::after{content:"";position:absolute;left:0;right:0;height:14px;background:' + NAJDI.replace(/%23A6592E/g, '%23C9A478') + ' repeat-x 0 0/40px 14px;opacity:.8}' +
      '#mz-brew::before{top:14px}#mz-brew::after{bottom:14px}' +
      '#mz-brew .mz-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:36px}' +
      '#mz-brew .mz-h2{color:#F4D7B8}#mz-brew .mz-kicker{color:#C9A478}' +
      '#mz-brew .mz-h2::after{background:' + NAJDI.replace(/%23A6592E/g, '%23C9A478') + ' repeat-x 0 0/40px 14px}' +
      '#mz-brew .mz-seal{width:96px;height:96px;border-radius:48px;border:2px solid #C9A478;color:#C9A478;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;animation:mzSpin 28s linear infinite}' +
      '@keyframes mzSpin{to{transform:rotate(360deg)}}' +
      '#mz-brew .mz-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}' +
      '#mz-brew .mz-step{border:1px solid rgba(201,164,120,.45);border-radius:20px;padding:24px}' +
      '#mz-brew .mz-num{font-size:40px;font-weight:300;color:#C9A478;line-height:1;display:block;margin-bottom:12px;font-family:Poppins,sans-serif}' +
      '#mz-brew h3{margin:0 0 6px;font-size:19px;color:#F4D7B8}#mz-brew p{margin:0;font-size:15px;line-height:1.8;color:#F4D7B8;opacity:.85}' +
      /* الجوال */
      '@media (max-width:1023px){#mz-trust .mz-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#mz-brew .mz-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '@media (max-width:767px){#mz-finder .mz-box,#mz-story .mz-wrap{grid-template-columns:1fr}' +
        '#mz-finder .mz-rec{flex-direction:column;text-align:center}#mz-finder .mz-actions{justify-content:center}' +
        '#mz-trust .mz-item{flex-direction:column;text-align:center;padding:14px 10px}#mz-story .mz-pillars{grid-template-columns:1fr}' +
        '#mz-brew .mz-steps{grid-template-columns:1fr}#mz-brew .mz-seal{display:none}}' +
      '@media (prefers-reduced-motion:reduce){.mz-reveal{opacity:1;transform:none;transition:none}#mz-brew .mz-seal{animation:none}}';
    document.head.appendChild(st);
  }

  function cardProducts() {
    return [].slice.call(document.querySelectorAll('custom-salla-product-card')).map(function (c) {
      var a = c.querySelector('.s-product-card-content-title a');
      var img = c.querySelector('.s-product-card-image-cover');
      var price = c.querySelector('.s-product-card-price');
      return { id: c.id, name: a ? a.textContent.trim() : '', href: a ? a.href : '#',
        img: img ? (img.currentSrc || img.src) : '', price: price ? price.textContent.replace(/\s+/g, ' ').trim() : '',
        oos: c.classList.contains('s-product-card-out-of-stock') };
    }).filter(function (p) { return p.name; });
  }

  /* المنتجات من واجهة سلة (لا تعتمد على رسم البطاقات)، مع بطاقات الصفحة كبديل */
  function loadProducts(isEn) {
    var ids = [];
    [].forEach.call(document.querySelectorAll('salla-products-list[source-value]'), function (l) {
      try { JSON.parse(l.getAttribute('source-value')).forEach(function (id) { if (ids.indexOf(id) < 0) ids.push(id); }); } catch (e) {}
    });
    [].forEach.call(document.querySelectorAll('custom-salla-product-card[id]'), function (c) { var n = +c.id; if (n && ids.indexOf(n) < 0) ids.push(n); });
    var api = window.salla && salla.api && salla.api.product;
    if (!ids.length || !api || !api.getDetails) return Promise.resolve(cardProducts());
    var fmt = function (n) { try { return Number(n).toLocaleString(isEn ? 'en-US' : 'ar-SA'); } catch (e) { return String(n); } };
    return Promise.all(ids.slice(0, 8).map(function (id) {
      return Promise.resolve(api.getDetails(id)).then(function (r) {
        var d = (r && r.data) || r || {};
        var price = d.is_on_sale && d.sale_price ? d.sale_price : d.price;
        return { id: d.id || id, name: d.name || '', href: d.url || '#', img: (d.image && d.image.url) || '',
          price: price != null ? fmt(price) : '', oos: d.is_available === false || d.is_out_of_stock === true };
      }).catch(function () { return null; });
    })).then(function (list) {
      list = list.filter(function (p) { return p && p.name; });
      return list.length ? list : cardProducts();
    });
  }

  function trustHTML(t) {
    var items = t.trust.map(function (x) {
      return '<div class="mz-item mz-reveal"><span class="mz-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        ICONS[x[0]] + '</svg></span><span><strong>' + esc(x[1]) + '</strong><span>' + esc(x[2]) + '</span></span></div>';
    }).join('');
    return '<div class="mz-grid">' + items + '</div>';
  }

  /* «قهوة مزعفره ( حمسه ثقيل )» ← «حمسه ثقيل» */
  function shortName(n) {
    var m = String(n).match(/\(([^)]+)\)/);
    return (m ? m[1] : n).trim();
  }

  function buildFinder(t, products) {
    var opts = t.tastes.map(function (o) {
      var p = null;
      for (var i = 0; i < products.length; i++) if (products[i].name.indexOf(o.key) !== -1) { p = products[i]; break; }
      return p ? { label: o.label, why: o.why, p: p } : null;
    }).filter(Boolean);
    if (!opts.length) return null;

    var sec = document.createElement('section');
    sec.id = 'mz-finder'; sec.className = 'mz-sec';
    sec.innerHTML = '<div class="mz-box mz-reveal"><div><span class="mz-kicker">' + esc(t.finderKicker) + '</span><h2 class="mz-h2">' + esc(t.finderTitle) + '</h2>' +
      '<p class="mz-lead">' + esc(t.finderText) + '</p><div class="mz-chips" role="group" aria-label="' + esc(t.finderTitle) + '"></div></div>' +
      '<div class="mz-rec" aria-live="polite"></div></div>';
    var chips = sec.querySelector('.mz-chips'), rec = sec.querySelector('.mz-rec');

    function show(i) {
      var o = opts[i], p = o.p;
      [].forEach.call(chips.children, function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      rec.style.opacity = '0';
      setTimeout(function () {
        rec.innerHTML = '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"><div><small>' + esc(t.recommend) + '</small>' +
          '<h3>' + esc(shortName(p.name)) + '</h3><p>' + esc(o.why) + '</p>' +
          (p.price ? '<span class="mz-price">' + esc(p.price) + ' ' + esc(t.currency) + '</span>' : '') +
          '<div class="mz-actions">' +
          (p.oos ? '<a class="mz-btn mz-btn--solid" href="' + esc(p.href) + '">' + esc(t.view) + '</a><span class="mz-oos">' + esc(t.oos) + '</span>'
                 : '<button type="button" class="mz-btn mz-btn--solid mz-add">' + esc(t.add) + '</button><a class="mz-btn mz-btn--link" href="' + esc(p.href) + '">' + esc(t.view) + '</a>') +
          '</div></div>';
        var add = rec.querySelector('.mz-add');
        if (add) add.addEventListener('click', function () {
          if (window.salla && salla.cart && salla.cart.addItem) {
            add.disabled = true;
            Promise.resolve(salla.cart.addItem(p.id)).then(function () { add.textContent = t.added; })
              .catch(function () { location.href = p.href; })
              .then(function () { setTimeout(function () { add.disabled = false; add.textContent = t.add; }, 2200); });
          } else { location.href = p.href; }
        });
        rec.style.opacity = '1';
      }, 160);
    }
    opts.forEach(function (o, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mz-chip'; b.textContent = o.label;
      b.addEventListener('click', function () { show(i); });
      chips.appendChild(b);
    });
    var first = 0; for (var k = 0; k < opts.length; k++) if (!opts[k].p.oos) { first = k; break; }
    show(first);
    return sec;
  }

  function storyHTML(t) {
    return '<div class="mz-wrap"><div class="mz-arch mz-reveal"><div class="mz-arch-in"><img src="' + STORY_IMG + '" alt="" loading="lazy"></div></div>' +
      '<div class="mz-reveal"><span class="mz-kicker">' + esc(t.storyKicker) + '</span><h2 class="mz-h2">' + t.storyTitle + '</h2>' +
      '<p class="mz-lead">' + esc(t.storyText) + '</p><div class="mz-pillars">' +
      t.pillars.map(function (x) { return '<div><strong>' + esc(x[0]) + '</strong><span>' + esc(x[1]) + '</span></div>'; }).join('') +
      '</div></div></div>';
  }

  function brewHTML(t) {
    return '<div class="mz-sec"><div class="mz-head"><div><span class="mz-kicker">' + esc(t.brewKicker) + '</span><h2 class="mz-h2">' + esc(t.brewTitle) + '</h2></div>' +
      '<div class="mz-seal" aria-hidden="true">' + esc(t.quality) + '</div></div><div class="mz-steps">' +
      t.brew.map(function (s, i) {
        return '<div class="mz-step mz-reveal"><span class="mz-num">0' + (i + 1) + '</span><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div>';
      }).join('') + '</div></div>';
  }

  function el(tag, id, cls, html) { var e = document.createElement(tag); e.id = id; if (cls) e.className = cls; e.innerHTML = html; return e; }
  function after(ref, node) { ref.parentNode.insertBefore(node, ref.nextSibling); }
  function before(ref, node) { ref.parentNode.insertBefore(node, ref); }

  function init() {
    if (!document.body || !document.body.classList.contains('index')) return;
    if (document.getElementById('mz-trust')) return;
    var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var t = isEn ? TXT_EN : TXT_AR;
    css();

    var banners = document.querySelectorAll('section.s-block--fixed-banner');
    var productsSec = null;
    [].forEach.call(document.querySelectorAll('section.s-block'), function (s) { if (!productsSec && s.querySelector('salla-products-list, custom-salla-product-card')) productsSec = s; });
    var marquee = document.getElementById('mz-marquee');
    var hero = document.getElementById('mz-hero');

    /* 1) شريط الثقة: بعد الماركيو (أو الهيرو، أو قبل أول بانر) */
    var trust = el('section', 'mz-trust', 'mz-sec', trustHTML(t));
    if (marquee) after(marquee, trust); else if (hero) after(hero, trust); else if (banners[0]) before(banners[0], trust);

    /* 2) «وش كيفك؟»: قبل قسم المنتجات (تُحمَّل بياناته من سلة) */
    var finderSlot = document.createElement('div');
    if (productsSec) before(productsSec, finderSlot); else if (banners[0]) after(banners[0], finderSlot);
    loadProducts(isEn).then(function (products) {
      var finder = buildFinder(t, products);
      if (finder && finderSlot.parentNode) { finderSlot.parentNode.replaceChild(finder, finderSlot); observe(finder.querySelectorAll('.mz-reveal')); }
    });

    /* 3) من المجلس إلى فنجانك + 4) طريقة التحضير: بعد المنتجات (أو بعد آخر بانر) */
    var anchor = productsSec || (banners.length ? banners[banners.length - 1] : null);
    if (anchor) {
      var story = el('section', 'mz-story', 'mz-sec', storyHTML(t));
      var brew = el('section', 'mz-brew', '', brewHTML(t));
      after(anchor, story); after(story, brew);
    }

    observe(document.querySelectorAll('.mz-reveal'));
  }

  /* ظهور تدريجي عند الوصول */
  var io = null;
  function observe(items) {
    if (!('IntersectionObserver' in window)) { [].forEach.call(items, function (n) { n.classList.add('mz-in'); }); return; }
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('mz-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    [].forEach.call(items, function (n, i) { n.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(n); });
  }

  /* ننتظر جاهزية مكتبة سلة (حتى 6 ثوانٍ) ثم نبني الأقسام */
  function start() {
    var tries = 0;
    (function wait() {
      if ((window.salla && salla.api && salla.api.product) || tries++ > 40) init();
      else setTimeout(wait, 150);
    })();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
