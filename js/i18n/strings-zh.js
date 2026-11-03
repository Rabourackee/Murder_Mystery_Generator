/* 界面与生成文本（中文）。英文见 strings-en.js，键必须一一对应 */
window.MM = window.MM || {};
MM.STR = MM.STR || {};

MM.STR.zh = {
  ui: {
    docTitle: '本格诡计构筑所',
    h1: '本格诡计构筑所',
    tagline: '所有的不可能，都只是尚未被说明的可能。',
    caseNo: '案件编号',
    nums: ['壹', '贰', '叁', '肆', '伍'],
    d1: '案件编号', d2: '构筑要素', d2s: '🔒 锁定后重掷不变', d3: '诡计抽屉', d3s: '参与随机的类别',
    d4: '风味药柜', d4s: '新本格 / 非本格', d5: '结构与戒律',
    seedHint: '同一编号 + 同一配置 = 同一案件。可复制链接分享。',
    seedAria: '案件编号（随机种子）', newSeed: '换号', newSeedTitle: '换一个编号',
    flavorRandom: '随机追加', flavorOpts: ['0 味', '1 味', '2 味', '3 味'], clear: '清空',
    optChallenge: '插入「致读者的挑战书」', optStrict: '严守戒律（排除违反诺克斯十诫的要素）', optSerial: '连续杀人（追加第二起事件）',
    build: '构筑<br>事件', unlockAll: '全部解锁', reset: '恢复默认',
    actionHint: '火漆印 = 换一个新编号。修改任何要素都会按当前编号即时重排。',
    tabCase: '案件卷宗', tabAtlas: '诡计图鉴', tabRules: '推理戒律',
    copyText: '复制为文本', copyLink: '复制分享链接', print: '打印卷宗',
    atlasTitle: '诡计图鉴',
    atlasIntro: '江户川乱步曾整理过八百余种诡计，卡尔在《三口棺材》里讲过一堂密室课。这里是可供构筑的零件。',
    atlasSearch: '检索诡计、风味、作品名……',
    rulesTitle: '推理戒律',
    rulesIntro: '1928–1929 年，诺克斯与范·达因先后为“公平的解谜游戏”立下规矩。新本格的乐趣之一，就是在知情的前提下打破它们。',
    footer: '诡计本身不是罪 · 本工具只生成虚构故事的骨架 · 作品名附带剧透遮挡，悬停或点击才显示',
    slots: { setting: '舞台', detective: '侦探', core: '核心诡计', sub: '辅助诡计', motive: '动机', names: '人名' },
    random: '— 随机 —', subOpts: ['无', '1 个', '2 个'], thisTime: '本次：', none: '无', lockTitle: '锁定 / 解锁',
    toastCat: '至少保留一个诡计类别', toastCore: '已锁定核心诡计', toastFlavor: '已加入风味', toastUnlock: '已全部解锁',
    toastReset: '已恢复默认设定', toastText: '已复制全文（含解答）', toastLink: '已复制分享链接', toastFail: '复制失败，请手动复制',
    autoFlavor: '本次随机加入的风味（点击可固定）'
  },

  gen: {
    alibis: [
      '那时我在自己房间里看书。没有人能证明——我一个人住一间。',
      '我早早就睡了。半夜好像听到了什么声音，但没有起来。',
      '我在{common}和{other}下棋，一直到{T1}之后才各自回房。',
      '我去厨房找东西吃，在走廊上碰见了{other}，打了个招呼。',
      '我在洗澡，大概有一个小时吧。热水不太够。',
      '我在写信。写给谁？……这和案子没关系吧。'
    ],
    strongAlibi: '我那时和{other}在{common}，一步都没有离开过。不信你问{other}。',
    discovery: [
      '{T1}刚过，{S1}的尖叫声划破了寂静。{V}倒在{R}里，已经没有了呼吸。',
      '第二天清晨，{V}没有出现在早餐桌上。众人在{R}找到了{V}——身体早已冰冷。',
      '{W}去{R}给{V}送东西，敲了很久的门都没有回应。门没有锁。{V}就倒在门后。'
    ],
    nicks: ['埃勒里', '阿加莎', '卡尔', '坡', '勒鲁', '范', '奥希兹', '乱步', '克劳夫茨', '切斯特顿', '横沟', '诺克斯'],
    settingVictim: {
      school: '学生会长', club: '推理研究会的前辈', lab: '研究所所长', village: '旧家的家主',
      theater: '剧团的当家主演', temple: '主持此地的长老', mansion: '名门的家主'
    },
    all: '在场的每一个人',
    victimRole: '被害者', modernEra: '现代', ground: { snow: '积雪', mud: '雨后的泥地' }, sentenceSep: '',
    officialRole: '负责此案的警部', officialRel: '接到报案后赶来的警官',
    childAlts: [
      { role: '孙辈', relT: '{V}的孙辈，今年十二岁' },
      { role: '老夫人', relT: '{V}的母亲，卧床多年', g: 'f' },
      { role: '调香师', relT: '双目失明的调香师，{V}的旧识' }
    ],
    nightClosure: '当晚，{closure}。', cutOff: '{P}成了一座与世隔绝的孤岛。', keptIn: '所有人都被留在了{P}。',
    twin: '{C}在闲谈中提起，自己有一位多年不联系的双胞胎手足。',
    notePrefix: '（凡例）',
    crimeTitle: '犯行', crimeSub: '凶手的视角', crimeOpen: '{C}看了一眼时间：{T2}。一切都按照计划进行。',
    meanwhile: '另一方面，',
    weaponLine: '经初步检验，致命的凶器被认定为{WP}。',
    ch: { prologue: '序章', one: '第一章', two: '第二章', three: '第三章' },
    sub: { incident: '事件', invest: '调查', retell: '转述', second: '第二起事件' },
    investSum: '{D}逐一听取了众人的证词。{W}把其中值得注意的{n}件事，编号记在了笔记本上。',
    serial1: '{V2}在{R2}被发现时，已经没有了呼吸。', serialMore: '凶手并没有停手。',
    serial2: '众人终于意识到：只要还困在{P}，下一个就可能是自己。',
    officer: '负责此案的警官',
    reason: '依据是证物 No.{no}：{text}。',
    refute: '然而，这个推理无法解释证物 No.{no}：{text}。',
    detTwist: '揭开真相的人不是{D}，而是{W}。',
    epilogue: '{P}的早晨来得很慢。{W}在笔记本的最后一页写下了这起事件的名字。',
    genre: { honkaku: '本格推理', shin: '新本格推理', special: ' · 特殊设定', social: ' · 社会派', dark: ' · 怪奇' },
    yakataTitle: '{place}杀人事件',
    titleNums: ['三', '七', '十三', '九'],
    pron: { m: ['他', '他', '他的'], f: ['她', '她', '她的'], all: ['他们', '他们', '他们的'] }
  },

  r: {
    confidential: '绝密', caseFile: 'CASE FILE · 第 {seed} 号事件',
    gWow: '奇想度', gWowN: '诡计的意外性与华丽程度', gFair: '公平度', gFairN: '读者能否凭线索推出真相',
    gPure: '本格纯度', gPureN: '越低越偏离古典解谜',
    specTitle: '流派光谱',
    spec: { classic: '古典本格', shin: '新本格', special: '特殊设定', social: '社会派', dark: '怪奇幻想', soft: '日常轻快' },
    sec: {
      dossier: ['案件概要', 'DOSSIER'], cast: ['登场人物', 'DRAMATIS PERSONAE'], map: ['现场见取图', 'FLOOR PLAN'],
      story: ['正文', 'THE STORY'], evidence: ['证物清单', 'EVIDENCE'], solution: ['解答篇', 'SOLUTION'],
      audit: ['戒律审查', 'FAIR PLAY AUDIT'], notes: ['构筑笔记', 'WORKSHOP NOTES']
    },
    facts: { setting: '舞台', type: '类型', era: '时代', detective: '侦探', victim: '被害者', weapon: '凶器' },
    victimsEtc: ' 等', specialRule: '特殊规则',
    groups: { det: '侦探方', vic: '被害者', sus: '关系者', off: '调查者' }, culpritStamp: '犯人',
    corridor: '走廊', trainCorridor: '车厢走廊', scene: '现场', room: '的房间',
    mapCaption: '{PF} 见取图（示意）· ✕ 为发现尸体的位置', scale: 'N ↑　　0 ─── 5m', mapAria: '现场见取图', mapSplit: 8,
    verdict: { true: '真线索', herring: '红鲱鱼', decisive: '决定性证据' }, marked: ' ✎ 可疑',
    evHint: '点击证物卡，在你的推理笔记上标记“可疑”。',
    accuseLabel: '在拆封之前，写下你的指认',
    chTitle: '致读者的挑战书', chSub: 'A CHALLENGE TO THE READER',
    chInverted: '读者已经在“犯行”一章里目睹了一切。那么问题只剩下一个：{D}究竟是凭哪一条证物识破了凶手？',
    chNormal: '至此，解开真相所需的线索已经全部呈现在诸位面前。凶手是谁？“不可能”是如何成立的？我可以保证：凶手就在登场人物表之中，而每一条必要的线索，都已在正文与证物清单里公平地写明。',
    chClose: '请合上卷宗，先在笔记上写下你的推理。', chSign: '—— 作者', seal: '拆封<br>解答',
    sealedTitle: '解答篇', sealedSub: 'SEALED', sealPlain: '拆封',
    falseTitle: '第{n}解答 · {by}的推理：凶手是', ordinals: ['一', '二', '三'], rejected: '驳回',
    culpritLbl: '真 凶', judge: '你的指认：{name} —— ', right: '正解。你看穿了这一切。', wrong: '遗憾，你也被骗了。',
    tell: '决定性的破绽', motive: '动机 · {name}', epiNo: '终章', epiTitle: '余韵',
    tips: '伏笔怎么埋', refs: '灵感来源（含剧透，悬停查看）', refSep: '　',
    knoxSum: '诺克斯十诫 违反 <strong>{n}</strong> / 10', vdSum: '范·达因二十则 违反 <strong>{n}</strong> / 20',
    showAll: '显示全部条目', showBad: '只显示违反条目', knox: '诺克斯十诫', vd: '范·达因二十则',
    broke: '触犯：', bad: '违反', ok: '遵守', allOk: '全部遵守', listSep: '、',
    school: { classic: '古典', shin: '新本格', modern: '现代' }, wow: '奇想', fair: '公平',
    useCore: '以此为核心构筑', useFlavor: '加入风味', flavorBadge: '风味', flavorCat: '风味 · {name}',
    knoxBook: '诺克斯十诫 · 1928', vdBook: '范·达因二十则 · 1928', breakers: '本工具中会触犯此条的零件：',
    work: '《{w}》{a}', nick: '（{n}）',
    txt: {
      head: '{genre} · 第 {seed} 号事件', flavors: '风味：', cast: '## 登场人物', rule: '【特殊规则】',
      evidence: '## 证物清单', solution: '## 解答篇', falseSol: '第{n}解答（{by}）：凶手是{who}。',
      culprit: '真凶：', tell: '决定性的破绽：', motive: '动机（{name}）：', epi: '## 终章', q: ['「', '」'], colon: '：', sep: ' · '
    }
  }
};
