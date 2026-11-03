/* English overlay — world parts. Lists without ids must keep the same length and order as js/data/world.js. */
window.MM = window.MM || {};
MM.I18N = MM.I18N || {};
MM.I18N.en = MM.I18N.en || {};

Object.assign(MM.I18N.en, {
  names: {
    jp: {
      label: 'Japanese', order: 'gf', sep: ' ',
      family: ['Ayanokoji', 'Kirishima', 'Kuroe', 'Tsukimori', 'Mitarai', 'Kamishiro', 'Takano', 'Shiramine', 'Kuonji', 'Makabe', 'Minase', 'Nanase', 'Fuyuki', 'Kiryu', 'Asagiri', 'Narumi', 'Shinonome', 'Hiiragi', 'Arima', 'Oribe', 'Todo', 'Miyaji', 'Ichijo', 'Hanabusa'],
      male: ['Kyoichi', 'Akira', 'Toma', 'Shuji', 'Keisuke', 'Hayato', 'Toru', 'Ryunosuke', 'Seiji', 'Saku', 'Reiji', 'Tatsumi', 'Arata', 'Kazuomi'],
      female: ['Chizuru', 'Rin', 'Sayoko', 'Shizuka', 'Yukino', 'Aoi', 'Saori', 'Mahiru', 'Mari', 'Kotone', 'Ruri', 'Saki', 'Misuzu', 'Akane']
    },
    cn: {
      label: 'Chinese', order: 'fg', sep: ' ',
      family: ['Shen', 'Gu', 'Lu', 'Xiao', 'Wen', 'Lin', 'Ye', 'Su', 'Xie', 'Qin', 'Song', 'Han', 'He', 'Ji', 'Cheng', 'Bai', 'Pei', 'Wenren', 'Ouyang', 'Shangguan', 'Ning', 'Chen'],
      male: ['Huaijin', 'Yanqiu', 'Xubai', 'Henian', 'Zhiyuan', 'Shaotang', 'Yizhou', 'Jingxing', 'Mo', 'Zheng', 'Hengzhi', 'Ziqi', 'Linyuan'],
      female: ['Wanqing', 'Ruoshuang', 'Shuyao', 'Heng', 'Yuesheng', 'Ruhui', 'Zhaoying', 'Suxin', 'Muxue', 'Qingyi', 'Nianci', 'Xuetang', 'Lingyi']
    },
    west: {
      label: 'Western', order: 'gf', sep: ' ',
      family: ['Blackwood', 'Ashcroft', 'Wentworth', 'Harlow', 'Moran', 'Graves', 'Peregrine', 'Thorne', 'Craven', 'Vere', 'Avery', 'Codrington'],
      male: ['Arthur', 'Sebastian', 'Edmund', 'Theodore', 'Hugh', 'Julian', 'Lionel', 'Barnaby', 'Oscar', 'Cyrus'],
      female: ['Ada', 'Violet', 'Evelyn', 'Hilda', 'Constance', 'Rosamund', 'Ophelia', 'Gwen', 'Mabel', 'Sylvia']
    }
  },

  /* places: [full name on first mention, short name afterwards] */
  settings: {
    island: { name: 'Island Mansion',
      places: [['the White Manor on Raven Island', 'the White Manor'], ['the lighthouse mansion on Foghorn Island', 'the lighthouse mansion'], ['Eyrie House, twelve nautical miles offshore', 'Eyrie House']],
      desc: '{P} stands alone at sea; a single ferry calls once a week. Its owner, {V}, has invited a few old acquaintances, promising “something important to announce”.',
      closure: ['a typhoon smashed the only ferry against the pier', 'the radio was smashed on the first night, and the ferry would not return for three days'],
      rooms: ['the study', 'the observation room atop the tower', 'the conservatory', 'the wine cellar'], common: ['the great hall', 'the dining room'],
      items: ['the longcase clock in the great hall', 'the crossbow on the wall', 'an ivory chess set missing one piece'] },
    snow: { name: 'Snowbound Lodge',
      places: [['Birch Lodge', 'Birch Lodge'], ['Yukimi Lodge', 'Yukimi Lodge'], ['Holly Lodge, two thousand metres up', 'Holly Lodge']],
      desc: '{P} lies at the very end of a mountain road; in winter almost no one comes. At the invitation of {V}, the party has gathered to spend a snowy night together.',
      closure: ['a blizzard buried the only road, and the telephone line went dead', 'an avalanche swallowed the road down the mountain'],
      rooms: ['the guest room at the end of the upstairs corridor', 'the study', 'the attic', 'the stove room'], common: ['the lounge', 'the dining room'],
      items: ['the stag’s antlers above the stove', 'a row of skis by the entrance', 'an antique clock stopped at ten past three'] },
    yakata: { name: 'A Strange “House”',
      places: [['the Leaning Tower House', 'the Leaning Tower House'], ['the Hourglass House', 'the Hourglass House'], ['the Music Box House', 'the Music Box House'], ['the Inverted Cross House', 'the Inverted Cross House'],
        ['the Birdcage House', 'the Birdcage House'], ['the Spiral House', 'the Spiral House'], ['the Windowless House', 'the Windowless House'], ['the Mirror House', 'the Mirror House']],
      desc: '{P} was the work of an eccentric architect, now dead, whose plans were never published. Its present owner, {V}, is hosting a small gathering.',
      closure: ['the front door locked itself at midnight, and only the owner held the key', 'the suspension bridge to the outside world burned in the night'],
      rooms: ['the central tower', 'the windowless exhibition room', 'the owner’s workshop', 'the upside-down chapel'], common: ['the cloister', 'the great hall'],
      items: ['an unfinished drawing left by the architect', 'a row of identical doors along the corridor', 'the mechanical dolls found all over the house'] },
    village: { name: 'Remote Mountain Village',
      places: [['the old family house in Kirigakure village', 'the old family house'], ['the head family’s estate in Onikubi village', 'the head family’s estate'], ['the old house beside Water-God Marsh', 'the old house']],
      desc: '{P} stands in a cold village ringed by mountains, where the old customs are still kept. On the eve of the festival, the head of the family, {V}, has summoned the clan.',
      closure: ['floodwater swept away the suspension bridge out of the village', 'heavy rain brought down the hillside and cut the village off'],
      rooms: ['the storehouse', 'the detached cottage', 'the altar room', 'the hut beside the well'], common: ['the great tatami hall', 'the veranda corridor'],
      items: ['an old mirror in the altar room', 'the stone lantern in the garden', 'a line blacked out in the family register'] },
    train: { name: 'Night Train',
      places: [['the night train Galaxy, bound north', 'the Galaxy'], ['a sleeper express crossing the continent', 'the sleeper express'], ['the Blue Train to the end of the line', 'the Blue Train']],
      desc: '{P} races through the night. In the first-class sleeping car, {V} shares a carriage with a handful of passengers.',
      closure: ['snowdrifts halted the train in the wilderness between two stations', 'no one could leave the carriage before the next stop'],
      rooms: ['compartment seven', 'the dining car', 'the luggage van', 'compartment one'], common: ['the carriage corridor', 'the dining car'],
      items: ['a timetable accurate to the minute', 'the brass number plates on the compartment doors', 'a deck of cards in the dining car'] },
    ship: { name: 'Ocean Liner',
      places: [['the ocean liner Queen', 'the Queen'], ['a white liner sailing the high seas', 'the liner']],
      desc: '{P} is sailing the high seas. {V} has taken the whole top-deck suite to entertain a few guests.',
      closure: ['the liner was on the high seas, two days from the nearest port', 'in the storm, every lifeboat had been locked'],
      rooms: ['the top-deck suite', 'the storeroom beside the captain’s cabin', 'the little cabin on the observation deck', 'the library'], common: ['the ballroom', 'the deck'],
      items: ['the lifebuoy at the rail', 'the ice sculpture in the ballroom', 'the ship’s log'] },
    club: { name: 'Mystery Club Retreat',
      places: [['a borrowed seaside villa', 'the seaside villa'], ['an abandoned old schoolhouse in the mountains', 'the old schoolhouse'], ['the lakeside lodge owned by a senior’s family', 'the lakeside lodge']],
      desc: 'The members of the university Mystery Club have come to {P} for their retreat. The trip was planned, start to finish, by their senior, {V}.',
      closure: ['someone scuttled the only boat', 'a downpour washed out the road down the mountain'],
      rooms: ['the senior’s bedroom', 'the upstairs book room', 'the boathouse by the lake', 'the old science classroom'], common: ['the living room', 'the kitchen'],
      items: ['a name card reading “The First Victim”', 'a stack of old club magazines', 'the whiteboard in the living room'] },
    lab: { name: 'Remote Research Station',
      places: [['the mountaintop observatory', 'the observatory'], ['the polar research station', 'the research station'], ['the deep-sea research base', 'the research base']],
      desc: '{P} lies far from anyone, staffed by a handful of researchers. Its director, {V}, is about to announce a major result.',
      closure: ['a blizzard cut off supplies and the communications satellite went silent', 'the only lift broke down'],
      rooms: ['the director’s office', 'the domed observation room', 'the cold-storage sample room', 'the data centre'], common: ['the canteen', 'the common room'],
      items: ['the log sheet on the control-room wall', 'a broken security camera', 'the giant telescope in the observation room'] },
    mansion: { name: 'Old Family Mansion',
      places: [['a century-old house in the city', 'the century-old house'], ['the lakeside residence of a great industrial family', 'the family residence'], ['a count’s manor outside the old town', 'the count’s manor']],
      desc: 'The master of {P}, {V}, is advanced in years and has recently changed the will. On the eve of its reading, the family and those connected to it have gathered under one roof.',
      closure: ['the solicitor required everyone to remain in the house until the will was read', 'a heavy rain kept everyone indoors'],
      rooms: ['the study', 'the sickroom', 'the tea room', 'the library'], common: ['the drawing room', 'the dining room'],
      items: ['the will in the study safe', 'the portrait of the master in the hall', 'a stopped pocket watch'] },
    theater: { name: 'Backstage',
      places: [['the opera house in the old quarter', 'the opera house'], ['an old theatre awaiting demolition', 'the old theatre'], ['a small company’s basement theatre', 'the basement theatre']],
      desc: '{P} is staging a new play starring {V}. On opening night, something happened backstage that should never have happened.',
      closure: ['the stage doors were guarded throughout the performance', 'a power cut sealed the theatre'],
      rooms: ['the star’s dressing room', 'the trap room beneath the stage', 'the prop store', 'the lighting booth'], common: ['the backstage corridor', 'the stage'],
      items: ['a stage dagger', 'the trapdoor lift on the stage', 'the running order pinned to the wall'] },
    temple: { name: 'Monastery / Old Temple',
      places: [['the monastery on the snowy mountain', 'the monastery'], ['an ancient temple deep in the mountains', 'the temple'], ['the chapel on the sea cliff', 'the chapel']],
      desc: '{P} is cut off from the world, its brethren bound by strict rules. {V}, who presides here, has lately been behaving strangely.',
      closure: ['winter closed the mountain, cutting the monastery off for a month', 'the stone steps at the gate collapsed in the storm'],
      rooms: ['the bell tower', 'the penance cell', 'the scripture library', 'the crypt'], common: ['the main hall', 'the refectory'],
      items: ['a great bell that rings at the same hour every night', 'ancient books kept under lock', 'the candlestick on the altar'] },
    onsen: { name: 'Hot-Spring Inn',
      places: [['a hot-spring inn deep in snow country', 'the inn'], ['a hidden spa inn in a mountain valley', 'the spa inn']],
      desc: '{P} has only seven rooms. Tonight, as it happens, all seven are booked by old acquaintances of {V}.',
      closure: ['heavy snow closed the mountain and the bus stopped running', 'fallen rocks blocked the mountain road'],
      rooms: ['the open-air bath', 'the Moon room', 'the Snow room', 'the boiler room'], common: ['the lobby', 'the banquet room'],
      items: ['a row of wooden sandals in the corridor', 'the bamboo fence by the bath', 'the guest register at the front desk'] },
    city: { name: 'City Apartment',
      places: [['a high-rise apartment on the waterfront', 'the high-rise'], ['an old block of flats in the old quarter', 'the old block'], ['a business hotel opposite the station', 'the business hotel']],
      desc: 'A room in {P} is home to {V}. The neighbours all say {Vhe} is “the kind of person who never causes trouble”.',
      closure: ['every camera in the building was running', 'a caretaker was watching the entrance all night'],
      rooms: ['room 1207', 'the machine room on the top floor', 'the underground car park', 'the roof garden'], common: ['the lift', 'the lobby'],
      items: ['the lift’s security footage', 'an unopened letter in the mailbox', 'a dead plant on the balcony'] },
    school: { name: 'School',
      places: [['the old building of a private high school', 'the old building'], ['a boarding school by the sea', 'the boarding school'], ['the bell tower of a girls’ academy', 'the bell tower']],
      desc: '{P} has its “Seven Wonders”. The student council president, {V}, has been investigating one of them.',
      closure: ['on a stormy night, those still at school were trapped in the building', 'on the eve of the school festival, the gates closed at eight sharp'],
      rooms: ['the old music room', 'the roof', 'the closed stacks of the library', 'the biology prep room'], common: ['the corridor', 'the student council room'],
      items: ['the old piano in the music room', 'the library’s borrowing cards', 'the lock on the roof door'] },
    airship: { name: 'Airship',
      places: [['the airship Petrel, crossing the ocean', 'the Petrel'], ['a luxury airship circling the globe', 'the airship']],
      desc: '{P} cruises three thousand feet up. The cabin holds only a few passengers — and {V}.',
      closure: ['the airship was aloft, thirty hours from landing', 'the storm made landing impossible'],
      rooms: ['the main cabin', 'the smoking room', 'the observation deck', 'the cargo hold'], common: ['the lounge', 'the gangway'],
      items: ['the spark-proof lighter in the smoking room', 'the glass floor of the observation deck', 'the passenger list'] }
  },

  roles: [
    { r: 'eldest son', rel: '{V}’s eldest son, long assumed to inherit everything' },
    { r: 'adopted daughter', rel: '{V}’s adopted daughter, of unknown origins' },
    { r: 'young second wife', rel: 'the wife {V} married three years ago' },
    { r: 'secretary', rel: '{V}’s private secretary, keeper of every document' },
    { r: 'butler', rel: 'butler to {V}’s family for thirty years' },
    { r: 'maid', rel: 'a maid who joined the household only recently' },
    { r: 'physician', rel: '{V}’s physician, and a friend of many years' },
    { r: 'solicitor', rel: 'the solicitor in charge of {V}’s will' },
    { r: 'old friend', rel: 'a friend of {V}’s from student days, unseen for years' },
    { r: 'painter', rel: 'a down-at-heel painter supported by {V}' },
    { r: 'journalist', rel: 'a magazine journalist who claims to be here to interview {V}' },
    { r: 'nephew', rel: '{V}’s nephew, deep in debt' },
    { r: 'junior', rel: '{V}’s junior from school, who both admires and fears {V}' },
    { r: 'editor', rel: '{V}’s editor, chasing an overdue manuscript' },
    { r: 'photographer', rel: 'a freelance photographer who has worked with {V}' },
    { r: 'distant cousin', rel: 'someone who turned up out of nowhere, claiming to be {V}’s distant cousin' },
    { r: 'tutor', rel: 'the tutor employed in {V}’s household' },
    { r: 'co-founder', rel: 'the person who founded the business with {V}, and was later forced out' }
  ],

  victimRoles: [
    'a wealthy industrialist', 'a spiteful bestselling novelist', 'an arrogant university professor', 'a celebrated stage actor', 'the head of an ancient family',
    'a critic famous for a poisonous pen', 'a secretive collector', 'the senior whose word is law in the club', 'a retired great detective', 'the director of a research institute'
  ],

  secrets: [
    { s: 'had been quietly embezzling money from {V}', h: '{S}’s bag held a ledger full of suspicious figures' },
    { s: 'had lived under another name {N} years ago', h: 'the photograph in {S}’s passport looked subtly unlike {S}' },
    { s: 'slipped out on the night of the murder to meet someone', h: '{S}’s shoes had red earth on them — the kind found only in the garden' },
    { s: 'was hiding a serious illness', h: 'a large supply of painkillers was found in {S}’s room' },
    { s: 'was in fact {V}’s illegitimate child', h: '{S} carried an old photograph of someone who looked very like {V}' },
    { s: 'was being blackmailed by {V}', h: 'an envelope bearing {S}’s name was found in {V}’s desk drawer' },
    { s: 'had quarrelled violently with {V} the day before', h: 'someone heard {S} say, “One of these days I’ll kill you”' },
    { s: 'had stolen a letter from {V}’s study', h: 'a half-burnt letter lay in {S}’s fireplace' },
    { s: 'was having an affair with another guest', h: '{S} was seen late at night in the corridor outside someone else’s room' },
    { s: 'was a private detective sent to investigate {V}', h: 'a miniature camera was hidden in {S}’s luggage' },
    { s: 'planned to steal {V}’s collection that night', h: 'a set of lock picks was found in {S}’s room' },
    { s: 'already knew what was in the will', h: '{S} had visited the solicitor’s office the day before the murder' }
  ],

  motives: {
    inherit: { name: 'Inheritance', text: '{C} knew that {V} was about to change the will. Once the new will took effect, {C} would be left with nothing.', hint: '{V} had met the solicitor the day before the murder' },
    revenge: { name: 'Revenge', text: 'What happened {N} years ago — {PAST} — was no accident. It took {C} {N} years to learn the part {V} had played in it.', hint: 'one page of {V}’s photograph album had a picture neatly cut out' },
    silence: { name: 'Silence', text: '{V} knew of a crime {C} had committed long ago — something to do with {PAST}, {N} years before — and was using it as leverage.', hint: 'in {V}’s diary, a question mark had been drawn beside {C}’s name' },
    love: { name: 'Passion', text: 'The person {C} loved had been driven to despair, and to death, because of {V}.', hint: '{C}’s pocket watch held a photograph of someone else' },
    protect: { name: 'To protect someone', text: '{C} killed {V} to stop {V} from harming someone else. The person {C} protected still does not know the truth.', hint: 'before the murder, {C} kept checking on someone’s whereabouts' },
    honor: { name: 'Honour / plagiarism', text: '{V}’s most famous work was in fact written by {C}. Tonight {V} meant to announce a “new work” — stolen as well.', hint: '{V}’s manuscripts were written in two different hands' },
    aesthetic: { name: 'Aesthetics', text: 'To {C}, this was not a murder but a work of art. The stage of {P} and the role of {V} were both indispensable.', hint: 'the scene was arranged too neatly, as if someone had “designed” it' },
    mistake: { name: 'The wrong victim', text: 'It was not {V} whom {C} meant to kill. That night, {V} happened to change seats — or rooms.', hint: '{V} was never supposed to be in {R}' },
    mercy: { name: 'Mercy', text: '{V} was dying, and had begged {C} to end the pain. {C} agreed — but in a way that could not pass for suicide, so that the insurance would still go to the family.', hint: 'a page had been torn out of {V}’s medical records' },
    curse: { name: 'Fulfilling the legend', text: '{C} believed the old prophecy of {P} had to be fulfilled, or disaster would fall on the person {C} loved.', hint: 'a well-thumbed local history lay in {C}’s room' },
    social: { name: 'Revenge on the system', text: '{PAST}, {N} years ago, destroyed many families, and {V} was the one the law let go. {C} only did what the law would not.', hint: '{V}’s bookshelf held an old newspaper clipping about {PAST}' },
    game: { name: 'For the trick’s own sake', text: '{C} only wanted to prove that the perfect trick could exist. {V} was chosen simply for being “the ideal victim for this trick”.', hint: '{C}’s shelves were full of detective novels, one with a page turned down' }
  },

  pastEvents: [
    'a mountaineering accident that claimed three lives', 'the unsolved disappearance of a young girl', 'the factory fire', 'a drowning that was ruled an accident',
    'a notorious miscarriage of justice', 'a shipwreck with no survivors', 'a fall from the roof during a school festival', 'a medical accident that was hushed up'
  ],

  times: ['nine in the evening', 'half past ten', 'midnight', 'one in the morning', 'half past two', 'four in the morning', 'six in the morning'],

  weapons: [
    { n: 'an ornamental dagger' }, { n: 'a bronze bust' }, { n: 'a silk necktie' }, { n: 'potassium cyanide' }, { n: 'an old revolver' },
    { n: 'a crossbow bolt' }, { n: 'a heavy crystal ashtray' }, { n: 'sleeping pills and arsenic stirred into a drink' }, { n: 'a piano wire' }
  ],

  detectives: {
    genius: { name: 'Great Detective', title: 'great detective', desc: 'Arrogant, erudite and eccentric; can read half a life from a speck of dust.',
      method: '{D} crouched on the floor of {R} with a magnifying glass for a long time, then said: “Ladies and gentlemen, the key to this affair is not who had the opportunity, but who needed the time.”' },
    armchair: { name: 'Armchair Detective', title: 'armchair detective', desc: 'Never visits the scene. Listens, and only listens.',
      method: '{W} told {D} the whole story from beginning to end. Knitting all the while — or knotting a piece of string — {D} asked: “And {X}: what state was it in at the time?”' },
    marple: { name: 'Village Spinster', title: 'elderly lady', desc: 'Looks entirely harmless, and has seen through every kind of human meanness.',
      method: '“This reminds me of something that happened in the village,” said {D} with a smile. “Human nature is much the same everywhere, you know.”' },
    priest: { name: 'Priest', title: 'priest', desc: 'Has a deep sympathy for sin — because he can imagine committing the very same sin himself.',
      method: '{D} did not look at the scene; {Dhe} kept looking at the people. “To understand what the killer did, you must first become the killer.”' },
    police: { name: 'Veteran Inspector', title: 'inspector', desc: 'Solves cases step by step — with legwork, files, and alibi charts.',
      method: '{D} entered everyone’s movements in a great chart and filled it square by square, until only one impossible blank remained.' },
    writer: { name: 'Mystery Novelist', title: 'novelist', desc: 'Shares a name with the detective of the novels, and treats reality as a manuscript to be revised.',
      method: '“If this were one of my novels,” said {D}, “the clue the author planted here would be — {X}.”' },
    scientist: { name: 'Physicist', title: 'associate professor', desc: 'Believes in no “mysteries” — only in experiments that can be repeated.',
      method: '{D} wrote a line of equations on the whiteboard. “Every phenomenon has a cause. Let’s run an experiment.”' },
    student: { name: 'High-School Detective', title: 'high-school student', desc: 'Claims to be “just passing through”, yet always ends up in the middle of a case.',
      method: '{D} stopped short. “Wait… what was said just now — something’s off.”' },
    folklorist: { name: 'Folklorist', title: 'writer of the uncanny', desc: 'A collector of ghost stories, as fascinated by curses as sceptical of them.',
      method: '{D} listed every legend told about {P}, then struck them out one by one. “This isn’t a curse. Nor is this. So what remains —”' },
    coroner: { name: 'Medical Examiner', title: 'medical examiner', desc: 'The dead never lie. They just speak very quietly.',
      method: '{D} examined {V}’s fingernails, pupils and lividity. “The time of death doesn’t match the statements. Someone is lying — or someone wants us to think so.”' },
    thief: { name: 'Gentleman Thief', title: 'gentleman thief', desc: 'Came to steal something, only to find someone else had got there first with a far greater crime.',
      method: 'From inside the air duct, {D} had witnessed part of it. “Speaking as a professional, I must say — the trick was rather crude.”' },
    medium: { name: 'Spirit Medium', title: 'medium', desc: 'Can sense what lingers of the dead, yet must prove with logic what has been “seen”.',
      method: '{D} closed {Dhis} eyes. “In the last moment, {V} saw a familiar face.” What remained was to make everyone else believe it.' }
  },

  watsons: [
    { r: 'doctor friend', d: 'a retired army doctor; a faithful chronicler' },
    { r: 'mystery-mad student', d: 'has read every Golden Age classic and is always first with the wrong answer' },
    { r: 'rookie detective', d: 'hot-blooded and reckless' },
    { r: 'the detective’s niece', d: 'complains out loud, admires in secret' },
    { r: 'magazine editor', d: 'just wants a good story' },
    { r: 'childhood friend', d: 'the only one who dares roll their eyes at the detective' }
  ],

  /* "Singular|Plural" */
  titleNouns: ['Pendulum|Pendulums', 'Snow|Snows', 'Mirror|Mirrors', 'Puppet|Puppets', 'Butterfly|Butterflies', 'Birdcage|Birdcages', 'Coffin|Coffins', 'Moonlight|Moons',
    'Thirteenth Step|Steps', 'Hourglass|Hourglasses', 'Labyrinth|Labyrinths', 'Weathercock|Weathercocks', 'Crow|Crows', 'Doll|Dolls', 'Will-o’-the-Wisp|Wisps', 'Cross|Crosses',
    'Shadow|Shadows', 'Music Box|Music Boxes', 'Balance|Balances', 'Black Cat|Black Cats', 'Teacup|Teacups', 'Skeleton|Skeletons', 'Mask|Masks', 'Candle|Candles'],
  titleColors: ['Black', 'White', 'Crimson', 'Violet', 'Grey', 'Amber', 'Blue'],
  titlePatterns: ['The {place} Murders', 'The Mystery of the {n1}', 'The {color} {n1}', 'The Tragedy of the {n1}', 'The {n1} and the {n2}', '{num} {n1p}',
    'Why the {n1} Killed', 'A {n2} for the {n1}', 'The {n1} of {place}', 'The {n1} Does Not Lie', 'The Last {n1}', 'The {n1} Murders'],

  herrings: [
    'a button belonging to no one lay on the windowsill of {R}',
    'the clock in the corridor had stopped at {T1} — but that clock never kept good time',
    'someone heard a piano at midnight, though the piano at {P} had long been broken',
    'the last page of {V}’s diary had been torn out',
    'there was a damp patch on the carpet of {R}, shaped like a footprint',
    'at dinner, {V} said something odd: “Tonight, there is someone here who should not be.”',
    'one window was found not quite shut after the murder',
    'there was a slip of paper with numbers on it in {V}’s pocket'
  ]
});
