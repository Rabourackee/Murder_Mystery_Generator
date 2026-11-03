/* Interface and generator text (English). Keys mirror strings-zh.js one-to-one. */
window.MM = window.MM || {};
MM.STR = MM.STR || {};

MM.STR.en = {
  ui: {
    docTitle: 'The Honkaku Trick Atelier',
    h1: 'The Honkaku Trick Atelier',
    tagline: 'Every impossibility is only a possibility that has not yet been explained.',
    caseNo: 'Case No.',
    nums: ['I', 'II', 'III', 'IV', 'V'],
    d1: 'Case Number', d2: 'Components', d2s: '🔒 locked parts survive a reroll', d3: 'Trick Drawers', d3s: 'categories in the random pool',
    d4: 'Flavour Cabinet', d4s: 'shin-honkaku & beyond', d5: 'Structure & Rules',
    seedHint: 'Same number + same settings = same case. Copy the link to share it.',
    seedAria: 'Case number (random seed)', newSeed: 'New no.', newSeedTitle: 'Draw a new number',
    flavorRandom: 'Add at random', flavorOpts: ['none', '1', '2', '3'], clear: 'Clear',
    optChallenge: 'Insert “A Challenge to the Reader”', optStrict: 'Strict mode (exclude parts that break Knox’s Decalogue)', optSerial: 'Serial murder (add a second killing)',
    build: 'Build<br>the Case', unlockAll: 'Unlock all', reset: 'Reset',
    actionHint: 'The wax seal draws a new case number. Changing any component re-arranges the current case instantly.',
    tabCase: 'Case File', tabAtlas: 'Trick Atlas', tabRules: 'The Rules',
    copyText: 'Copy as text', copyLink: 'Copy share link', print: 'Print',
    atlasTitle: 'Trick Atlas',
    atlasIntro: 'Edogawa Rampo once catalogued more than eight hundred tricks; Dr Fell gives a whole lecture on locked rooms in Carr’s The Three Coffins. These are the parts you can build with.',
    atlasSearch: 'Search tricks, flavours, works…',
    rulesTitle: 'The Rules',
    rulesIntro: 'In 1928, Knox and Van Dine each laid down rules for the fair-play puzzle. Part of the pleasure of shin-honkaku is breaking them knowingly.',
    footer: 'A trick is not a crime · This tool builds only the skeleton of a fiction · Titles of works are blurred against spoilers — hover or tap to reveal',
    slots: { setting: 'Setting', detective: 'Detective', core: 'Core trick', sub: 'Sub-tricks', motive: 'Motive', names: 'Names' },
    random: '— random —', subOpts: ['none', '1', '2'], thisTime: 'This time: ', none: 'none', lockTitle: 'Lock / unlock',
    toastCat: 'Keep at least one trick category', toastCore: 'Core trick locked', toastFlavor: 'Flavour added', toastUnlock: 'Everything unlocked',
    toastReset: 'Defaults restored', toastText: 'Full text copied (includes the solution)', toastLink: 'Share link copied', toastFail: 'Copy failed — please copy by hand',
    autoFlavor: 'Added at random this time (click to keep it)'
  },

  gen: {
    alibis: [
      'I was reading in my room. Nobody can confirm that — I had the room to myself.',
      'I went to bed early. I think I heard something in the night, but I didn’t get up.',
      'I was playing chess with {other} in {common} until after {T1}. Then we each went to our rooms.',
      'I went to the kitchen for something to eat and passed {other} in the corridor. We said hello.',
      'I was in the bath for about an hour. There wasn’t enough hot water.',
      'I was writing a letter. To whom? …That has nothing to do with this, surely.'
    ],
    strongAlibi: 'I was with {other} in {common} the whole time. I never left. Ask {other} if you don’t believe me.',
    discovery: [
      'Just after {T1}, a scream from {S1} broke the silence. {V} lay in {R}, no longer breathing.',
      'The next morning {V} did not come down to breakfast. They found {Vhim} in {R}, long since cold.',
      '{W} went to {R} to bring {V} something and knocked for a long time without an answer. The door was not locked. {V} lay just inside.'
    ],
    nicks: ['Ellery', 'Agatha', 'Carr', 'Poe', 'Leroux', 'Van', 'Orczy', 'Rampo', 'Crofts', 'Chesterton', 'Yokomizo', 'Knox'],
    settingVictim: {
      school: 'president of the student council', club: 'senior member of the Mystery Club', lab: 'director of the station',
      village: 'head of the old family', theater: 'leading player of the company', temple: 'the elder who presides here', mansion: 'head of the great family'
    },
    all: 'everyone present',
    victimRole: 'victim', modernEra: 'the present day', ground: { snow: 'the snow', mud: 'the rain-softened mud' }, sentenceSep: ' ',
    officialRole: 'inspector in charge', officialRel: 'the officer who arrived after the call',
    childAlts: [
      { role: 'grandchild', relT: '{V}’s grandchild, twelve years old' },
      { role: 'dowager', relT: '{V}’s mother, bedridden for years', g: 'f' },
      { role: 'perfumer', relT: 'a blind perfumer, an old acquaintance of {V}' }
    ],
    nightClosure: 'That night, {closure}.', cutOff: '{P} was cut off from the world.', keptIn: 'Everyone was kept at {P}.',
    twin: 'In passing, {C} mentioned a twin, long out of touch.',
    notePrefix: '(A note on the text) ',
    crimeTitle: 'The Crime', crimeSub: 'Through the Killer’s Eyes', crimeOpen: '{C} glanced at the clock: {T2}. Everything was going to plan.',
    meanwhile: 'There was a second oddity. ',
    weaponLine: 'A preliminary examination identified the fatal weapon as {WP}.',
    ch: { prologue: 'Prologue', one: 'Chapter One', two: 'Chapter Two', three: 'Chapter Three' },
    sub: { incident: 'The Incident', invest: 'The Investigation', retell: 'The Retelling', second: 'The Second Death' },
    investSum: '{D} took everyone’s statements in turn. {W} wrote down the {n} points worth noting, numbered, in a notebook.',
    serial1: '{V2} was found in {R2}, no longer breathing.', serialMore: ' The killer had not stopped.',
    serial2: 'At last they understood: as long as they were trapped at {P}, any one of them might be next.',
    officer: 'the officer in charge',
    reason: 'The grounds: Exhibit No.{no} — {text}.',
    refute: 'But this theory cannot account for Exhibit No.{no} — {text}.',
    detTwist: 'It was not {D} who uncovered the truth, but {W}.',
    epilogue: 'Morning came slowly to {P}. On the last page of the notebook, {W} wrote down the name of the case.',
    genre: { honkaku: 'Honkaku Mystery', shin: 'Shin-Honkaku Mystery', special: ' · Special Rules', social: ' · Social School', dark: ' · Weird' },
    yakataTitle: 'The {place} Murders',
    titleNums: ['Three', 'Seven', 'Thirteen', 'Nine'],
    pron: { m: ['he', 'him', 'his'], f: ['she', 'her', 'her'], all: ['they', 'them', 'their'] }
  },

  r: {
    confidential: 'Confidential', caseFile: 'CASE FILE · No. {seed}',
    gWow: 'Ingenuity', gWowN: 'how surprising and ornate the trick is', gFair: 'Fairness', gFairN: 'can the reader deduce it from the clues?',
    gPure: 'Purity', gPureN: 'lower = further from the classic puzzle',
    specTitle: 'Genre spectrum',
    spec: { classic: 'Classic', shin: 'Shin-honkaku', special: 'Special rules', social: 'Social', dark: 'Weird & dark', soft: 'Cozy' },
    sec: {
      dossier: ['The Dossier', '案件概要'], cast: ['Dramatis Personae', '登场人物'], map: ['Floor Plan', '见取图'],
      story: ['The Story', '正文'], evidence: ['Evidence', '证物'], solution: ['The Solution', '解答篇'],
      audit: ['Fair-Play Audit', '戒律审查'], notes: ['Workshop Notes', '构筑笔记']
    },
    facts: { setting: 'Setting', type: 'Type', era: 'Era', detective: 'Detective', victim: 'Victim', weapon: 'Weapon' },
    victimsEtc: ' et al.', specialRule: 'Special Rules',
    groups: { det: 'The Detective’s Side', vic: 'The Victim', sus: 'The Suspects', off: 'The Investigator' }, culpritStamp: 'CULPRIT',
    corridor: 'corridor', trainCorridor: 'carriage corridor', scene: 'scene of crime', room: 'room',
    mapCaption: '{PF} — floor plan (schematic) · ✕ marks where the body was found', scale: 'N ↑   0 ─── 5 m', mapAria: 'Floor plan', mapSplit: 16,
    verdict: { true: 'Genuine', herring: 'Red herring', decisive: 'Decisive' }, marked: ' ✎ suspicious',
    evHint: 'Click a card to mark it as suspicious in your notes.',
    accuseLabel: 'Before you break the seal, name your suspect',
    chTitle: 'A Challenge to the Reader', chSub: '致读者的挑战书',
    chInverted: 'You watched everything in “The Crime”. Only one question remains: which exhibit gave the killer away to {D}?',
    chNormal: 'Every clue needed to reach the truth has now been placed before you. Who is the killer? How was the impossible made possible? I give you my word: the culprit is among the dramatis personae, and every necessary clue has been fairly set down in the story and the list of exhibits.',
    chClose: 'Close the file and write down your solution first.', chSign: '— The Author', seal: 'Break<br>the Seal',
    sealedTitle: 'The Solution', sealedSub: 'SEALED', sealPlain: 'Open',
    falseTitle: 'Solution {n} · {by}’s theory: the killer is ', ordinals: ['One', 'Two', 'Three'], rejected: 'Rejected',
    culpritLbl: 'THE KILLER', judge: 'Your accusation: {name} — ', right: 'correct. You saw through all of it.', wrong: 'alas, you were fooled too.',
    tell: 'The decisive flaw', motive: 'Motive · {name}', epiNo: 'Epilogue', epiTitle: 'Aftermath',
    tips: 'How to plant the clues', refs: 'Inspirations (spoilers — hover to reveal)', refSep: ' · ',
    knoxSum: 'Knox’s Decalogue: broken <strong>{n}</strong> / 10', vdSum: 'Van Dine’s Twenty Rules: broken <strong>{n}</strong> / 20',
    showAll: 'Show every rule', showBad: 'Show broken rules only', knox: 'Knox’s Decalogue', vd: 'Van Dine’s Twenty Rules',
    broke: 'Broken by: ', bad: 'Broken', ok: 'Kept', allOk: 'All kept', listSep: ', ',
    school: { classic: 'Classic', shin: 'Shin-honkaku', modern: 'Modern' }, wow: 'Ingenuity', fair: 'Fairness',
    useCore: 'Build around this', useFlavor: 'Add flavour', flavorBadge: 'flavour', flavorCat: 'Flavour · {name}',
    knoxBook: 'Knox’s Decalogue · 1928', vdBook: 'Van Dine’s Twenty Rules · 1928', breakers: 'Parts in this tool that break it: ',
    work: '{w} — {a}', nick: ' (“{n}”)',
    txt: {
      head: '{genre} · Case No. {seed}', flavors: 'Flavours: ', cast: '## Dramatis Personae', rule: '[Special rules] ',
      evidence: '## Evidence', solution: '## The Solution', falseSol: 'Solution {n} ({by}): the killer is {who}.',
      culprit: 'The killer: ', tell: 'The decisive flaw: ', motive: 'Motive ({name}): ', epi: '## Epilogue', q: ['“', '”'], colon: ': ', sep: ' · '
    }
  }
};
