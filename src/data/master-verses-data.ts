export interface MasterVerse {
  id: number | string;
  bonusNumber?: number;
  surah: number;
  surahName: string;
  surahNameAr: string;
  surahTranslation: string;
  verseRange: string;
  startAyah: number;
  endAyah: number;
  topic: string;
  sourceBook: string;
  category: string;
  crossReferenced: string | null;
  isTopCrossReferenced: boolean;
  isFullSurah: boolean;
  audioVerses: number[];
  arabic: string;
  transliteration: string;
  translation: string;
  alislamAppUrl: string;
}

export interface Top10Item {
  rank: number;
  ref: string;
  count: string;
  note: string;
  surah: number;
  ayah: number;
  targetId: number | string;
}

export const TOP_10_METADATA: Top10Item[] = [
  { rank: 1, ref: 'Ayat ul-Kursi (2:255)', count: '8+ books', note: 'Greatest verse in Quran; supreme shield against Jinn', surah: 2, ayah: 255, targetId: 5 },
  { rank: 2, ref: 'Al-Ikhlas (112:1-4)', count: '5+ books', note: 'Pure monotheism (Tawheed); equal to 1/3 of the Quran', surah: 112, ayah: 1, targetId: 106 },
  { rank: 3, ref: 'Al-Fatiha (1:1-7)', count: '4+ books', note: 'The Mother of the Book; foundational Ruqyah healing', surah: 1, ayah: 1, targetId: 1 },
  { rank: 4, ref: 'Al-Baqarah (2:285-286)', count: '4+ books', note: 'Night protection; last two verses of Al-Baqarah', surah: 2, ayah: 285, targetId: 7 },
  { rank: 5, ref: 'Al-Baqarah (2:102)', count: '4+ books', note: 'Sorcery of Harut & Marut; formula for breaking witchcraft', surah: 2, ayah: 102, targetId: 2 },
  { rank: 6, ref: 'An-Nur (24:35)', count: '4+ books', note: 'The Light Verse (Ayat an-Nur); parable of Divine light', surah: 24, ayah: 35, targetId: 'bonus-24-35' },
  { rank: 7, ref: 'Ya-Sin (36:82)', count: '4+ books', note: 'Kun Fayakun ("Be! And it is"); omnipotent decree of creation', surah: 36, ayah: 82, targetId: 'bonus-36-82' },
  { rank: 8, ref: 'Al-Falaq (113:1-5)', count: '3+ books', note: 'Protection from created evil, witchcraft & envy', surah: 113, ayah: 1, targetId: 107 },
  { rank: 9, ref: 'An-Nas (114:1-6)', count: '3+ books', note: 'Protection from the sneaking whisperer of human hearts', surah: 114, ayah: 1, targetId: 108 },
  { rank: 10, ref: 'Al-Isra (17:82)', count: '4+ books', note: 'Quran as healing (Shifa) and mercy for the believers', surah: 17, ayah: 82, targetId: 'bonus-17-82' },
];

export const RECITERS = {
  alafasy: { name: 'Mishary Rashid Alafasy', provider: 'everyayah', folder: 'Alafasy_128kbps' },
  abdulbasit: { name: 'Qari Abdul Basit (Murattal)', provider: 'everyayah', folder: 'Abdul_Basit_Murattal_192kbps' },
  ashiq: { name: 'Qari Muhammad Ashiq', provider: 'alislam', folder: 'ashiq' },
  feroz: { name: 'Qari Feroz', provider: 'alislam', folder: 'feroz' },
  rashid: { name: 'Qari Rashid', provider: 'alislam', folder: 'rashid' },
  aiman: { name: 'Qari Aiman', provider: 'alislam', folder: 'aiman' },
  'idir-iken': { name: 'Qari Idir Iken', provider: 'alislam', folder: 'idir-iken' }
};

