/* 推理戒律：诺克斯十诫（1928）与范·达因二十则（1928）
 * 每条戒律列出会触发“违反”的要素标签（tags）。
 * 诡计、风味、侦探、动机等要素在各自的 tags 中声明自己携带的标签。
 */
window.MM = window.MM || {};

MM.TAG_NAMES = {
  supernatural: '超自然力量',
  secretPassage: '秘密通道',
  unknownPoison: '未知毒物 / 长篇科学解释',
  chanceSolve: '偶然或直觉破案',
  detectiveCulprit: '侦探即凶手',
  policeCulprit: '调查官员即凶手',
  hiddenClue: '线索未向读者公开',
  narratorCulprit: '叙述者即凶手',
  narrativeTrick: '对读者的叙述性欺骗',
  twins: '双胞胎',
  double: '替身 / 一人分饰',
  romance: '恋爱情节',
  multiDetective: '多名侦探',
  noDetective: '无侦探',
  noCorpse: '无尸体',
  servantCulprit: '仆人即凶手',
  multiCulprit: '多名凶手',
  secretSociety: '秘密结社',
  accident: '意外或自杀结局',
  politicalMotive: '非个人动机',
  proCriminal: '职业罪犯',
  minorCulprit: '凶手为次要角色',
  longProse: '大量非解谜的描写',
  cipher: '暗号',
  firstFinderKill: '破门后才杀人',
  quickPoison: '速效毒物',
  fakeSeance: '伪造降灵',
  dogClue: '“狗没有叫”',
  doubleAlibi: '替身制造不在场证明',
  specialSetting: '特殊设定',
  meta: '元叙事'
};

MM.KNOX = [
  { no: 1, text: '罪犯必须在故事早期登场，但不得是读者能得知其内心想法的人。', tags: ['narratorCulprit'] },
  { no: 2, text: '侦探不得使用超自然或神秘力量破案。', tags: ['supernatural'] },
  { no: 3, text: '秘密房间或秘密通道不得超过一处。', tags: ['secretPassage'], min: 2 },
  { no: 4, text: '不得使用未知的毒药，或需要冗长科学解释的装置。', tags: ['unknownPoison'] },
  { no: 5, text: '不得有“中国人”登场。', gloss: '反映了当时西方通俗小说里“神秘万能的东方人”这一刻板形象；今天多被理解为：不得用来历不明、无所不能的角色收拾残局。', tags: [] },
  { no: 6, text: '侦探不得依靠偶然，或事后被证明正确的直觉破案。', tags: ['chanceSolve'] },
  { no: 7, text: '侦探本人不得是罪犯。', tags: ['detectiveCulprit'] },
  { no: 8, text: '侦探发现的线索必须立即向读者公开。', tags: ['hiddenClue'] },
  { no: 9, text: '侦探的助手（华生）不得隐瞒自己的想法，其智力应略低于一般读者。', tags: ['narratorCulprit'] },
  { no: 10, text: '双胞胎或替身不得登场，除非事先已向读者充分交代。', tags: ['twins', 'double'] }
];

MM.VANDINE = [
  { no: 1, text: '读者必须与侦探拥有同等的解谜机会，所有线索都应清楚描述。', tags: ['hiddenClue'] },
  { no: 2, text: '作者不得对读者使用凶手对侦探所用手法之外的欺骗。', tags: ['narrativeTrick'] },
  { no: 3, text: '不得有恋爱情节。', tags: ['romance'] },
  { no: 4, text: '侦探或任何官方调查者不得是凶手。', tags: ['detectiveCulprit', 'policeCulprit'] },
  { no: 5, text: '凶手必须由逻辑推理指认，不得靠偶然、巧合或无缘由的自白。', tags: ['chanceSolve'] },
  { no: 6, text: '推理小说必须有侦探。', tags: ['noDetective'] },
  { no: 7, text: '推理小说必须有尸体。', tags: ['noCorpse'] },
  { no: 8, text: '破案必须依靠自然的方法，不得借助占卜、降灵、读心或水晶球。', tags: ['supernatural'] },
  { no: 9, text: '只能有一名侦探。', tags: ['multiDetective'] },
  { no: 10, text: '凶手必须是故事中较为重要、读者熟悉的角色。', tags: ['minorCulprit'] },
  { no: 11, text: '仆人不得是凶手。', tags: ['servantCulprit'] },
  { no: 12, text: '无论杀了几个人，凶手只能有一名（可以有从犯）。', tags: ['multiCulprit'] },
  { no: 13, text: '不得出现秘密结社或黑帮组织。', tags: ['secretSociety'] },
  { no: 14, text: '杀人方法与侦破手段必须合理且科学，不得使用虚构的毒物或装置。', tags: ['unknownPoison'] },
  { no: 15, text: '真相必须始终显而易见——只要读者足够敏锐。', tags: [] },
  { no: 16, text: '不得有冗长的描写、文学性的枝蔓或细致的性格分析。', tags: ['longProse'] },
  { no: 17, text: '职业罪犯不得作为凶手。', tags: ['proCriminal'] },
  { no: 18, text: '犯罪最终不得被证明为意外或自杀。', tags: ['accident'] },
  { no: 19, text: '犯罪动机必须是个人性的，不得是国际阴谋或政治动机。', tags: ['politicalMotive'] },
  { no: 20, text: '不得使用陈腐手法：凭烟蒂识人、伪造降灵逼供、伪造指纹、替身制造不在场、“狗没有叫”、双胞胎、速效毒药、警察破门后才杀人、字词联想测验、直到结尾才解开的暗号。', tags: ['cipher', 'firstFinderKill', 'quickPoison', 'fakeSeance', 'dogClue', 'doubleAlibi', 'twins'] }
];

/* 根据要素标签统计违规 */
MM.checkRules = function (tagList, knox, vandine) {
  const count = {};
  tagList.forEach(t => { count[t] = (count[t] || 0) + 1; });
  const judge = rule => {
    const hit = rule.tags.filter(t => (count[t] || 0) >= (rule.min || 1));
    return hit.length ? hit : null;
  };
  return {
    knox: (knox || MM.KNOX).map(r => ({ rule: r, hit: judge(r) })),
    vandine: (vandine || MM.VANDINE).map(r => ({ rule: r, hit: judge(r) }))
  };
};

/* 严守戒律模式下，带有这些标签的要素不进入随机池 */
MM.STRICT_BANNED = ['supernatural', 'detectiveCulprit', 'narratorCulprit', 'twins', 'unknownPoison', 'chanceSolve', 'hiddenClue'];
