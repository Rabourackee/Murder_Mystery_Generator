/* 渲染：把案件对象排成卷宗（HTML 字符串），以及图鉴、戒律书、纯文本导出。界面文字取自 MM.STR[lang].r */
window.MM = window.MM || {};

(function () {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const SPEC_KEYS = ['classic', 'shin', 'special', 'social', 'dark', 'soft'];

  function people(c) {
    const list = [c.D, c.W, c.victim].concat(c.suspects, c.official ? [c.official] : []);
    return list.filter((p, i) => list.indexOf(p) === i);
  }

  /* 人名高亮：转义后把登场人物名字包进 span */
  function highlighter(c) {
    const ps = people(c).slice().sort((a, b) => b.name.length - a.name.length);
    const re = new RegExp(ps.map(p => reEsc(esc(p.name))).join('|'), 'g');
    const isC = new Set(c.culprits.map(p => esc(p.name)));
    return s => esc(s).replace(re, m => '<span class="nm' + (isC.has(m) ? ' is-culprit' : '') + '">' + m + '</span>');
  }

  const sec = (pair, body) => '<section class="sec"><div class="sec-head"><h2>' + esc(pair[0]) + '</h2><span class="en">' + esc(pair[1]) + '</span></div>' + body + '</section>';
  const work = (T, x) => MM.fill(T.work, { w: esc(x.w), a: esc(x.a) });

  function gauge(label, v, note) {
    const L = Math.PI * 50;
    return '<div class="gauge"><svg viewBox="0 0 120 72" role="img" aria-label="' + esc(label) + ' ' + v + '">' +
      '<path class="gauge-track" d="M10 62 A50 50 0 0 1 110 62"/>' +
      '<path class="gauge-fill" d="M10 62 A50 50 0 0 1 110 62" stroke-dasharray="' + L.toFixed(1) + '" stroke-dashoffset="' + (L * (1 - v / 100)).toFixed(1) + '"/>' +
      '<text class="gauge-val" x="60" y="60" text-anchor="middle">' + v + '</text></svg>' +
      '<div class="gauge-label">' + esc(label) + '</div><div class="gauge-note">' + esc(note) + '</div></div>';
  }

  function spectrum(spec, T) {
    const total = SPEC_KEYS.reduce((a, k) => a + spec[k], 0) || 1;
    const top = SPEC_KEYS.reduce((a, k) => (spec[k] > spec[a] ? k : a), SPEC_KEYS[0]);
    return '<div class="spectrum"><div class="spectrum-title">' + esc(T.specTitle) + '</div>' + SPEC_KEYS.map(k => {
      const pct = Math.round(spec[k] / total * 100);
      return '<div class="spec-row' + (k === top ? ' top' : '') + '"><span>' + esc(T.spec[k]) + '</span><span class="spec-bar"><i style="width:' + pct + '%"></i></span><b>' + pct + '%</b></div>';
    }).join('') + '</div>';
  }

  /* 房间名过长时折成两行：中文按字数，英文在最接近中点的空格处 */
  function splitLabel(label, max) {
    if (label.length <= max) return [label];
    const mid = Math.ceil(label.length / 2);
    if (!label.includes(' ')) return [label.slice(0, mid), label.slice(mid)];
    let best = -1;
    for (let i = 0; i < label.length; i++) if (label[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
    return [label.slice(0, best), label.slice(best + 1)];
  }

  /* 现场见取图 */
  function floorplan(c, T) {
    const r = MM.stream(c.seed, 'map');
    const strip = s => (c.lang === 'en' ? s.replace(/^the /i, '') : s);
    const rooms = [{ label: strip(c.ctx.R), sub: T.scene, crime: true }, { label: strip(c.ctx.R2), sub: '' }]
      .concat(c.setting.common.filter(x => x !== c.ctx.R2).map(x => ({ label: strip(x), sub: '' })))
      .concat([c.victim].concat(c.suspects).slice(0, 7).map(p => ({ label: p.name, sub: T.room })));
    const shuffled = r.shuffle(rooms);
    const oneRow = ['train', 'airship'].includes(c.setting.id);
    const cols = oneRow ? shuffled.length : Math.ceil(shuffled.length / 2);
    const W = 720, RH = 104, CH = 40, PAD = 10;
    const rw = (W - PAD * 2) / cols;
    const H = oneRow ? RH + CH + PAD * 2 + 20 : RH * 2 + CH + PAD * 2 + 20;
    let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T.mapAria) + '">';
    const corrY = PAD + RH;
    svg += '<rect class="fp-corr" x="' + PAD + '" y="' + corrY + '" width="' + (W - PAD * 2) + '" height="' + CH + '"/>';
    svg += '<text class="fp-sub" x="' + (W / 2) + '" y="' + (corrY + CH / 2 + 4) + '" text-anchor="middle">' + esc(c.setting.id === 'train' ? T.trainCorridor : T.corridor) + '</text>';
    shuffled.forEach((room, i) => {
      const row = oneRow ? 0 : (i < cols ? 0 : 1);
      const col = oneRow ? i : i % cols;
      const x = PAD + col * rw, y = row === 0 ? PAD : corrY + CH;
      svg += '<rect class="fp-room' + (room.crime ? ' crime' : '') + '" x="' + x.toFixed(1) + '" y="' + y + '" width="' + rw.toFixed(1) + '" height="' + RH + '"/>';
      const dy = row === 0 ? y + RH : y;
      const dx = x + rw * (0.3 + 0.4 * r.next());
      svg += '<line class="fp-door" x1="' + (dx - 9).toFixed(1) + '" y1="' + dy + '" x2="' + (dx + 9).toFixed(1) + '" y2="' + dy + '"/>';
      const lines = splitLabel(room.label, T.mapSplit);
      const cy = y + RH / 2 - (lines.length - 1) * 8;
      lines.forEach((ln, k) => { svg += '<text class="fp-label" x="' + (x + rw / 2).toFixed(1) + '" y="' + (cy + k * 16) + '" text-anchor="middle">' + esc(ln) + '</text>'; });
      if (room.sub) svg += '<text class="fp-sub" x="' + (x + rw / 2).toFixed(1) + '" y="' + (cy + lines.length * 16) + '" text-anchor="middle">' + esc(room.sub) + '</text>';
      if (room.crime) {
        const ox = x + rw - 20, oy = y + 18;
        svg += '<line class="fp-x" x1="' + (ox - 7) + '" y1="' + (oy - 7) + '" x2="' + (ox + 7) + '" y2="' + (oy + 7) + '"/><line class="fp-x" x1="' + (ox + 7) + '" y1="' + (oy - 7) + '" x2="' + (ox - 7) + '" y2="' + (oy + 7) + '"/>';
      }
    });
    svg += '<text class="fp-sub" x="' + (W - PAD) + '" y="' + (H - 4) + '" text-anchor="end">' + esc(T.scale) + '</text></svg>';
    return '<div class="floorplan">' + svg + '</div><div class="fp-caption">' + esc(MM.fill(T.mapCaption, { PF: c.ctx.PF })) + '</div>';
  }

  /* ---------- 卷宗 ---------- */
  MM.renderCase = function (c, st) {
    const L = MM.lib(c.lang), T = L.S.r;
    const CAT = id => L.TRICK_CATS.find(x => x.id === id) || { en: id };
    const h = highlighter(c);
    const ctx = c.ctx;
    const isC = p => c.culprits.includes(p);
    let out = '';

    /* 封面 */
    const stamps = c.flavors.map((f, i) => '<span class="ink-stamp' + (i % 2 ? ' blue' : '') + '">' + esc(f.name) + '</span>').join('');
    out += '<header class="cover"><div class="confidential">' + esc(T.confidential) + '</div>' +
      '<div class="cover-no">' + esc(MM.fill(T.caseFile, { seed: c.seed })) + '</div>' +
      '<h1 class="cover-title">' + esc(c.title) + '</h1>' +
      '<div class="cover-genre">' + esc(c.genre) + '</div>' +
      (stamps ? '<div class="cover-stamps">' + stamps + '</div>' : '') + '</header>';

    out += '<div class="meters">' + gauge(T.gWow, c.scores.wow, T.gWowN) + gauge(T.gFair, c.scores.fair, T.gFairN) +
      gauge(T.gPure, c.scores.purity, T.gPureN) + spectrum(c.spec, T) + '</div>';

    /* 舞台 */
    const F = T.facts;
    const facts = [[F.setting, ctx.PF], [F.type, c.setting.name], [F.era, c.era], [F.detective, ctx.D + ' (' + c.detective.name + ')'],
      [F.victim, ctx.V + (c.victim2 ? T.victimsEtc : '')], [F.weapon, ctx.WP]];
    if (c.lang === 'zh') facts[3][1] = ctx.D + '（' + c.detective.name + '）';
    let stage = '<dl class="dossier-facts">' + facts.map(f => '<div class="fact"><dt>' + esc(f[0]) + '</dt><dd>' + h(c.lang === 'en' ? MM.capitalize(f[1]) : f[1]) + '</dd></div>').join('') + '</dl>';
    const rules = c.flavors.filter(f => f.rule);
    if (rules.length) stage += '<div class="special-rule" data-label="' + esc(T.specialRule) + '">' + rules.map(f => '<p>' + h(MM.fill(f.rule, ctx)) + '</p>').join('') + '</div>';
    out += sec(T.sec.dossier, stage);

    /* 登场人物 */
    const row = p => '<tr class="' + (isC(p) ? 'is-culprit-row' : '') + (st.accused === p.key ? ' accused' : '') + '"><td>' + esc(p.name) +
      (p.nick ? '<span class="nick">' + esc(MM.fill(T.nick, { n: p.nick })) + '</span>' : '') + '<span class="verdict-stamp">' + esc(T.culpritStamp) + '</span></td><td>' + esc(p.role) + '</td><td>' + h(p.rel || '') + '</td></tr>';
    const group = label => '<tr class="group"><td colspan="3">' + esc(label) + '</td></tr>';
    let cast = '<table class="cast"><tbody>';
    cast += group(T.groups.det) + row(c.D) + row(c.W);
    cast += group(T.groups.vic) + row(c.victim);
    cast += group(T.groups.sus) + c.suspects.map(row).join('');
    if (c.official) cast += group(T.groups.off) + row(c.official);
    cast += '</tbody></table>';
    out += sec(T.sec.cast, cast);

    out += sec(T.sec.map, floorplan(c, T));

    /* 正文 */
    const [q0, q1] = T.txt.q;
    let body = '';
    c.chapters.forEach(ch => {
      body += '<div class="chapter"><div class="chapter-head"><div class="chapter-no">' + esc(ch.title) + '</div><h3 class="chapter-title">' + esc(ch.sub) + '</h3></div>';
      body += ch.paras.map(p => '<p>' + h(p) + '</p>').join('');
      if (ch.testimony) {
        body += '<ul class="testimony">' + c.suspects.filter(s => s.alibi).map(s => '<li><span class="who">' + h(s.name) + '</span>' + esc(T.txt.colon) + esc(q0) + h(s.alibi) + esc(q1) + '</li>').join('') + '</ul>';
      }
      body += '</div>';
    });
    out += sec(T.sec.story, body);

    /* 证物 */
    const cap = c.lang === 'en' ? MM.capitalize : (s => s);
    const cards = c.clues.map(cl => '<button class="card ' + cl.kind + (st.marked.has(cl.no) ? ' marked' : '') + '" data-clue="' + cl.no + '"><span class="card-no" data-mark="' + esc(T.marked) + '">No.' + String(cl.no).padStart(2, '0') + '</span>' +
      h(cap(cl.text)) + '<span class="card-verdict ' + cl.kind + '">' + esc(T.verdict[cl.kind]) + '</span></button>').join('');
    out += sec(T.sec.evidence, '<div class="evidence">' + cards + '</div><div class="evidence-hint">' + esc(T.evHint) + '</div>');

    /* 挑战书 */
    const accuse = '<div class="accuse"><div class="accuse-label">' + esc(T.accuseLabel) + '</div><div class="accuse-list">' +
      people(c).map(p => '<button class="accuse-btn" data-accuse="' + p.key + '" aria-pressed="' + (st.accused === p.key) + '">' + esc(p.name) + '</button>').join('') + '</div></div>';
    if (c.challenge) {
      const q = MM.fill(c.inverted ? T.chInverted : T.chNormal, { D: ctx.D });
      out += '<div class="challenge"><h3>' + esc(T.chTitle) + '</h3><div class="en">' + esc(T.chSub) + '</div>' +
        '<p>' + h(q) + '</p><p>' + esc(T.chClose) + '</p><p class="sign">' + esc(T.chSign) + '</p>' + accuse +
        '<button class="wax" id="breakSeal">' + T.seal + '</button></div><div class="challenge-gap"></div>';
    } else {
      out += '<div class="challenge"><h3>' + esc(T.sealedTitle) + '</h3><div class="en">' + esc(T.sealedSub) + '</div>' + accuse +
        '<button class="wax" id="breakSeal">' + esc(T.sealPlain) + '</button></div><div class="challenge-gap"></div>';
    }

    /* 解答 */
    let sol = '';
    sol += c.falseSolutions.map((fs, i) => '<div class="false-sol"><span class="rej">' + esc(T.rejected) + '</span><h4>' +
      h(MM.fill(T.falseTitle, { n: T.ordinals[i], by: fs.by })) + '<span class="accused">' + h(fs.accused) + '</span></h4>' +
      '<p>' + h(fs.reason) + '</p><p>' + h(fs.refute) + '</p></div>').join('');
    let judge = '';
    const accused = people(c).find(p => p.key === st.accused);
    if (accused) {
      const right = isC(accused);
      judge = '<div class="judge ' + (right ? 'right' : 'wrong') + '">' + esc(MM.fill(T.judge, { name: accused.name })) + esc(right ? T.right : T.wrong) + '</div>';
    }
    sol += '<div class="culprit-reveal"><div class="lbl">' + esc(T.culpritLbl) + '</div><div class="name">' + esc(c.solution.culprit) + '</div>' + judge + '</div>';
    sol += c.solution.steps.map(s => '<div class="method"><h4><span class="cat-tag">' + esc(CAT(s.cat).en) + '</span>' + esc(s.name) + '</h4><ol>' + s.steps.map(x => '<li>' + h(x) + '</li>').join('') + '</ol></div>').join('');
    sol += '<div class="tell-box" data-label="' + esc(T.tell) + '">' + h(c.solution.tell) + '</div>';
    sol += '<div class="motive-box"><h4>' + esc(MM.fill(T.motive, { name: c.motive.name })) + '</h4><p>' + h(c.solution.motive) + '</p></div>';
    if (c.solution.twists.length) sol += '<div class="twist">' + c.solution.twists.map(t => '<p>' + h(t) + '</p>').join('') + '</div>';
    sol += '<div class="chapter"><div class="chapter-head"><div class="chapter-no">' + esc(T.epiNo) + '</div><h3 class="chapter-title">' + esc(T.epiTitle) + '</h3></div>' + c.epilogue.map(p => '<p>' + h(p) + '</p>').join('') + '</div>';

    /* 构筑笔记（作者用） */
    const tips = c.tricks.filter(t => t.tip).map(t => '<li><b>' + esc(t.name) + esc(T.txt.colon) + '</b>' + esc(t.tip) + '</li>').join('');
    const refs = c.tricks.concat(c.flavors).flatMap(el => (el.ex || []).map(x => '<li><span class="ref-src">' + esc(el.name) + '</span><span class="spoiler" tabindex="0">' + work(T, x) + '</span></li>')).join('');
    let notes = '';
    if (tips) notes += '<h4>' + esc(T.tips) + '</h4><ul class="tips">' + tips + '</ul>';
    if (refs) notes += '<h4>' + esc(T.refs) + '</h4><ul class="refs">' + refs + '</ul>';

    const kHit = c.rules.knox.filter(x => x.hit).length, vHit = c.rules.vandine.filter(x => x.hit).length;
    const ruleLine = x => '<div class="rule-line ' + (x.hit ? 'bad' : 'ok') + '"><span class="n">' + x.rule.no + '</span><span>' + esc(x.rule.text) +
      (x.hit ? '<span class="why">' + esc(T.broke) + x.hit.map(t => esc(L.TAG_NAMES[t] || t)).join(esc(T.listSep)) + '</span>' : '') + '</span><span class="mark">' + esc(x.hit ? T.bad : T.ok) + '</span></div>';
    const clean = n => n ? '' : '<div class="rule-line clean"><span class="n">✓</span><span>' + esc(T.allOk) + '</span><span></span></div>';
    const rulesHtml = '<div class="rules-summary"><span>' + MM.fill(T.knoxSum, { n: kHit }) + '</span><span>' + MM.fill(T.vdSum, { n: vHit }) + '</span>' +
      '<button class="link-btn" id="toggleRules" data-more="' + esc(T.showAll) + '" data-less="' + esc(T.showBad) + '">' + esc(T.showAll) + '</button></div>' +
      '<div class="rules-cols" id="rulesCols"><div class="rules-col"><h4>' + esc(T.knox) + '</h4>' + clean(kHit) + c.rules.knox.map(ruleLine).join('') +
      '</div><div class="rules-col"><h4>' + esc(T.vd) + '</h4>' + clean(vHit) + c.rules.vandine.map(ruleLine).join('') + '</div></div>';

    out += '<div class="solution">' + sec(T.sec.solution, sol) + sec(T.sec.audit, rulesHtml) + (notes ? sec(T.sec.notes, notes) : '') + '</div>';
    return out;
  };

  /* ---------- 诡计图鉴 ---------- */
  const stars = n => '●'.repeat(n) + '○'.repeat(5 - n);

  MM.renderAtlas = function (lang) {
    const L = MM.lib(lang), T = L.S.r;
    const exHtml = ex => (ex || []).map(x => '<span class="spoiler" tabindex="0">' + work(T, x) + '</span>').join(esc(T.refSep));
    const tagHtml = tags => (tags || []).length ? '<div class="tags">' + tags.map(t => '<span class="tagpill">' + esc(L.TAG_NAMES[t] || t) + '</span>').join('') + '</div>' : '';
    const searchOf = parts => esc(parts.join(' '));
    let out = L.TRICK_CATS.map(cat => {
      const items = L.TRICKS.filter(t => t.cat === cat.id).map(t => {
        const base = MM.TRICKS.find(b => b.id === t.id);
        return '<article class="entry" data-search="' + searchOf([t.name, base.name, t.desc, (t.ex || []).map(x => x.w + ' ' + x.a).join(' '), cat.name]) + '"><h4>' + esc(t.name) + '<span class="school ' + t.school + '">' + esc(T.school[t.school]) + '</span></h4>' +
          '<div class="dots"><span>' + esc(T.wow) + ' <b>' + stars(t.wow) + '</b></span><span>' + esc(T.fair) + ' <b>' + stars(t.fair) + '</b></span></div>' +
          '<div>' + esc(t.desc) + '</div>' + (t.tip ? '<div class="tip">✎ ' + esc(t.tip) + '</div>' : '') + tagHtml(t.tags) +
          '<div class="entry-foot"><span>' + exHtml(t.ex) + '</span><button class="use-btn" data-use="core:' + t.id + '">' + esc(T.useCore) + '</button></div></article>';
      }).join('');
      return '<section class="atlas-cat"><div class="atlas-cat-head"><h3>' + esc(cat.name) + '</h3><span class="en">' + esc(cat.en) + '</span><p>' + esc(cat.desc) + '</p></div><div class="atlas-grid">' + items + '</div></section>';
    }).join('');
    out += L.FLAVOR_SCHOOLS.map(sc => {
      const items = L.FLAVORS.filter(f => f.school === sc.id).map(f => {
        return '<article class="entry" data-search="' + searchOf([f.name, f.desc, sc.name, (f.ex || []).map(x => x.w + ' ' + x.a).join(' ')]) + '"><h4>' + esc(f.name) + '<span class="school shin">' + esc(T.flavorBadge) + '</span></h4>' +
          '<div>' + esc(f.desc) + '</div>' + tagHtml(f.tags) +
          '<div class="entry-foot"><span>' + exHtml(f.ex) + '</span><button class="use-btn" data-use="flavor:' + f.id + '">' + esc(T.useFlavor) + '</button></div></article>';
      }).join('');
      return '<section class="atlas-cat"><div class="atlas-cat-head"><h3>' + esc(MM.fill(T.flavorCat, { name: sc.name })) + '</h3><span class="en">' + esc(sc.en) + '</span></div><div class="atlas-grid">' + items + '</div></section>';
    }).join('');
    return out;
  };

  /* ---------- 戒律书 ---------- */
  MM.renderRulebook = function (lang) {
    const L = MM.lib(lang), T = L.S.r;
    const carriers = tags => {
      if (!tags.length) return '';
      const els = [].concat(L.TRICKS, L.FLAVORS, L.DETECTIVES, L.MOTIVES).filter(el => (el.tags || []).some(t => tags.includes(t)));
      return els.length ? '<span class="breakers">' + esc(T.breakers) + els.map(el => '<em>' + esc(el.name) + '</em>').join(esc(T.listSep)) + '</span>' : '';
    };
    const book = (title, list) => '<div class="rulebook"><h3>' + esc(title) + '</h3><ol>' + list.map(r => '<li><span class="n">' + r.no + '</span><span>' + esc(r.text) +
      (r.gloss ? '<span class="gloss">' + esc(r.gloss) + '</span>' : '') + carriers(r.tags) + '</span></li>').join('') + '</ol></div>';
    return book(T.knoxBook, L.KNOX) + book(T.vdBook, L.VANDINE);
  };

  /* ---------- 纯文本导出 ---------- */
  MM.toText = function (c) {
    const L = MM.lib(c.lang), X = L.S.r.txt;
    const out = [];
    out.push('# ' + c.title, MM.fill(X.head, { genre: c.genre, seed: c.seed }), '');
    if (c.flavors.length) out.push(X.flavors + c.flavors.map(f => f.name).join(L.S.r.listSep), '');
    out.push(X.cast);
    people(c).forEach(p => out.push('- ' + p.name + (p.nick ? MM.fill(L.S.r.nick, { n: p.nick }) : '') + X.sep + p.role + (p.rel ? X.sep + p.rel : '')));
    c.flavors.filter(f => f.rule).forEach(f => out.push('', X.rule + MM.fill(f.rule, c.ctx)));
    c.chapters.forEach(ch => {
      out.push('', '## ' + ch.title + X.sep + ch.sub);
      ch.paras.forEach(p => out.push(p));
      if (ch.testimony) c.suspects.forEach(s => out.push('- ' + s.name + X.colon + X.q[0] + s.alibi + X.q[1]));
    });
    out.push('', X.evidence);
    c.clues.forEach(cl => out.push('No.' + cl.no + ' ' + (c.lang === 'en' ? MM.capitalize(cl.text) : cl.text)));
    out.push('', '---', '', X.solution);
    c.falseSolutions.forEach((fs, i) => out.push(MM.fill(X.falseSol, { n: L.S.r.ordinals[i], by: fs.by, who: fs.accused }) + ' ' + fs.reason + ' ' + fs.refute));
    out.push(X.culprit + c.solution.culprit);
    c.solution.steps.forEach(s => { out.push('', '### ' + s.name); s.steps.forEach((x, i) => out.push((i + 1) + '. ' + x)); });
    out.push('', X.tell + c.solution.tell, '', MM.fill(X.motive, { name: c.motive.name }) + c.solution.motive);
    c.solution.twists.forEach(t => out.push('', t));
    out.push('', X.epi);
    c.epilogue.forEach(p => out.push(p));
    return out.join('\n');
  };
})();