export const TOP_CROSS_REFERENCED_ADDITIONAL: MasterVerse[] = [
  {
    id: 'bonus-17-82',
    bonusNumber: 109,
    surah: 17,
    surahName: 'Al-Isra',
    surahNameAr: 'سُورَةُ الإِسۡرَاءِ',
    surahTranslation: 'The Night Journey',
    verseRange: '17:82',
    startAyah: 82,
    endAyah: 82,
    topic: 'Quran as healing (Shifa) and mercy for the believers',
    sourceBook: 'Understanding Ruqyah & Jinn in Islam (Dedication Verse)',
    category: 'Protection & Ruqyah (Healing)',
    crossReferenced: '4+ books',
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [82],
    arabic: 'وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌۭ وَرَحْمَةٌۭ لِّلْمُؤْمِنِينَ ۙ وَلَا يَزِيدُ ٱلظَّٰلِمِينَ إِلَّا خَسَارًۭا',
    transliteration: "Wa nunazzilu minal quraani maa huwa shifaaa'unw wa rahmatul lilmu'mineena wa laa yazeeduz zaalimeena illaa khasaaraa",
    translation: 'And We send down of the Qur\'an that which is healing and mercy for the believers, but it does not increase the wrongdoers except in loss.',
    alislamAppUrl: 'https://www.alislam.org/quran/app/17:82'
  },
  {
    id: 'bonus-24-35',
    bonusNumber: 110,
    surah: 24,
    surahName: 'An-Nur',
    surahNameAr: 'سُورَةُ النُّورِ',
    surahTranslation: 'The Light',
    verseRange: '24:35',
    startAyah: 35,
    endAyah: 35,
    topic: 'Ayat an-Nur (The Light Verse) - Parable of Divine Light',
    sourceBook: 'Understanding Ruqyah & Jinn in Islam',
    category: 'Signs & Creation',
    crossReferenced: '4+ books',
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [35],
    arabic: '۞ ٱللَّهُ نُورُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍۢ فِيهَا مِصْبَاحٌ ۖ ٱلْمِصْبَاحُ فِى زُجَاجَةٍ ۖ ٱلزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌۭ دُرِّىٌّۭ يُوقَدُ مِن شَجَرَةٍۢ مُّبَٰرَكَةٍۢ زَيْتُونَةٍۢ لَّا شَرْقِيَّةٍۢ وَلَا غَرْبِيَّةٍۢ يَكَادُ زَيْتُهَا يُضِىٓءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌۭ ۚ نُّورٌ عَلَىٰ نُورٍۢ ۗ يَهْدِى ٱللَّهُ لِنُورِهِۦ مَن يَشَآءُ ۚ وَيَضْرِبُ ٱللَّهُ ٱلْأَمْثَٰلَ لِلنَّاسِ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌۭ',
    transliteration: "Allahu noorus samaawaati wal ard; masalu noorihee kamishkaatin feehaa misbaah; almisbaahu fee zujaajatin; azzujaajatu ka annahaa kawkabun durriyyuny yooqadu min shajaratim mubaarakatin zaytoonatil laa sharqiyyatinw wa laa gharbiyyatiny yakaadu zaytuhaa yudeee'u wa law lam tamsashu naar; noorun 'alaa noor; yahdillaahu linoorihee may yashaaa'; wa yadribullaahul amsaala linnaas; wallaahu bikulli shai'in 'Aleem",
    translation: 'Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp, the lamp is within glass, the glass as if it were a pearly [white] star lit from [the oil of] a blessed olive tree, neither of the east nor of the west, whose oil would almost glow even if untouched by fire. Light upon light. Allah guides to His light whom He wills. And Allah presents examples for the people, and Allah is Knowing of all things.',
    alislamAppUrl: 'https://www.alislam.org/quran/app/24:35'
  },
  {
    id: 'bonus-36-82',
    bonusNumber: 111,
    surah: 36,
    surahName: 'Ya-Sin',
    surahNameAr: 'سُورَةُ يسٓ',
    surahTranslation: 'Yaseen',
    verseRange: '36:82',
    startAyah: 82,
    endAyah: 82,
    topic: 'Kun Fayakun (Be! And it is) - Divine command of creation',
    sourceBook: 'Understanding Ruqyah & Jinn in Islam',
    category: 'Signs & Creation',
    crossReferenced: '4+ books',
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [82],
    arabic: 'إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ',
    transliteration: "Innamaa amruhooo izaaa araada shai'an ai-yaqoola lahoo kun fa-yakoon",
    translation: 'His command is only when He intends a thing that He says to it, "Be," and it is.',
    alislamAppUrl: 'https://www.alislam.org/quran/app/36:82'
  }
];

