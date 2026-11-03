/* 构筑引擎：把诡计、舞台、风味组装成一份案件卷宗（纯数据，不涉及 DOM）
 * 所有随机决定都只依赖结构（id、下标、性别），文本取自 MM.lib(lang)。
 * 因此同一编号在不同语言下得到的是同一个案件。
 */
window.MM = window.MM || {};

(function () {
  /* ---------- 可复现的随机数 ---------- */
  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* 每个方面使用独立的随机流，锁定一项不会打乱其他项 */
  function stream(seed, key) {
    const r = mulberry32(xmur3(seed + '|' + key)());
    const api = {
      next: r,
      int: n => Math.floor(r() * n),
      pick: arr => arr[Math.floor(r() * arr.length)],
      chance: p => r() < p,
      shuffle: arr => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
      }
    };
    api.take = (arr, n) => api.shuffle(arr).slice(0, n);
    return api;
  }
  MM.stream = stream;

  MM.newSeed = function () {
    const L = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const r = () => L[Math.floor(Math.random() * L.length)];
    return r() + r() + '-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  };

  const byId = (list, id) => list.find(x => x.id === id);
  const banned = (el, strict) => strict && (el.tags || []).some(t => MM.STRICT_BANNED.includes(t));
  const fill = (str, ctx) => String(str).replace(/\{(\w+)\}/g, (m, k) => (ctx[k] != null ? ctx[k] : m));
  MM.fill = fill;
  /* 中文地名的简称：取最后一个“的”之后的部分 */
  const zhShort = p => (p.includes('的') ? p.slice(p.lastIndexOf('的') + 1) : p);
  /* 英文标题大小写：虚词保持小写（句首除外） */
  const SMALL_WORDS = new Set(['of', 'the', 'and', 'for', 'a', 'an', 'in', 'on', 'at', 'to']);
  const titleCase = s => s.replace(/(^|[\s“‘"(-])([a-z])([\w’']*)/g,
    (m, a, b, rest, off) => (off === 0 || !SMALL_WORDS.has(b + rest) ? a + b.toUpperCase() + rest : m));

  /* ---------- 人名：姓与名各自不重复，避免读者把两个人看混 ---------- */
  function makeNamer(pool, rng) {
    const fams = rng.shuffle(pool.family);
    const givens = { m: rng.shuffle(pool.male), f: rng.shuffle(pool.female) };
    const gf = pool.order === 'gf', sep = pool.sep || '';
    let n = 0;
    const gi = { m: 0, f: 0 };
    return function (gender) {
      const g = gender || (rng.chance(0.5) ? 'm' : 'f');
      const fam = fams[n % fams.length], given = givens[g][gi[g]++ % givens[g].length];
      n++;
      return { name: gf ? given + sep + fam : fam + sep + given, gender: g };
    };
  }

  /* 描写“发现尸体”的诡计。同一案件中最多只用一个，否则开场会自相矛盾 */
  const BODY_TRICKS = new Set(['thread', 'timelag', 'firstfinder', 'remote', 'keyswap', 'passage', 'architecture', 'psychlock',
    'snowprint', 'fakesuicide', 'dismember', 'movebody', 'plainsight', 'vanish', 'faceless', 'nonhuman', 'ice', 'lamb',
    'whosecup', 'pagepoison', 'blindspot', 'accident', 'unknownpoison', 'mitate', 'abc', 'dying', 'swapvictim']);

  /* ---------- 主函数 ---------- */
  MM.generate = function (cfg) {
    const seed = cfg.seed || MM.newSeed();
    const lang = MM.STR[cfg.lang] ? cfg.lang : 'zh';
    const L = MM.lib(lang), G = L.S.gen;
    const post = lang === 'en' ? MM.capitalize : (s => s);
    const R = key => stream(seed, key);
    const strict = !!cfg.strict;

    /* 1. 风味 */
    const chosen = (cfg.flavors || []).map(id => byId(L.FLAVORS, id)).filter(Boolean);
    const extraPool = L.FLAVORS.filter(f => !chosen.includes(f) && !banned(f, strict));
    const extra = R('flavor').take(extraPool, cfg.flavorRandom || 0);
    const flavors = chosen.concat(extra);
    const fFirst = key => (flavors.find(f => f[key]) || {})[key];
    const hasStruct = s => flavors.some(f => f.struct === s);

    /* 2. 舞台 */
    const setting = byId(L.SETTINGS, cfg.setting) || byId(L.SETTINGS, fFirst('setting')) || R('setting').pick(L.SETTINGS);

    /* 3. 诡计 */
    const cats = cfg.cats && cfg.cats.length ? cfg.cats : L.TRICK_CATS.map(c => c.id);
    const fits = t => !banned(t, strict) && !(t.avoid || []).includes(setting.id);
    const trR = R('trick');
    let core = byId(L.TRICKS, cfg.core);
    if (!core) {
      const pool = L.TRICKS.filter(t => cats.includes(t.cat) && fits(t));
      core = trR.pick(pool.length ? pool : L.TRICKS.filter(fits));
    }
    const subCount = cfg.sub === '' || cfg.sub == null ? [0, 1, 1, 2][trR.int(4)] : +cfg.sub;
    const subs = [];
    const usedCats = new Set([core.cat]);
    let culpritRule = core.culprit || null;
    let hasBody = BODY_TRICKS.has(core.id);
    for (const t of trR.shuffle(L.TRICKS)) {
      if (subs.length >= subCount) break;
      if (usedCats.has(t.cat) || !cats.includes(t.cat) || !fits(t)) continue;
      if (t.culprit && culpritRule) continue;
      if (BODY_TRICKS.has(t.id) && hasBody) continue;
      subs.push(t); usedCats.add(t.cat);
      if (t.culprit) culpritRule = t.culprit;
      if (BODY_TRICKS.has(t.id)) hasBody = true;
    }
    const tricks = [core].concat(subs);
    const serial = !!cfg.serial || tricks.some(t => t.serial);

    /* 4. 侦探 */
    const detR = R('detective');
    const detective = byId(L.DETECTIVES, cfg.detective) || byId(L.DETECTIVES, fFirst('detective')) ||
      detR.pick(L.DETECTIVES.filter(d => !banned(d, strict) && d.id !== 'medium'));
    const watsonType = detR.pick(L.WATSONS);

    /* 5. 登场人物 */
    const namer = makeNamer(L.NAMES[cfg.names] || L.NAMES.jp, R('names'));
    const castR = R('cast');
    const victim = Object.assign(namer(), { key: 'V', role: G.victimRole, rel: G.settingVictim[setting.id] || castR.pick(L.VICTIM_ROLES) });
    const D = Object.assign(namer(detective.g), { key: 'D', role: detective.title });
    const W = Object.assign(namer(watsonType.g), { key: 'W', role: watsonType.r, rel: watsonType.d });

    const nSus = 4 + castR.int(3);
    let roles = castR.take(L.ROLES, nSus);
    if (culpritRule === 'servant' && !roles.some(r => r.servant)) roles[0] = L.ROLES.find(r => r.servant);
    const secrets = castR.take(L.SECRETS, nSus);
    const suspects = roles.map((r, i) => Object.assign(namer(r.g), { key: 's' + i, role: r.r, relT: r.rel, servant: !!r.servant, secret: secrets[i] }));

    let culprits = [];
    let official = null;
    const pickSuspect = () => suspects[castR.int(suspects.length)];
    switch (culpritRule) {
      case 'detective': culprits = [D]; break;
      case 'watson': culprits = [W]; break;
      case 'victim': culprits = [victim]; break;
      case 'all': culprits = suspects.slice(); break;
      case 'servant': culprits = [suspects.find(s => s.servant)]; break;
      case 'official':
        official = Object.assign(namer(), { key: 'O', role: G.officialRole, relT: G.officialRel });
        culprits = [official]; break;
      case 'child': {
        const c = pickSuspect();
        const alt = castR.pick(G.childAlts.filter(a => !a.g || a.g === c.gender));
        Object.assign(c, { role: alt.role, relT: alt.relT, secret: null }); culprits = [c]; break;
      }
      default: culprits = [pickSuspect()];
    }
    if (culpritRule === 'twin') culprits[0].twin = true;
    const isCulprit = p => culprits.includes(p);
    const innocents = suspects.filter(s => !isCulprit(s));
    const S1 = innocents[0] || suspects[0], S2 = innocents[1] || suspects[1] || S1;
    let victim2 = null;
    if (serial) {
      victim2 = innocents.find(s => s !== S1 && s !== S2) || suspects.find(s => !isCulprit(s) && s !== S1) || S2;
      victim2.second = true;
    }

    /* 6. 动机与凶器 */
    const motR = R('motive');
    const motive = byId(L.MOTIVES, cfg.motive) || byId(L.MOTIVES, core.motive) ||
      (culpritRule === 'all' ? byId(L.MOTIVES, 'revenge') : motR.pick(L.MOTIVES.filter(m => !banned(m, strict))));
    const wTrick = tricks.find(t => t.weapon);
    const kindTrick = tricks.find(t => t.weaponKind);
    const wpR = R('weapon');
    const weaponObj = wTrick ? { n: wTrick.weapon, tags: [] }
      : wpR.pick(kindTrick ? L.WEAPONS.filter(w => w.k === kindTrick.weaponKind) : L.WEAPONS);

    /* 7. 上下文 */
    const scR = R('scene');
    const times = L.TIMES;
    const ti = scR.int(times.length - 2);
    const tj = ti + 1 + scR.int(times.length - ti - 1);
    const rooms = scR.shuffle(setting.rooms);
    const periodFlavor = flavors.find(f => f.eras);
    const plIdx = scR.int(setting.places.length);
    const place = setting.places[plIdx];
    /* PF 全称只在首次登场时使用；中文简称取“的”之后，其他语言在数据里写成 [全称, 简称] */
    const [PF, P] = Array.isArray(place) ? place : [place, zhShort(place)];
    const ctx = {
      V: victim.name, D: D.name, W: W.name,
      C: culpritRule === 'all' ? G.all : culprits[0].name,
      S1: S1.name, S2: S2.name, V2: victim2 ? victim2.name : S2.name,
      PF, P, R: rooms[0], R2: rooms[1] || setting.common[0],
      WP: weaponObj.n, T1: times[tj], T2: times[ti],
      X: scR.pick(setting.items), N: 3 + scR.int(18), PAST: scR.pick(L.PAST_EVENTS),
      GROUND: ['snow', 'onsen', 'temple', 'lab', 'village'].includes(setting.id) ? G.ground.snow : G.ground.mud,
      ERA: periodFlavor ? scR.pick(periodFlavor.eras) : G.modernEra
    };
    /* 人称代词：{Vhe} {Vhim} {Vhis} 等（英文模板使用） */
    const pron = (k, p) => {
      const [he, him, his] = p === 'all' ? G.pron.all : G.pron[p.gender];
      ctx[k + 'he'] = he; ctx[k + 'him'] = him; ctx[k + 'his'] = his;
    };
    pron('V', victim); pron('D', D); pron('W', W); pron('S1', S1); pron('S2', S2);
    pron('V2', victim2 || S2); pron('C', culpritRule === 'all' ? 'all' : culprits[0]);

    const f = s => post(fill(s, ctx));
    suspects.forEach(s => {
      s.rel = fill(s.relT, ctx);
      if (s.secret) s.secret = { s: fill(s.secret.s, ctx), h: fill(s.secret.h, Object.assign({}, ctx, { S: s.name })) };
    });
    if (official) official.rel = official.relT;

    if (hasStruct('nicknames')) {
      const nicks = R('nick').shuffle(G.nicks);
      [victim].concat(suspects, [W]).forEach((p, i) => { p.nick = nicks[i % nicks.length]; });
    }

    /* 证词 */
    const alR = R('alibi');
    suspects.forEach(s => {
      const other = alR.pick(suspects.filter(o => o !== s)) || W;
      const tpl = isCulprit(s) && culpritRule !== 'all' ? G.strongAlibi : alR.pick(G.alibis);
      s.alibi = post(fill(tpl, Object.assign({}, ctx, { other: other.name, common: alR.pick(setting.common) })));
    });

    /* 8. 线索 */
    const clR = R('clue');
    let clues = [];
    /* 证物文本保持句中形态（英文不大写首字母），以便嵌入“依据是证物 No.x：……”；显示时再由渲染层处理 */
    const raw = s => fill(s, ctx);
    core.clues.forEach(c => clues.push({ text: raw(c), kind: 'true', src: core.id }));
    subs.forEach(t => clues.push({ text: raw(clR.pick(t.clues)), kind: 'true', src: t.id }));
    flavors.filter(fl => fl.clue).forEach(fl => clues.push({ text: raw(fl.clue), kind: 'true', src: fl.id }));
    clues.push({ text: raw(motive.hint), kind: 'true', src: 'motive' });
    const tellObs = core.obs ? raw(core.obs) : raw(core.tell).split(/——| — /)[0].replace(/[，,.]$/, '');
    clues.push({ text: tellObs, kind: 'decisive', src: core.id });
    [S1, S2].filter((s, i, a) => s && s.secret && a.indexOf(s) === i).forEach(s => {
      clues.push({ text: s.secret.h, kind: 'herring', src: 'secret', who: s.key });
    });
    clR.take(L.HERRINGS, 1 + clR.int(2)).forEach(h => clues.push({ text: raw(h), kind: 'herring', src: 'chance' }));
    clues = clR.shuffle(clues).map((c, i) => Object.assign(c, { no: i + 1 }));

    /* 9. 章节 */
    const chapters = [];
    const closure = fFirst('closure') ? fill(fFirst('closure'), ctx) : fill(scR.pick(setting.closure), ctx);
    const prologue = [f(setting.desc.replace('{P}', '{PF}'))];
    if (periodFlavor) prologue.unshift(f(periodFlavor.premise));
    flavors.filter(fl => fl.premise && fl !== periodFlavor).forEach(fl => prologue.push(f(fl.premise)));
    prologue.push(f(G.nightClosure.replace('{closure}', closure)) + G.sentenceSep + f(setting.closed ? G.cutOff : G.keptIn));
    if (culpritRule === 'twin') prologue.push(f(G.twin));
    /* 带 note 的叙述性诡计，setup 描述的是“本作的写法”，作为凡例放在序章开头 */
    tricks.filter(t => t.note).forEach(t => prologue.unshift(G.notePrefix + f(t.setup[0])));
    chapters.push({ key: 'prologue', title: G.ch.prologue, sub: lang === 'en' ? titleCase(ctx.P) : ctx.P, paras: prologue });

    if (hasStruct('inverted')) {
      chapters.push({ key: 'crime', title: G.crimeTitle, sub: G.crimeSub, paras: [f(G.crimeOpen)].concat(core.steps.map(f)) });
    }

    const storyTricks = tricks.filter(t => !t.note);
    const incident = storyTricks.map((t, i) => (i > 0 && BODY_TRICKS.has(storyTricks[0].id) ? G.meanwhile : '') + f(t.setup[0]));
    if (!hasBody) incident.unshift(f(scR.pick(G.discovery)));
    if (!tricks.some(t => t.weapon)) incident.push(f(G.weaponLine));
    chapters.push({ key: 'incident', title: G.ch.one, sub: G.sub.incident, paras: incident });

    const invest = [f(detective.method)];
    flavors.filter(fl => fl.scene).forEach(fl => invest.push(f(fl.scene)));
    invest.push(f(G.investSum.replace('{n}', clues.length)));
    chapters.push({ key: 'investigation', title: G.ch.two, sub: hasStruct('armchair') ? G.sub.retell : G.sub.invest, paras: invest, testimony: true });

    if (serial) {
      const p2 = [f(G.serial1) + (culpritRule === 'victim' ? '' : G.serialMore), f(G.serial2)];
      chapters.push({ key: 'second', title: G.ch.three, sub: G.sub.second, paras: p2 });
    }

    /* 10. 解答 */
    const falseSolutions = [];
    if (hasStruct('multi')) {
      const herr = clues.filter(c => c.kind === 'herring');
      const trueC = clues.filter(c => c.kind === 'true');
      [[W.name, S1], [G.officer, S2]].forEach(([who, s], i) => {
        const h = herr.find(c => c.who === s.key) || herr[i] || herr[0];
        const t = trueC[i % trueC.length];
        falseSolutions.push({
          by: who, accused: s.name,
          reason: h ? fill(G.reason, { no: h.no, text: h.text }) : '',
          refute: t ? fill(G.refute, { no: t.no, text: t.text }) : ''
        });
      });
    }
    const solution = {
      culprit: ctx.C,
      steps: tricks.map(t => ({ name: t.name, cat: t.cat, steps: t.steps.map(f) })),
      tell: f(core.tell),
      motive: f(motive.text),
      twists: flavors.filter(fl => fl.twist).map(fl => f(fl.twist))
    };
    if (culpritRule === 'detective') solution.twists.unshift(f(G.detTwist));

    const epilogue = flavors.filter(fl => fl.epilogue).map(fl => f(fl.epilogue));
    if (!epilogue.length) epilogue.push(f(G.epilogue));

    /* 11. 戒律与评分 */
    const tags = [];
    const addTags = el => (el && el.tags || []).forEach(t => tags.push(t));
    tricks.forEach(addTags); flavors.forEach(addTags); addTags(detective); addTags(motive); addTags(weaponObj);
    if (culprits.some(c => c.servant) && !tags.includes('servantCulprit')) tags.push('servantCulprit');
    const rules = MM.checkRules(tags, L.KNOX, L.VANDINE);
    const knoxHits = rules.knox.filter(r => r.hit).length;
    const vdHits = rules.vandine.filter(r => r.hit).length;

    const spec = { classic: 2, shin: 0, special: 0, social: 0, dark: 0, soft: 0 };
    tricks.forEach((t, i) => {
      const w = i === 0 ? 2 : 1;
      if (t.school === 'classic') spec.classic += 2 * w;
      if (t.school === 'shin') spec.shin += 2 * w;
      if (t.school === 'modern') { spec.classic += w; spec.social += w; }
    });
    flavors.forEach(fl => Object.keys(fl.spec || {}).forEach(k => { spec[k] += fl.spec[k]; }));

    const clamp = v => Math.max(0, Math.min(100, Math.round(v)));
    const fairAvg = (core.fair * 2 + subs.reduce((a, t) => a + t.fair, 0)) / (2 + subs.length);
    const scores = {
      wow: clamp(core.wow * 13 + subs.reduce((a, t) => a + t.wow * 5, 0) + (serial ? 5 : 0)),
      fair: clamp(fairAvg * 19 + (cfg.challenge ? 5 : 0) + (hasStruct('armchair') ? 5 : 0) - knoxHits * 6),
      purity: clamp(100 - flavors.reduce((a, fl) => a + (fl.purity || 0), 0) - tricks.filter(t => t.cat === 'narrative').length * 12 - (knoxHits + vdHits) * 3)
    };

    /* 12. 标题：是否可用“{place}”句式由中文简称的长度决定，保证两种语言选中同一句式 */
    const tiR = R('title');
    const baseSetting = byId(MM.SETTINGS, setting.id);
    const shortPlace = zhShort(baseSetting.places[plIdx]).length <= 5;
    const idxs = MM.TITLE_PATTERNS.map((p, i) => i).filter(i => shortPlace || !MM.TITLE_PATTERNS[i].includes('{place}'));
    const yakata = setting.id === 'yakata' && tiR.chance(0.6);
    const pattern = L.TITLE_PATTERNS[tiR.pick(idxs)];
    const noun = () => String(tiR.pick(L.TITLE_NOUNS)).split('|');
    const [n1, n1p] = noun(), [n2] = noun();
    const titlePlace = lang === 'en' ? ctx.P.replace(/^the /i, '') : ctx.P;
    let title = fill(yakata ? G.yakataTitle : pattern, {
      place: titlePlace, n1, n1p: n1p || n1, n2,
      color: tiR.pick(L.TITLE_COLORS), num: tiR.pick(G.titleNums)
    });
    if (lang === 'zh') title = title.replace('色色', '色');
    if (lang === 'en') title = titleCase(title);
    const genre = (spec.shin > spec.classic ? G.genre.shin : G.genre.honkaku) +
      (spec.special >= 4 ? G.genre.special : '') + (spec.social >= 4 ? G.genre.social : '') + (spec.dark >= 4 ? G.genre.dark : '');

    return {
      seed, lang, title, genre, setting, ctx, era: ctx.ERA,
      victim, victim2, detective, D, W, watsonType, suspects, official, culprits, culpritRule,
      core, subs, tricks, motive, weapon: weaponObj, flavors, serial,
      clues, chapters, falseSolutions, solution, epilogue, rules, tags, scores, spec,
      inverted: hasStruct('inverted'), challenge: !!cfg.challenge
    };
  };
})();
