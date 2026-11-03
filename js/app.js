/* 交互：构筑台、卷宗、图鉴、语言切换、链接分享 */
(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LOCK_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>';

  function preferredLang() {
    try { const v = localStorage.getItem('mm-lang'); if (MM.STR[v]) return v; } catch (e) { /* 隐私模式等 */ }
    return /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  const DEFAULTS = () => ({
    seed: MM.newSeed(), lang: preferredLang(), setting: '', detective: '', core: '', sub: '', motive: '', names: 'jp',
    cats: MM.TRICK_CATS.map(c => c.id), flavors: [], flavorRandom: 1, challenge: true, strict: false, serial: false
  });
  let cfg = DEFAULTS();
  let current = null;
  let view = { revealed: false, accused: null, marked: new Set() };
  const L = () => MM.lib(cfg.lang);
  const U = () => L().S.ui;

  /* ---------- 静态文字 ---------- */
  function applyStatic() {
    const u = U();
    document.documentElement.lang = cfg.lang === 'zh' ? 'zh-CN' : 'en';
    $$('[data-i18n]').forEach(el => { el.textContent = u[el.dataset.i18n]; });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = u[el.dataset.i18nHtml]; });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = u[el.dataset.i18nPh]; });
    $$('[data-i18n-title]').forEach(el => { el.title = u[el.dataset.i18nTitle]; });
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', u[el.dataset.i18nAria]));
    $$('[data-i18n-num]').forEach(el => { el.textContent = u.nums[+el.dataset.i18nNum]; });
    $$('#flavorRandom option').forEach((o, i) => { o.textContent = u.flavorOpts[i]; });
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === cfg.lang));
  }

  /* ---------- 要素槽位 ---------- */
  const opts = list => list.map(x => '<option value="' + x.id + '">' + esc(x.name) + '</option>').join('');
  const SLOTS = [
    { key: 'setting', html: l => opts(l.SETTINGS), cur: c => c.setting.id, show: c => c.setting.name },
    { key: 'detective', html: l => opts(l.DETECTIVES), cur: c => c.detective.id, show: c => c.detective.name },
    { key: 'core', html: l => l.TRICK_CATS.map(g => '<optgroup label="' + esc(g.name) + '">' + opts(l.TRICKS.filter(t => t.cat === g.id)) + '</optgroup>').join(''),
      cur: c => c.core.id, show: c => c.core.name, spoil: true },
    { key: 'sub', html: l => l.S.ui.subOpts.map((s, i) => '<option value="' + i + '">' + esc(s) + '</option>').join(''),
      cur: c => String(c.subs.length), show: c => c.subs.map(s => s.name).join(L().S.r.listSep) || U().none, spoil: true },
    { key: 'motive', html: l => opts(l.MOTIVES), cur: c => c.motive.id, show: c => c.motive.name },
    { key: 'names', fixed: true, html: l => Object.keys(l.NAMES).map(k => '<option value="' + k + '">' + esc(l.NAMES[k].label) + '</option>').join('') }
  ];

  function renderSlots() {
    const l = L(), u = l.S.ui;
    $('#slots').innerHTML = SLOTS.map(s => '<div class="slot" data-slot="' + s.key + '"><span class="slot-label">' + esc(u.slots[s.key]) + '</span>' +
      '<select aria-label="' + esc(u.slots[s.key]) + '">' + (s.fixed ? '' : '<option value="">' + esc(u.random) + '</option>') + s.html(l) + '</select>' +
      (s.fixed ? '<span></span>' : '<button class="lock-btn" aria-pressed="false" title="' + esc(u.lockTitle) + '">' + LOCK_SVG + '</button>') +
      '<div class="slot-result"></div></div>').join('');
  }
  function bindSlots() {
    $('#slots').addEventListener('change', e => {
      const slot = e.target.closest('[data-slot]'); if (!slot) return;
      cfg[slot.dataset.slot] = e.target.value; regenerate();
    });
    $('#slots').addEventListener('click', e => {
      const lock = e.target.closest('.lock-btn'); if (!lock) return;
      const s = SLOTS.find(x => x.key === lock.closest('[data-slot]').dataset.slot);
      cfg[s.key] = cfg[s.key] ? '' : (current ? s.cur(current) : '');
      regenerate();
    });
  }
  function syncSlots() {
    SLOTS.forEach(s => {
      const el = $('[data-slot="' + s.key + '"]');
      el.querySelector('select').value = cfg[s.key];
      const locked = !s.fixed && !!cfg[s.key];
      el.classList.toggle('locked', locked);
      const lock = el.querySelector('.lock-btn');
      if (lock) lock.setAttribute('aria-pressed', locked);
      const res = el.querySelector('.slot-result');
      if (s.fixed || locked || !current) { res.innerHTML = ''; return; }
      const txt = esc(s.show(current));
      res.innerHTML = esc(U().thisTime) + (s.spoil ? '<span class="spoiler" tabindex="0">' + txt + '</span>' : txt);
    });
  }

  /* ---------- 诡计类别与风味 ---------- */
  function renderChips() {
    const l = L();
    $('#catChips').innerHTML = l.TRICK_CATS.map(c => '<button class="chip" data-cat="' + c.id + '" title="' + esc(c.desc) + '">' + esc(c.name) + '</button>').join('');
    $('#flavorCabinet').innerHTML = l.FLAVOR_SCHOOLS.map(sc => '<div class="shelf"><div class="shelf-head"><span class="shelf-name">' + esc(sc.name) + '</span><span class="shelf-en">' + esc(sc.en) + '</span></div>' +
      l.FLAVORS.filter(f => f.school === sc.id).map(f => '<button class="vial" data-flavor="' + f.id + '">' + esc(f.name) + '</button>').join('') + '</div>').join('');
  }
  function bindChips() {
    $('#catChips').addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      const id = b.dataset.cat;
      const on = cfg.cats.includes(id);
      if (on && cfg.cats.length === 1) return toast(U().toastCat);
      cfg.cats = on ? cfg.cats.filter(x => x !== id) : cfg.cats.concat(id);
      regenerate();
    });
    $('#flavorCabinet').addEventListener('click', e => {
      const b = e.target.closest('[data-flavor]'); if (!b) return;
      const id = b.dataset.flavor;
      cfg.flavors = cfg.flavors.includes(id) ? cfg.flavors.filter(x => x !== id) : cfg.flavors.concat(id);
      regenerate();
    });
  }
  function syncChips() {
    const l = L();
    $$('[data-cat]').forEach(b => b.setAttribute('aria-pressed', cfg.cats.includes(b.dataset.cat)));
    const auto = current ? current.flavors.map(f => f.id).filter(id => !cfg.flavors.includes(id)) : [];
    $$('[data-flavor]').forEach(b => {
      b.setAttribute('aria-pressed', cfg.flavors.includes(b.dataset.flavor));
      b.classList.toggle('auto', auto.includes(b.dataset.flavor));
      b.title = b.classList.contains('auto') ? l.S.ui.autoFlavor : l.FLAVORS.find(f => f.id === b.dataset.flavor).desc;
    });
    $('#flavorRandom').value = String(cfg.flavorRandom);
    $('#optChallenge').checked = cfg.challenge;
    $('#optStrict').checked = cfg.strict;
    $('#optSerial').checked = cfg.serial;
    $('#seedInput').value = cfg.seed;
  }

  /* ---------- 生成与渲染 ---------- */
  function regenerate(newSeed, keepView) {
    if (newSeed) cfg.seed = MM.newSeed();
    current = MM.generate(cfg);
    if (!keepView) view = { revealed: false, accused: null, marked: new Set() };
    renderCase(!keepView);
    syncSlots(); syncChips();
    $('#caseNo').textContent = cfg.seed;
    document.title = current.title + ' · ' + U().docTitle;
    try { history.replaceState(null, '', '#c=' + encodeCfg(cfg)); } catch (e) { /* file:// 下可能不可用 */ }
  }
  function renderCase(animate) {
    const el = $('#caseFile');
    el.innerHTML = MM.renderCase(current, view);
    el.classList.toggle('revealed', view.revealed);
    if (animate) { el.classList.remove('rebuilding'); void el.offsetWidth; el.classList.add('rebuilding'); }
  }

  function setLang(lang) {
    if (lang === cfg.lang || !MM.STR[lang]) return;
    cfg.lang = lang;
    try { localStorage.setItem('mm-lang', lang); } catch (e) { /* 忽略 */ }
    applyStatic(); renderSlots(); renderChips(); renderBooks();
    regenerate(false, true);
  }

  function bindCase() {
    $('#caseFile').addEventListener('click', e => {
      const card = e.target.closest('[data-clue]');
      if (card) {
        const no = +card.dataset.clue;
        view.marked.has(no) ? view.marked.delete(no) : view.marked.add(no);
        card.classList.toggle('marked');
        return;
      }
      const acc = e.target.closest('[data-accuse]');
      if (acc) {
        view.accused = view.accused === acc.dataset.accuse ? null : acc.dataset.accuse;
        renderCase(false);
        return;
      }
      if (e.target.closest('#breakSeal')) {
        $('#breakSeal').classList.add('broken');
        const opened = current;
        setTimeout(() => {
          if (current !== opened) return;
          view.revealed = true;
          renderCase(false);
          const sol = $('.solution');
          if (sol) sol.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 420);
        return;
      }
      const tog = e.target.closest('#toggleRules');
      if (tog) {
        const cols = $('#rulesCols');
        cols.classList.toggle('show-all');
        tog.textContent = cols.classList.contains('show-all') ? tog.dataset.less : tog.dataset.more;
        return;
      }
      const sp = e.target.closest('.spoiler');
      if (sp) sp.classList.toggle('open');
    });
  }

  /* ---------- 链接编码 ---------- */
  function encodeCfg(c) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(c)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function decodeCfg(s) {
    try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))))); } catch (e) { return null; }
  }

  /* ---------- 杂项 ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }
  function copy(text, ok) {
    const done = () => toast(ok);
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast(U().toastFail); }
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  function switchTab(id) {
    $$('.folder-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    $$('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + id));
  }

  function renderBooks() {
    $('#atlas').innerHTML = MM.renderAtlas(cfg.lang);
    $('#rulesBook').innerHTML = MM.renderRulebook(cfg.lang);
    filterAtlas();
  }
  function filterAtlas() {
    const q = $('#atlasSearch').value.trim().toLowerCase();
    $$('#atlas .atlas-cat').forEach(cat => {
      let any = false;
      cat.querySelectorAll('.entry').forEach(en => {
        const hit = !q || en.dataset.search.toLowerCase().includes(q);
        en.classList.toggle('hidden', !hit); any = any || hit;
      });
      cat.classList.toggle('hidden', !any);
    });
  }
  function bindBooks() {
    $('#atlasSearch').addEventListener('input', filterAtlas);
    $('#atlas').addEventListener('click', e => {
      const sp = e.target.closest('.spoiler');
      if (sp) { sp.classList.toggle('open'); return; }
      const b = e.target.closest('[data-use]'); if (!b) return;
      const [kind, id] = b.dataset.use.split(':');
      if (kind === 'core') cfg.core = id;
      if (kind === 'flavor' && !cfg.flavors.includes(id)) cfg.flavors = cfg.flavors.concat(id);
      switchTab('case');
      regenerate(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast(kind === 'core' ? U().toastCore : U().toastFlavor);
    });
  }

  function bindBench() {
    $$('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
    $$('.folder-tab').forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    $('#buildBtn').addEventListener('click', () => {
      const b = $('#buildBtn');
      b.classList.remove('pressing'); void b.offsetWidth; b.classList.add('pressing');
      regenerate(true);
      if (window.innerWidth <= 1020) $('.dossier-wrap').scrollIntoView({ behavior: 'smooth' });
    });
    $('#newSeedBtn').addEventListener('click', () => regenerate(true));
    $('#seedInput').addEventListener('change', e => {
      const v = e.target.value.trim().toUpperCase();
      if (v) { cfg.seed = v; regenerate(); }
    });
    $('#unlockAllBtn').addEventListener('click', () => {
      SLOTS.filter(s => !s.fixed).forEach(s => { cfg[s.key] = ''; });
      regenerate(); toast(U().toastUnlock);
    });
    $('#resetBtn').addEventListener('click', () => {
      const keep = { seed: cfg.seed, lang: cfg.lang };
      cfg = Object.assign(DEFAULTS(), keep);
      regenerate(); toast(U().toastReset);
    });
    $('#clearFlavors').addEventListener('click', () => { cfg.flavors = []; cfg.flavorRandom = 0; regenerate(); });
    $('#flavorRandom').addEventListener('change', e => { cfg.flavorRandom = +e.target.value; regenerate(); });
    $('#optChallenge').addEventListener('change', e => { cfg.challenge = e.target.checked; regenerate(); });
    $('#optStrict').addEventListener('change', e => { cfg.strict = e.target.checked; regenerate(); });
    $('#optSerial').addEventListener('change', e => { cfg.serial = e.target.checked; regenerate(); });
    $('#copyMdBtn').addEventListener('click', () => copy(MM.toText(current), U().toastText));
    $('#copyLinkBtn').addEventListener('click', () => copy(location.href, U().toastLink));
    $('#printBtn').addEventListener('click', () => window.print());
  }

  /* ---------- 启动 ---------- */
  function init() {
    const m = location.hash.match(/c=([\w-]+)/);
    const saved = m && decodeCfg(m[1]);
    if (saved) cfg = Object.assign(DEFAULTS(), saved);
    if (!MM.STR[cfg.lang]) cfg.lang = 'zh';
    applyStatic(); renderSlots(); renderChips(); renderBooks();
    bindSlots(); bindChips(); bindCase(); bindBooks(); bindBench();
    regenerate();
    if (window.console && MM.checkOverlay) {
      const issues = MM.checkOverlay('en');
      if (issues.length) console.warn('[i18n] en overlay issues:', issues);
    }
  }
  init();
})();