export const MASTER_VERSES_DATA: MasterVerse[] = [
  {
    id: 1,
    surah: 1,
    surahName: "Al-Faatiha",
    surahNameAr: "سُورَةُ ٱلْفَاتِحَةِ",
    surahTranslation: "The Opening",
    verseRange: "1:1-7",
    startAyah: 1,
    endAyah: 7,
    topic: "Full Surah used as Ruqyah for healing",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Protection & Ruqyah (Healing)",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: true,
    audioVerses: [1, 2, 3, 4, 5, 6, 7],
    arabic: "(1) بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ (2) ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ (3) ٱلرَّحْمَٰنِ ٱلرَّحِيمِ (4) مَٰلِكِ يَوْمِ ٱلدِّينِ (5) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (6) ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ (7) صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
    transliteration: "[1] Bismillaahir Rahmaanir Raheem [2] Alhamdu lillaahi Rabbil 'aalameen [3] Ar-Rahmaanir-Raheem [4] Maaliki Yawmid-Deen [5] Iyyaaka na'budu wa Iyyaaka nasta'een [6] Ihdinas-Siraatal-Mustaqeem [7] Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daalleen",
    translation: "[1] In the name of Allah, the Entirely Merciful, the Especially Merciful. [2] [All] praise is [due] to Allah, Lord of the worlds - [3] The Entirely Merciful, the Especially Merciful, [4] Sovereign of the Day of Recompense. [5] It is You we worship and You we ask for help. [6] Guide us to the straight path - [7] The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
    alislamAppUrl: "https://www.alislam.org/quran/app/1:1"
  },
  {
    id: 2,
    surah: 2,
    surahName: "Al-Baqara",
    surahNameAr: "سُورَةُ البَقَرَةِ",
    surahTranslation: "The Cow",
    verseRange: "2:102",
    startAyah: 102,
    endAyah: 102,
    topic: "Sorcery of Harut & Marut in Babylon",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Anti-Sorcery & Breaking Magic",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [102],
    arabic: "وَٱتَّبَعُوا۟ مَا تَتْلُوا۟ ٱلشَّيَٰطِينُ عَلَىٰ مُلْكِ سُلَيْمَٰنَ ۖ وَمَا كَفَرَ سُلَيْمَٰنُ وَلَٰكِنَّ ٱلشَّيَٰطِينَ كَفَرُوا۟ يُعَلِّمُونَ ٱلنَّاسَ ٱلسِّحْرَ وَمَآ أُنزِلَ عَلَى ٱلْمَلَكَيْنِ بِبَابِلَ هَٰرُوتَ وَمَٰرُوتَ ۚ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَآ إِنَّمَا نَحْنُ فِتْنَةٌۭ فَلَا تَكْفُرْ ۖ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِۦ بَيْنَ ٱلْمَرْءِ وَزَوْجِهِۦ ۚ وَمَا هُم بِضَآرِّينَ بِهِۦ مِنْ أَحَدٍ إِلَّا بِإِذْنِ ٱللَّهِ ۚ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنفَعُهُمْ ۚ وَلَقَدْ عَلِمُوا۟ لَمَنِ ٱشْتَرَىٰهُ مَا لَهُۥ فِى ٱلْءَاخِرَةِ مِنْ خَلَٰقٍۢ ۚ وَلَبِئْسَ مَا شَرَوْا۟ بِهِۦٓ أَنفُسَهُمْ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ",
    transliteration: "Wattaba'oo maa tatlush Shayaateenu 'alaa mulki Sulaimaana wa maa kafara Sulaimaanu wa laakinnash Shayaateena kafaroo yu'allimoonan naasas sihra wa maaa unzila 'alal malakaini bi Baabila Haaroota wa Maaroot...",
    translation: "And they followed [instead] what the devils had recited during the reign of Solomon. It was not Solomon who disbelieved, but the devils disbelieved, teaching people magic...",
    alislamAppUrl: "https://www.alislam.org/quran/app/2:102"
  },
  {
    id: 5,
    surah: 2,
    surahName: "Al-Baqara",
    surahNameAr: "سُورَةُ البَقَرَةِ",
    surahTranslation: "The Cow",
    verseRange: "2:255",
    startAyah: 255,
    endAyah: 255,
    topic: "Ayat ul-Kursi - greatest verse, supreme protection from Jinn",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Protection & Ruqyah (Healing)",
    crossReferenced: "8+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [255],
    arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
    transliteration: "Allahu laaa ilaaha illaa Huwal Haiyul Qaiyoom; laa taakhuzuhoo sinatunw wa laa nawm; lahoo maa fissamaawaati wa maa fil ard...",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep...",
    alislamAppUrl: "https://www.alislam.org/quran/app/2:255"
  },
  {
    id: 7,
    surah: 2,
    surahName: "Al-Baqara",
    surahNameAr: "سُورَةُ البَقَرَةِ",
    surahTranslation: "The Cow",
    verseRange: "2:285-286",
    startAyah: 285,
    endAyah: 286,
    topic: "Last two verses of Al-Baqarah - protection at night",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Protection & Ruqyah (Healing)",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [285, 286],
    arabic: "(285) ءَامَنَ ٱلرَّسُولُ بِمَآ أُنزِلَ إِلَيْهِ مِن رَّبِّهِۦ وَٱلْمُؤْمِنُونَ ۚ كُلٌّ ءَامَنَ بِٱللَّهِ وَمَلَٰٓئِكَتِهِۦ وَكُتُبِهِۦ وَرُسُلِهِۦ لَا نُفَرِّقُ بَيْنَ أَحَدٍۢ مِّن رُّسُلِهِۦ ۚ وَقَالُوا۟ سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ ٱلْمَصِيرُ (286) لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ",
    transliteration: "[285] Aamanar-Rasoolu bimaaa unzila ilaihi mir-Rabbihee walmu'minoon... [286] Laa yukalliful-laahu nafsan illaa wus'ahaa...",
    translation: "[285] The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers... [286] Allah does not charge a soul except [with that within] its capacity...",
    alislamAppUrl: "https://www.alislam.org/quran/app/2:285"
  },
  {
    id: 10,
    surah: 7,
    surahName: "Al-A'raf",
    surahNameAr: "سُورَةُ الأَعْرَافِ",
    surahTranslation: "The Heights",
    verseRange: "7:117-122",
    startAyah: 117,
    endAyah: 122,
    topic: "Moses' Staff swallows Pharaoh's magicians' illusions - breaking sorcery",
    sourceBook: "Sword Against Black Magic",
    category: "Anti-Sorcery & Breaking Magic",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [117, 118, 119, 120, 121, 122],
    arabic: "(117) ۞ وَأَوْحَيْنَآ إِلَىٰ مُوسَىٰٓ أَنْ أَلْقِ عَصَاكَ ۖ فَإِذَا هِىَ تَلْقَفُ مَا يَأْفِكُونَ (118) فَوَقَعَ ٱلْحَقُّ وَبَطَلَ مَا كَانُوا۟ يَعْمَلُونَ (119) فَغُلِبُوا۟ هُنَالِكَ وَٱنقَلَبُوا۟ صَٰغِرِينَ (120) وَأُلْقِىَ ٱلسَّحَرَةُ سَٰجِدِينَ (121) قَالُوٓا۟ ءَامَنَّا بِرَبِّ ٱلْعَٰلَمِينَ (122) رَبِّ مُوسَىٰ وَهَٰرُونَ",
    transliteration: "[117] Wa awhainaaa ilaa Moosaaa an alqi 'asaak; fa izaa hiya talqafu maa ya'fikoon [118] Fawaqa'al haqqu wa batala maa kaanoo ya'maloon [119] Faghuliboo hunaalika wanqalaboo saaghireen [120] Wa ulqiyas saharatu saajideen [121] Qaalooo aamannaa bi Rabbil 'aalameen [122] Rabbi Moosaa wa Haaroon",
    translation: "[117] And We inspired to Moses, \"Throw your staff,\" and at once it devoured what they were falsifying. [118] So the truth was established, and that which they were doing was nullified. [119] And [Pharaoh and his people] were overcome right there and became debased. [120] And the magicians fell down in prostration. [121] They said, \"We have believed in the Lord of the worlds, [122] The Lord of Moses and Aaron.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/7:117"
  },
  {
    id: 11,
    surah: 10,
    surahName: "Yunus",
    surahNameAr: "سُورَةُ يُونُسَ",
    surahTranslation: "Jonah",
    verseRange: "10:81-82",
    startAyah: 81,
    endAyah: 82,
    topic: "What you have brought is sorcery; Allah will nullify it",
    sourceBook: "Sword Against Black Magic",
    category: "Anti-Sorcery & Breaking Magic",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [81, 82],
    arabic: "(81) فَلَمَّآ أَلْقَوْا۟ قَالَ مُوسَىٰ مَا جِئْتُم بِهِ ٱلسِّحْرُ ۖ إِنَّ ٱللَّهَ سَيُبْطِلُهُۥٓ ۖ إِنَّ ٱللَّهَ لَا يُصْلِحُ عَمَلَ ٱلْمُفْسِدِينَ (82) وَيُحِقُّ ٱللَّهُ ٱلْحَقَّ بِكَلِمَٰتِهِۦ وَلَوْ كَرِهَ ٱلْمُجْرِمُونَ",
    transliteration: "[81] Falammaaa alqaw qaala Moosaa maa ji'tum bihis sihr; innal laaha sayubtiluh; innal laaha laa yuslihu 'amalal muftideen [82] Wa yuhiqqul laahul haqqa bi Kalimaatihee wa law karihal mujrimoon",
    translation: "[81] And when they had thrown, Moses said, \"What you have brought is [only] magic. Indeed, Allah will expose its worthlessness. Indeed, Allah does not amend the work of corrupters. [82] And Allah will establish the truth by His words, even if the criminals dislike it.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/10:81"
  },
  {
    id: 12,
    surah: 20,
    surahName: "Ta-Ha",
    surahNameAr: "سُورَةُ طه",
    surahTranslation: "Ta-Ha",
    verseRange: "20:69",
    startAyah: 69,
    endAyah: 69,
    topic: "A magician will not succeed wherever he is",
    sourceBook: "Sword Against Black Magic",
    category: "Anti-Sorcery & Breaking Magic",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [69],
    arabic: "وَأَلْقِ مَا فِى يَمِينِكَ تَلْقَفْ مَا صَنَعُوٓا۟ ۖ إِنَّمَا صَنَعُوا۟ كَيْدُ سَٰحِرٍۢ ۖ وَلَا يُفْلِحُ ٱلسَّاحِرُ حَيْثُ أَتَىٰ",
    transliteration: "Wa alqi maa fee yameenika talqaf maa sana'oo; innamaa sana'oo kaidu saahir; wa laa yuflihus saahiru haisu ataa",
    translation: "And throw what is in your right hand; it will swallow up what they have crafted. What they have crafted is but the trick of a magician, and the magician will not succeed wherever he is.",
    alislamAppUrl: "https://www.alislam.org/quran/app/20:69"
  },
  {
    id: 23,
    surah: 23,
    surahName: "Al-Mu'minoon",
    surahNameAr: "سُورَةُ المُؤْمِنُونَ",
    surahTranslation: "The Believers",
    verseRange: "23:115-118",
    startAyah: 115,
    endAyah: 118,
    topic: "Did you think that We created you uselessly? Ruqyah for demonic presence",
    sourceBook: "Ruqyah Exorcism & Protection",
    category: "Jinn & the Unseen World",
    crossReferenced: "3+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [115, 116, 117, 118],
    arabic: "(115) أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَٰكُمْ عَبَثًۭا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ (116) فَتَعَٰلَى ٱللَّهُ ٱلْمَلِكُ ٱلْحَقُّ ۖ لَآ إِلَٰهَ إِلَّا هُوَ رَبُّ ٱلْعَرْشِ ٱلْكَرِيمِ (117) وَمَن يَدْعُ مَعَ ٱللَّهِ إِلَٰهًا ءَاخَرَ لَا بُرْهَٰنَ لَهُۥ بِهِۦ فَإِنَّمَا حِسَابُهُۥ عِندَ رَبِّهِۦٓ ۚ إِنَّهُۥ لَا يُفْلِحُ ٱلْكَٰفِرُونَ (118) وَقُل رَّبِّ ٱغْفِرْ وَٱرْحَمْ وَأَنتَ خَيْرُ ٱلرَّٰحِمِينَ",
    transliteration: "[115] Afahasibtum annamaa khalaqnaakum 'abasanw wa annakum ilainaa laa turja'oon [116] Fata'aalal laahul Malikul Haqq; laaa ilaaha illaa Huwa Rabbul 'Arshil Kareem [117] Wa mai yad'u ma'al laahi ilaahan aakhara laa burhaana lahoo bihee fainnamaa hisaabuhoo 'inda Rabbih; innahoo laa yuflihul kaafiroon [118] Wa qur Rabbigh fir warham wa Anta khayrur raahimeen",
    translation: "[115] Then did you think that We created you uselessly and that to Us you would not be returned? [116] So exalted is Allah, the Sovereign, the Truth; there is no deity except Him, Lord of the Noble Throne. [117] And whoever invokes besides Allah another deity for which he has no proof - then his account is only with his Lord. Indeed, the disbelievers will not succeed. [118] And, [O Muhammad], say, \"My Lord, forgive and have mercy, and You are the best of the merciful.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/23:115"
  },
  {
    id: 37,
    surah: 37,
    surahName: "As-Saaffaat",
    surahNameAr: "سُورَةُ الصَّافَّاتِ",
    surahTranslation: "Those Ranged in Ranks",
    verseRange: "37:1-10",
    startAyah: 1,
    endAyah: 10,
    topic: "Guarding heavens with piercing flames against rebellious devils",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Jinn & the Unseen World",
    crossReferenced: "3+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    arabic: "(1) وَٱلصَّٰٓفَّٰتِ صَفًّۭا (2) فَٱلزَّٰجِرَٰتِ زَجْرًۭا (3) فَٱلتَّٰلِيَٰتِ ذِكْرًا (4) إِنَّ إِلَٰهَكُمْ لَوَٰحِدٌۭ (5) رَّبُّ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ وَمَا بَيْنَهُمَا وَرَبُّ ٱلْمَشَٰرِقِ (6) إِنَّا زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِزِينَةٍ ٱلْكَوَاكِبِ (7) وَحِفْظًۭا مِّن كُلِّ شَيْطَٰنٍۢ مَّارِدٍۢ (8) لَّا يَسَّمَّعُونَ إِلَى ٱلْمَلَإِ ٱلْأَعْلَىٰ وَيُقْذَفُونَ مِن كُلِّ جَانِبٍۢ (9) دُحُورًۭا ۖ وَلَهُمْ عَذَابٌۭ وَاصِبٌ (10) إِلَّا مَنْ خَطِفَ ٱلْخَطْفَةَ فَأَتْبَعَهُۥ شِهَابٌۭ ثَاقِبٌۭ",
    transliteration: "[1] Wassaaaffaati saffaa [2] Fazzaajiraati zajraa [3] Fattaaliyaati zikraa [4] Inna Ilaahakum la Waahid [5] Rabbus samaawaati wal ardi wa maa bainahumaa wa Rabbul mashaariq [6] Innaa zaiyannas samaaa'ad dunyaa bizeenatinil kawaakib [7] Wa hifzam min kulli shaitaanim maarid [8] Laa yassamma'oona ilal mala'il a'laa wa yuqzafoona min kulli jaanib [9] Duhooranw wa lahum 'azaabunw waasib [10] Illaa man khatifal khatfata fa atba'ahoo shihaabun saaqib",
    translation: "[1] By those [angels] lined up in rows [2] And those who drive [the clouds] [3] And those who recite the message [4] Indeed, your God is One [5] Lord of the heavens and the earth and that between them and Lord of the sunrises. [6] Indeed, We have adorned the nearest heaven with an adornment of stars [7] And as protection against every rebellious devil [8] [So] they may not listen to the exalted assembly and are pelted from every side, [9] Repelled; and for them is a constant punishment, [10] Except one who snatches [some words] by theft, but they are pursued by a burning flame, piercing [in brightness].",
    alislamAppUrl: "https://www.alislam.org/quran/app/37:1"
  },
  {
    id: 59,
    surah: 59,
    surahName: "Al-Hashr",
    surahNameAr: "سُورَةُ الحَشْرِ",
    surahTranslation: "The Exile",
    verseRange: "59:21-24",
    startAyah: 21,
    endAyah: 24,
    topic: "Had We sent down this Quran upon a mountain, it would humble itself; Beautiful Names of Allah",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Tawheed (Oneness of Allah)",
    crossReferenced: "4+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [21, 22, 23, 24],
    arabic: "(21) لَوْ أَنزَلْنَا هَٰذَا ٱلْقُرْءَانَ عَلَىٰ جَبَلٍۢ لَّرَأَيْتَهُۥ خَٰشِعًۭا مُّتَصَدِّعًۭا مِّنْ خَشْيَةِ ٱللَّهِ ۚ وَتِلْكَ ٱلْأَمْثَٰلُ نَضْرِبُهَا لِلنَّاسِ لَعَلَّهُمْ يَتَفَكَّرُونَ (22) هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَٰهَ إِلَّا هُوَ ۖ عَٰلِمُ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ ۖ هُوَ ٱلرَّحْمَٰنُ ٱلرَّحِيمُ (23) هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَٰهَ إِلَّا هُوَ ٱلْمَلِكُ ٱلْقُدُّوسُ ٱلسَّلَٰمُ ٱلْمُؤْمِنُ ٱلْمُهَيْمِنُ ٱلْعَزِيزُ ٱلْجَبَّارُ ٱلْمُتَكَبِّرُ ۚ سُبْحَٰنَ ٱللَّهِ عَمَّا يُشْرِكُونَ (24) هُوَ ٱللَّهُ ٱلْخَٰلِقُ ٱلْبَارِئُ ٱلْمُصَوِّرُ ۖ لَهُ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ ۚ يُسَبِّحُ لَهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۖ وَهُوَ ٱلْعَزِيزُ ٱلْحَكِيمُ",
    transliteration: "[21] Law anzalnaa haazal quraana 'alaa jabalil lara aytahoo khaashi'am mutasaddi'am min khashyatil laah... [22] Huwal-laahul-lazee laaa Ilaaha illaa Huwa 'Aalimul Ghaibi wash-shahaadati Huwar Rahmaanur-Raheem [23] Huwal-laahul-lazee laaa Ilaaha illaa Huwal-Malikul Quddoosus-Salaamul Mu'minul Muhaiminul 'Azeezul Jabbaarul Mutakabbir... [24] Huwal Laahul Khaaliqul Baari'ul Musawwiru lahul Asmaaa'ul Husnaa...",
    translation: "[21] If We had sent down this Qur'an upon a mountain, you would have seen it humbled and coming apart from fear of Allah... [22] He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful... [23] He is Allah, other than whom there is no deity, the Sovereign, the Pure, the Perfection, the Bestower of Faith, the Overseer, the Exalted in Might, the Compeller, the Superior... [24] He is Allah, the Creator, the Inventor, the Fashioner; to Him belong the best names...",
    alislamAppUrl: "https://www.alislam.org/quran/app/59:21"
  },
  {
    id: 68,
    surah: 68,
    surahName: "Al-Qalam",
    surahNameAr: "سُورَةُ القَلَمِ",
    surahTranslation: "The Pen",
    verseRange: "68:51-52",
    startAyah: 51,
    endAyah: 52,
    topic: "The Disbelievers almost strike you down with their eyes (Evil Eye / Ayn)",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Evil Eye & Envy",
    crossReferenced: "3+ books",
    isTopCrossReferenced: true,
    isFullSurah: false,
    audioVerses: [51, 52],
    arabic: "(51) وَإِن يَكَادُ ٱلَّذِينَ كَفَرُوا۟ لَيُزْلِقُونَكَ بِأَبْصَٰرِهِمْ لَمَّا سَمِعُوا۟ ٱلذِّكْرَ وَيَقُولُونَ إِنَّهُۥ لَمَجْنُونٌۭ (52) وَمَا هُوَ إِلَّا ذِكْرٌۭ لِّلْعَٰلَمِينَ",
    transliteration: "[51] Wa iny-yakaadullazeena kafaroo layuzliqoonaka bi absaarihim lammaa sami'uz Zikra wa yaqooloona innahoo lamajnoon [52] Wa maa huwa illaa zikrul lil'aalameen",
    translation: "[51] And indeed, those who disbelieve would almost make you slip with their eyes [i.e., look through hatred] when they hear the message, and they say, \"Indeed, he is mad.\" [52] But it is not except a reminder to the worlds.",
    alislamAppUrl: "https://www.alislam.org/quran/app/68:51"
  },
  {
    id: 106,
    surah: 112,
    surahName: "Al-Ikhlaas",
    surahNameAr: "سُورَةُ الإِخْلَاصِ",
    surahTranslation: "The Sincerity",
    verseRange: "112:1-4",
    startAyah: 1,
    endAyah: 4,
    topic: "Pure Monotheism (Tawheed) - equal to 1/3 of the Quran",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Tawheed (Oneness of Allah)",
    crossReferenced: "5+ books",
    isTopCrossReferenced: true,
    isFullSurah: true,
    audioVerses: [1, 2, 3, 4],
    arabic: "(1) قُلْ هُوَ ٱللَّهُ أَحَدٌ (2) ٱللَّهُ ٱلصَّمَدُ (3) لَمْ يَلِدْ وَلَمْ يُولَدْ (4) وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
    transliteration: "[1] Qul Huwal-laahu Ahad [2] Allaahus-Samad [3] Lam yalid wa lam yoolad [4] Wa lam yakul-lahoo kufuwan ahad",
    translation: "[1] Say, \"He is Allah, [who is] One, [2] Allah, the Eternal Refuge. [3] He neither begets nor is born, [4] Nor is there to Him any equivalent.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/112:1"
  },
  {
    id: 107,
    surah: 113,
    surahName: "Al-Falaq",
    surahNameAr: "سُورَةُ الفَلَقِ",
    surahTranslation: "The Daybreak",
    verseRange: "113:1-5",
    startAyah: 1,
    endAyah: 5,
    topic: "Protection from created evil, witchcraft & envy",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Protection & Ruqyah (Healing)",
    crossReferenced: "3+ books",
    isTopCrossReferenced: true,
    isFullSurah: true,
    audioVerses: [1, 2, 3, 4, 5],
    arabic: "(1) قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ (2) مِن شَرِّ مَا خَلَقَ (3) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (4) وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ (5) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "[1] Qul a'oozu bi Rabbil-falaq [2] Min sharri maa khalaq [3] Wa min sharri ghaasiqin izaa waqab [4] Wa min sharrin-naffaasaati fil-'uqad [5] Wa min sharri haasidin izaa hasad",
    translation: "[1] Say, \"I seek refuge in the Lord of daybreak [2] From the evil of that which He created [3] And from the evil of darkness when it settles [4] And from the evil of the blowers in knots [5] And from the evil of an envier when he envies.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/113:1"
  },
  {
    id: 108,
    surah: 114,
    surahName: "An-Naas",
    surahNameAr: "سُورَةُ النَّاسِ",
    surahTranslation: "Mankind",
    verseRange: "114:1-6",
    startAyah: 1,
    endAyah: 6,
    topic: "Protection from the sneaking whisperer of human hearts",
    sourceBook: "Understanding Ruqyah & Jinn in Islam",
    category: "Protection & Ruqyah (Healing)",
    crossReferenced: "3+ books",
    isTopCrossReferenced: true,
    isFullSurah: true,
    audioVerses: [1, 2, 3, 4, 5, 6],
    arabic: "(1) قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ (2) مَلِكِ ٱلنَّاسِ (3) إِلَٰهِ ٱلنَّاسِ (4) مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ (5) ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ (6) مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
    transliteration: "[1] Qul a'oozu bi Rabbin-naas [2] Malikin-naas [3] Ilaahin-naas [4] Min sharril-waswaasil-khannaas [5] Allazee yuwaswisu fee sudoorin-naas [6] Minal-jinnati wan-naas",
    translation: "[1] Say, \"I seek refuge in the Lord of mankind, [2] The Sovereign of mankind, [3] The God of mankind, [4] From the evil of the retreating whisperer - [5] Who whispers [evil] into the breasts of mankind - [6] From among the jinn and mankind.\"",
    alislamAppUrl: "https://www.alislam.org/quran/app/114:1"
  }
];

export const ALL_MASTER_VERSES: MasterVerse[] = [
  ...TOP_CROSS_REFERENCED_ADDITIONAL,
  ...MASTER_VERSES_DATA
];
