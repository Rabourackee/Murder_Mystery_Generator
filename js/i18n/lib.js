/* 多语言：中文数据是结构的唯一来源（id、评分、标签、约束），其他语言只提供文本覆盖层。
 * 有 id 的列表按 id 覆盖；无 id 的列表按下标对齐覆盖，长度必须一致——
 * 这样随机数在两种语言下做出完全相同的选择，切换语言 = 翻译同一个案件。
 */
window.MM = window.MM || {};
MM.I18N = MM.I18N || {};
MM.LANGS = ['zh', 'en'];

(function () {
  const ID_LISTS = ['SETTINGS', 'MOTIVES', 'DETECTIVES', 'TRICK_CATS', 'TRICKS', 'FLAVOR_SCHOOLS', 'FLAVORS'];
  const INDEX_LISTS = ['ROLES', 'VICTIM_ROLES', 'SECRETS', 'PAST_EVENTS', 'TIMES', 'WEAPONS', 'WATSONS',
    'TITLE_NOUNS', 'TITLE_COLORS', 'TITLE_PATTERNS', 'HERRINGS', 'KNOX', 'VANDINE'];
  const KEY = { SETTINGS: 'settings', MOTIVES: 'motives', DETECTIVES: 'detectives', TRICK_CATS: 'cats', TRICKS: 'tricks',
    FLAVOR_SCHOOLS: 'schools', FLAVORS: 'flavors', ROLES: 'roles', VICTIM_ROLES: 'victimRoles', SECRETS: 'secrets',
    PAST_EVENTS: 'pastEvents', TIMES: 'times', WEAPONS: 'weapons', WATSONS: 'watsons', TITLE_NOUNS: 'titleNouns',
    TITLE_COLORS: 'titleColors', TITLE_PATTERNS: 'titlePatterns', HERRINGS: 'herrings', KNOX: 'knox', VANDINE: 'vandine' };

  const cache = {};
  const merge = (base, ov) => (ov == null ? base : (typeof base === 'object' && base !== null ? Object.assign({}, base, ov) : ov));

  MM.lib = function (lang) {
    if (cache[lang]) return cache[lang];
    const O = lang === 'zh' ? null : MM.I18N[lang];
    const L = {};
    ID_LISTS.forEach(k => {
      const ov = O && O[KEY[k]];
      L[k] = ov ? MM[k].map(x => merge(x, ov[x.id])) : MM[k];
    });
    INDEX_LISTS.forEach(k => {
      const ov = O && O[KEY[k]];
      L[k] = ov && ov.length === MM[k].length ? MM[k].map((x, i) => merge(x, ov[i])) : MM[k];
    });
    L.NAMES = {};
    Object.keys(MM.NAMES).forEach(s => { L.NAMES[s] = merge(MM.NAMES[s], O && O.names && O.names[s]); });
    L.TAG_NAMES = Object.assign({}, MM.TAG_NAMES, O && O.tagNames);
    L.lang = lang;
    L.S = MM.STR[lang] || MM.STR.zh;
    return (cache[lang] = L);
  };

  /* 英文句首大写：模板里的 {P}、{R} 等常以 “the …” 开头 */
  MM.capitalize = s => String(s).replace(/(^\s*["“‘(]?|[.!?…]["”’)]*\s+["“‘(]?)([a-z])/g, (m, a, b) => a + b.toUpperCase());

  /* 检查覆盖层：缺失的 id、长度不一致的数组（开发期用；node 测试也会调用） */
  MM.checkOverlay = function (lang) {
    const O = MM.I18N[lang];
    const out = [];
    if (!O) return ['missing overlay ' + lang];
    const sameShape = (b, o, where) => {
      if (Array.isArray(b)) {
        if (!Array.isArray(o) || o.length !== b.length) out.push(where + ': length ' + (o && o.length) + ' ≠ ' + b.length);
      }
    };
    ID_LISTS.forEach(k => {
      const ov = O[KEY[k]] || {};
      MM[k].forEach(x => {
        const o = ov[x.id];
        if (!o) { out.push(k + '.' + x.id + ' missing'); return; }
        Object.keys(o).forEach(f => sameShape(x[f], o[f], k + '.' + x.id + '.' + f));
        ['name', 'desc', 'setup', 'steps', 'clues', 'tell', 'text', 'method', 'title', 'premise', 'rule', 'scene', 'twist', 'epilogue', 'clue', 'tip', 'obs', 'hint', 'places', 'closure', 'rooms', 'common', 'items', 'ex', 'eras', 'weapon']
          .forEach(f => { if (x[f] != null && o[f] == null) out.push(k + '.' + x.id + '.' + f + ' untranslated'); });
      });
    });
    INDEX_LISTS.forEach(k => sameShape(MM[k], O[KEY[k]], k));
    Object.keys(MM.NAMES).forEach(s => ['family', 'male', 'female'].forEach(f => sameShape(MM.NAMES[s][f], O.names && O.names[s] && O.names[s][f], 'NAMES.' + s + '.' + f)));
    return out;
  };
})();
