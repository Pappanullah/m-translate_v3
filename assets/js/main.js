/* m-translate.at – Hauptskript
   Baut Kopfzeile und Fußzeile aus config.js, schaltet Sprache und Hell-/Dunkelmodus um, steuert Menü,
   Einblend-Animationen, WhatsApp-Links, Karte (erst nach Klick) und das Kontaktformular.
   Texte stehen in assets/lang/*.js, Daten in assets/js/config.js. */
(() => {
  'use strict';
  const S = window.SITE;
  const D = (window.I18N = window.I18N || {});
  const root = document.documentElement;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const de = k => (D.de && D.de[k]) || '';
  const tr = k => (D[lang] && D[lang][k]) ?? de(k);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tel = n => 'tel:' + n.replace(/[^+\d]/g, '');
  const tx = (tag, key, attrs = '') => `<${tag} ${attrs} data-i18n="${key}">${de(key)}</${tag}>`;
  root.classList.add('js');

  const ICONS = {
    doc: 'M7 3h8l4 4v14H7z M15 3v4h4 M10 12h6 M10 16h6',
    scale: 'M12 3v18 M6 21h12 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0z M19 7l-3 7a3 3 0 0 0 6 0z',
    chat: 'M4 5h16v11H9l-5 4z',
    globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
    pulse: 'M3 12h4l2-6 4 12 2-6h6',
    spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
    phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    mail: 'M3 6h18v12H3z M3 7l9 7 9-7',
    pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z M12 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6z',
    clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z M12 7v5l3 2',
    whatsapp: 'M3 21l1.6-4.7A9 9 0 1 1 8 19.4z M9 8.6c.3 2.3 2.6 4.6 5 5.2l1.4-1.4-2-1.2-.9.8c-.9-.4-1.9-1.4-2.3-2.3l.8-.9-1.2-2z'
  };
  const icon = n => ICONS[n] ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>` : '';
  const caret = '<svg class="ico caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  const burger = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  const themeSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><mask id="tmask"><rect width="24" height="24" fill="#fff"/><circle class="cut" cx="12" cy="12" r="8" fill="#000"/></mask><g mask="url(#tmask)"><circle class="core" cx="12" cy="12" r="9"/></g><path class="rays" d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>';

  const slug = h => h.replace(/[#?].*$/, '').replace(/\.html$/, '');
  const cur = slug(location.pathname.split('/').pop() || 'index') || 'index';
  const A = S.address;
  let lang = 'de';

  /* ---------- Hell-/Dunkelmodus ---------- */
  const setTheme = (t, save) => {
    root.dataset.theme = t;
    const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'dark' ? '#17130F' : '#F1E9DA';
    const b = $('.theme-toggle'); if (b) b.setAttribute('aria-pressed', String(t === 'dark'));
    if (save) { try { localStorage.setItem('theme', t); } catch (e) { /* ignorieren */ } }
  };

  /* ---------- Kopfzeile ---------- */
  const navItem = i => i.children
    ? `<li class="has-sub"><button type="button" class="sub-btn" aria-expanded="false">${tx('span', i.key)}${caret}</button><ul class="sub">${i.children.map(navItem).join('')}</ul></li>`
    : `<li><a${i.cta ? ' class="cta-link"' : ''} href="${i.href}"${slug(i.href) === cur ? ' aria-current="page"' : ''} data-i18n="${i.key}">${de(i.key)}</a></li>`;

  $('#site-header').innerHTML = `<div class="wrap bar">
    <a class="brand" href="index.html"><b>${esc(S.name)}</b>${tx('small', 'brand.sub')}</a>
    <nav class="nav" id="nav" aria-label="Navigation"><ul>${S.nav.map(navItem).join('')}</ul></nav>
    <div class="langs" role="group" aria-label="Sprache / Language / اللغة">${S.languages.map(l => `<button type="button" data-lang="${l.code}" lang="${l.code}" aria-pressed="false">${esc(l.short)}</button>`).join('')}</div>
    <button class="theme-toggle" type="button" aria-pressed="false" data-i18n-attr="aria-label:theme.toggle;title:theme.toggle" aria-label="${esc(de('theme.toggle'))}" title="${esc(de('theme.toggle'))}">${themeSvg}</button>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" data-i18n-attr="aria-label:nav.menu" aria-label="${esc(de('nav.menu'))}">${burger}</button>
  </div>`;
  $$('.has-sub').forEach(li => { if ($('[aria-current]', li)) li.classList.add('current'); });
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);

  /* ---------- Kontaktdaten & Fußzeile ---------- */
  const waHref = () => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(tr('wa.text'))}`;
  const row = (ic, key, html) => `<li>${icon(ic)}<span>${tx('span', key, 'class="lbl"')}${html}</span></li>`;
  const contactList = () => [
    row('pin', 'c.address', `${esc(A.street)}<br>${esc(A.zip)} ${esc(A.city)}, ${esc(A.country)}`),
    row('phone', 'c.phone', `<a class="ltr" href="${tel(S.phone)}">${esc(S.phone)}</a>`),
    row('phone', 'c.mobile', `<a class="ltr" href="${tel(S.mobile)}">${esc(S.mobile)}</a>`),
    S.whatsapp ? row('whatsapp', 'c.whatsapp', `<a class="ltr" data-wa target="_blank" rel="noopener" href="${waHref()}">${esc(S.mobile)}</a>`) : '',
    row('mail', 'c.email', `<a class="ltr" href="mailto:${esc(S.email)}">${esc(S.email)}</a>`),
    de('site.hours') ? row('clock', 'c.hours', tx('span', 'site.hours')) : ''
  ].join('');
  const flat = a => a.flatMap(i => i.children ? flat(i.children) : [i]);
  const link = i => `<li><a href="${i.href}" data-i18n="${i.key}">${de(i.key)}</a></li>`;

  $('#site-footer').innerHTML = `<div class="wrap"><div class="fgrid">
    <div><h2>${esc(S.name)}</h2>${tx('p', 'footer.about')}</div>
    <div>${tx('h2', 'footer.pages')}<ul>${flat(S.nav).map(link).join('')}</ul></div>
    <div>${tx('h2', 'footer.contact')}<ul class="info">${contactList()}</ul></div>
    <div>${tx('h2', 'footer.legal')}<ul>${S.legal.map(link).join('')}</ul></div>
  </div>
  <div class="fbase"><span>© ${new Date().getFullYear()} ${esc(S.name)}</span><span>GISA ${esc(S.gisa)}</span><span>UID ${esc(S.uid)}</span>${tx('span', 'footer.legalnote')}</div></div>`;

  if (S.whatsapp) {
    const w = document.createElement('a');
    w.className = 'wa-float'; w.target = '_blank'; w.rel = 'noopener'; w.href = waHref();
    w.setAttribute('data-wa', ''); w.setAttribute('data-i18n-attr', 'aria-label:wa.aria;title:wa.aria');
    w.setAttribute('aria-label', de('wa.aria')); w.title = de('wa.aria');
    w.innerHTML = icon('whatsapp');
    document.body.appendChild(w);
  }

  /* ---------- Dynamische Bereiche ---------- */
  $$('[data-contact]').forEach(el => { el.innerHTML = contactList(); });
  $$('[data-services]').forEach(el => {
    const n = +el.dataset.limit || S.services.length;
    el.innerHTML = S.services.slice(0, n).map(s => `<div class="svc">` + `<span class="ico-wrap">${icon(s.icon)}</span><div>${tx('h3', `svc.${s.id}.t`)}${tx('p', `svc.${s.id}.d`)}</div></div>`).join('');
  });
  $$('[data-gallery]').forEach(el => {
    el.innerHTML = S.gallery.map(g => `<figure><img${g.fit === 'contain' ? ' class="contain"' : ''} src="${esc(g.src)}" alt="${esc(de(g.key))}" data-i18n-attr="alt:${g.key}" loading="lazy" decoding="async">${tx('figcaption', g.key)}</figure>`).join('');
  });
  $$('[data-prices]').forEach(box => {
    const g = S.prices || [];
    if (!g.length) { box.remove(); return; }
    $('[data-pgroups]', box).innerHTML = g.map(x => `<article class="pgroup">${tx('h3', `price.${x.id}.t`)}${de(`price.${x.id}.n`) ? tx('p', `price.${x.id}.n`, 'class="small"') : ''}<table class="ptable"><tbody>${x.rows.map(r => `<tr><th scope="row">${tx('span', `price.${x.id}.${r}.l`)}</th><td>${tx('span', `price.${x.id}.${r}.p`)}</td></tr>`).join('')}</tbody></table></article>`).join('');
  });
  const star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>';
  const stars = n => `<span class="stars" role="img" aria-label="${n} / 5">${star.repeat(Math.max(0, Math.min(5, n)))}</span>`;
  $$('[data-reviews]').forEach(el => {
    const R = S.reviews || [], sm = S.reviewSummary;
    const cards = R.map(r => `<figure class="rcard">${stars(r.stars || 5)}<blockquote lang="${esc(r.lang || 'de')}" dir="auto">${esc(r.text)}</blockquote><figcaption><b>${esc(r.name)}</b>${r.when ? ' – ' + esc(r.when) : ''}<br>${tx('span', 'rev.src', 'class="small"')}</figcaption></figure>`).join('');
    el.innerHTML = (sm ? `<p class="rsum">${stars(5)} <b>${esc(sm.rating)} / 5</b> (${esc(sm.count)})</p>` : '')
      + (cards ? `<div class="rgrid">${cards}</div>` : tx('p', 'rev.p'))
      + `<p><a class="btn ghost" target="_blank" rel="noopener" href="${esc(S.reviewsUrl)}">${tx('span', 'rev.btn')}</a></p>`;
  });
  $$('[data-map]').forEach(el => {
    el.className = 'map' + (el.hasAttribute('data-wide') ? ' wide' : '');
    const show = () => { el.innerHTML = `<iframe src="${esc(S.mapEmbed)}" title="${esc(tr('map.title'))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`; try { sessionStorage.setItem('map', '1'); } catch (e) { /* ignorieren */ } };
    let ok = false; try { ok = sessionStorage.getItem('map') === '1'; } catch (e) { /* ignorieren */ }
    if (ok) { show(); return; }
    el.innerHTML = `<div class="map-ph"><span class="pin"></span>${tx('p', 'map.p')}<div class="actions"><button type="button" class="btn" data-map-load>${icon('pin')}${tx('span', 'map.load')}</button><a class="btn ghost" target="_blank" rel="noopener" href="${esc(S.mapLink)}" data-i18n="map.open">${de('map.open')}</a></div></div>`;
    $('[data-map-load]', el).addEventListener('click', show);
  });
  const sel = $('#service');
  if (sel) {
    const opt = (v, k) => `<option value="${esc(v)}" data-i18n="${k}">${esc(de(k))}</option>`;
    sel.innerHTML = `<option value="" disabled selected data-i18n="form.choose">${esc(de('form.choose'))}</option>`
      + S.services.map(s => opt(de(`svc.${s.id}.t`), `svc.${s.id}.t`)).join('')
      + opt('Sonstiges', 'svc.other.opt');
  }
  $$('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); });
  $$('[data-call]').forEach(a => { a.href = tel(S.mobile); });
  const vals = { name: S.name, phone: S.phone, mobile: S.mobile, email: S.email, gisa: S.gisa, uid: S.uid, street: A.street, zip: A.zip, city: A.city, domain: S.domain };
  $$('[data-site]').forEach(el => {
    const k = el.dataset.site, v = vals[k];
    if (v == null) return;
    el.textContent = v;
    if (el.tagName === 'A') el.href = k === 'email' ? 'mailto:' + v : (k === 'phone' || k === 'mobile') ? tel(v) : v;
  });

  /* ---------- Sprache ---------- */
  const codes = S.languages.map(l => l.code);
  function apply(l) {
    lang = l;
    const meta = S.languages.find(x => x.code === l) || S.languages[0];
    root.lang = l;
    root.dir = meta.dir || 'ltr';
    $$('[data-i18n]').forEach(el => {
      if (el._de === undefined) el._de = el.innerHTML;
      el.innerHTML = l === 'de' ? el._de : ((D[l] && D[l][el.dataset.i18n]) ?? el._de);
    });
    $$('[data-i18n-attr]').forEach(el => {
      el._dea = el._dea || {};
      el.dataset.i18nAttr.split(';').forEach(p => {
        const [a, k] = p.split(':');
        if (!(a in el._dea)) el._dea[a] = el.getAttribute(a) || '';
        el.setAttribute(a, l === 'de' ? el._dea[a] : ((D[l] && D[l][k]) ?? el._dea[a]));
      });
    });
    $$('[data-wa]').forEach(a => { a.href = waHref(); });
    $$('.map iframe').forEach(f => { f.title = tr('map.title'); });
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  }
  const load = code => new Promise(res => {
    if (code === 'de' || D[code]) return res();
    const s = document.createElement('script');
    s.src = `assets/lang/${code}.js`;
    s.onload = s.onerror = () => res();
    document.head.appendChild(s);
  });
  async function setLang(code, save = true) {
    if (!codes.includes(code)) code = S.defaultLang;
    await load(code);
    apply(code);
    if (save) { try { localStorage.setItem('lang', code); } catch (e) { /* ignorieren */ } }
  }
  function pick() {
    const q = new URLSearchParams(location.search).get('lang');
    if (codes.includes(q)) return q;
    try { const s = localStorage.getItem('lang'); if (codes.includes(s)) return s; } catch (e) { /* ignorieren */ }
    if (S.autoDetect) {
      const n = (navigator.languages || [navigator.language || '']).map(x => x.slice(0, 2).toLowerCase()).find(x => codes.includes(x));
      if (n) return n;
    }
    return S.defaultLang;
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(pick(), false);

  /* ---------- Menü ---------- */
  const hdr = $('#site-header');
  const toggle = $('.nav-toggle');
  const closeSubs = () => $$('.has-sub.open').forEach(li => { li.classList.remove('open'); li.firstElementChild.setAttribute('aria-expanded', 'false'); });
  toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(hdr.classList.toggle('nav-open'))));
  $$('.sub-btn').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, open = !li.classList.contains('open');
    closeSubs();
    li.classList.toggle('open', open);
    b.setAttribute('aria-expanded', String(open));
  }));
  $$('.nav a').forEach(a => a.addEventListener('click', () => { hdr.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); closeSubs(); }));
  document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeSubs(); hdr.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false');
  });
  $('.theme-toggle').addEventListener('click', () => {
    root.classList.add('theme-fade');
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    setTimeout(() => root.classList.remove('theme-fade'), 700);
  });
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Einblenden beim Scrollen ---------- */
  const targets = $$('.hero .wrap > *, .page-head .wrap > *, .sec .wrap > *, .svc, .row, .steps li, .gallery figure, .lsteps li, .faq details, .chips li, .pgroup, .rcard, .tl li, .cv-grid > div');
  targets.forEach(el => {
    el.classList.add('reveal');
    const idx = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--d', Math.min(idx, 6) * 70 + 'ms');
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(el => io.observe(el));
  } else targets.forEach(el => el.classList.add('in'));
  setTimeout(() => targets.forEach(el => el.classList.add('in')), 4000);   // Sicherheitsnetz

  /* ---------- Kontaktformular (Web3Forms) ---------- */
  const form = $('#contact-form');
  if (form) {
    form.elements.access_key.value = S.formKey;
    const st = $('#form-status'), btn = $('button[type="submit"]', form);
    const show = k => {
      st.className = 'status ' + k;
      st.dataset.i18n = 'form.' + k;
      delete st._de;
      st.innerHTML = de('form.' + k);
      apply(lang);
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.elements.botcheck.checked) return;
      btn.disabled = true;
      try {
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error('send');
        form.reset();
        show('ok');
      } catch (err) { show('err'); }
      btn.disabled = false;
    });
  }
})();
