// Culture items data for NusaPlay
// Each item: id, provinceId, category, title, description, youtubeId, narrator (for TTS), location, period, image

export const CATEGORIES = {
  TARIAN: 'Tarian',
  MUSIK: 'Musik',
  CERITA_RAKYAT: 'Cerita Rakyat',
  SENJATA: 'Senjata',
  RUMAH_ADAT: 'Rumah Adat',
  PAKAIAN: 'Pakaian Adat',
  KULINER: 'Kuliner',
  BAHASA: 'Bahasa Daerah',
  KERAJINAN: 'Kerajinan',
  UPACARA: 'Upacara Adat',
  BANGUNAN_BERSEJARAH: 'Bangunan Bersejarah',
  WAYANG: 'Wayang',
  BATIK: 'Batik',
};

export const CULTURES = [
  // ─── D.I. YOGYAKARTA ───────────────────────────────────────────────────────

  // Tarian
  {
    id: "diy-tari-bedhaya",
    provinceId: "diy",
    category: "Tarian",
    title: "Tari Bedhaya Ketawang",
    coordinates: [-7.805, 110.364],
    isLandmark: true,
    description:
      "Tari Bedhaya merupakan tarian sakral dari tradisi Keraton Yogyakarta yang dipentaskan pada acara-acara tertentu. Tarian ini melambangkan keharmonisan, kesetiaan, dan keseimbangan dalam kehidupan melalui gerakan para penari yang serempak dan penuh makna.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/tari-bedhaya-ketawang.mp3",
    narrator:
      "Tari Bedhaya Ketawang adalah tarian sakral Keraton Jawa yang dipentaskan dalam upacara penobatan raja atau peringatan naik takhta. Gerakan sembilan penari yang lambat, anggun, dan serempak diiringi musik gamelan menciptakan atmosfer khidmat dan penuh misteri spiritual.",
    location: "Keraton Kasunanan Surakarta, D.I. Yogyakarta",
    period: "Era Mataram Islam, abad ke-17",
    image: "/img/cultures/bedhaya-ketawang.jpg",
    tags: ["Sakral", "Keraton", "Ritual"],
  },
  {
    id: "diy-tari-srimpi",
    provinceId: "diy",
    category: "Tarian",
    title: "Tari Serimpi",
    description:
      "Tari Serimpi merupakan salah satu tarian klasik yang berasal dari lingkungan Keraton Yogyakarta. Gerakannya yang lembut dan teratur mencerminkan kehalusan, kesabaran, ketenangan, serta pengendalian diri yang dijunjung tinggi dalam budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/tari-serimpi.mp3",
    narrator:
      "Tari Srimpi lahir dari istana Keraton Yogyakarta sebagai simbol keanggunan dan kekuasaan. Empat penari mementaskan gerakan anggun yang melambangkan kehalusan budi pekerti, kesabaran, dan moralitas luhur wanita Jawa.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Masa Kesultanan Yogyakarta, abad ke-18",
    image: "/img/cultures/tari-srimpi.jpg",
    tags: ["Klasik", "Istana", "Filosofis"],
  },
  {
    id: "diy-tari-golek",
    provinceId: "diy",
    category: "Tarian",
    title: "Tari Golek Ayun-Ayun",
    description:
      "Tari Golek Ayun-Ayun merupakan tarian tradisional Yogyakarta yang biasanya dibawakan oleh penari perempuan. Tarian ini menggambarkan perjalanan seorang gadis yang belajar mengenal diri, menjaga sikap, dan mempersiapkan diri menuju kedewasaan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Tari Golek Ayun-Ayun menceritakan perjalanan seorang gadis Jawa yang sedang tumbuh dewasa. Gerakannya yang lembut dan ekspresif mengajarkan kesopanan, kepercayaan diri, serta tata krama dalam kehidupan sehari-hari.",
    location: "Yogyakarta",
    period: "Diciptakan oleh K.R.T. Sasmintadipura pada abad ke-20",
    image: "/img/cultures/tari-golek.jpg",
    tags: ["Tarian", "Klasik", "Golek"],
  },
  {
    id: "diy-tari-beksan-wireng",
    provinceId: "diy",
    category: "Tarian",
    title: "Tari Beksan Wireng",
    description:
      "Tari Beksan Wireng merupakan tarian tradisional Yogyakarta yang menggambarkan semangat keprajuritan dan keberanian. Biasanya dibawakan oleh penari laki-laki dengan gerakan tegas, dinamis, dan penuh energi sebagai simbol kedisiplinan serta tanggung jawab.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Tari Beksan Wireng menampilkan semangat ksatria melalui gerak yang tegas dan dinamis. Di balik nuansa latihan perang, tarian ini menekankan keberanian, disiplin, dan kebijaksanaan dalam mengendalikan kekuatan.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Tradisi keraton Yogyakarta",
    image: "/img/cultures/beksan-wireng.jpg",
    tags: ["Tarian", "Ksatria", "Keraton"],
  },

  // Alat Musik
  {
    id: "diy-gamelan",
    provinceId: "diy",
    category: "Musik",
    title: "Gamelan Jawa",
    coordinates: [-7.809, 110.359],
    isLandmark: true,
    description:
      "Gamelan Jawa merupakan ansambel musik tradisional yang menjadi bagian penting dari budaya masyarakat Yogyakarta. Gamelan terdiri dari berbagai instrumen seperti saron, gong, kenong, bonang, kendang, dan lainnya yang dimainkan bersama untuk menghasilkan harmoni yang khas.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/alat-musik-gamelan.mp3",
    narrator:
      "Gamelan Jawa telah menggema selama berabad-abad di tanah Yogyakarta. Setiap instrumennya memiliki jiwa, yang jika dimainkan bersama akan menghasilkan harmoni suara tenang yang melambangkan kebersamaan dan kedamaian hidup.",
    location: "Seluruh D.I. Yogyakarta",
    period: "Sejak abad ke-8 Masehi",
    image: "/img/cultures/gamelan-jawa.jpg",
    tags: ["UNESCO", "Orkestra", "Meditasi"],
  },
  {
    id: "diy-kendang",
    provinceId: "diy",
    category: "Musik",
    title: "Kendang",
    coordinates: [-7.807, 110.362],
    isLandmark: false,
    description:
      "Kendang merupakan alat musik pukul yang memiliki peran penting dalam pertunjukan gamelan Jawa. Alat musik ini terbuat dari kayu dengan kedua sisinya dilapisi kulit dan dimainkan dengan tangan untuk menghasilkan variasi bunyi.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Kendang menjadi pengatur tempo dalam gamelan Jawa. Dengan pukulan tangan yang tepat, alat musik ini memimpin irama pertunjukan dan menjaga seluruh ansambel tetap selaras.",
    location: "D.I. Yogyakarta",
    period: "Tradisi gamelan Jawa",
    image: "/img/cultures/gamelan-jawa.jpg",
    tags: ["Pukul", "Ritme", "Gamelan"],
  },
  {
    id: "diy-rebab",
    provinceId: "diy",
    category: "Musik",
    title: "Rebab",
    coordinates: [-7.806, 110.36],
    isLandmark: false,
    description:
      "Rebab merupakan alat musik gesek tradisional yang telah lama menjadi bagian dari musik gamelan Jawa. Alat musik ini memiliki dua senar dan dimainkan dengan alat gesek khusus untuk menghasilkan suara yang lembut dan ekspresif.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/alat-musik-rebab.mp3",
    narrator:
      "Rebab menghadirkan melodi yang lembut dan emosional dalam gamelan Jawa. Suaranya yang halus sering membawa nuansa tenang, haru, dan kerinduan di tengah pertunjukan tradisional.",
    location: "D.I. Yogyakarta",
    period: "Tradisi gamelan Jawa",
    image: "/img/cultures/gamelan-jawa.jpg",
    tags: ["Gesek", "Melodi", "Gamelan"],
  },
  {
    id: "diy-bonang",
    provinceId: "diy",
    category: "Musik",
    title: "Bonang",
    coordinates: [-7.808, 110.361],
    isLandmark: false,
    description:
      "Bonang merupakan instrumen penting dalam gamelan Jawa yang terdiri dari deretan gong-gong kecil yang disusun di atas tali dalam rangka kayu. Alat musik ini dipukul menggunakan pemukul khusus sehingga menghasilkan bunyi yang nyaring dan khas.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Bonang memberi warna pada gamelan Jawa dengan bunyi yang nyaring dan hidup. Kehadirannya memperkaya melodi dan membuat alunan musik terasa lebih dinamis dalam setiap pertunjukan.",
    location: "D.I. Yogyakarta",
    period: "Tradisi gamelan Jawa",
    image: "/img/cultures/gamelan-jawa.jpg",
    tags: ["Pukul", "Melodi", "Gamelan"],
  },

  {
    id: "diy-wayang-kulit",
    provinceId: "diy",
    category: "Wayang",
    title: "Wayang Kulit",
    description:
      "Seni pertunjukan boneka bayangan dari kulit kerbau yang dimainkan oleh seorang Dalang. Cerita yang dibawakan umumnya bersumber dari epos Mahabharata dan Ramayana, disesuaikan dengan nilai-nilai kearifan lokal Jawa. Pertunjukan wayang kulit bisa berlangsung semalam suntuk, mulai senja hingga fajar.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Di balik layar putih yang disinari lampu blencong, sang Dalang menghidupkan ratusan tokoh sekaligus. Wayang kulit bukan sekadar hiburan — ia adalah media dakwah, pendidikan moral, dan ritual spiritual yang menyatu dalam satu malam penuh magis.",
    location: "D.I. Yogyakarta",
    period: "Sejak abad ke-10 Masehi",
    image: "/img/cultures/wayang-kulit.jpg",
    tags: ["UNESCO", "Dalang", "Epos"],
  },
  {
    id: "diy-batik-kraton",
    provinceId: "diy",
    category: "Batik",
    title: "Batik Keraton Yogyakarta",
    description:
      "Batik tulis Yogyakarta memiliki ciri khas warna putih-hitam-coklat (sogan) dengan motif-motif simbolis seperti Parang Rusak, Sido Mukti, dan Kawung. Setiap motif memiliki makna filosofis dan hierarki penggunaannya — beberapa motif hanya boleh dipakai oleh keluarga kerajaan. Proses membatik adalah meditasi tersendiri.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Sehelai batik tulis Yogyakarta menyimpan ribuan titik canting yang dikerjakan selama berbulan-bulan. Motif Parang Rusak yang bergelombang terus-menerus melambangkan semangat yang pantang menyerah, sementara Kawung menggambarkan empat arah mata angin alam semesta.",
    location: "D.I. Yogyakarta",
    period: "Masa Mataram Islam, abad ke-17-18",
    image: "/img/cultures/batik-kraton.jpg",
    tags: ["UNESCO", "Kain", "Motif"],
  },
  {
    id: "diy-gudeg",
    provinceId: "diy",
    category: "Kuliner",
    title: "Gudeg Yogyakarta",
    coordinates: [-7.804, 110.367],
    isLandmark: true,
    description:
      "Gudeg adalah masakan khas Yogyakarta yang terbuat dari nangka muda yang dimasak berjam-jam dengan santan dan rempah-rempah. Rasanya manis dan gurih, menjadi ciri khas kuliner Jawa. Gudeg Kraton yang legendaris konon telah ada sejak zaman kerajaan Mataram dan menjadi hidangan wajib dalam berbagai upacara adat.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Aroma gudeg yang harum menguar dari kuali tanah liat yang dimasak semalaman. Nangka muda menyerap bumbu rempah yang kaya hingga ke serat-seratnya. Inilah kuliner yang menjadi jiwa Yogyakarta — setiap suapan membawa serta sejarah panjang peradaban Jawa.",
    location: "Seluruh D.I. Yogyakarta",
    period: "Sejak era Kerajaan Mataram",
    image: "/img/cultures/gudeg.jpg",
    tags: ["Makanan", "Nangka", "Tradisional"],
  },
  {
    id: "diy-kraton",
    provinceId: "diy",
    category: "Upacara Adat",
    title: "Upacara Grebeg",
    description:
      "Grebeg merupakan salah satu upacara adat yang paling terkenal di Yogyakarta dan telah menjadi tradisi Keraton Yogyakarta selama berabad-abad. Upacara ini dilaksanakan pada hari-hari besar tertentu, seperti Idulfitri, Iduladha, dan peringatan kelahiran Nabi Muhammad SAW. Tradisi Grebeg menjadi simbol rasa syukur atas berbagai nikmat yang telah diberikan kepada masyarakat. Melalui upacara ini, Keraton menunjukkan kedekatannya dengan rakyat sekaligus mengingatkan pentingnya berbagi dan menjaga kebersamaan. Nilai gotong royong, rasa syukur, dan kepedulian sosial menjadi pesan utama yang diwariskan melalui tradisi ini. Ciri khas Grebeg adalah adanya gunungan yang terbuat dari berbagai hasil bumi dan makanan yang kemudian dibagikan kepada masyarakat. Banyak warga percaya bahwa bagian dari gunungan tersebut membawa berkah dan kebaikan. Keunikan inilah yang menjadikan Grebeg selalu menarik perhatian masyarakat maupun wisatawan setiap tahunnya.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Grebeg merupakan salah satu upacara adat paling terkenal di Yogyakarta yang telah menjadi tradisi Keraton selama berabad-abad. Dilaksanakan pada hari besar seperti Idulfitri, Iduladha, dan Maulid Nabi, upacara ini menjadi simbol rasa syukur atas karunia Tuhan. Melalui Grebeg, Keraton menunjukkan kedekatan dengan rakyat, mengingatkan pentingnya gotong royong dan berbagi kebersamaan. Ciri khasnya adalah gunungan hasil bumi yang dibagikan dan diperebutkan masyarakat karena dipercaya membawa berkah.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Hari besar tertentu (Idulfitri, Iduladha, Maulid Nabi)",
    image: "/img/cultures/grebeg.jpg",
    tags: ["Keraton", "Gunungan", "Syukur"],
  },
  {
    id: "diy-keris",
    provinceId: "diy",
    category: "Senjata",
    title: "Keris Yogyakarta",
    description:
      "Keris Yogyakarta memiliki ragam bentuk (dhapur), pamor, dan tangguh yang khas. Dalam tradisi Jawa, keris bukan sekadar senjata tajam, melainkan lambang pusaka keluarga yang diyakini membawa perlindungan, wibawa, dan keseimbangan spiritual bagi pemiliknya.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/senjata-keris.mp3",
    narrator:
      "Keris merupakan senjata tradisional yang sangat melekat dengan budaya Jawa, termasuk Daerah Istimewa Yogyakarta. Senjata ini memiliki bilah yang ramping dengan bentuk lurus atau berlekuk, serta dibuat melalui proses tempa yang membutuhkan ketelitian dan keahlian tinggi. Di Yogyakarta, keris tidak hanya dikenal sebagai senjata, tetapi juga sebagai pusaka yang diwariskan dari generasi ke generasi. Bagi masyarakat Yogyakarta, keris melambangkan kehormatan, kebijaksanaan, keberanian, dan tanggung jawab. Setiap keris memiliki bentuk, motif, dan pamor yang berbeda, yang dipercaya mencerminkan harapan serta karakter pemiliknya. Nilai tersebut menunjukkan bahwa kekuatan sejati tidak hanya berasal dari senjata, tetapi juga dari kebijaksanaan dalam menggunakannya. Keris digunakan dalam berbagai upacara adat, prosesi pernikahan, hingga acara resmi Keraton Yogyakarta sebagai bagian dari busana adat. Keunikannya terletak pada motif pamor yang terbentuk secara alami saat proses penempaan, sehingga setiap keris memiliki corak yang berbeda dan tidak ada yang benar-benar sama.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Sejak era Mataram Islam, abad ke-16",
    image: "/img/cultures/keris.jpg",
    tags: ["Senjata", "Pusaka", "Filosofis"],
  },
  {
    id: "diy-joglo",
    provinceId: "diy",
    category: "Rumah Adat",
    title: "Rumah Joglo Yogyakarta",
    description:
      "Rumah tradisional Joglo Yogyakarta dicirikan oleh atap tajug yang menjulang tinggi menyerupai gunung, tempat tinggal bagi kaum bangsawan. Struktur kayunya menggunakan sistem tumpang sari tanpa paku, melambangkan keharmonisan dengan alam dan kekuatan kebersamaan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Rumah Joglo adalah mahakarya arsitektur kayu tradisional Jawa, dengan struktur tumpang sari penopang atap yang kokoh dan penuh lambang spiritual.",
    location: "Sleman dan Bantul, D.I. Yogyakarta",
    period: "Sejak abad ke-17",
    image: "/img/cultures/joglo.jpg",
    tags: ["Arsitektur", "Kayu", "Tradisional"],
  },

  // Pakaian Adat
  {
    id: "diy-surjan",
    provinceId: "diy",
    category: "Pakaian Adat",
    title: "Surjan",
    description:
      "Surjan merupakan pakaian tradisional laki-laki yang sangat identik dengan Yogyakarta. Pakaian ini berbentuk kemeja berlengan panjang dengan motif garis-garis atau polos dan biasanya dipadukan dengan kain batik serta blangkon.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Surjan mencerminkan kesederhanaan, kedisiplinan, dan tata krama masyarakat Jawa. Busana ini menjadi simbol sopan santun dan keharmonisan yang tetap lestari dalam berbagai acara adat Yogyakarta.",
    location: "D.I. Yogyakarta",
    period: "Masa Kesultanan Demak hingga Yogyakarta, abad ke-16",
    image: "/img/cultures/surjan.jpg",
    tags: ["Pakaian", "Keraton", "Sunan Kalijaga"],
  },

  {
    id: "diy-paes-ageng",
    provinceId: "diy",
    category: "Pakaian Adat",
    title: "Paes Ageng",
    description:
      "Paes Ageng merupakan busana adat yang berasal dari lingkungan Keraton Yogyakarta dan biasanya dikenakan dalam upacara pernikahan adat Jawa. Busana ini dikenal karena tampilannya yang megah, anggun, serta dipadukan dengan riasan paes berwarna hitam yang menghiasi dahi pengantin.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/pakaian-adat-paes-ageng.mp3",
    narrator:
      "Paes Ageng adalah busana pernikahan adat Keraton Yogyakarta yang megah dan anggun. Setiap bagian busana serta riasannya mengandung harapan agar pasangan pengantin menjalani rumah tangga dengan bijaksana, harmonis, dan penuh tanggung jawab.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Tradisi pernikahan adat Jawa",
    image: "/img/cultures/paes-ageng.jpg",
    tags: ["Pernikahan", "Keraton", "Adat"],
  },

  {
    id: "diy-kebaya-yogyakarta",
    provinceId: "diy",
    category: "Pakaian Adat",
    title: "Kebaya Yogyakarta",
    description:
      "Kebaya Yogyakarta merupakan pakaian tradisional perempuan yang dikenal karena tampilannya yang anggun dan elegan. Kebaya ini biasanya dipadukan dengan kain batik serta sanggul atau hiasan rambut yang memperkuat kesan khas budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/pakaian-adat-kebaya-yogya.mp3",
    narrator:
      "Kebaya Yogyakarta menampilkan kelembutan, kesopanan, dan keanggunan yang dihargai dalam budaya Jawa. Busana ini menjadi simbol keseimbangan antara keindahan luar dan kepribadian yang santun.",
    location: "D.I. Yogyakarta",
    period: "Tradisi masyarakat Jawa",
    image: "/img/cultures/kebaya-yogyakarta.jpg",
    tags: ["Perempuan", "Anggun", "Tradisional"],
  },

  {
    id: "diy-beskap",
    provinceId: "diy",
    category: "Pakaian Adat",
    title: "Beskap",
    description:
      "Beskap merupakan pakaian resmi tradisional laki-laki Jawa yang sering digunakan dalam berbagai acara adat dan upacara penting di Yogyakarta. Pakaian ini memiliki bentuk yang rapi dengan potongan khas serta biasanya dipadukan dengan kain batik, keris, dan blangkon.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Beskap melambangkan kewibawaan, tanggung jawab, dan penghormatan terhadap adat istiadat Jawa. Dengan potongan yang elegan dan kesan berwibawa, busana ini menjadi salah satu simbol budaya Yogyakarta yang paling dikenal.",
    location: "D.I. Yogyakarta",
    period: "Tradisi busana resmi Jawa",
    image: "/img/cultures/beskap.jpg",
    tags: ["Resmi", "Laki-laki", "Keraton"],
  },

  {
    id: "diy-bakpia",
    provinceId: "diy",
    category: "Kuliner",
    title: "Bakpia Pathok",
    description:
      "Bakpia Pathok adalah kuliner ikonik Yogyakarta berupa kue panggang bulat tipis berisi kacang hijau manis yang dipengaruhi budaya Tionghoa. Nama Pathok merujuk pada sebuah kampung di Yogyakarta tempat asal mula industri bakpia berkembang pesat.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Bakpia Pathok adalah bukti nyata asimilasi budaya Tionghoa dan Jawa di Yogyakarta, menghasilkan kudapan manis legendaris yang disukai wisatawan.",
    location: "Kampung Pathok, Yogyakarta",
    period: "Awal abad ke-20",
    image: "/img/cultures/bakpia.jpg",
    tags: ["Kuliner", "Kudapan", "Asimilasi"],
  },
  {
    id: "diy-perak",
    provinceId: "diy",
    category: "Kerajinan",
    title: "Kerajinan Perak Kotagede",
    coordinates: [-7.828, 110.399],
    isLandmark: true,
    description:
      "Kotagede terkenal sebagai pusat kerajinan perak berkualitas tinggi sejak zaman Mataram Islam. Para pengrajin perak Kotagede memproduksi perhiasan, miniatur, dan peralatan rumah tangga dengan teknik ukir tempa tangan yang rumit dan sangat detail.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Perak Kotagede adalah mahakarya seni tempa logam Yogyakarta, diwariskan turun-temurun sejak ratusan tahun silam di ibukota lama Mataram.",
    location: "Kotagede, D.I. Yogyakarta",
    period: "Sejak abad ke-16",
    image: "/img/cultures/perak.jpg",
    tags: ["Kerajinan", "Perak", "Kotagede"],
  },
  {
    id: "diy-labuhan",
    provinceId: "diy",
    category: "Upacara Adat",
    title: "Upacara Labuhan",
    coordinates: [-7.54, 110.44],
    isLandmark: true,
    description:
      "Labuhan merupakan upacara adat Keraton Yogyakarta yang dilakukan dengan menghanyutkan atau melarungkan berbagai sesaji ke tempat-tempat yang dianggap memiliki nilai penting, seperti Pantai Parangtritis dan kawasan Gunung Merapi. Tradisi ini mencerminkan rasa syukur serta penghormatan terhadap alam yang telah menjadi bagian dari kehidupan masyarakat Yogyakarta. Melalui Labuhan, masyarakat diajak untuk menjaga hubungan yang harmonis antara manusia, alam, dan Sang Pencipta. Nilai tersebut menjadi bagian penting dari pandangan hidup masyarakat Jawa yang menekankan keseimbangan dalam kehidupan. Labuhan biasanya dipimpin oleh pihak Keraton dan dilaksanakan pada waktu-waktu tertentu yang berkaitan dengan tradisi kerajaan. Keunikannya terletak pada perpaduan antara unsur budaya, spiritualitas, dan penghormatan terhadap alam yang masih dijaga hingga sekarang.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/upacara-adat-labuhan.mp3",
    narrator:
      "Labuhan merupakan upacara adat Keraton Yogyakarta dengan melarungkan sesaji ke tempat-tempat sakral, seperti Pantai Parangtritis dan Gunung Merapi. Tradisi ini mencerminkan rasa syukur serta penghormatan terhadap alam yang menjadi bagian penting kehidupan masyarakat. Labuhan mengajak kita menjaga hubungan harmonis dan seimbang antara manusia, alam semesta, dan Sang Pencipta.",
    location: "Pantai Parangtritis dan Gunung Merapi, D.I. Yogyakarta",
    period: "Waktu tertentu berkaitan dengan tradisi kerajaan",
    image: "/img/cultures/labuhan.jpg",
    tags: ["Keraton", "Sesaji", "Alam"],
  },
  {
    id: "diy-bahasa-krama",
    provinceId: "diy",
    category: "Bahasa Daerah",
    title: "Bahasa Jawa Krama",
    description:
      "Bahasa Jawa Krama adalah tingkatan halus dalam bahasa Jawa yang digunakan untuk menghormati orang lain. Di Yogyakarta, penggunaan Krama Alus diajarkan sejak dini dan dipraktikkan secara aktif dalam kehidupan keluarga maupun lingkungan Keraton.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Bahasa Jawa Krama adalah wujud keluhuran budi pekerti masyarakat Yogyakarta dalam menghormati sesama melalui tutur kata yang santun.",
    location: "D.I. Yogyakarta",
    period: "Berkembang sejak masa kerajaan Hindu-Buddha",
    image: "/img/cultures/bahasa-jawa.jpg",
    tags: ["Bahasa", "Krama", "Santun"],
  },


  // Kuliner
{
    id: "diy-kipo",
    provinceId: "diy",
    category: "Kuliner",
    title: "Kipo Kotagede",
    description:
      "Kipo adalah kue tradisional legendaris khas Kotagede berbahan dasar ketan dengan isian kelapa parut dan gula jawa (enten-enten), berwarna hijau alami dari daun suji. Nama kipo konon berasal dari pertanyaan warga 'iki opo' (ini apa).",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Kipo Kotagede adalah kudapan manis legendaris berwarna hijau pandan yang memiliki tekstur kenyal dan rasa gurih manis yang khas.",
    location: "Kotagede, D.I. Yogyakarta",
    period: "Telah ada sejak abad ke-16, masa Mataram Islam",
    image: "/img/cultures/kipo.jpg",
    tags: ["Kuliner", "Kue Basah", "Kotagede"],
  },
  
  // Batik
{
    id: "diy-batik-kayu",
    provinceId: "diy",
    category: "Batik",
    title: "Batik Kayu Krebet",
    description:
      "Batik Kayu Krebet adalah kerajinan unik di Desa Wisata Krebet, Bantul, di mana motif batik klasik digambar di atas media kayu seperti topeng, patung, dan gantungan kunci. Kreasi ini memadukan keahlian memahat kayu dengan ketelitian membatik.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Batik Kayu Krebet adalah asimilasi seni rupa pahat kayu dan canting batik tulis, menjadi ikon ekonomi kreatif Bantul.",
    location: "Desa Wisata Krebet, Bantul, D.I. Yogyakarta",
    period: "Berkembang pesat sejak tahun 1970-an",
    image: "/img/cultures/batik-kayu.jpg",
    tags: ["Kerajinan", "Kayu", "Batik"],
  },

  // Upacara Adat
  {
  id: "diy-grebeg",
  provinceId: "diy",
  category: "Upacara Adat",
  title: "Upacara Grebeg",
  coordinates: [-7.805, 110.364],
  isLandmark: false,
  description:
    "Grebeg merupakan salah satu upacara adat yang paling terkenal di Yogyakarta dan telah menjadi tradisi Keraton Yogyakarta selama berabad-abad. Upacara ini dilaksanakan pada hari-hari besar tertentu, seperti Idulfitri, Iduladha, dan peringatan kelahiran Nabi Muhammad SAW. Tradisi Grebeg menjadi simbol rasa syukur atas berbagai nikmat yang telah diberikan kepada masyarakat. Melalui upacara ini, Keraton menunjukkan kedekatannya dengan rakyat sekaligus mengingatkan pentingnya berbagi dan menjaga kebersamaan. Nilai gotong royong, rasa syukur, dan kepedulian sosial menjadi pesan utama yang diwariskan melalui tradisi ini. Ciri khas Grebeg adalah adanya gunungan yang terbuat dari berbagai hasil bumi, makanan, dan hasil pertanian yang disusun menyerupai gunung. Setelah didoakan, gunungan tersebut akan diperebutkan oleh masyarakat karena dipercaya membawa berkah, keselamatan, dan kemakmuran. Keunikan inilah yang menjadikan Grebeg selalu menarik perhatian masyarakat maupun wisatawan setiap tahunnya.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Grebeg merupakan tradisi Keraton Yogyakarta yang diselenggarakan pada hari-hari besar keagamaan sebagai wujud rasa syukur kepada Tuhan. Tradisi ini ditandai dengan arak-arakan gunungan berisi hasil bumi yang kemudian dibagikan kepada masyarakat. Banyak warga percaya bahwa bagian dari gunungan tersebut membawa berkah, sehingga Grebeg selalu dinantikan setiap tahunnya.",
  location: "Keraton Yogyakarta, D.I. Yogyakarta",
  period: "Tahunan, pada Idulfitri, Iduladha, dan Maulid Nabi",
  image: "/img/cultures/grebeg.jpg",
  tags: ["Gunungan", "Keraton", "Syukur"],
},

{
  id: "diy-sekaten",
  provinceId: "diy",
  category: "Upacara Adat",
  title: "Upacara Sekaten",
  coordinates: [-7.803, 110.364],
  isLandmark: false,
  description:
    "Sekaten merupakan tradisi budaya yang diselenggarakan untuk memperingati kelahiran Nabi Muhammad SAW. Tradisi ini telah berlangsung sejak masa Kerajaan Mataram dan hingga kini masih menjadi salah satu perayaan budaya terbesar di Yogyakarta. Pada masa lalu, Sekaten digunakan sebagai sarana penyebaran agama Islam melalui pendekatan budaya. Masyarakat diajak berkumpul untuk mendengarkan gamelan sekaten dan mengikuti berbagai kegiatan yang berlangsung di sekitar Keraton dan Masjid Gedhe Kauman. Tradisi ini menunjukkan bagaimana budaya dan nilai keagamaan dapat berjalan berdampingan dalam kehidupan masyarakat. Sekaten biasanya berlangsung selama beberapa hari dan diakhiri dengan pelaksanaan Grebeg Maulud. Keunikannya terletak pada penggunaan gamelan pusaka Keraton yang hanya dimainkan pada waktu tertentu serta kemampuannya menyatukan unsur budaya, sejarah, dan keagamaan dalam satu perayaan.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Sekaten adalah tradisi budaya Yogyakarta yang diselenggarakan untuk memperingati kelahiran Nabi Muhammad SAW. Tradisi ini telah berlangsung sejak masa Kerajaan Mataram dan dahulu digunakan sebagai sarana penyebaran agama Islam melalui pendekatan budaya. Alunan gamelan pusaka Keraton menjadi ciri khas yang membuat Sekaten selalu menarik perhatian masyarakat dan wisatawan.",
  location: "Keraton Yogyakarta dan Masjid Gedhe Kauman, D.I. Yogyakarta",
  period: "Tahunan, menjelang Maulid Nabi Muhammad SAW",
  image: "/img/cultures/sekaten.jpg",
  tags: ["Maulid", "Gamelan", "Keraton"],
},
{
  id: "diy-mubeng-beteng",
  provinceId: "diy",
  category: "Upacara Adat",
  title: "Upacara Mubeng Beteng",
  coordinates: [-7.809, 110.364],
  isLandmark: false,
  description:
    "Mubeng Beteng merupakan tradisi berjalan kaki mengelilingi benteng Keraton Yogyakarta pada malam hari, khususnya menjelang Tahun Baru Jawa atau malam 1 Suro. Tradisi ini telah dilakukan secara turun-temurun dan masih diikuti oleh banyak masyarakat hingga saat ini. Bagi masyarakat Jawa, Mubeng Beteng bukan sekadar berjalan kaki, melainkan sarana untuk melakukan introspeksi diri dan merenungkan perjalanan hidup. Selama prosesi berlangsung, peserta biasanya berjalan dengan tenang tanpa banyak berbicara sebagai simbol pengendalian diri dan ketenangan batin. Tradisi ini mengajarkan pentingnya kesabaran, kedisiplinan, dan kemampuan memahami diri sendiri. Keunikannya terletak pada suasana yang hening dan khidmat, di mana ribuan orang berjalan bersama dalam ketenangan untuk menyambut lembaran kehidupan yang baru.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/upacara-adat-mubeng-beteng.mp3",
  narrator:
    "Mubeng Beteng adalah tradisi berjalan kaki mengelilingi benteng Keraton Yogyakarta pada malam 1 Suro. Dalam prosesi ini, peserta berjalan dengan hening tanpa banyak berbicara sebagai bentuk introspeksi diri dan pengendalian batin. Tradisi turun-temurun ini mengajarkan kesabaran, ketenangan, dan refleksi dalam menyambut tahun baru Jawa.",
  location: "Benteng Keraton Yogyakarta, D.I. Yogyakarta",
  period: "Tahunan, malam 1 Suro (Tahun Baru Jawa)",
  image: "/img/cultures/mubeng-beteng.jpg",
  tags: ["1 Suro", "Introspeksi", "Keraton"],
},

// kerajinan
{
  id: "diy-batik-yogyakarta",
  provinceId: "diy",
  category: "Kerajinan",
  title: "Batik Yogyakarta",
  coordinates: [-7.801, 110.364],
  isLandmark: false,
  description:
    "Batik Yogyakarta merupakan salah satu warisan budaya yang telah berkembang sejak masa Keraton Yogyakarta dan menjadi identitas penting masyarakat setempat. Kain batik dibuat melalui proses menggambar motif menggunakan malam atau lilin panas pada kain, kemudian diberi warna melalui beberapa tahapan yang membutuhkan ketelitian dan kesabaran. Bagi masyarakat Yogyakarta, batik bukan sekadar kain atau pakaian. Setiap motif memiliki makna dan pesan tersendiri yang mencerminkan nilai kehidupan, harapan, serta pandangan masyarakat Jawa. Beberapa motif bahkan dahulu hanya boleh digunakan oleh keluarga kerajaan sebagai simbol kedudukan dan kehormatan. Batik digunakan dalam berbagai acara adat, kegiatan resmi, hingga kehidupan sehari-hari. Keunikan Batik Yogyakarta terletak pada motifnya yang khas dengan dominasi warna-warna klasik seperti hitam, putih, dan cokelat sogan. Selain itu, setiap goresan pada kain mencerminkan kesabaran, ketelitian, dan kecintaan terhadap budaya yang diwariskan dari generasi ke generasi.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/kerajinan-batik-yogya.mp3",
  narrator:
    "Batik Yogyakarta merupakan warisan budaya yang telah berkembang sejak masa Keraton Yogyakarta. Bagi masyarakat Jawa, batik bukan sekadar kain, melainkan simbol nilai kehidupan, harapan, dan identitas budaya. Keunikan batik ini terletak pada motif khas dengan dominasi warna klasik seperti hitam, putih, dan cokelat sogan yang diwariskan secara turun-temurun.",
  location: "D.I. Yogyakarta",
  period: "Berkembang sejak masa Keraton Yogyakarta hingga sekarang",
  image: "/img/cultures/batik-yogyakarta.jpg",
  tags: ["Batik", "Keraton", "Warisan Budaya"],
},

{
  id: "diy-perak-kotagede",
  provinceId: "diy",
  category: "Kerajinan",
  title: "Kerajinan Perak Kotagede",
  coordinates: [-7.828, 110.401],
  isLandmark: true,
  description:
    "Kerajinan Perak Kotagede merupakan salah satu kerajinan terkenal yang berasal dari kawasan Kotagede, Yogyakarta. Tradisi membuat perhiasan dan berbagai benda dari perak telah berkembang sejak masa Kerajaan Mataram dan terus bertahan hingga saat ini. Kerajinan ini menunjukkan keterampilan tinggi para pengrajin dalam mengolah logam menjadi karya seni yang bernilai. Melalui detail-detail yang rumit dan pengerjaan yang teliti, masyarakat Yogyakarta mewariskan nilai ketekunan, kreativitas, dan dedikasi dalam berkarya. Produk yang dihasilkan sangat beragam, mulai dari cincin, gelang, kalung, miniatur, hingga dekorasi rumah. Keunikan Kerajinan Perak Kotagede terletak pada detail ukiran yang halus dan teknik pengerjaan tradisional yang masih dipertahankan oleh banyak pengrajin hingga sekarang.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Kerajinan Perak Kotagede merupakan warisan seni yang telah berkembang sejak masa Kerajaan Mataram. Para pengrajin mengolah logam perak menjadi berbagai karya seni dengan detail ukiran yang halus dan rumit. Hingga kini, teknik pengerjaan tradisional masih dipertahankan sebagai bentuk pelestarian budaya dan keterampilan masyarakat Yogyakarta.",
  location: "Kotagede, D.I. Yogyakarta",
  period: "Berkembang sejak masa Kerajaan Mataram",
  image: "/img/cultures/perak-kotagede.jpg",
  tags: ["Perak", "Kotagede", "Kerajinan Tradisional"],
},
{
  id: "diy-gerabah-kasongan",
  provinceId: "diy",
  category: "Kerajinan",
  title: "Gerabah Kasongan",
  coordinates: [-7.846, 110.329],
  isLandmark: true,
  description:
    "Gerabah Kasongan merupakan kerajinan tradisional yang berasal dari Desa Kasongan, Kabupaten Bantul, Yogyakarta. Kerajinan ini dibuat dari tanah liat yang dibentuk, dikeringkan, lalu dibakar hingga menjadi berbagai produk yang memiliki nilai guna dan nilai seni. Keberadaan Gerabah Kasongan menunjukkan bagaimana masyarakat mampu memanfaatkan sumber daya alam di sekitarnya menjadi karya yang bernilai ekonomi dan budaya. Tradisi ini juga mencerminkan kreativitas serta kemampuan masyarakat dalam beradaptasi dengan lingkungan tempat mereka tinggal. Produk gerabah yang dihasilkan sangat beragam, mulai dari vas bunga, guci, patung, hingga perlengkapan rumah tangga. Keunikan Gerabah Kasongan terletak pada bentuknya yang artistik, proses pembuatannya yang masih banyak dilakukan secara tradisional, serta kemampuannya berkembang menjadi salah satu ikon kerajinan Yogyakarta yang dikenal hingga mancanegara.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/kerajinan-gerabah-kasongan.mp3",
  narrator:
    "Gerabah Kasongan merupakan kerajinan tradisional khas Yogyakarta yang dibuat dari tanah liat. Melalui kreativitas dan keterampilan yang diwariskan secara turun-temurun, masyarakat Kasongan menghasilkan berbagai karya seni seperti guci, vas, dan patung. Keunikan gerabah ini terletak pada bentuknya yang artistik dan proses pembuatannya yang masih mempertahankan teknik tradisional.",
  location: "Desa Kasongan, Bantul, D.I. Yogyakarta",
  period: "Dilestarikan secara turun-temurun hingga sekarang",
  image: "/img/cultures/gerabah-kasongan.jpg",
  tags: ["Gerabah", "Kasongan", "Tanah Liat"],
},

  // Cerita Rakyat
  {
    id: "diy-roro-jonggrang",
    provinceId: "diy",
    category: "Cerita Rakyat",
    title: "Legenda Roro Jonggrang",
    coordinates: [-7.752, 110.491],
    isLandmark: true,
    description:
      "Legenda Roro Jonggrang merupakan cerita rakyat populer dari Yogyakarta yang mengisahkan asal-usul Candi Sewu dan patung dewi di Candi Prambanan. Kisah ini menceritakan Bandung Bondowoso yang ingin menikahi putri Roro Jonggrang setelah menaklukkan Kerajaan Prambanan. Untuk menolaknya secara halus, Roro Jonggrang meminta syarat pembangunan seribu candi dan dua sumur dalam waktu semalam. Bandung Bondowoso hampir berhasil dibantu pasukan jin, namun digagalkan oleh taktik cerdik Roro Jonggrang yang membuat suasana seolah hari telah pagi. Murka karena dikelabui, Bandung Bondowoso akhirnya mengutuk Roro Jonggrang menjadi patung batu penggenap candi keseribu.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/cerita-rakyat-legenda-roro-jonggrang.mp3",
    narrator:
      "Pada zaman dahulu terdapat dua buah kerajaan sama besar yang saling bertetangga, kerajaan Prambanan dan kerajaan Pengging. Kerajaan Prambanan dipimpin oleh Raja Boko yang memiliki putri sangat cantik bernama Roro Jonggrang. Sedangkan kerajaan Pengging dipimpin oleh raja Pengging yang terkenal sangat haus kekuasaan. Suatu ketika, Raja Pengging memerintahkan ksatria perkasa bernama Bandung Bondowoso untuk menyerang kerajaan Prambanan. Bandung Bondowoso berhasil menaklukan kerajaan tersebut dan membunuh Raja Boko. Setelah itu, Bandung Bondowoso yang tertarik pada kecantikan Roro Jonggrang memintanya untuk menjadi istrinya. Roro Jonggrang yang membenci pembunuh ayahnya mengajukan syarat yang hampir mustahil: membangun seribu candi serta dua buah sumur hanya dalam waktu satu malam. Bandung Bondowoso menyanggupinya dan mengerahkan ribuan pasukan jin. Saat malam hampir berakhir dan pembangunan tersisa satu patung lagi, Roro Jonggrang cemas lalu menyuruh dayang-dayangnya membakar jerami serta memukul lesung agar para jin mengira hari telah pagi. Pasukan jin pun lari berhamburan. Mengetahui dirinya dikelabui, Bandung Bondowoso yang terlanjur marah mengutuk Roro Jonggrang menjadi patung batu untuk melengkapi candi keseribu.",
    location: "Sleman, D.I. Yogyakarta",
    period: "Cerita rakyat turun-temurun",
    image: "/img/cultures/roro-jonggrang.jpg",
    tags: ["Candi Prambanan", "Bandung Bondowoso", "Legenda"],
  },
  {
    id: "diy-kyai-ageng-mangir",
    provinceId: "diy",
    category: "Cerita Rakyat",
    title: "Kisah Kyai Ageng Mangir",
    coordinates: [-7.892, 110.279],
    isLandmark: true,
    description:
      "Kisah Kyai Ageng Mangir menceritakan tentang perlawanan Mangir Wanabaya III (Kyai Ageng Mangir) terhadap kekuasaan Kerajaan Mataram Islam di Kotagede. Memiliki senjata sakti Tombak Baru Klinting, ia menjadi ancaman bagi Panembahan Senopati. Melalui siasat cerdik menggunakan Raden Ajeng Pembayun (putri Senopati) sebagai penyamar, Mangir terpikat dan menikahinya. Namun saat Mangir datang menghadap untuk sungkem di Keraton Mataram tanpa senjatanya, Panembahan Senopati langsung membunuhnya. Kisah ini berakhir tragis dengan dimakamkannya jasad Kyai Ageng Mangir setengah di dalam dan setengah di luar pagar makam raja-raja.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Pada masa kepemimpinan Panembahan Senapati, wilayah Mangir yang dipimpin oleh Mangir Wanabaya III merupakan wilayah bebas pajak yang memiliki kuasa penuh atas wilayahnya sendiri. Kyai Ageng Mangir dikenal sangat sakti dengan senjata Tombak Baru Klinting, membuat Panembahan Senopati tidak berani melawannya secara langsung. Melalui siasat Ki Juru Martani, diutuslah Raden Ajeng Pembayun, putri Panembahan Senapati, untuk menyamar dan mengamen di wilayah Mangir. Siasat ini berhasil memikat hati Ki Ageng Mangir hingga mereka menikah. Setelah menjadi istrinya, Pembayun akhirnya mengaku sebagai putri raja Mataram yang kabur. Untuk berdamai, mereka berdua sepakat menghadap Panembahan Senapati. Namun, setibanya di gerbang keraton, senjata sakti Kyai Ageng Mangir diminta untuk dititipkan. Saat Ki Ageng Mangir masuk menghadap tanpa senjata dan melakukan sungkem, Panembahan Senapati langsung memegang kepalanya dan membenturkannya ke batu gilang singgasana hingga wafat. Jasadnya dimakamkan di Kotagede secara unik, setengah di dalam pagar makam dan setengah di luar, sebagai simbol menantu sekaligus musuh Mataram.",
    location: "Bantul, D.I. Yogyakarta",
    period: "Era Mataram Islam, abad ke-16",
    image: "/img/cultures/kyai-ageng-mangir.jpg",
    tags: ["Mataram Islam", "Bantul", "Sejarah"],
  },
  {
    id: "diy-ratu-kidul",
    provinceId: "diy",
    category: "Cerita Rakyat",
    title: "Legenda Ratu Kidul",
    coordinates: [-8.026, 110.330],
    isLandmark: true,
    description:
      "Legenda Ratu Kidul mengisahkan penguasa spiritual Laut Selatan Jawa yang memiliki hubungan erat dengan Keraton Yogyakarta. Cerita ini memiliki dua versi populer: kisah Ratna Suwida dari Pajajaran yang mengasingkan diri untuk bertapa di pantai selatan, serta kisah Dewi Kadita (Dewi Srengenge) yang dikutuk berpenyakit kulit oleh ibu tirinya lalu menceburkan diri ke Laut Selatan dan sembuh menjadi penguasa samudera. Mitos Ratu Kidul sangat dihormati oleh Keraton Yogyakarta melalui upacara adat Labuhan dan tarian Bedhaya Semang.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/cerita-rakyat-legenda-ratu-kidul.mp3",
    narrator:
      "Legenda Kanjeng Ratu Kidul atau Ratu Pantai Selatan memiliki beberapa versi cerita rakyat yang sangat populer. Versi pertama menceritakan tentang Ratna Suwida, seorang bibi dari pangeran Joko Suruh dari Pajajaran, yang mengasingkan diri untuk bertapa di bukit pantai selatan Jawa dan menjadi penguasa spiritual di sana. Ia berjanji akan membantu dan menikahi para keturunan pangeran yang berkuasa di dekat Gunung Merapi. Versi kedua mengisahkan tentang Dewi Kadita atau Dewi Srengenge, putri cantik Raja Munding Wangi dari Pajajaran. Karena sirik, ibu tirinya Dewi Mutiara menyuruh dukun mengutuk Kadita sehingga tubuhnya dipenuhi bisul busuk. Diusir dari istana, Kadita berjalan hingga ke Samudera Selatan. Saat menceburkan diri ke dalam air laut yang jernih, penyakitnya lenyap secara ajaib dan ia dinobatkan menjadi penguasa spiritual Laut Selatan. Dalam sejarah Keraton Yogyakarta, hubungan spiritual dengan Ratu Kidul diaktualisasikan melalui upacara Labuhan di Pantai Parangtritis serta pementasan tarian sakral Bedhaya untuk menghormati sang Ratu.",
    location: "Pantai Parangtritis, D.I. Yogyakarta",
    period: "Cerita rakyat turun-temurun",
    image: "/img/cultures/ratu-kidul.jpg",
    tags: ["Laut Selatan", "Parangtritis", "Keraton"],
  },
  {
    id: "diy-gunung-merapi",
    provinceId: "diy",
    category: "Cerita Rakyat",
    title: "Legenda Asal Usul Gunung Merapi",
    coordinates: [-7.54, 110.44],
    isLandmark: true,
    description:
      "Legenda Asal Usul Gunung Merapi mengisahkan kepindahan Gunung Jamurdipa dari Laut Selatan ke tengah Pulau Jawa untuk menyeimbangkan letak pulau yang miring. Di lokasi pemindahan tersebut, tinggallah dua empu sakti pembuat keris, Empu Rama dan Empu Pamadi. Meski telah diperingatkan oleh utusan para dewa untuk pindah, kedua empu tetap menolak karena harus menyelesaikan keris pusaka mereka. Dewa Bayu akhirnya meniup Gunung Jamurdipa hingga terbang dan jatuh menindih perapian kedua empu tersebut. Perapian yang tertindih gunung berubah menjadi kawah aktif, yang kini dikenal sebagai Gunung Merapi.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Legenda Gunung Merapi bermula saat para dewa di Kahyangan berencana menyeimbangkan Pulau Jawa yang miring dengan memindahkan Gunung Jamurdipa dari Laut Selatan ke tengah pulau. Di lokasi pemindahan tersebut, terdapat dua empu sakti pembuat keris, yaitu Empu Rama dan Empu Pamadi. Utusan dewa, Batara Narada dan Dewa Penyarikan, datang membujuk mereka untuk pindah. Namun, kedua empu menolak karena membuat keris sakti tidak boleh berpindah tempat dan pekerjaan mereka belum selesai. Terjadilah perkelahian sengit yang dimenangkan oleh kedua empu tersebut. Melaporkan kegagalan ini, Batara Guru menjadi murka dan memerintahkan Dewa Bayu meniup Gunung Jamurdipa. Tiupan angin kencang menerbangkan gunung tersebut dan menjatuhkannya tepat di atas perapian kedua empu yang akhirnya tewas tertindih. Perapian tempat menempa keris berubah menjadi kawah aktif yang terus mengeluarkan api, dan gunung itu dinamai Gunung Merapi.",
    location: "Gunung Merapi, Sleman, D.I. Yogyakarta",
    period: "Legenda rakyat turun-temurun",
    image: "/img/cultures/gunung-merapi.jpg",
    tags: ["Gunung Merapi", "Empu Rama", "Sleman"],
  },
  {
    id: "diy-trah-keraton",
    provinceId: "diy",
    category: "Cerita Rakyat",
    title: "Asal-usul Trah Keraton Yogyakarta",
    coordinates: [-7.805, 110.364],
    isLandmark: true,
    description:
      "Kisah asal-usul keluarga Keraton Yogyakarta sebagai penerus dinasti Mataram Islam pasca Perjanjian Giyanti 1755, melambangkan amanah kepemimpinan, keluhuran budi, serta penjaga budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Masyarakat Yogyakarta mengenal keluarga Keraton Yogyakarta sebagai keturunan atau trah yang berasal dari Kerajaan Mataram Islam. Sejarahnya bermula ketika Kerajaan Mataram yang berpusat di Kartasura mengalami berbagai konflik politik dan perebutan kekuasaan pada abad ke-18. Perselisihan tersebut akhirnya diselesaikan melalui Perjanjian Giyanti pada tahun 1755 yang membagi Kerajaan Mataram menjadi dua kekuasaan, yaitu Kesultanan Yogyakarta dan Kasunanan Surakarta. Pangeran Mangkubumi, adik Susuhunan Pakubuwono II, kemudian dinobatkan sebagai Sultan Hamengkubuwono I dan mendirikan Kesultanan Yogyakarta. Sejak saat itulah lahir garis keturunan raja-raja Yogyakarta yang terus berlanjut hingga sekarang. Masyarakat Jawa mengenal keturunan keluarga keraton ini sebagai trah Mataram atau trah ningrat yang sering pula disebut sebagai 'darah biru'. Dalam tradisi masyarakat Jawa, keluarga Keraton Yogyakarta dipercaya tidak hanya mewarisi garis keturunan biologis para raja Mataram, tetapi juga mewarisi nilai-nilai kepemimpinan, kebijaksanaan, serta tanggung jawab untuk menjaga budaya Jawa. Oleh karena itu, setiap Sultan yang naik takhta diyakini menerima amanah untuk melestarikan adat istiadat, kesenian, dan tradisi keraton. Di tengah masyarakat Yogyakarta berkembang pula kepercayaan bahwa para Sultan memiliki hubungan spiritual dengan leluhur Mataram dan memperoleh wahyu keprabon, yaitu wahyu atau mandat ilahi yang menjadi tanda seseorang berhak memimpin kerajaan. Kepercayaan inilah yang membuat keberadaan Keraton Yogyakarta hingga kini masih sangat dihormati oleh masyarakat. Tradisi pewarisan takhta di Keraton Yogyakarta terus berlangsung secara turun-temurun dari Sultan Hamengkubuwono I hingga Sultan Hamengkubuwono X yang saat ini memimpin Kesultanan Yogyakarta. Keberlanjutan garis keturunan tersebut menjadikan Keraton Yogyakarta sebagai salah satu kerajaan tertua di Indonesia yang masih bertahan dan tetap menjalankan berbagai tradisi leluhur hingga sekarang.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Masa Perjanjian Giyanti (1755) hingga sekarang",
    image: "/img/cultures/keraton-yogyakarta.jpg",
    tags: ["Asal-usul", "Trah", "Keraton Yogyakarta", "Mataram Islam", "Sejarah"],
  },

  // Senjata
{
    id: "diy-tombak-kyai-plered",
    provinceId: "diy",
    category: "Senjata",
    title: "Tombak Kyai Plered",
    coordinates: [-7.800, 110.370],
    isLandmark: true,
    description:
      "Tombak Kyai Plered merupakan salah satu senjata pusaka paling penting dan sakral milik Keraton Yogyakarta. Lebih dari sekadar senjata perang, tombak ini menjadi lambang kewibawaan, kepemimpinan, dan tanggung jawab pemimpin dalam melindungi rakyat. Dalam tradisi Kesultanan, pusaka ini melambangkan keberanian dan kebijaksanaan dalam memegang amanah.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/senjata-tombak-kyai-plered.mp3",
    narrator:
      "Tombak Kyai Plered merupakan salah satu pusaka penting yang dimiliki oleh Keraton Yogyakarta. Tombak ini tidak hanya dipandang sebagai senjata, tetapi juga sebagai simbol kewibawaan, kepemimpinan, dan tanggung jawab seorang pemimpin dalam melindungi rakyatnya. Dalam tradisi Keraton, pusaka seperti Tombak Kyai Plered memiliki makna yang mendalam karena menjadi bagian dari warisan sejarah Kesultanan Yogyakarta. Keberadaannya mengingatkan masyarakat akan pentingnya menjaga nilai keberanian, kebijaksanaan, dan rasa tanggung jawab dalam menjalankan amanah. Saat ini, Tombak Kyai Plered lebih sering ditampilkan dalam prosesi adat dan kirab budaya Keraton daripada digunakan sebagai senjata. Keunikannya terletak pada statusnya sebagai pusaka kerajaan yang memiliki nilai sejarah tinggi dan tetap dijaga sebagai bagian dari identitas budaya Yogyakarta.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Era Kesultanan Mataram, abad ke-16",
    image: "/img/cultures/kyai-plered.jpg",
    tags: ["Pusaka", "Tombak", "Keraton"],
  },
  {
    id: "diy-wedhung",
    provinceId: "diy",
    category: "Senjata",
    title: "Wedhung",
    coordinates: [-7.815, 110.362],
    isLandmark: true,
    description:
      "Wedhung adalah senjata tradisional khas Jawa berwujud pisau belati berbilah lebar dengan ujung meruncing. Senjata ini dahulu diselipkan di pinggang kaum laki-laki sebagai perlengkapan sehari-hari maupun pelengkap busana adat. Wedhung melambangkan kesiapsiagaan, kedewasaan, serta tanggung jawab dalam menghadapi rintangan hidup secara bijak tanpa kekerasan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Wedhung merupakan senjata tradisional khas Jawa yang berbentuk seperti pisau dengan bilah lurus dan ujung yang meruncing. Di Yogyakarta, wedhung dahulu digunakan sebagai perlengkapan sehari-hari oleh kaum laki-laki, baik untuk membantu pekerjaan maupun sebagai pelengkap busana adat. Selain memiliki fungsi praktis, wedhung juga mencerminkan sikap kesiapsiagaan dan tanggung jawab. Masyarakat Jawa memandang bahwa seseorang harus selalu siap menghadapi berbagai tantangan kehidupan dengan kebijaksanaan, bukan dengan kekerasan. Oleh karena itu, wedhung lebih dikenal sebagai simbol kedewasaan dan tanggung jawab daripada alat untuk berperang. Hingga kini, wedhung masih dapat dijumpai dalam berbagai acara adat dan koleksi budaya. Keunikannya terletak pada bentuknya yang sederhana namun elegan, serta perpaduan antara fungsi praktis dan nilai budaya yang tetap dipertahankan.",
    location: "D.I. Yogyakarta",
    period: "Masa Kerajaan Jawa Tradisional",
    image: "/img/cultures/wedhung.jpg",
    tags: ["Belati", "Kesiapsiagaan", "Filosofis"],
  },
  {
    id: "diy-patrem",
    provinceId: "diy",
    category: "Senjata",
    title: "Patrem",
    coordinates: [-7.808, 110.365],
    isLandmark: true,
    description:
      "Patrem merupakan senjata tradisional sejenis keris berukuran kecil yang digunakan oleh perempuan Jawa sebagai pertahanan diri. Diselipkan dalam lipatan kain kemben atau busana adat, Patrem melambangkan kelembutan, kehormatan, serta kesabaran dan keteguhan hati perempuan dalam menjaga kehormatan diri.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Patrem merupakan senjata tradisional berukuran kecil yang bentuknya menyerupai keris. Senjata ini biasanya digunakan oleh perempuan sebagai pelengkap busana adat Jawa, khususnya dalam lingkungan Keraton Yogyakarta. Patrem melambangkan kelembutan, kehormatan, dan kemampuan menjaga diri. Kehadirannya menunjukkan bahwa keberanian tidak selalu diwujudkan melalui kekuatan fisik, tetapi juga melalui kebijaksanaan, kesabaran, dan keteguhan hati. Nilai tersebut menjadi bagian penting dari filosofi masyarakat Jawa yang mengutamakan keseimbangan dalam kehidupan. Saat ini, Patrem lebih sering digunakan sebagai pelengkap pakaian adat dalam upacara tradisional dan pertunjukan budaya. Keunikannya terletak pada ukurannya yang kecil, ukiran yang halus, serta perannya sebagai simbol keanggunan perempuan Jawa.",
    location: "D.I. Yogyakarta",
    period: "Masa Kesultanan Yogyakarta",
    image: "/img/cultures/patrem.jpg",
    tags: ["Keris Kecil", "Perempuan", "Pertahanan Diri"],
  },

  // Rumah Adat
  {
    id: "diy-rumah-joglo",
    provinceId: "diy",
    category: "Rumah Adat",
    title: "Rumah Joglo",
    coordinates: [-7.820, 110.360],
    isLandmark: true,
    description:
      "Rumah Joglo merupakan rumah adat Yogyakarta beratap tajug menjulang tinggi yang dahulu dimiliki bangsawan. Ditopang empat tiang utama (saka guru) sebagai simbol nilai kejujuran, tanggung jawab, kebijaksanaan, dan kebersamaan. Struktur kayunya menggunakan sistem bongkar pasang tanpa banyak paku besi, melambangkan harmoni sosial dan alam.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Rumah Joglo merupakan rumah adat yang paling dikenal dari Daerah Istimewa Yogyakarta. Rumah ini memiliki atap yang menjulang tinggi di bagian tengah dan ditopang oleh empat tiang utama yang disebut saka guru. Dalam budaya Jawa, Rumah Joglo dahulu banyak dimiliki oleh kalangan bangsawan, keluarga keraton, atau tokoh masyarakat. Bagi masyarakat Yogyakarta, Rumah Joglo bukan sekadar tempat tinggal. Bentuk bangunannya mencerminkan keseimbangan antara manusia, sesama, alam, dan Tuhan. Empat saka guru menjadi simbol kokohnya kehidupan yang dibangun atas nilai kejujuran, tanggung jawab, kebijaksanaan, dan kebersamaan. Tata ruang rumah juga dirancang untuk mengajarkan pentingnya menghormati tamu, menjaga keharmonisan keluarga, serta menjalankan kehidupan dengan tertib. Selain sebagai tempat tinggal, Rumah Joglo sering digunakan untuk menerima tamu, mengadakan musyawarah, pertunjukan seni, hingga pelaksanaan upacara adat. Keunikannya terletak pada struktur atap yang megah tanpa menggunakan banyak paku, ukiran kayu yang indah, serta filosofi mendalam yang terdapat pada setiap bagian bangunannya.",
    location: "Yogyakarta, D.I. Yogyakarta",
    period: "Diwariskan secara turun-temurun",
    image: "/img/cultures/rumah-joglo.jpg",
    tags: ["Arsitektur", "Joglo", "Saka Guru"],
  },
  {
    id: "diy-bangsal-kencono",
    provinceId: "diy",
    category: "Rumah Adat",
    title: "Bangsal Kencono",
    coordinates: [-7.806, 110.364],
    isLandmark: true,
    description:
      "Bangsal Kencono merupakan bangunan utama megah di Keraton Yogyakarta yang berfungsi untuk menyelenggarakan upacara adat dan menerima tamu kehormatan Kesultanan. Arsitekturnya yang berornamen emas melambangkan kewibawaan, kepemimpinan bijaksana, serta keagungan budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/rumah-adat-bangsal-kencono.mp3",
    narrator:
      "Bangsal Kencono merupakan bangunan utama yang berada di lingkungan Keraton Yogyakarta. Berbeda dengan rumah tinggal biasa, bangunan ini berfungsi sebagai tempat penyelenggaraan upacara adat, penerimaan tamu kehormatan, dan berbagai kegiatan resmi Kesultanan Yogyakarta. Bangunan ini mencerminkan kewibawaan, kehormatan, dan kebesaran budaya Keraton. Setiap bagian arsitekturnya dirancang dengan penuh ketelitian sebagai simbol kepemimpinan yang bijaksana serta penghormatan terhadap adat istiadat yang telah diwariskan selama berabad-abad. Bangsal Kencono dikenal dengan arsitekturnya yang megah, dihiasi ukiran kayu berlapis warna emas dan ornamen khas Jawa yang bernilai seni tinggi. Keunikannya tidak hanya terletak pada keindahan bangunannya, tetapi juga pada fungsinya sebagai pusat berbagai kegiatan budaya dan simbol kejayaan Kesultanan Yogyakarta.",
    location: "Keraton Yogyakarta, D.I. Yogyakarta",
    period: "Era Kesultanan Yogyakarta, abad ke-18",
    image: "/img/cultures/bangsal-kencono.jpg",
    tags: ["Keraton", "Bangsal", "Kemegahan"],
  },
  {
    id: "diy-rumah-limasan",
    provinceId: "diy",
    category: "Rumah Adat",
    title: "Rumah Limasan",
    coordinates: [-7.850, 110.380],
    isLandmark: true,
    description:
      "Rumah Limasan adalah rumah tradisional Jawa beratap limas yang kokoh dan sangat adaptif terhadap iklim tropis. Desain atapnya yang bercabang empat melambangkan kesederhanaan, keseimbangan, serta kebersamaan erat antar anggota keluarga dalam menjalani kehidupan yang harmonis.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/rumah-adat-limasan.mp3",
    narrator:
      "Rumah Limasan merupakan salah satu rumah tradisional yang banyak dijumpai di Yogyakarta dan berbagai wilayah Jawa. Rumah ini memiliki bentuk atap yang sederhana namun kokoh, sehingga sesuai dengan kondisi iklim tropis di Indonesia. Rumah Limasan mencerminkan kehidupan masyarakat Jawa yang mengutamakan kesederhanaan, keseimbangan, dan kebersamaan. Tata ruangnya dibuat agar setiap anggota keluarga dapat berinteraksi dengan nyaman, sekaligus menunjukkan pentingnya menjaga hubungan yang harmonis dalam kehidupan sehari-hari. Selain digunakan sebagai tempat tinggal, Rumah Limasan juga sering menjadi tempat berkumpul keluarga dan melaksanakan kegiatan masyarakat. Keunikannya terletak pada konstruksi atap yang kuat, sirkulasi udara yang baik, serta desain yang mampu memberikan kenyamanan bagi penghuninya.",
    location: "Yogyakarta, D.I. Yogyakarta",
    period: "Tradisional Jawa",
    image: "/img/cultures/rumah-limasan.jpg",
    tags: ["Limasan", "Kesederhanaan", "Tropis"],
  },
  {
    id: "diy-rumah-kampung",
    provinceId: "diy",
    category: "Rumah Adat",
    title: "Rumah Kampung",
    coordinates: [-7.830, 110.340],
    isLandmark: true,
    description:
      "Rumah Kampung merupakan hunian tradisional paling populer bagi masyarakat umum di Yogyakarta pada masa lampau. Rumah ini menggunakan atap pelana sederhana dengan bahan kayu dan bambu alami, melambangkan kehidupan yang harmonis, rukun, dan saling menghormati dalam kesederhanaan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Rumah Kampung merupakan rumah tradisional yang paling banyak digunakan oleh masyarakat Yogyakarta pada masa lalu. Dibandingkan dengan Joglo atau Limasan, bentuk Rumah Kampung lebih sederhana, namun tetap mencerminkan nilai-nilai budaya masyarakat Jawa. Rumah ini menunjukkan bahwa kesederhanaan bukanlah penghalang untuk menciptakan kehidupan yang harmonis. Masyarakat Jawa percaya bahwa kebahagiaan keluarga dibangun melalui kebersamaan, saling menghormati, dan kerja sama, bukan melalui kemewahan bangunan. Rumah Kampung berfungsi sebagai tempat tinggal keluarga sekaligus tempat melakukan berbagai aktivitas sehari-hari. Keunikannya terletak pada desain yang sederhana, penggunaan bahan-bahan alami seperti kayu dan bambu, serta kemampuannya beradaptasi dengan lingkungan dan iklim Yogyakarta.",
    location: "Yogyakarta, D.I. Yogyakarta",
    period: "Tradisional Rakyat Jawa",
    image: "/img/cultures/rumah-kampung.jpg",
    tags: ["Rakyat", "Pelana", "Bambu"],
  },

  // Wayang
{
    id: "diy-ketoprak",
    provinceId: "diy",
    category: "Wayang",
    title: "Ketoprak Yogyakarta",
    description:
      "Ketoprak adalah seni pentas drama tradisional Jawa yang menceritakan kisah legenda, sejarah, maupun dongeng rakyat dengan dialog bahasa Jawa. Dipentaskan dengan iringan gamelan Jawa lengkap dan diselingi banyolan komedi yang menghibur.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Ketoprak Yogyakarta adalah teater rakyat Jawa yang sarat dengan ajaran budi pekerti, sejarah Mataram, dan humor yang segar.",
    location: "D.I. Yogyakarta",
    period: "Mulai berkembang pesat sejak awal abad ke-20",
    image: "/img/cultures/ketoprak.jpg",
    tags: ["Seni Pertunjukan", "Drama", "Ketoprak"],
  },

  // Bangunan Bersejarah
  {
    id: "diy-benteng-vredeburg",
    provinceId: "diy",
    category: "Bangunan Bersejarah",
    title: "Benteng Vredeburg",
    coordinates: [-7.800, 110.366],
    isLandmark: true,
    description:
      "Benteng Vredeburg merupakan benteng kolonial Belanda bergaya Eropa abad ke-18 yang terletak tepat di depan Keraton Yogyakarta. Dahulu difungsikan sebagai markas militer Belanda untuk mengawasi aktivitas Kesultanan, benteng bersejarah ini kini dilestarikan sebagai museum perjuangan nasional.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/bangunan-bersejarah-benteng-vredeburg.mp3",
    narrator:
      "Benteng Vredeburg merupakan salah satu bangunan bersejarah yang berada di pusat Kota Yogyakarta, tepat di depan kawasan Keraton Yogyakarta. Benteng ini dibangun pada masa pemerintahan kolonial Belanda pada abad ke-18 dan awalnya berfungsi sebagai benteng pertahanan sekaligus pusat pengawasan terhadap aktivitas Keraton Yogyakarta. Seiring perjalanan waktu, Benteng Vredeburg menjadi saksi berbagai peristiwa penting dalam sejarah Indonesia, mulai dari masa kolonial, perjuangan kemerdekaan, hingga perkembangan Yogyakarta sebagai salah satu pusat budaya dan pendidikan. Keberadaan benteng ini mengingatkan masyarakat akan pentingnya menghargai perjuangan para pahlawan serta menjaga persatuan dalam menghadapi berbagai tantangan. Saat ini, Benteng Vredeburg berfungsi sebagai museum yang menyimpan diorama, koleksi sejarah, dan berbagai informasi mengenai perjalanan bangsa Indonesia. Keunikannya terletak pada arsitektur bergaya Eropa yang masih terawat dengan baik, serta kemampuannya menggabungkan nilai sejarah, pendidikan, dan pariwisata dalam satu kawasan.",
    location: "Kota Yogyakarta, D.I. Yogyakarta",
    period: "Abad ke-18",
    image: "/img/cultures/benteng-vredeburg.jpg",
    tags: ["Benteng", "Museum", "Kolonial Belanda", "Perjuangan"],
  },
  {
    id: "diy-keraton-yogyakarta",
    provinceId: "diy",
    category: "Bangunan Bersejarah",
    title: "Keraton Yogyakarta",
    coordinates: [-7.805, 110.364],
    isLandmark: true,
    description:
      "Keraton Yogyakarta (Istana Ngayogyakarta Hadiningrat) merupakan istana resmi Kesultanan Yogyakarta yang didirikan pada tahun 1755 oleh Sri Sultan Hamengku Buwono I. Sebagai jantung budaya Jawa, keraton ini tetap menjadi tempat tinggal sultan dan pusat pelestarian berbagai tradisi adat Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Keraton Yogyakarta merupakan istana resmi Kesultanan Yogyakarta yang didirikan pada tahun 1755 oleh Sri Sultan Hamengku Buwono I. Hingga saat ini, Keraton masih menjadi tempat tinggal Sultan Yogyakarta sekaligus pusat pelestarian budaya Jawa. Bagi masyarakat Yogyakarta, Keraton bukan hanya tempat tinggal keluarga kerajaan, tetapi juga pusat berkembangnya berbagai tradisi, seni, sastra, tari, musik gamelan, hingga upacara adat yang masih dilestarikan. Keberadaan Keraton mencerminkan pentingnya menjaga warisan budaya, menghormati leluhur, serta mempertahankan identitas daerah di tengah perkembangan zaman. Selain menjadi pusat kebudayaan, Keraton juga terbuka bagi masyarakat dan wisatawan yang ingin mengenal sejarah Kesultanan Yogyakarta. Keunikannya terletak pada arsitektur khas Jawa, koleksi benda-benda pusaka, serta berbagai tradisi yang masih dijalankan secara turun-temurun hingga sekarang.",
    location: "Kota Yogyakarta, D.I. Yogyakarta",
    period: "Tahun 1755",
    image: "/img/cultures/keraton-yogyakarta.jpg",
    tags: ["Keraton", "Kesultanan", "Istana", "Pusaka"],
  },
  {
    id: "diy-taman-sari",
    provinceId: "diy",
    category: "Bangunan Bersejarah",
    title: "Taman Sari",
    coordinates: [-7.810, 110.359],
    isLandmark: true,
    description:
      "Taman Sari merupakan kompleks bekas taman pemandian istana kerajaan yang dibangun abad ke-18 oleh Sri Sultan Hamengku Buwono I. Berfungsi sebagai tempat peristirahatan, meditasi, dan pertahanan, situs bersejarah ini memadukan estetika arsitektur Jawa dan Eropa dengan jaringan lorong bawah tanah.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Taman Sari merupakan kompleks bersejarah yang dibangun pada masa pemerintahan Sri Sultan Hamengku Buwono I sebagai taman kerajaan sekaligus tempat peristirahatan keluarga Keraton Yogyakarta. Dahulu, kawasan ini juga digunakan sebagai tempat meditasi, pertahanan, serta memiliki jaringan lorong bawah tanah yang menghubungkan beberapa bagian kompleks. Taman Sari mencerminkan kecerdasan arsitektur masyarakat pada masa lalu yang mampu memadukan fungsi, keindahan, dan nilai budaya dalam satu bangunan. Keberadaannya menunjukkan bahwa lingkungan kerajaan tidak hanya dibangun untuk kebutuhan pemerintahan, tetapi juga memperhatikan keseimbangan antara manusia, alam, dan seni. Saat ini, Taman Sari menjadi salah satu destinasi wisata budaya yang paling terkenal di Yogyakarta. Keunikannya terletak pada kolam pemandian kerajaan, lorong bawah tanah, perpaduan arsitektur Jawa dan Eropa, serta suasana bersejarah yang masih dapat dirasakan hingga sekarang.",
    location: "Kota Yogyakarta, D.I. Yogyakarta",
    period: "Pertengahan abad ke-18",
    image: "/img/cultures/taman-sari.jpg",
    tags: ["Pemandian Istana", "Taman Air", "Lorong Bawah Tanah"],
  },
  {
    id: "diy-tugu-yogyakarta",
    provinceId: "diy",
    category: "Bangunan Bersejarah",
    title: "Tugu Yogyakarta",
    coordinates: [-7.783, 110.367],
    isLandmark: true,
    description:
      "Tugu Yogyakarta (Tugu Golong Gilig) merupakan monumen ikonik kota yang dibangun oleh Sri Sultan Hamengku Buwono I. Menjadi poros filosofis penting antara Gunung Merapi, Keraton, dan Laut Selatan, tugu ini melambangkan semangat persatuan raja, rakyat, dan Sang Pencipta.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/diy/bangunan-bersejarah-tugu-yogya.mp3",
    narrator:
      "Tugu Yogyakarta merupakan salah satu ikon paling terkenal di Daerah Istimewa Yogyakarta. Tugu ini pertama kali dibangun pada masa Sri Sultan Hamengku Buwono I sebagai simbol persatuan antara raja, rakyat, dan Sang Pencipta. Bagi masyarakat Yogyakarta, Tugu Yogyakarta memiliki makna yang lebih dari sekadar monumen. Tugu ini melambangkan semangat persatuan, keseimbangan hidup, dan hubungan yang harmonis antara manusia dengan Tuhan serta alam sekitarnya. Filosofi tersebut menjadi bagian penting dari budaya masyarakat Jawa yang menjunjung tinggi keharmonisan dalam kehidupan. Hingga kini, Tugu Yogyakarta menjadi simbol kota sekaligus salah satu tujuan wisata yang paling banyak dikunjungi. Keunikannya terletak pada nilai filosofis yang melekat pada keberadaannya, posisinya yang berada di garis imajiner antara Gunung Merapi, Keraton Yogyakarta, dan Laut Selatan, serta perannya sebagai ikon budaya yang dikenal hingga mancanegara.",
    location: "Kota Yogyakarta, D.I. Yogyakarta",
    period: "Tahun 1755",
    image: "/img/cultures/tugu.jpg",
    tags: ["Tugu", "Monumen", "Garis Imajiner", "Ikon"],
  },

  // ─── JAWA TENGAH ──────────────────────────────────────────────────────────
  // Kerajinan
  {
    id: "jateng-batik-solo",
    provinceId: "jawa-tengah",
    category: "Kerajinan",
    title: "Batik Solo",
    coordinates: [-7.563, 110.812],
    isLandmark: true,
    description:
      "Batik Solo merupakan salah satu warisan budaya paling penting dari Kota Surakarta yang telah berkembang sejak masa Kerajaan Mataram Islam, khususnya setelah berdirinya Keraton Surakarta Hadiningrat pada tahun 1745. Dikenal dengan warna sogan klasik perpaduan cokelat, hitam, dan krem, Batik Solo melambangkan kesederhanaan, ketenangan, serta kebijaksanaan.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Batik Solo merupakan salah satu warisan budaya paling penting dari Kota Surakarta dan telah berkembang sejak masa Kerajaan Mataram Islam. Tradisi membatik di Solo mulai berkembang pesat setelah berdirinya Keraton Surakarta Hadiningrat pada tahun 1745. Pada masa itu, kegiatan membatik awalnya hanya dilakukan oleh keluarga kerajaan dan para abdi dalem keraton. Motif-motif tertentu seperti Parang, Sidomukti, Truntum, dan Sawat bahkan hanya boleh dikenakan oleh kalangan bangsawan karena dianggap memiliki nilai filosofis dan simbol status sosial. Seiring berjalannya waktu, keterampilan membatik mulai menyebar ke masyarakat umum, terutama di Kampung Laweyan dan Kampung Kauman. Ciri khas Batik Solo terletak pada penggunaan warna sogan, yaitu perpaduan warna cokelat, hitam, putih, dan krem yang mencerminkan sifat sederhana, tenang, serta penuh kebijaksanaan sesuai filosofi masyarakat Jawa.",
    location: "Kampung Laweyan, Surakarta, Jawa Tengah",
    period: "Sejak era Keraton Surakarta (1745)",
    image: "/img/cultures/batik-solo.jpg",
    tags: ["Batik", "Sogan", "Laweyan", "Kauman"],
  },
  {
    id: "jateng-blangkon-solo",
    provinceId: "jawa-tengah",
    category: "Kerajinan",
    title: "Blangkon Solo",
    coordinates: [-7.565, 110.825],
    isLandmark: true,
    description:
      "Blangkon Solo merupakan penutup kepala tradisional pria Jawa khas gaya Surakarta yang datar dan rapi di bagian belakang. Blangkon ini menyimbolkan kehormatan, kesopanan, pengendalian diri, serta kebijaksanaan laki-laki Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Blangkon Solo merupakan penutup kepala tradisional pria Jawa yang telah menjadi bagian penting dari busana adat Surakarta selama ratusan tahun. Sejarah blangkon tidak dapat dipisahkan dari perkembangan budaya Keraton Surakarta. Pada masa lalu, laki-laki Jawa umumnya memiliki rambut panjang yang diikat di bagian belakang kepala. Untuk menjaga kerapian rambut, digunakan kain penutup kepala yang kemudian berkembang menjadi blangkon. Blangkon gaya Surakarta memiliki bentuk khas yang berbeda dengan daerah lain, terutama pada bagian belakang yang cenderung datar dan rapi, tanpa tonjolan besar seperti gaya Yogyakarta. Bagi masyarakat Solo, blangkon bukan sekadar pelengkap pakaian, melainkan simbol kehormatan, kesopanan, pengendalian diri, dan kebijaksanaan seorang laki-laki Jawa.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Keraton Surakarta",
    image: "/img/cultures/blangkon-solo.jpg",
    tags: ["Blangkon", "Busana Adat", "Aksesoris"],
  },
  {
    id: "jateng-keris-surakarta",
    provinceId: "jawa-tengah",
    category: "Kerajinan",
    title: "Keris Surakarta (Kerajinan)",
    coordinates: [-7.569, 110.819],
    isLandmark: true,
    description:
      "Keris Surakarta merupakan mahakarya seni tempa logam oleh seorang empu yang memadukan berbagai logam membentuk pamor unik. Keris ini melambangkan kepemimpinan, identitas budaya, serta status sosial.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Keris Surakarta merupakan salah satu mahakarya budaya Jawa yang memiliki nilai sejarah, seni, dan spiritual yang sangat tinggi. Tradisi pembuatan keris di wilayah Surakarta diperkirakan telah berkembang sejak masa Kerajaan Mataram Islam dan terus dilestarikan oleh Keraton Surakarta hingga sekarang. Pembuatan keris dilakukan oleh seorang empu, yaitu ahli pembuat keris yang tidak hanya menguasai teknik penempaan logam, tetapi juga memahami filosofi dan tradisi spiritual Jawa. Sebuah keris dibuat melalui proses panjang dengan memadukan berbagai jenis logam sehingga menghasilkan motif khas yang disebut pamor. Dalam budaya Jawa, keris bukan hanya berfungsi sebagai senjata, tetapi juga sebagai pusaka, simbol status sosial, lambang kepemimpinan, dan identitas budaya.",
    location: "Surakarta, Jawa Tengah",
    period: "Masa Mataram Islam hingga sekarang",
    image: "/img/cultures/keris-surakarta.jpg",
    tags: ["Keris", "Empu", "Logam", "Karya Seni"],
  },
  {
    id: "jateng-gamelan-surakarta",
    provinceId: "jawa-tengah",
    category: "Kerajinan",
    title: "Gamelan Surakarta",
    coordinates: [-7.566, 110.832],
    isLandmark: true,
    description:
      "Gamelan Surakarta merupakan ansambel musik karawitan khas Surakarta yang berkarakter lembut, tenang, dan penuh penghayatan, melambangkan keharmonisan dan keseimbangan hidup masyarakat Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Gamelan Surakarta merupakan salah satu bentuk seni musik tradisional Jawa yang berkembang pesat di lingkungan Keraton Surakarta Hadiningrat. Tradisi gamelan di Solo telah berlangsung sejak masa Kerajaan Mataram Islam dan terus berkembang seiring berdirinya Kasunanan Surakarta. Keraton Surakarta menjadi pusat pengembangan seni karawitan Jawa yang kemudian melahirkan gaya khas yang dikenal sebagai Gaya Surakarta. Gaya ini memiliki karakter musik yang lembut, halus, tenang, dan penuh penghayatan, sesuai dengan filosofi masyarakat Jawa yang menjunjung keseimbangan hidup. Satu perangkat gamelan terdiri atas berbagai instrumen seperti gong, bonang, saron, kenong, gender, gambang, dan kendang.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Sejak masa Mataram Islam",
    image: "/img/cultures/gamelan-surakarta.jpg",
    tags: ["Gamelan", "Musik", "Karawitan", "Keraton"],
  },

  // Cerita Rakyat
  {
    id: "jateng-asal-usul-solo",
    provinceId: "jawa-tengah",
    category: "Cerita Rakyat",
    title: "Asal-usul Kota Surakarta",
    coordinates: [-7.571, 110.828],
    isLandmark: true,
    description:
      "Asal-usul Kota Surakarta bermula dari perpindahan pusat Kerajaan Mataram Islam dari Kartasura ke Desa Sala pada 1745 oleh Susuhunan Pakubuwono II akibat kerusakan keraton pasca peristiwa Geger Pecinan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Kota Surakarta atau yang lebih dikenal dengan nama Solo memiliki sejarah panjang yang berawal dari perpindahan pusat Kerajaan Mataram Islam dari Kartasura ke Desa Sala pada tahun 1745. Perpindahan tersebut dilakukan oleh Susuhunan Pakubuwono II setelah Keraton Kartasura mengalami kerusakan parah akibat peristiwa Geger Pecinan, yaitu pemberontakan besar yang terjadi pada tahun 1742. Setelah melakukan berbagai pertimbangan politik, keamanan, dan spiritual, Pakubuwono II memilih Desa Sala sebagai lokasi pembangunan keraton baru. Pada tanggal 17 Februari 1745, pusat kerajaan resmi dipindahkan dan diberi nama Surakarta Hadiningrat. Meskipun nama resmi kerajaan adalah Surakarta, masyarakat tetap menggunakan nama Sala atau Solo untuk menyebut wilayah tersebut hingga sekarang.",
    location: "Surakarta, Jawa Tengah",
    period: "Tahun 1745",
    image: "/img/cultures/asal-usul-solo.jpg",
    tags: ["Sejarah", "Mataram Islam", "Pakubuwono II"],
  },
  {
    id: "jateng-kyai-slamet",
    provinceId: "jawa-tengah",
    category: "Cerita Rakyat",
    title: "Legenda Kyai Slamet",
    coordinates: [-7.573, 110.829],
    isLandmark: true,
    description:
      "Legenda Kyai Slamet berkisah tentang kerbau albino keramat keturunan pusaka Keraton Surakarta yang diarak setiap Malam 1 Suro dalam Kirab Pusaka sebagai simbol keselamatan dan keberkahan bagi masyarakat.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Legenda Kyai Slamet merupakan salah satu tradisi paling terkenal di Surakarta. Kyai Slamet adalah sebutan bagi kerbau albino keturunan kerbau pusaka Keraton Surakarta yang dipercaya memiliki kekuatan spiritual dan mampu membawa keselamatan bagi masyarakat. Menurut kepercayaan masyarakat, kerbau tersebut merupakan hewan kesayangan Susuhunan Pakubuwono yang kemudian dianggap sebagai hewan keramat. Setiap malam 1 Suro, yaitu pergantian Tahun Baru Jawa, keturunan Kyai Slamet selalu diikutsertakan dalam Kirab Pusaka Keraton Surakarta. Tradisi ini selalu menarik ribuan masyarakat yang datang untuk mengikuti kirab. Banyak warga percaya bahwa berjalan di belakang iring-iringan Kyai Slamet dapat membawa keberuntungan dan keselamatan.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tradisi tahunan Malam 1 Suro",
    image: "/img/cultures/kyai-slamet.jpg",
    tags: ["Legenda", "Kerbau Bule", "Malam 1 Suro", "Keraton"],
  },
  {
    id: "jateng-joko-tingkir",
    provinceId: "jawa-tengah",
    category: "Cerita Rakyat",
    title: "Legenda Joko Tingkir",
    coordinates: [-7.558, 110.860],
    isLandmark: true,
    description:
      "Legenda Joko Tingkir berkisah tentang Mas Karebet (Joko Tingkir), pendiri Kesultanan Pajang, yang berhasil menaklukkan buaya-buaya ganas di Sungai Bengawan Solo dalam perjalanannya mengabdi ke Demak.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Joko Tingkir atau Mas Karebet merupakan tokoh legendaris yang sangat dikenal oleh masyarakat Solo dan sekitarnya. Ia merupakan pendiri Kesultanan Pajang yang menjadi cikal bakal lahirnya kerajaan-kerajaan besar di Jawa. Salah satu kisah paling terkenal adalah ketika Joko Tingkir berhasil menaklukakkan buaya-buaya ganas di Sungai Bengawan Solo. Dalam cerita rakyat, Joko Tingkir harus menyeberangi sungai untuk memenuhi tugas dari Kesultanan Demak. Berkat kesaktian dan keberaniannya, ia berhasil melewati berbagai rintangan, menaklukkan kawanan buaya, dan akhirnya memperoleh kepercayaan Sultan Demak. Kisah ini terus diwariskan secara turun-temurun oleh masyarakat sebagai simbol keberanian, kepemimpinan, dan perjuangan dalam menghadapi tantangan hidup.",
    location: "Sungai Bengawan Solo, Surakarta, Jawa Tengah",
    period: "Masa awal Kesultanan Pajang",
    image: "/img/cultures/joko-tingkir.jpg",
    tags: ["Legenda", "Joko Tingkir", "Bengawan Solo", "Kesultanan Pajang"],
  },
  {
    id: "jateng-trah-keraton",
    provinceId: "jawa-tengah",
    category: "Cerita Rakyat",
    title: "Asal-usul Trah Keraton Surakarta",
    coordinates: [-7.572, 110.829],
    isLandmark: true,
    description:
      "Kisah berdirinya Keraton Surakarta Hadiningrat pada tahun 1745 sebagai penerus langsung Mataram Islam pasca hancurnya Kartasura, melambangkan kewajiban moral menjaga kelestarian budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Keraton Surakarta Hadiningrat merupakan penerus langsung dari Kerajaan Mataram Islam yang pernah berjaya di Pulau Jawa. Sejarah berdirinya Keraton Surakarta bermula ketika Keraton Kartasura mengalami kerusakan akibat pemberontakan besar yang dikenal dengan peristiwa Geger Pecinan pada tahun 1742. Setelah kondisi kerajaan tidak lagi memungkinkan, Susuhunan Pakubuwono II memutuskan memindahkan pusat pemerintahan ke Desa Sala pada tahun 1745. Di tempat baru tersebut kemudian didirikan Keraton Surakarta Hadiningrat. Sejak saat itu, garis keturunan raja-raja Surakarta terus diwariskan secara turun-temurun dan dikenal sebagai Trah Kasunanan Surakarta. Masyarakat Jawa memandang keluarga keraton sebagai keturunan langsung para raja Mataram Islam yang mewarisi tanggung jawab untuk menjaga kelestarian budaya Jawa. Sepuluh tahun setelah berdirinya Keraton Surakarta, terjadi Perjanjian Giyanti pada tahun 1755 yang membagi Kerajaan Mataram menjadi dua kerajaan, yaitu Kasunanan Surakarta dan Kesultanan Yogyakarta. Meskipun terpisah, kedua kerajaan tersebut tetap berasal dari satu garis keturunan besar, yakni Trah Mataram. Dalam tradisi masyarakat Solo, keluarga Keraton Surakarta sering disebut sebagai keturunan ningrat atau darah biru. Sebutan tersebut tidak hanya merujuk pada garis keturunan raja, tetapi juga pada kewajiban moral untuk menjaga adat, tata krama, kesenian, serta berbagai pusaka budaya warisan leluhur. Masyarakat Solo juga meyakini bahwa seorang Susuhunan atau raja memperoleh wahyu keprabon sebagai tanda legitimasi kepemimpinan. Oleh karena itu, proses pergantian raja di Keraton Surakarta selalu dilakukan melalui serangkaian upacara adat yang sakral and penuh makna. Hingga saat ini, keturunan Keraton Surakarta masih terus melestarikan berbagai tradisi budaya seperti Sekaten, Grebeg, Kirab Pusaka Malam Satu Suro, serta berbagai kesenian klasik Jawa yang diwariskan sejak masa Kerajaan Mataram. Tradisi tersebut menjadikan Keraton Surakarta tetap menjadi pusat pelestarian budaya Jawa hingga sekarang.",
    location: "Keraton Surakarta Hadiningrat, Surakarta, Jawa Tengah",
    period: "Tahun 1745 hingga sekarang",
    image: "/img/cultures/keraton-surakarta.jpg",
    tags: ["Asal-usul", "Trah", "Keraton Surakarta", "Mataram Islam", "Sejarah"],
  },

  // Senjata
  {
    id: "jateng-keris-senjata",
    provinceId: "jawa-tengah",
    category: "Senjata",
    title: "Keris Surakarta",
    coordinates: [-7.570, 110.820],
    isLandmark: true,
    description:
      "Keris Surakarta adalah senjata tradisional sekaligus pusaka bergaya halus, ramping, dan elegan khas Kasunanan Surakarta, menyimbolkan kewibawaan, status sosial, dan doa keselamatan pemiliknya.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Keris Surakarta merupakan senjata tradisional sekaligus pusaka budaya yang sangat melekat dengan identitas masyarakat Solo. Tradisi pembuatan keris di wilayah Surakarta telah berkembang sejak masa Kerajaan Mataram Islam dan mencapai puncak perkembangannya pada era Kasunanan Surakarta Hadiningrat. Di lingkungan keraton, keris tidak hanya dipandang sebagai alat pertahanan diri, tetapi juga sebagai simbol kehormatan, kebijaksanaan, kekuasaan, dan identitas sosial seseorang. Pembuatan keris dilakukan oleh seorang empu dengan memadukan logam menghasilkan pamor yang bernilai filosofis tinggi. Keris gaya Surakarta dikenal memiliki bentuk yang lebih halus, ramping, dan elegan dibandingkan dengan keris dari daerah lain.",
    location: "Surakarta, Jawa Tengah",
    period: "Masa Mataram Islam hingga sekarang",
    image: "/img/cultures/keris-senjata-solo.jpg",
    tags: ["Senjata", "Pusaka", "Keris", "Surakarta"],
  },
  {
    id: "jateng-tombak-pusaka",
    provinceId: "jawa-tengah",
    category: "Senjata",
    title: "Tombak Pusaka Keraton",
    coordinates: [-7.572, 110.827],
    isLandmark: true,
    description:
      "Tombak Pusaka Keraton merupakan senjata tradisional sakral seperti Kyai Plered dan Kyai Baru Klinting yang melambangkan kekuasaan, kewibawaan, dan legitimasi kepemimpinan raja Surakarta.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Tombak Pusaka Keraton merupakan salah satu senjata tradisional yang memiliki kedudukan penting dalam budaya Keraton Surakarta. Sejak masa Kerajaan Mataram Islam, tombak tidak hanya digunakan sebagai perlengkapan perang, tetapi juga menjadi lambang kekuasaan, kewibawaan, dan legitimasi seorang raja. Berbagai tombak pusaka hingga kini masih tersimpan dengan baik di Keraton Surakarta dan dianggap sebagai benda sakral yang memiliki nilai sejarah tinggi. Setiap tombak pusaka biasanya memiliki nama khusus, seperti Kyai Plered atau Kyai Baru Klinting. Pada masa lalu, tombak digunakan oleh prajurit kerajaan ketika menjaga keamanan keraton maupun saat menghadapi peperangan, namun kini lebih banyak ditampilkan dalam prosesi kirab pusaka keraton.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Masa Mataram Islam",
    image: "/img/cultures/tombak-pusaka-solo.jpg",
    tags: ["Tombak", "Pusaka", "Keraton", "Surakarta"],
  },
  {
    id: "jateng-wedhung",
    provinceId: "jawa-tengah",
    category: "Senjata",
    title: "Wedhung Surakarta",
    coordinates: [-7.574, 110.825],
    isLandmark: true,
    description:
      "Wedhung merupakan senjata belati tradisional sejenis pisau panjang berbilah lurus yang diselipkan di pinggang abdi dalem dan pejabat keraton sebagai simbol kesiapan pertahanan dan kehormatan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Wedhung merupakan senjata tikam tradisional masyarakat Jawa yang banyak digunakan oleh kalangan bangsawan, priyayi, maupun abdi dalem keraton. Senjata ini memiliki bentuk menyerupai pisau panjang dengan bilah lurus dan ujung yang runcing. Di lingkungan Keraton Surakarta, wedhung menjadi salah satu pelengkap busana adat resmi yang menunjukkan status sosial dan kedudukan seseorang. Berbeda dengan keris yang lebih menonjolkan nilai simbolis dan spiritual, wedhung pada masa lalu lebih sering digunakan sebagai senjata praktis untuk keperluan sehari-hari maupun pertahanan diri. Meskipun demikian, wedhung tetap memiliki nilai filosofis dalam budaya Jawa, melambangkan keberanian, tanggung jawab, dan kesiapan seorang laki-laki.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Jawa kuno",
    image: "/img/cultures/wedhung-solo.jpg",
    tags: ["Wedhung", "Belati", "Abdi Dalem", "Keraton"],
  },
  {
    id: "jateng-pedang-keraton",
    provinceId: "jawa-tengah",
    category: "Senjata",
    title: "Pedang Keraton Jawa",
    coordinates: [-7.575, 110.830],
    isLandmark: true,
    description:
      "Pedang Keraton Jawa merupakan perlengkapan perang prajurit Kasunanan Surakarta pada masa lalu yang kini digunakan sebagai atribut upacara seremonial dan kirab adat prajurit keraton.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Pedang Keraton Jawa merupakan salah satu perlengkapan militer yang pernah digunakan oleh prajurit Kasunanan Surakarta pada masa lalu. Pedang ini umumnya digunakan oleh pasukan kerajaan sebagai senjata tempur ketika menjaga keamanan wilayah maupun saat menghadapi konflik bersenjata. Pedang menjadi salah satu perlengkapan utama yang digunakan oleh pasukan pengawal keraton maupun pasukan khusus kerajaan. Seiring berakhirnya masa peperangan tradisional, fungsi pedang mulai berubah menjadi bagian dari atribut seremonial. Hingga kini, pedang masih sering digunakan oleh prajurit Keraton Surakarta dalam berbagai prosesi adat, kirab budaya, serta upacara resmi kerajaan.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Era Kasunanan Surakarta",
    image: "/img/cultures/pedang-keraton.jpg",
    tags: ["Pedang", "Prajurit", "Seremonial", "Keraton"],
  },

  // Rumah Adat
  {
    id: "jateng-rumah-joglo",
    provinceId: "jawa-tengah",
    category: "Rumah Adat",
    title: "Rumah Joglo Surakarta",
    coordinates: [-7.580, 110.820],
    isLandmark: true,
    description:
      "Rumah Joglo merupakan arsitektur hunian utama bangsawan Jawa beratap tinggi yang ditopang soko guru (empat tiang utama) sebagai simbol keseimbangan hidup manusia, sesama, alam, dan Pencipta.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Rumah Joglo merupakan rumah adat utama masyarakat Jawa yang berkembang pesat di wilayah Surakarta dan sekitarnya. Arsitektur Joglo telah dikenal sejak masa Kerajaan Mataram dan kemudian mengalami perkembangan yang signifikan di lingkungan Keraton Surakarta. Pada masa lalu, rumah Joglo umumnya hanya dimiliki oleh kalangan bangsawan, pejabat kerajaan, dan keluarga priyayi karena proses pembangunannya memerlukan biaya yang besar serta keterampilan khusus. Ciri utama rumah Joglo terletak pada bentuk atapnya yang menjulang tinggi dan ditopang oleh empat tiang utama yang disebut soko guru. Keempat tiang tersebut memiliki makna filosofis yang mendalam, yaitu melambangkan hubungan harmonis antara manusia dengan Tuhan, sesama manusia, alam, dan dirinya sendiri.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisional Jawa",
    image: "/img/cultures/joglo-solo.jpg",
    tags: ["Arsitektur", "Joglo", "Soko Guru", "Rumah Adat"],
  },
  {
    id: "jateng-joglo-sinom",
    provinceId: "jawa-tengah",
    category: "Rumah Adat",
    title: "Joglo Sinom",
    coordinates: [-7.585, 110.815],
    isLandmark: true,
    description:
      "Joglo Sinom adalah variasi rumah Joglo dengan tambahan tiang penyangga keliling untuk ruang lebih lapang, melambangkan pertumbuhan, gotong royong, dan kebersamaan keluarga besar.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Joglo Sinom merupakan salah satu varian rumah Joglo yang berkembang di wilayah Surakarta. Nama Sinom berasal dari bahasa Jawa yang berarti daun muda asam, yang melambangkan pertumbuhan, harapan, dan kehidupan baru. Rumah Joglo Sinom banyak digunakan oleh kalangan bangsawan, priyayi, dan masyarakat terpandang di Solo karena memiliki bentuk yang lebih luas dibandingkan Joglo biasa. Ciri khas Joglo Sinom terletak pada tambahan tiang penyangga di sekeliling bangunan utama sehingga menciptakan ruang yang lebih lapang. Struktur tersebut memungkinkan rumah digunakan untuk berbagai kegiatan sosial, seperti musyawarah, pertemuan keluarga besar, hingga penyelenggaraan upacara adat.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisional Jawa",
    image: "/img/cultures/joglo-sinom.jpg",
    tags: ["Sinom", "Joglo", "Arsitektur", "Jawa"],
  },
  {
    id: "jateng-joglo-pangrawit",
    provinceId: "jawa-tengah",
    category: "Rumah Adat",
    title: "Joglo Pangrawit",
    coordinates: [-7.578, 110.810],
    isLandmark: true,
    description:
      "Joglo Pangrawit merupakan varian Joglo rumit berciri khas ukiran dekoratif kaya yang menyimbolkan status kebangsawanan tinggi dan kehalusan citarasa seni arsitektur tradisional Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Joglo Pangrawit merupakan salah satu bentuk rumah Joglo yang memiliki tingkat kerumitan arsitektur lebih tinggi dibandingkan jenis Joglo lainnya. Dalam tradisi arsitektur Jawa, Joglo Pangrawit umumnya dimiliki oleh keluarga bangsawan atau kerabat keraton karena membutuhkan biaya pembangunan yang besar dan pengerjaan yang sangat teliti. Keistimewaan Joglo Pangrawit terletak pada struktur atapnya yang lebih rumit, penggunaan ornamen ukiran yang lebih kaya, serta detail hiasan yang memperlihatkan tingkat seni tinggi. Di lingkungan Keraton Surakarta, rumah dengan tipe Joglo Pangrawit sering digunakan sebagai tempat tinggal keluarga kerajaan maupun pejabat tinggi keraton.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisional Jawa",
    image: "/img/cultures/joglo-pangrawit.jpg",
    tags: ["Pangrawit", "Joglo", "Ukiran", "Keraton"],
  },
  {
    id: "jateng-pendopo-ageng",
    provinceId: "jawa-tengah",
    category: "Rumah Adat",
    title: "Pendopo Ageng Keraton Surakarta",
    coordinates: [-7.566, 110.830],
    isLandmark: true,
    description:
      "Pendopo Ageng merupakan bangunan utama tanpa dinding di Keraton Surakarta yang melambangkan keterbukaan raja dengan rakyatnya, menjadi pusat upacara adat dan pelestarian gamelan serta tarian.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Pendopo Ageng merupakan bangunan utama yang berada di kompleks Keraton Surakarta Hadiningrat dan menjadi salah satu ikon arsitektur tradisional Kota Solo. Bangunan ini berfungsi sebagai pusat penyelenggaraan berbagai kegiatan kerajaan, mulai dari upacara adat, penerimaan tamu kehormatan, pertunjukan seni, hingga kegiatan kenegaraan pada masa Kasunanan Surakarta. Pendopo Ageng dibangun dengan konsep arsitektur Joglo yang megah dan terbuka tanpa dinding di bagian samping. Desain terbuka tersebut mencerminkan filosofi masyarakat Jawa yang menjunjung tinggi keterbukaan, kebersamaan, dan hubungan harmonis antara pemimpin dengan rakyatnya. Bangunan ini juga menjadi pusat perkembangan seni tradisional Jawa, seperti gamelan, tari klasik, dan wayang kulit.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tahun 1745",
    image: "/img/cultures/pendopo-ageng.jpg",
    tags: ["Pendopo", "Keraton", "Surakarta", "Ageng"],
  },

  // Tarian
  {
    id: "jateng-tari-gambyong",
    provinceId: "jawa-tengah",
    category: "Tarian",
    title: "Tari Gambyong",
    coordinates: [-7.562, 110.822],
    isLandmark: true,
    description:
      "Tari Gambyong merupakan tarian klasik Surakarta yang berkembang dari tarian panen rakyat sebagai ungkapan syukur. Gerakannya yang lembut dan luwes menyimbolkan kesopanan, budi pekerti, dan keramahan.",
    youtubeId: "cyJ9fpoYh_M",

    audio: "/music/jateng/Tarian - Tari Gambyong.mp3",
    narrator:
      "Tari Gambyong merupakan tarian tradisional yang berasal dari Kota Surakarta atau Solo. Awalnya, tarian ini berkembang dari tari rakyat yang dipentaskan sebagai ungkapan rasa syukur atas hasil panen. Seiring waktu, Tari Gambyong mengalami penyempurnaan di lingkungan Pura Mangkunegaran sehingga menjadi tarian klasik yang dikenal hingga saat ini. Kini, Tari Gambyong sering digunakan sebagai tari penyambutan tamu kehormatan maupun pertunjukan budaya. Gerakan Tari Gambyong yang lembut dan anggun mencerminkan keramahan, kesopanan, serta kelembutan budi yang menjadi ciri khas budaya masyarakat Jawa. Setiap gerakan tangan, kepala, dan langkah kaki dilakukan secara selaras dengan iringan gamelan, menggambarkan kehidupan yang harmonis dan penuh penghormatan kepada orang lain.",
    location: "Surakarta, Jawa Tengah",
    period: "Masa Pura Mangkunegaran",
    image: "/img/cultures/tari-gambyong.jpg",
    tags: ["Tari Klasik", "Gambyong", "Mangkunegaran", "Penyambutan"],
  },
  {
    id: "jateng-tari-bedhaya",
    provinceId: "jawa-tengah",
    category: "Tarian",
    title: "Tari Bedhaya Ketawang",
    coordinates: [-7.572, 110.828],
    isLandmark: true,
    description:
      "Tari Bedhaya Ketawang merupakan tarian sakral diiringi sembilan penari perempuan yang dipentaskan khusus saat penobatan dan peringatan kenaikan takhta Susuhunan Surakarta Hadiningrat.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Tari Bedhaya Ketawang merupakan tarian sakral yang berasal dari Keraton Kasunanan Surakarta. Tarian ini hanya dipentaskan pada momen-momen tertentu, terutama saat peringatan kenaikan takhta Susuhunan Surakarta. Karena memiliki nilai sakral yang tinggi, pementasannya dilakukan dengan tata cara dan aturan adat yang masih menjaga nuansa khidmat hingga sekarang. Bagi masyarakat Solo, Tari Bedhaya Ketawang melambangkan kesucian, keselarasan, kesetiaan, dan penghormatan terhadap tradisi leluhur. Gerakan sembilan penari yang dilakukan secara serempak menggambarkan keseimbangan antara manusia, alam, dan Sang Pencipta. Nilai-nilai tersebut menjadi bagian penting dalam filosofi budaya Jawa.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Sejak masa Mataram Islam",
    image: "/img/cultures/bedhaya-ketawang-solo.jpg",
    tags: ["Bedhaya", "Sakral", "Keraton", "Kenaikan Takhta"],
  },
  {
    id: "jateng-tari-srimpi",
    provinceId: "jawa-tengah",
    category: "Tarian",
    title: "Tari Srimpi Surakarta",
    coordinates: [-7.573, 110.826],
    isLandmark: true,
    description:
      "Tari Srimpi Surakarta merupakan tarian klasik keraton oleh empat penari perempuan berarak anggun lambat yang menyimbolkan kehalusan, kesabaran, dan pengendalian diri budaya Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Tari Srimpi Surakarta merupakan tari klasik yang berkembang di lingkungan Keraton Surakarta. Tarian ini dibawakan oleh empat penari perempuan dengan gerakan yang lembut, perlahan, dan penuh penghayatan. Sejak dahulu, Tari Srimpi menjadi simbol kehalusan budaya Jawa dan hanya dipentaskan di lingkungan keraton sebelum akhirnya dikenal oleh masyarakat luas. Gerakan Tari Srimpi mencerminkan kesabaran, pengendalian diri, serta sikap anggun yang dijunjung tinggi dalam budaya Jawa. Melalui setiap gerakan yang tenang dan teratur, tarian ini mengajarkan bahwa keindahan tidak selalu ditunjukkan melalui gerakan yang cepat, melainkan melalui ketenangan, ketelitian, dan keharmonisan.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tradisi keraton Jawa",
    image: "/img/cultures/tari-srimpi-solo.jpg",
    tags: ["Srimpi", "Tarian", "Kehalusan", "Keraton"],
  },
  {
    id: "jateng-tari-bondan",
    provinceId: "jawa-tengah",
    category: "Tarian",
    title: "Tari Bondan",
    coordinates: [-7.564, 110.835],
    isLandmark: true,
    description:
      "Tari Bondan merupakan tarian tradisional asal Surakarta yang mengisahkan kasih sayang, ketulusan, dan kesabaran seorang ibu dalam mengasuh bayinya menggunakan properti kendi, boneka, dan payung.",
    youtubeId: "cyJ9fpoYh_M",

    audio: "/music/jateng/Tarian - Tari Bondan.mp3",
    narrator:
      "Tari Bondan merupakan tarian tradisional yang berasal dari Surakarta dan menggambarkan kehidupan seorang ibu dalam merawat anaknya dengan penuh kasih sayang. Tarian ini biasanya dibawakan oleh seorang penari perempuan yang menampilkan berbagai gerakan lembut sambil membawa boneka sebagai simbol seorang bayi. Melalui Tari Bondan, masyarakat Jawa mengajarkan pentingnya kasih sayang, tanggung jawab, kesabaran, dan ketulusan dalam membesarkan anak. Tarian ini juga menunjukkan bahwa peran seorang ibu sangat dihargai sebagai sosok yang memberikan cinta, perhatian, dan pendidikan pertama bagi anak-anaknya. Keunikannya terletak pada penggunaan properti seperti boneka, payung, atau kendi.",
    location: "Surakarta, Jawa Tengah",
    period: "Masyarakat Tradisional Jawa",
    image: "/img/cultures/tari-bondan.jpg",
    tags: ["Bondan", "Kasih Sayang", "Ibu", "Kendi"],
  },

  // Musik
  {
    id: "jateng-musik-bonang",
    provinceId: "jawa-tengah",
    category: "Musik",
    title: "Bonang Gaya Surakarta",
    coordinates: [-7.567, 110.829],
    isLandmark: true,
    description:
      "Bonang adalah alat musik gamelan berupa deretan gong kecil dalam rak kayu yang berfungsi menuntun arah melodi dan tempo karawitan, menyimbolkan kepemimpinan dan keselarasan kerja sama.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Bonang merupakan salah satu alat musik tradisional yang menjadi bagian penting dalam ansambel gamelan Surakarta. Alat musik ini terdiri atas deretan pencon atau gong-gong kecil yang disusun di atas tali dalam sebuah rangka kayu, kemudian dimainkan dengan cara dipukul menggunakan sepasang pemukul khusus. Dalam budaya Solo, bonang memiliki peran sebagai pembawa pola melodi yang menghubungkan setiap bagian lagu sehingga alunan gamelan terdengar lebih hidup dan teratur. Kehadirannya mengajarkan bahwa setiap bagian, sekecil apa pun perannya, memiliki arti penting dalam menciptakan keharmonisan bersama. Nilai tersebut mencerminkan filosofi masyarakat Jawa yang menjunjung tinggi kerja sama dan keseimbangan.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Gamelan Jawa",
    image: "/img/cultures/bonang-solo.jpg",
    tags: ["Bonang", "Gamelan", "Pukul", "Musik"],
  },
  {
    id: "jateng-musik-gender",
    provinceId: "jawa-tengah",
    category: "Musik",
    title: "Gender",
    coordinates: [-7.568, 110.831],
    isLandmark: true,
    description:
      "Gender merupakan alat musik bilah logam gantung di atas pipa bambu yang dipukul dengan dua tabuh untuk menghasilkan nada harmonis melodi pendukung karawitan pewayangan dan tarian.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Gender merupakan alat musik pukul tradisional yang terdiri atas bilah-bilah logam yang digantung di atas tabung resonator dari bambu. Alat musik ini dimainkan menggunakan dua pemukul kecil dan menghasilkan suara yang halus serta bergema. Dalam ansambel gamelan Surakarta, gender berfungsi mengembangkan melodi sehingga alunan musik terdengar lebih indah dan penuh variasi. Melalui permainan gender, masyarakat Jawa mengajarkan pentingnya ketelitian, kesabaran, dan keseimbangan, karena setiap nada harus dimainkan dengan tepat agar tetap selaras dengan instrumen lainnya. Gender sering dimainkan dalam pertunjukan wayang kulit, tari klasik, hingga upacara adat Keraton Surakarta.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Gamelan Jawa",
    image: "/img/cultures/gender-solo.jpg",
    tags: ["Gender", "Gamelan", "Logam", "Resonator"],
  },
  {
    id: "jateng-musik-siter",
    provinceId: "jawa-tengah",
    category: "Musik",
    title: "Siter",
    coordinates: [-7.569, 110.833],
    isLandmark: true,
    description:
      "Siter merupakan alat musik petik kawat di atas resonator kayu yang dipetik menggunakan kuku ibu jari untuk menghadirkan alunan melodi lembut penenang jiwa dalam ensambel gamelan.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Siter merupakan alat musik petik tradisional yang memiliki bentuk menyerupai kotak kayu dengan sejumlah senar yang direntangkan di bagian atasnya. Alat musik ini dimainkan dengan cara dipetik menggunakan jari sehingga menghasilkan suara yang jernih dan menenangkan. Bagi masyarakat Solo, siter memberikan sentuhan halus yang memperkaya warna musik gamelan. Suaranya yang lembut mencerminkan ketenangan, kesederhanaan, dan kelembutan hati yang menjadi bagian dari filosofi hidup masyarakat Jawa. Kehadirannya menunjukkan bahwa keindahan dapat tercipta melalui perpaduan nada-nada yang sederhana namun selaras. Siter digunakan dalam pertunjukan gamelan, tembang Jawa, dan berbagai acara budaya.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Gamelan Jawa",
    image: "/img/cultures/siter-solo.jpg",
    tags: ["Siter", "Gamelan", "Petik", "Dawai"],
  },
  {
    id: "jateng-musik-gong-ageng",
    provinceId: "jawa-tengah",
    category: "Musik",
    title: "Gong Ageng",
    coordinates: [-7.570, 110.834],
    isLandmark: true,
    description:
      "Gong Ageng adalah instrumen gamelan terbesar berlubang tengah yang dipukul lembut untuk menutup siklus melodi gending, menyimbolkan awal dan akhir kehidupan serta keseimbangan paripurna.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Gong Ageng merupakan instrumen terbesar dalam seperangkat gamelan Surakarta. Alat musik ini terbuat dari logam berbentuk bundar dengan tonjolan di bagian tengah dan dimainkan dengan cara dipukul menggunakan pemukul khusus yang dilapisi bahan lunak. Dalam budaya Jawa, Gong Ageng memiliki peran yang sangat penting karena menjadi penanda awal, akhir, atau pergantian bagian dalam sebuah komposisi gamelan. Kehadirannya melambangkan kebesaran, keseimbangan, dan kesempurnaan. Masyarakat Jawa memaknai bunyi gong sebagai pengingat bahwa setiap perjalanan hidup memiliki awal dan akhir yang harus menjalani lembaran baru dengan penuh kebijaksanaan.",
    location: "Surakarta, Jawa Tengah",
    period: "Tradisi Gamelan Jawa",
    image: "/img/cultures/gong-ageng-solo.jpg",
    tags: ["Gong", "Gamelan", "Besar", "Sakral"],
  },

  // Pakaian Adat
  {
    id: "jateng-beskap-solo",
    provinceId: "jawa-tengah",
    category: "Pakaian Adat",
    title: "Beskap Solo",
    coordinates: [-7.563, 110.824],
    isLandmark: true,
    description:
      "Beskap Solo merupakan jas pria resmi adat Jawa berkerah tegak tanpa lipatan kerah yang dipadukan dengan jarik, blangkon, dan keris, melambangkan kesopanan, wibawa, dan tata krama.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Beskap Solo merupakan pakaian adat resmi yang dikenakan oleh laki-laki dalam berbagai acara adat di Kota Surakarta. Pakaian ini memiliki potongan yang rapi dengan kerah tegak dan kancing yang tersusun secara khas di bagian depan. Beskap biasanya dipadukan dengan jarik batik, blangkon, serta keris sebagai pelengkap busana. Bagi masyarakat Solo, Beskap bukan sekadar pakaian adat, tetapi juga melambangkan kewibawaan, kesopanan, dan tanggung jawab. Cara mengenakannya mencerminkan etika masyarakat Jawa yang menjunjung tinggi tata krama dan penghormatan kepada orang lain. Nilai tersebut masih dijaga hingga kini dalam berbagai acara resmi maupun upacara adat.",
    location: "Surakarta, Jawa Tengah",
    period: "Busana adat Keraton Surakarta",
    image: "/img/cultures/beskap-solo.jpg",
    tags: ["Beskap", "Pakaian Resmi", "Laki-laki", "Keraton"],
  },
  {
    id: "jateng-kebaya-solo",
    provinceId: "jawa-tengah",
    category: "Pakaian Adat",
    title: "Kebaya Solo",
    coordinates: [-7.564, 110.826],
    isLandmark: true,
    description:
      "Kebaya Solo adalah kebaya anggun berpotongan longgar elegan yang melambangkan kelembutan, kesopanan budi pekerti, serta keanggunan sejati perempuan Jawa dalam bersikap sehari-hari.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Kebaya Solo merupakan pakaian tradisional perempuan yang dikenal karena tampilannya yang anggun, sederhana, dan elegan. Kebaya ini umumnya dipadukan dengan kain batik Solo, sanggul, serta berbagai aksesori tradisional yang mempercantik penampilan. Dalam budaya Solo, Kebaya melambangkan kelembutan, kesopanan, dan keanggunan perempuan Jawa. Selain memperlihatkan keindahan busana, kebaya juga mengajarkan bahwa kecantikan seseorang tercermin dari sikap, tutur kata, dan perilakunya. Nilai inilah yang menjadikan kebaya tetap dihormati sebagai salah satu simbol budaya Jawa.",
    location: "Surakarta, Jawa Tengah",
    period: "Busana tradisional Jawa",
    image: "/img/cultures/kebaya-solo.jpg",
    tags: ["Kebaya", "Perempuan", "Anggun", "Tradisional"],
  },
  {
    id: "jateng-jarik-batik",
    provinceId: "jawa-tengah",
    category: "Pakaian Adat",
    title: "Jarik Batik Solo",
    coordinates: [-7.562, 110.814],
    isLandmark: true,
    description:
      "Jarik Batik Solo merupakan kain batik panjang bermotif klasik seperti Sidomukti, Sidoasih, dan Truntum yang dililitkan sebagai bawahan adat, sarat makna doa kesejahteraan dan kesetiaan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Jarik Batik Solo merupakan kain batik tradisional yang dikenakan sebagai bawahan dalam pakaian adat masyarakat Surakarta. Kain ini dibuat menggunakan teknik membatik yang telah diwariskan selama berabad-abad dan dikenal dengan motif-motif klasik seperti Sidomukti, Sidoasih, Parang, dan Truntum. Bagi masyarakat Solo, setiap motif batik memiliki makna dan harapan tersendiri. Misalnya, motif Sidomukti melambangkan harapan akan kehidupan yang sejahtera, sedangkan Truntum melambangkan kasih sayang yang tumbuh tanpa henti. Hal ini menunjukkan bahwa batik bukan hanya pelengkap pakaian, tetapi juga media untuk menyampaikan doa dan nilai kehidupan.",
    location: "Surakarta, Jawa Tengah",
    period: "Busana tradisional Jawa",
    image: "/img/cultures/jarik-solo.jpg",
    tags: ["Jarik", "Batik", "Klasik", "Sidomukti", "Truntum"],
  },
  {
    id: "jateng-blangkon-pakaian",
    provinceId: "jawa-tengah",
    category: "Pakaian Adat",
    title: "Blangkon Surakarta",
    coordinates: [-7.566, 110.827],
    isLandmark: true,
    description:
      "Blangkon Surakarta merupakan penutup kepala batik dengan mondholan tipis datar di bagian belakangnya yang melambangkan kejernihan pikiran, pengendalian hawa nafsu, dan kebijaksanaan.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Blangkon Surakarta merupakan penutup kepala tradisional yang menjadi pelengkap pakaian adat laki-laki di Kota Solo. Blangkon dibuat dari kain batik yang dibentuk mengikuti pola tertentu sehingga nyaman dikenakan dan memiliki ciri khas tersendiri. Dalam budaya Jawa, Blangkon melambangkan kebijaksanaan, pengendalian diri, dan kemampuan menjaga pikiran agar tetap jernih. Penutup kepala ini mengingatkan bahwa seseorang harus mampu berpikir dengan tenang sebelum mengambil keputusan. Blangkon Surakarta memiliki keunikan pada bagian belakangnya yang datar atau mondhol tipis, berbeda dengan Blangkon Yogyakarta yang memiliki tonjolan lebih besar.",
    location: "Surakarta, Jawa Tengah",
    period: "Busana adat Jawa",
    image: "/img/cultures/blangkon-adat-solo.jpg",
    tags: ["Blangkon", "Surakarta", "Mondholan Datar", "Laki-laki"],
  },

  // Upacara Adat
  {
    id: "jateng-sekaten",
    provinceId: "jawa-tengah",
    category: "Upacara Adat",
    title: "Sekaten Surakarta",
    coordinates: [-7.571, 110.826],
    isLandmark: true,
    description:
      "Sekaten merupakan perayaan tahunan memperingati Maulid Nabi Muhammad SAW dengan membunyikan gamelan pusaka Kyai Guntur Madu dan Kyai Guntur Sari di halaman Masjid Agung Surakarta.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Sekaten merupakan tradisi budaya yang telah berlangsung sejak masa Kesultanan Demak dan kemudian dilestarikan oleh Keraton Kasunanan Surakarta. Upacara ini diselenggarakan untuk memperingati kelahiran Nabi Muhammad SAW dan menjadi salah satu perayaan budaya terbesar di Kota Solo. Melalui Sekaten, masyarakat diajak untuk mengenang nilai-nilai keagamaan sekaligus mempererat hubungan antarsesama. Tradisi ini menunjukkan bahwa budaya dan agama dapat berjalan berdampingan dalam kehidupan masyarakat Jawa. Sekaten biasanya diawali dengan membunyikan gamelan pusaka Keraton di halaman Masjid Agung dan diakhiri dengan prosesi Grebeg Mulud.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tahunan, Peringatan Maulid Nabi",
    image: "/img/cultures/sekaten-solo.jpg",
    tags: ["Sekaten", "Maulid", "Masjid Agung", "Gamelan Pusaka"],
  },
  {
    id: "jateng-grebeg-sudiro",
    provinceId: "jawa-tengah",
    category: "Upacara Adat",
    title: "Grebeg Sudiro",
    coordinates: [-7.560, 110.832],
    isLandmark: true,
    description:
      "Grebeg Sudiro merupakan festival budaya akulturasi Jawa-Tionghoa di Surakarta dengan mengarak gunungan berisi ribuan kue keranjang untuk memupuk persaudaraan dan kerukunan suku.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Grebeg Sudiro merupakan tradisi budaya yang berkembang di kawasan Sudiroprajan, Kota Solo. Upacara ini menjadi simbol keberagaman masyarakat Solo karena memadukan budaya Jawa dan budaya Tionghoa dalam satu perayaan yang meriah, terutama menjelang Tahun Baru Imlek. Tradisi ini mengajarkan pentingnya hidup rukun di tengah keberagaman suku, budaya, dan agama. Masyarakat bersama-sama mengikuti kirab budaya dan membagikan hasil bumi sebagai simbol rasa syukur, kebersamaan, dan harapan akan kehidupan yang sejahtera. Keunikan Grebeg Sudiro terletak pada hadirnya gunungan yang dihiasi ribuan kue keranjang, salah satu makanan khas masyarakat Tionghoa.",
    location: "Sudiroprajan, Surakarta, Jawa Tengah",
    period: "Tahunan menjelang Imlek",
    image: "/img/cultures/grebeg-sudiro.jpg",
    tags: ["Grebeg", "Sudiro", "Akulturasi", "Tionghoa", "Jawa"],
  },
  {
    id: "jateng-tingalan-jumenengan",
    provinceId: "jawa-tengah",
    category: "Upacara Adat",
    title: "Tingalan Jumenengan Dalem",
    coordinates: [-7.572, 110.829],
    isLandmark: true,
    description:
      "Tingalan Jumenengan Dalem merupakan upacara adat memperingati penobatan Susuhunan Surakarta Hadiningrat yang diisi dengan pembacaan doa keselamatan, kirab, dan tari sakral Bedhaya.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Tingalan Jumenengan Dalem merupakan upacara adat Keraton Kasunanan Surakarta yang diselenggarakan setiap tahun untuk memperingati hari penobatan atau kenaikan takhta raja. Tradisi ini menjadi salah satu bentuk penghormatan terhadap sejarah Kesultanan Surakarta yang masih dilestarikan hingga sekarang. Upacara ini mencerminkan rasa hormat kepada para pemimpin serta pentingnya menjaga kesinambungan nilai-nilai budaya dan adat istiadat. Prosesi Tingalan Jumenengan Dalem diisi dengan berbagai kegiatan adat seperti kirab pusaka, pertunjukan seni tradisional tari Bedhaya Ketawang, dan doa bersama.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tahunan, hari naik takhta raja",
    image: "/img/cultures/tingalan-jumenengan.jpg",
    tags: ["Jumenengan", "Penobatan Raja", "Keraton", "Upacara Adat"],
  },
  {
    id: "jateng-kirab-1-suro",
    provinceId: "jawa-tengah",
    category: "Upacara Adat",
    title: "Kirab Pusaka Malam 1 Suro",
    coordinates: [-7.573, 110.832],
    isLandmark: true,
    description:
      "Kirab Pusaka Malam 1 Suro merupakan prosesi hening di tengah malam mengarak benda pusaka keraton dipimpin oleh kerbau albino Kyai Slamet untuk melakukan introspeksi batin.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Kirab Pusaka Malam 1 Suro merupakan salah satu tradisi paling terkenal di Kota Solo yang diselenggarakan setiap malam pergantian Tahun Baru Jawa atau 1 Suro. Dalam tradisi ini, berbagai pusaka Keraton Kasunanan Surakarta diarak mengelilingi kawasan keraton bersama para abdi dalem secara hening (laku bisu). Bagi masyarakat Solo, kirab ini bukan sekadar prosesi budaya, tetapi juga menjadi sarana untuk melakukan introspeksi diri dan memohon keselamatan. Salah satu bagian yang paling menarik adalah keikutsertaan kerbau bule keturunan Kyai Slamet, yang dipercaya sebagai hewan keramat penunjuk jalan oleh sebagian masyarakat.",
    location: "Keraton Surakarta Hadiningrat, Jawa Tengah",
    period: "Tahunan, Malam 1 Suro",
    image: "/img/cultures/kirab-1-suro.jpg",
    tags: ["Kirab", "Malam 1 Suro", "Kyai Slamet", "Pusaka"],
  },

  // Bangunan Bersejarah
  {
    id: "jateng-keraton-surakarta",
    provinceId: "jawa-tengah",
    category: "Bangunan Bersejarah",
    title: "Keraton Surakarta Hadiningrat",
    coordinates: [-7.578, 110.828],
    isLandmark: true,
    description:
      "Keraton Surakarta Hadiningrat merupakan istana resmi Kasunanan Surakarta yang didirikan pada tahun 1745 oleh Susuhunan Pakubuwono II. Bangunan bersejarah ini menjadi saksi bisu transisi pemerintahan Mataram Islam dan pusat pelestarian kebudayaan Jawa hingga hari ini.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Keraton Surakarta Hadiningrat didirikan oleh Susuhunan Pakubuwono II pada tahun 1745 sebagai pengganti Keraton Kartasura yang hancur akibat peristiwa Geger Pecinan. Pemindahan istana ini diiringi prosesi arak-arakan besar-besaran yang membawa seluruh pusaka kerajaan ke Desa Sala. Arsitektur keraton memadukan gaya tradisional Jawa dengan sentuhan kolonial Eropa pada ornamen-ornamennya, yang dirancang oleh para arsitek keraton berkolaborasi dengan Belanda. Kompleks keraton terdiri dari berbagai pelataran seperti Alun-alun Lor, Sasana Sewaka, dan panggung Songgobuwono yang legendaris, sebuah menara tinggi yang dahulu digunakan untuk mengintai musuh sekaligus tempat bermeditasi bagi raja. Hingga kini, Keraton Surakarta tetap berfungsi sebagai kediaman keluarga kerajaan sekaligus pusat budaya utama di Kota Solo.",
    location: "Kota Surakarta, Jawa Tengah",
    period: "Tahun 1745",
    image: "/img/cultures/keraton-surakarta.jpg",
    tags: ["Keraton", "Surakarta", "Istana", "Mataram Islam", "Pusaka"],
  },
  {
    id: "jateng-pura-mangkunegaran",
    provinceId: "jawa-tengah",
    category: "Bangunan Bersejarah",
    title: "Pura Mangkunegaran",
    coordinates: [-7.566, 110.822],
    isLandmark: true,
    description:
      "Pura Mangkunegaran adalah istana resmi Kadipaten Mangkunegaran yang didirikan pada tahun 1757 oleh Raden Mas Said (Pangeran Sambernyawa). Istana ini memiliki pendopo ageng tanpa tiang penyangga tengah terbesar di Indonesia.",
    youtubeId: "cyJ9fpoYh_M",

    narrator:
      "Pura Mangkunegaran didirikan setelah ditandatanganinya Perjanjian Salatiga pada tahun 1757, yang menetapkan Raden Mas Said atau Pangeran Sambernyawa sebagai KGPAA Mangkunegara I. Kompleks istana ini menghadap ke arah selatan dan memiliki daya tarik utama berupa Pendopo Ageng, sebuah balairung raksasa berbentuk joglo tanpa tiang tengah yang dibangun menggunakan kayu jati utuh dari hutan Kedu. Pura Mangkunegaran memadukan konsep arsitektur Jawa Klasik dengan gaya Art Nouveau Eropa, terlihat dari lampu gantung kristal dan pilar besi impor dari Eropa. Di dalam istana terdapat museum yang menyimpan koleksi perhiasan emas raja, senjata tradisional, gamelan pusaka Kyai Kanyut Mesem, serta koleksi naskah kuno berharga di perpustakaan reksa pustaka.",
    location: "Kota Surakarta, Jawa Tengah",
    period: "Tahun 1757",
    image: "/img/cultures/pura-mangkunegaran.jpg",
    tags: ["Istana", "Mangkunegaran", "Pendopo", "Pura", "Sejarah"],
  },
  {
    id: "jateng-benteng-vastenburg",
    provinceId: "jawa-tengah",
    category: "Bangunan Bersejarah",
    title: "Benteng Vastenburg",
    coordinates: [-7.568, 110.835],
    isLandmark: true,
    description:
      "Benteng Vastenburg merupakan benteng pertahanan kolonial Belanda yang dibangun dekat Keraton Surakarta untuk mengawasi aktivitas kerajaan, kini dilestarikan sebagai landmark sejarah dan pusat kegiatan seni.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Benteng Vastenburg merupakan salah satu bangunan bersejarah paling ikonik di Kota Solo. Benteng ini dibangun oleh pemerintah kolonial Belanda pada pertengahan abad ke-18, tidak lama setelah berdirinya Keraton Surakarta. Pembangunan benteng bertujuan untuk mengawasi aktivitas Keraton Surakarta sekaligus memperkuat pengaruh Belanda di wilayah tersebut. Letaknya yang berada tidak jauh dari keraton menunjukkan adanya kepentingan politik kolonial untuk mengontrol pemerintahan kerajaan. Di tengah masyarakat Solo, Benteng Vastenburg tidak hanya dikenal sebagai bangunan sejarah, tetapi juga menyimpan berbagai kisah misteri dan sejarah perjuangan. Kini Benteng Vastenburg telah menjadi salah satu landmark sejarah Kota Solo dan sering digunakan untuk berbagai kegiatan budaya, festival seni, serta pertunjukan masyarakat.",
    location: "Surakarta, Jawa Tengah",
    period: "Pertengahan abad ke-18",
    image: "/img/cultures/benteng-vastenburg.jpg",
    tags: ["Benteng", "Kolonial Belanda", "Sejarah", "Landmark"],
  },
  {
    id: "jateng-pasar-gede",
    provinceId: "jawa-tengah",
    category: "Bangunan Bersejarah",
    title: "Pasar Gede Harjonagoro",
    coordinates: [-7.567, 110.830],
    isLandmark: true,
    description:
      "Pasar Gede Harjonagoro merupakan pasar tradisional tertua di Kota Solo yang dirancang oleh arsitek Belanda Thomas Karsten pada tahun 1927. Bangunan bersejarah ini memadukan arsitektur kolonial dengan fungsionalitas lokal Jawa.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Pasar Gede Harjonagoro didirikan pada tahun 1927 atas prakarsa Susuhunan Pakubuwono X bersama pemerintah kolonial Belanda, dengan menunjuk Thomas Karsten sebagai arsitek perancangnya. Pasar ini memiliki keunikan berupa perpaduan harmonis antara arsitektur bergaya Eropa (seperti bentuk atap besar dan sirkulasi udara yang baik) dengan kearifan lokal Jawa (seperti struktur tiang kayu pendopo). Dinamai 'Harjonagoro' dari nama seorang tokoh keturunan Tionghoa yang diangkat menjadi abdi dalem keraton, pasar ini mencerminkan kerukunan multikultural dan menjadi denyut nadi perekonomian serta saksi sejarah interaksi sosial budaya masyarakat Solo lintas etnis selama hampir satu abad.",
    location: "Kota Surakarta, Jawa Tengah",
    period: "Tahun 1927",
    image: "/img/cultures/pasar-gede.jpg",
    tags: ["Pasar Gede", "Thomas Karsten", "Pasar Tradisional", "Kolonial", "Solo"],
  },

  // ─── KALIMANTAN BARAT ──────────────────────────────────────────────────────
  // tarian
  {
  id: "kalbar-tari-monong",
  provinceId: "kalimantan-barat",
  category: "Tarian",
  title: "Tari Monong",
  coordinates: [0.4, 109.9],
  isLandmark: true,
  description:
    "Tari Monong merupakan tarian tradisional masyarakat Dayak yang berasal dari Kalimantan Barat. Tarian ini dikenal sebagai bagian dari ritual pengobatan tradisional yang dilakukan oleh seorang Balian atau pemimpin adat untuk membantu proses penyembuhan seseorang yang sedang sakit. Tari Monong lahir dari kepercayaan masyarakat Dayak yang meyakini bahwa kesehatan tidak hanya berkaitan dengan kondisi fisik, tetapi juga keseimbangan antara manusia, alam, dan kekuatan spiritual. Oleh karena itu, tarian ini menjadi wujud doa, harapan, dan kepedulian masyarakat terhadap sesama. Pada masa kini, Tari Monong tidak hanya ditampilkan dalam ritual adat, tetapi juga dipentaskan dalam berbagai festival budaya dan pertunjukan seni sebagai bentuk pelestarian warisan budaya Dayak. Keunikan tarian ini terletak pada gerakannya yang khas, suasana sakral yang menyertainya, serta makna mendalam yang menggambarkan hubungan harmonis antara manusia dan alam.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Tarian - Tari Monong.mp3",
  narrator:
    "Tari Monong merupakan salah satu tarian ritual yang sangat sakral bagi masyarakat Dayak di Kalimantan Barat. Tarian ini dimainkan ketika ada anggota suku yang jatuh sakit keras. Seorang Balian atau pemimpin adat akan memimpin ritual penyembuhan ini dengan melafalkan mantra-mantra kuno, diiringi oleh kepulan asap kemenyan dan ketukan alat musik tradisional yang mistis. Para penari bergerak dengan penuh penghayatan, menirukan gerakan menangkal roh-roh jahat yang dipercaya mengganggu kesehatan si sakit. Bagi masyarakat Dayak, penyakit tidak hanya menyerang fisik, melainkan menandakan adanya ketidakseimbangan spiritual dengan alam semesta. Melalui gerakan magis Tari Monong, sang Balian memohon kesembuhan kepada Sang Pencipta dan kekuatan leluhur agar keseimbangan hidup kembali pulih seperti sediakala.",
  location: "Kabupaten Landak, Kalimantan Barat",
  period: "Tradisi Dayak Kanayatn, diwariskan turun-temurun",
  image: "/img/cultures/tari-monong.jpg",
  tags: ["Ritual", "Dayak", "Penyembuhan"]
},
{
  id: "kalbar-tari-pingan",
  provinceId: "kalimantan-barat",
  category: "Tarian",
  title: "Tari Pingan",
  coordinates: [0.8, 111.7],
  isLandmark: true,
  description:
    "Tari Pingan merupakan salah satu tarian tradisional suku Dayak yang berasal dari Kalimantan Barat. Tarian ini biasanya dibawakan oleh perempuan dengan membawa piring atau properti tertentu sebagai bagian dari pertunjukan. Tari Pingan menggambarkan rasa syukur masyarakat Dayak atas kehidupan, hasil panen, dan keberkahan yang mereka terima. Gerakan-gerakannya yang lembut dan teratur mencerminkan keseimbangan, ketelitian, serta keharmonisan yang dijunjung tinggi dalam kehidupan sehari-hari. Tarian ini sering ditampilkan dalam acara adat, penyambutan tamu, perayaan budaya, dan festival daerah. Keunikan Tari Pingan terletak pada kemampuan penari menjaga keseimbangan saat menggunakan properti yang dibawa, dipadukan dengan gerakan yang anggun dan iringan musik tradisional yang khas.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Tari Pingan merupakan tarian tradisional yang lahir sebagai ungkapan rasa syukur masyarakat Dayak di Kalimantan Barat atas berlimpahnya hasil panen dan keselamatan hidup yang mereka terima. Nama tarian ini diambil dari kata 'pingan' yang berarti piring dalam bahasa lokal. Dalam pertunjukannya, para penari perempuan yang anggun menari dengan lincah sambil membawa dua buah piring di telapak tangan mereka. Keunikan utama tari ini adalah kemampuan para penari untuk mengayunkan piring-piring tersebut dengan kecepatan tinggi tanpa terjatuh, sambil terkadang melakukan gerakan atraktif mengetukkan cincin ke piring sehingga menghasilkan bunyi yang ritmis dan merdu. Gerakan gemulai berpadu dengan ketangkasan ini melambangkan keanggunan, kerja keras, dan keharmonisan hidup masyarakat Dayak yang senantiasa bersyukur atas rahmat dari alam semesta.",
  location: "Kalimantan Barat",
  period: "Tradisi masyarakat Dayak",
  image: "/img/cultures/tari-pingan.jpg",
  tags: ["Syukur", "Dayak", "Tradisional"]
},
{
  id: "kalbar-tari-jonggan",
  provinceId: "kalimantan-barat",
  category: "Tarian",
  title: "Tari Jonggan",
  coordinates: [0.3, 109.8],
  isLandmark: true,
  description:
    "Tari Jonggan merupakan tarian tradisional masyarakat Dayak Kanayatn yang berasal dari Kalimantan Barat. Tarian ini dikenal sebagai salah satu bentuk hiburan rakyat yang telah diwariskan secara turun-temurun dan masih sering ditampilkan hingga saat ini. Tari Jonggan lahir dari kebiasaan masyarakat yang gemar berkumpul setelah menyelesaikan kegiatan adat, panen, maupun pekerjaan sehari-hari. Melalui tarian ini, masyarakat mempererat hubungan persaudaraan dan menciptakan suasana yang penuh kegembiraan. Tarian ini biasanya diiringi oleh musik tradisional dan melibatkan interaksi antara penari dengan masyarakat yang hadir. Keunikan Tari Jonggan terletak pada suasana yang akrab dan meriah, karena penonton sering kali diajak untuk ikut menari bersama sehingga menciptakan pengalaman yang menyenangkan dan penuh kebersamaan.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Tarian - Tari Jonggan.mp3",
  narrator:
    "Tari Jonggan merupakan tarian pergaulan tradisional masyarakat Dayak Kanayatn di Kalimantan Barat yang sarat akan nilai kegembiraan dan kebersamaan. Biasanya, tarian ini dipentaskan setelah musim panen padi selesai atau saat menyambut tamu kehormatan sebagai sarana hiburan rakyat. Jonggan sendiri memiliki arti kebersamaan yang mendatangkan kebahagiaan. Pertunjukan diawali dengan penari perempuan yang bergerak gemulai mengundang para penonton, terutama kaum laki-laki, untuk ikut masuk ke tengah kalangan dan menari bersama. Suasana akrab segera tercipta seiring alunan musik tradisional yang riang dan dinamis. Tari Jonggan menjadi simbol kuatnya tali persaudaraan antarwarga, di mana segala sekat sosial melebur dalam senyuman, tawa, dan gerak tari bersama yang penuh rasa syukur.",
  location: "Kabupaten Landak dan sekitarnya, Kalimantan Barat",
  period: "Tradisi masyarakat Dayak Kanayatn",
  image: "/img/cultures/tari-jonggan.jpg",
  tags: ["Hiburan", "Persaudaraan", "Dayak"]
},
{
  id: "kalbar-tari-zapin-tembung",
  provinceId: "kalimantan-barat",
  category: "Tarian",
  title: "Tari Zapin Tembung",
  coordinates: [-0.03, 109.34],
  isLandmark: true,
  description:
    "Tari Zapin Tembung merupakan tarian tradisional masyarakat Melayu yang berkembang di Kalimantan Barat. Tarian ini mendapat pengaruh budaya Melayu dan Islam yang telah lama menjadi bagian dari kehidupan masyarakat setempat. Tari Zapin Tembung tidak hanya berfungsi sebagai hiburan, tetapi juga menjadi sarana untuk menyampaikan nilai-nilai kesopanan, keharmonisan, dan kebersamaan. Gerakan yang teratur dan selaras dengan irama musik menggambarkan pentingnya menjaga keseimbangan dalam kehidupan serta menjalin hubungan yang baik dengan sesama. Tarian ini sering ditampilkan dalam acara adat, perayaan budaya, penyambutan tamu, dan berbagai kegiatan masyarakat. Keunikan Tari Zapin Tembung terletak pada gerakan kaki yang cepat dan ritmis, dipadukan dengan iringan musik Melayu yang khas sehingga menghasilkan pertunjukan yang dinamis namun tetap elegan.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Tari Zapin Tembung merupakan salah satu seni tari klasik masyarakat Melayu di Kalimantan Barat yang menunjukkan kuatnya pengaruh akulturasi budaya Islam. Tarian ini dibawakan secara berpasangan dengan gerakan kaki yang sangat lincah, dinamis, dan ritmis, mengikuti ketukan rebana dan petikan gambus yang riang. Ciri khas tarian ini terletak pada penggunaan sebilah kayu pendek yang disebut 'tembung' sebagai properti tari, yang saling diketukkan oleh para penari untuk menciptakan bunyi ritmis tambahan. Setiap gerakan dalam Zapin Tembung tidak hanya mengutamakan keindahan visual, tetapi juga sarat akan pesan moral tentang kesopanan, menjaga kehormatan, dan kebersamaan dalam pergaulan sehari-hari. Tarian ini terus dilestarikan dalam berbagai upacara pernikahan dan festival budaya sebagai warisan kebanggaan kaum Melayu.",
  location: "Pontianak dan wilayah Melayu Kalimantan Barat",
  period: "Tradisi masyarakat Melayu Kalimantan Barat",
  image: "/img/cultures/tari-zapin-tembung.jpg",
  tags: ["Melayu", "Islam", "Tradisional"]
},


  // Alat musik
  {
  id: "kalbar-sape",
  provinceId: "kalimantan-barat",
  category: "Musik",
  title: "Sape",
  coordinates: [0.0, 111.0],
  isLandmark: true,
  description:
    "Sape atau Sampek merupakan alat musik petik tradisional masyarakat Dayak di Kalimantan Barat. Alat musik ini dibuat dari sebatang kayu yang dipahat hingga membentuk badan dan leher alat musik, kemudian dipasangi beberapa senar. Bagi masyarakat Dayak, Sape tidak hanya berfungsi sebagai hiburan, tetapi juga menjadi sarana untuk mengekspresikan perasaan, menceritakan kehidupan, serta mengiringi berbagai kegiatan adat. Alunan nadanya yang lembut sering dikaitkan dengan kedamaian, keharmonisan, dan kedekatan manusia dengan alam. Sape dimainkan dalam upacara adat, penyambutan tamu, pertunjukan budaya, maupun sebagai hiburan sehari-hari. Keunikan alat musik ini terletak pada ukiran khas Dayak yang menghiasi tubuhnya serta suaranya yang menenangkan.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/alat-musik-sape.mp3",
  narrator:
    "Sape atau Sampek adalah alat musik petik tradisional legendaris yang menjadi identitas spiritual masyarakat Dayak di Kalimantan Barat. Dibuat dari sebatang kayu pilihan yang dipahat dengan teliti membentuk tubuh ramping menyerupai perahu, Sape dihiasi dengan ukiran khas Dayak yang sangat artistik. Ketika senar Sape dipetik, ia menghasilkan alunan nada yang sangat lembut, meditatif, dan menenangkan jiwa, menyerupai suara gemercik air dan desau angin di tengah hutan belantara Borneo. Dahulu, Sape dimainkan sebagai sarana komunikasi dengan leluhur dan pengiring ritual penyembuhan. Kini, alunan Sape tetap berkumandang indah mengiringi tarian adat, penyambutan tamu, maupun sebagai sarana mengekspresikan kedamaian serta keharmonisan hidup berdampingan dengan alam.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, ratusan tahun silam",
  image: "/img/cultures/sape.jpg",
  tags: ["Alat Petik", "Dayak", "Meditatif"],
},

{
  id: "kalbar-tuma",
  provinceId: "kalimantan-barat",
  category: "Musik",
  title: "Tuma'",
  coordinates: [0.2, 110.5],
  isLandmark: false,
  description:
    "Tuma' merupakan alat musik tradisional masyarakat Dayak yang dimainkan dengan cara dipukul. Alat musik ini umumnya dibuat dari kayu dan digunakan sebagai pengiring dalam berbagai kegiatan adat maupun pertunjukan seni tradisional. Dalam budaya Dayak, Tuma' memiliki peran penting sebagai pengatur irama sekaligus penanda dalam berbagai kegiatan masyarakat. Bunyi yang dihasilkan membantu menciptakan suasana yang hidup dan penuh semangat ketika dimainkan bersama alat musik tradisional lainnya. Tuma' sering digunakan dalam upacara adat, tarian tradisional, dan festival budaya. Keunikan alat musik ini terletak pada fungsinya sebagai penjaga ritme yang membuat pertunjukan menjadi lebih harmonis dan teratur.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Tuma' merupakan alat musik membranofon tradisional sejenis gendang panjang yang dimainkan dengan cara ditabuh oleh masyarakat Dayak di Kalimantan Barat. Alat musik ini terbuat dari batang kayu bulat yang dilubangi bagian tengahnya, dengan satu ujung ditutup oleh kulit binatang seperti kulit lembu atau kambing yang dikencangkan menggunakan jalinan rotan. Suara Tuma' yang berat dan berdentum kuat berfungsi sebagai pengatur tempo dan penjaga ritme dalam ansambel musik tradisional Dayak. Ketika dimainkan bersama alat musik lain seperti kolintang dan gong, ketukan Tuma' memberikan nyawa pada pertunjukan adat, membakar semangat para penari, serta menyatukan seluruh masyarakat dalam satu detak kebersamaan yang harmonis saat upacara adat berlangsung.",
  location: "Kalimantan Barat",
  period: "Tradisi masyarakat Dayak",
  image: "/img/cultures/tuma.jpg",
  tags: ["Alat Pukul", "Dayak", "Irama"],
},

{
  id: "kalbar-gong",
  provinceId: "kalimantan-barat",
  category: "Musik",
  title: "Gong",
  coordinates: [0.3, 109.8],
  isLandmark: true,
  description:
    "Gong merupakan alat musik pukul tradisional yang banyak digunakan oleh masyarakat Dayak dan Melayu di Kalimantan Barat. Alat musik ini terbuat dari logam berbentuk bundar dengan tonjolan di bagian tengah yang menghasilkan suara nyaring dan bergema ketika dipukul. Dalam kehidupan masyarakat, gong tidak hanya berfungsi sebagai alat musik, tetapi juga menjadi sarana komunikasi untuk menandai dimulainya upacara adat, mengumpulkan masyarakat, atau mengiringi berbagai pertunjukan seni. Gong biasanya dimainkan bersama alat musik tradisional lainnya dalam berbagai acara adat dan festival budaya. Keunikan gong terletak pada suaranya yang kuat dan bergema sehingga mampu menciptakan suasana yang khidmat maupun meriah.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/alat-musik-gong-dayak.mp3",
  narrator:
    "Gong memegang peranan yang teramat penting dalam kehidupan sosial dan spiritual masyarakat adat di Kalimantan Barat, baik suku Dayak maupun Melayu. Terbuat dari tembaga atau kuningan berbentuk bundar dengan pencu di bagian tengahnya, Gong menghasilkan suara yang nyaring, dalam, dan bergema jauh ketika dipukul dengan pemukul kayu berlapis kain. Lebih dari sekadar alat musik, Gong di masa lalu berfungsi sebagai alat komunikasi massa untuk memanggil warga berkumpul, menandai keadaan darurat, serta menjadi lambang status sosial sebuah keluarga. Dalam ritual adat dan festival budaya saat ini, dentuman Gong yang megah senantiasa menjadi penanda agung dimulainya prosesi sakral, menyebarkan getaran kedamaian dan kebersamaan ke seluruh penjuru kampung.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak dan Melayu",
  image: "/img/cultures/gong.jpg",
  tags: ["Alat Pukul", "Upacara", "Tradisional"],
},

{
  id: "kalbar-kangkuang",
  provinceId: "kalimantan-barat",
  category: "Musik",
  title: "Kangkuang",
  coordinates: [0.1, 110.7],
  isLandmark: false,
  description:
    "Kangkuang merupakan alat musik tradisional Kalimantan Barat yang terbuat dari bambu dan dimainkan dengan cara dipukul. Alat musik ini menghasilkan bunyi ritmis yang khas dan sering digunakan sebagai pengiring dalam berbagai pertunjukan seni tradisional. Penggunaan bambu sebagai bahan utama menunjukkan bagaimana masyarakat memanfaatkan sumber daya alam di sekitar mereka untuk menciptakan karya budaya yang bernilai. Kangkuang biasanya dimainkan dalam acara adat, pertunjukan seni, dan festival budaya daerah. Keunikan alat musik ini terletak pada suara khas yang dihasilkan dari bambu serta bentuknya yang sederhana namun mampu menghasilkan irama yang menarik ketika dimainkan secara bersama-sama.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Kangkuang adalah alat musik perkusi tradisional yang sangat unik dari Kalimantan Barat, terbuat dari bilah-bilah bambu pilihan yang dipasang pada wadah resonator kayu sederhana. Alat musik ini dimainkan dengan cara dipukul menggunakan sepasang kayu pemukul khusus untuk menghasilkan bunyi ritmis yang khas dan berkarakter alami. Pemanfaatan bambu sebagai bahan utama Kangkuang mencerminkan kearifan lokal masyarakat dalam memanfaatkan kekayaan alam di sekitarnya tanpa merusak lingkungan. Biasanya dimainkan dalam suasana santai setelah bekerja di ladang atau sebagai pengiring tarian rakyat, ketukan ritmis Kangkuang yang ceria menghadirkan rasa tenang sekaligus kegembiraan komunal yang menyatukan hati warga desa.",
  location: "Kalimantan Barat",
  period: "Tradisi masyarakat Kalimantan Barat",
  image: "/img/cultures/kangkuang.jpg",
  tags: ["Bambu", "Alat Pukul", "Tradisional"],
},

  // senjata tradisional
 {
  id: "kalbar-sumpit",
  provinceId: "kalimantan-barat",
  category: "Senjata",
  title: "Sumpit Dayak",
  coordinates: [0.2, 111.3],
  isLandmark: true,
  description:
    "Sumpit merupakan senjata tradisional masyarakat Dayak yang digunakan untuk berburu di hutan. Senjata ini berupa tabung panjang yang terbuat dari kayu pilihan dan digunakan untuk melontarkan anak sumpit dengan cara ditiup. Bagi masyarakat Dayak, sumpit mencerminkan kecerdikan, ketelitian, serta kemampuan bertahan hidup yang diwariskan secara turun-temurun. Pada masa lalu, sumpit banyak digunakan untuk berburu karena dapat digunakan tanpa menimbulkan suara keras. Saat ini, sumpit lebih sering ditampilkan dalam festival budaya dan berbagai kegiatan pelestarian tradisi. Keunikan sumpit terletak pada cara penggunaannya yang membutuhkan konsentrasi tinggi, ketepatan sasaran, dan penguasaan teknik pernapasan.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/senjata-sumpit.mp3",
  narrator:
    "Sumpit merupakan senjata tradisional legendaris yang mencerminkan kecerdasan dan ketangkasan berburu masyarakat Dayak di Kalimantan Barat. Terbuat dari kayu ulin atau kayu keras pilihan yang dibor secara manual membentuk pipa panjang yang lurus sempurna, sumpit bekerja menggunakan kekuatan hembusan napas untuk melesatkan anak sumpit yang tajam yang disebut damek. Keunggulan sumpit terletak pada akurasinya yang tinggi dan kemampuannya melumpuhkan sasaran secara senyap di tengah rimbunnya hutan belantara Borneo. Dahulu digunakan untuk berburu hewan liar dan pertahanan diri dalam perang, kini sumpit telah bertransisi menjadi olahraga tradisional dan bagian dari atraksi seni budaya yang melambangkan konsentrasi, kesabaran, dan ketepatan jiwa.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, ratusan tahun silam",
  image: "/img/cultures/sumpit.jpg",
  tags: ["Berburu", "Dayak", "Ketelitian"],
},

{
  id: "kalbar-mandau",
  provinceId: "kalimantan-barat",
  category: "Senjata",
  title: "Mandau",
  coordinates: [0.1, 111.1],
  isLandmark: true,
  description:
    "Mandau merupakan senjata tradisional yang sangat identik dengan masyarakat Dayak di Kalimantan Barat. Senjata ini berbentuk seperti parang dengan bilah tajam yang dibuat secara teliti dan dihiasi dengan ukiran khas Dayak pada gagang maupun sarungnya. Bagi masyarakat Dayak, Mandau bukan hanya alat untuk berburu atau melindungi diri, tetapi juga simbol keberanian, kehormatan, dan tanggung jawab. Mandau sering diwariskan dari generasi ke generasi sebagai pusaka keluarga. Selain digunakan dalam kehidupan sehari-hari pada masa lampau, Mandau juga menjadi bagian penting dalam berbagai upacara adat dan pertunjukan budaya. Keunikan Mandau terletak pada ukiran artistik dan nilai filosofis yang melekat pada setiap bagiannya.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/senjata-mandau.mp3",
  narrator:
    "Mandau adalah senjata tajam tradisional yang menjadi simbol kehormatan, keberanian, dan identitas sakral laki-laki Dayak di Kalimantan Barat. Berbeda dengan parang biasa, bilah Mandau ditempa dengan teknik khusus dari baja berkualitas tinggi dan sering dihiasi ukiran bermotif rumit serta tatahan logam mulia. Gagang Mandau biasanya diukir indah menyerupai kepala burung enggang dari bahan tanduk rusa atau kayu keras, lengkap dengan hiasan rambut manusia atau bulu burung. Bagi masyarakat Dayak, Mandau bukan sekadar alat pelindung diri, melainkan pusaka suci yang diyakini memiliki kekuatan spiritual pelindung keluarga dan selalu diwariskan turun-temurun dengan penuh penghormatan.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, sejak masa lampau",
  image: "/img/cultures/mandau.jpg",
  tags: ["Pusaka", "Dayak", "Keberanian"],
},

{
  id: "kalbar-tombak",
  provinceId: "kalimantan-barat",
  category: "Senjata",
  title: "Tombak Dayak",
  coordinates: [0.3, 110.8],
  isLandmark: true,
  description:
    "Tombak merupakan salah satu senjata tradisional yang telah lama digunakan oleh masyarakat Dayak di Kalimantan Barat. Senjata ini terdiri dari gagang panjang berbahan kayu dengan ujung tajam yang digunakan untuk berburu maupun melindungi diri. Dalam kehidupan masyarakat Dayak, tombak melambangkan keberanian, ketangguhan, dan kesiapan menghadapi berbagai tantangan. Pada masa lalu, tombak menjadi alat penting bagi masyarakat yang hidup berdampingan dengan hutan. Kini, tombak lebih sering dijumpai dalam pertunjukan budaya, upacara adat, dan festival daerah sebagai simbol semangat masyarakat Dayak. Keunikan tombak terletak pada desainnya yang sederhana namun efektif serta tetap bertahan sebagai warisan budaya hingga saat ini.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Tombak Dayak merupakan salah satu senjata berburu dan pertahanan diri tradisional yang memiliki nilai sejarah mendalam di Kalimantan Barat. Senjata ini terdiri dari mata pisau baja yang sangat tajam dan runcing yang dipasang kokoh pada ujung gagang kayu panjang yang kuat namun ringan. Selain digunakan untuk berburu hewan besar di hutan belantara, tombak di masa lalu merupakan senjata utama prajurit Dayak saat mempertahankan desa mereka dari serangan musuh. Struktur gagangnya yang panjang memungkinkan serangan jarak menengah yang efektif. Dalam upacara adat hari ini, tombak sering dipamerkan oleh para tetua adat dalam tarian perang seremonial sebagai simbol kewaspadaan, kekuatan, dan kesiapan menjaga keutuhan tanah leluhur.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, sejak masa lampau",
  image: "/img/cultures/tombak-dayak.jpg",
  tags: ["Berburu", "Tradisional", "Ketangguhan"],
},

{
  id: "kalbar-talawang",
  provinceId: "kalimantan-barat",
  category: "Senjata",
  title: "Talawang",
  coordinates: [0.0, 110.9],
  isLandmark: true,
  description:
    "Talawang merupakan perisai tradisional masyarakat Dayak yang digunakan sebagai alat pertahanan diri. Perisai ini umumnya terbuat dari kayu keras dan dihiasi dengan ukiran khas Dayak yang sarat makna budaya. Talawang tidak hanya berfungsi sebagai pelindung, tetapi juga melambangkan keberanian, perlindungan, dan kekuatan masyarakat Dayak. Motif-motif yang menghiasi Talawang sering menggambarkan harapan akan keselamatan serta keseimbangan dalam kehidupan. Pada masa lalu, Talawang digunakan bersama Mandau dan Tombak dalam berbagai aktivitas. Saat ini, Talawang lebih banyak dijumpai dalam upacara adat, pertunjukan seni, dan pameran budaya. Keunikan Talawang terletak pada perpaduan fungsi pertahanan dan nilai seni yang menjadikannya salah satu simbol budaya Dayak.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Talawang adalah perisai tradisional pelindung diri yang sangat ikonik dari Kalimantan Barat, digunakan bersama Mandau oleh prajurit Dayak dalam pertempuran. Terbuat dari kayu liat yang ringan namun sangat kuat, seperti kayu pelai, Talawang diukir menyerupai bentuk prisma segi enam memanjang. Bagian depan Talawang dihiasi dengan lukisan bermotif ukiran Dayak yang khas, biasanya menggambarkan wajah kamang atau roh pelindung yang berpenampilan menyeramkan untuk menggentarkan nyali musuh. Lukisan ini menggunakan pewarna alami dari getah pohon dan tanah liat. Selain berfungsi sebagai tameng pertahanan yang tangguh, Talawang kini menjadi bagian penting dalam pertunjukan tari perang dan dekorasi rumah adat yang melambangkan perlindungan dan keselamatan.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, sejak masa lampau",
  image: "/img/cultures/talawang.jpg",
  tags: ["Perisai", "Dayak", "Perlindungan"],
},


// Upacara Adat
  {
  id: "kalbar-naik-dango",
  provinceId: "kalimantan-barat",
  category: "Upacara Adat",
  title: "Naik Dango",
  coordinates: [0.3, 109.8],
  isLandmark: true,
  description:
    "Naik Dango merupakan upacara adat masyarakat Dayak Kanayatn di Kalimantan Barat yang dilaksanakan sebagai bentuk rasa syukur atas hasil panen yang diperoleh. Tradisi ini telah diwariskan secara turun-temurun dan menjadi salah satu perayaan adat terpenting bagi masyarakat Dayak. Bagi masyarakat Dayak, hasil panen bukan hanya hasil kerja keras manusia, tetapi juga anugerah yang harus disyukuri. Oleh karena itu, Naik Dango menjadi momen untuk mengungkapkan rasa terima kasih sekaligus mempererat hubungan antara masyarakat, alam, dan Sang Pencipta. Perayaan ini biasanya diisi dengan tarian tradisional, musik daerah, permainan rakyat, dan doa bersama. Keunikan Naik Dango terletak pada suasananya yang meriah serta kemampuannya menjaga nilai-nilai budaya Dayak agar tetap hidup di tengah perkembangan zaman.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Upacara Adat - Naik Dango.mp3",
  narrator:
    "Naik Dango merupakan salah satu upacara adat terbesar dan paling penting bagi masyarakat Dayak Kanayatn di Kalimantan Barat. Ritual tahunan ini diselenggarakan sebagai perwujudan rasa syukur yang mendalam kepada Jubata atau Sang Pencipta atas keberhasilan panen padi yang melimpah. Upacara ini ditandai dengan prosesi menyimpan padi hasil panen pertama ke dalam dango, yaitu lumbung padi tradisional. Seluruh warga kampung berkumpul mengenakan pakaian adat terbaik mereka, mengadakan doa bersama memohon keberkahan untuk musim tanam berikutnya, serta menyajikan berbagai makanan tradisional. Suasana perayaan diperiah dengan pertunjukan seni tari, permainan musik tradisional, dan lomba olahraga rakyat yang memupuk rasa kekeluargaan dan persatuan.",
  location: "Kabupaten Landak dan wilayah Dayak Kanayatn, Kalimantan Barat",
  period: "Tradisi Dayak Kanayatn, turun-temurun",
  image: "/img/cultures/naik-dango.jpg",
  tags: ["Panen", "Syukur", "Dayak"],
},

{
  id: "kalbar-robo-robo",
  provinceId: "kalimantan-barat",
  category: "Upacara Adat",
  title: "Robo-Robo",
  coordinates: [0.4, 108.9],
  isLandmark: true,
  description:
    "Robo-Robo merupakan tradisi adat masyarakat Melayu di Kalimantan Barat, khususnya di wilayah Mempawah. Upacara ini dilaksanakan untuk mengenang kedatangan tokoh penting dalam sejarah Kerajaan Mempawah sekaligus sebagai ungkapan rasa syukur kepada Tuhan atas keselamatan dan keberkahan yang diberikan. Tradisi Robo-Robo menunjukkan kuatnya nilai kebersamaan dan penghormatan terhadap sejarah yang dimiliki masyarakat setempat. Pelaksanaannya biasanya ditandai dengan doa bersama, makan bersama, dan berbagai kegiatan budaya yang melibatkan masyarakat. Keunikan Robo-Robo terletak pada perpaduan antara unsur sejarah, budaya Melayu, dan nilai keagamaan yang masih terjaga hingga saat ini.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Upacara Adat - Robo-Robo.mp3",
  narrator:
    "Robo-Robo merupakan upacara adat tahunan yang sarat nilai sejarah dan budaya bagi masyarakat Melayu di Mempawah, Kalimantan Barat. Diselenggarakan pada hari Rabu terakhir bulan Safar, tradisi ini berawal dari napak tilas kedatangan Opu Daeng Manambon, pendiri Kerajaan Mempawah, pada abad ke-18. Ritual dimulai dengan pembacaan doa tolak bala bersama di dermaga pelabuhan, diikuti dengan makan bersama secara lesehan di sepanjang jalan dan bantaran sungai yang dikenal dengan istilah saprahan. Melalui Robo-Robo, masyarakat mempererat silaturahmi, memohon keselamatan agar terhindar dari bencana, serta melestarikan keagungan sejarah dan kebudayaan Melayu yang telah mengakar kuat selama ratusan tahun.",
  location: "Mempawah, Kalimantan Barat",
  period: "Tradisi masyarakat Melayu Mempawah",
  image: "/img/cultures/robo-robo.jpg",
  tags: ["Melayu", "Sejarah", "Syukur"],
},

{
  id: "kalbar-gawai",
  provinceId: "kalimantan-barat",
  category: "Upacara Adat",
  title: "Gawai Dayak",
  coordinates: [0.1, 110.2],
  isLandmark: true,
  description:
    "Gawai Dayak merupakan perayaan adat masyarakat Dayak sebagai ungkapan rasa syukur atas hasil panen dan keberlangsungan kehidupan yang telah diberikan sepanjang tahun. Perayaan ini menjadi salah satu tradisi budaya terbesar yang dimiliki masyarakat Dayak di Kalimantan Barat. Melalui Gawai Dayak, masyarakat memperkuat rasa persaudaraan, menghargai hasil kerja bersama, serta menjaga hubungan harmonis dengan alam yang menjadi sumber kehidupan mereka. Dalam pelaksanaannya, Gawai Dayak diisi dengan berbagai pertunjukan seni, tarian tradisional, musik daerah, pameran budaya, dan kegiatan adat lainnya. Keunikan perayaan ini terletak pada kemeriahan acaranya yang melibatkan banyak komunitas Dayak dari berbagai daerah sehingga menjadi simbol persatuan dan kebanggaan budaya.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Gawai Dayak adalah festival budaya akbar tahunan yang menjadi pesta rakyat bagi seluruh sub-suku Dayak di Kalimantan Barat sebagai bentuk syukur atas berlalunya musim panen padi. Perayaan yang berpusat di Rumah Panjang ini menjadi ajang berkumpulnya ribuan warga untuk bersukacita dan bersilaturahmi. Suasana festival dipenuhi dengan dentuman gong yang megah, tarian sambutan, dan sajian tuak tradisional. Berbagai perlombaan seni budaya digelar, seperti melukis perisai, menyumpit, memperagakan busana adat, hingga pemilihan bujang dan dara Dayak. Gawai Dayak menjadi cermin kebersamaan yang kokoh serta penegasan komitmen masyarakat Dayak untuk senantiasa melestarikan adat istiadat leluhur di tengah arus modernisasi.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi tahunan masyarakat Dayak",
  image: "/img/cultures/gawai.jpg",
  tags: ["Festival", "Panen", "Komunal"],
},

{
  id: "kalbar-tolak-bala",
  provinceId: "kalimantan-barat",
  category: "Upacara Adat",
  title: "Tolak Bala",
  coordinates: [0.0, 109.5],
  isLandmark: false,
  description:
    "Tolak Bala merupakan upacara adat yang dilakukan oleh masyarakat Kalimantan Barat untuk memohon keselamatan dan perlindungan dari berbagai hal yang dianggap dapat membawa kesulitan atau bencana. Tradisi ini masih dilestarikan oleh beberapa komunitas adat sebagai warisan budaya leluhur. Upacara ini mencerminkan harapan masyarakat akan kehidupan yang aman, damai, dan sejahtera. Selain sebagai bentuk doa bersama, Tolak Bala juga menjadi sarana mempererat hubungan sosial karena melibatkan banyak anggota masyarakat. Pelaksanaannya biasanya dipimpin oleh tokoh adat dan disertai berbagai simbol serta perlengkapan tradisional. Keunikan upacara ini terletak pada nilai kebersamaan yang kuat, di mana seluruh masyarakat berkumpul untuk memohon keselamatan dan kebaikan bagi lingkungan mereka.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Upacara Tolak Bala merupakan ritual keagamaan tradisional yang dilaksanakan oleh masyarakat adat di Kalimantan Barat untuk memohon perlindungan dari mara bahaya, wabah penyakit, dan bencana alam. Dipimpin oleh tetua adat atau pemuka agama, ritual ini melibatkan pembacaan doa-doa keselamatan di batas desa atau persimpangan jalan penting. Warga kampung biasanya menyiapkan sesaji berupa hasil bumi dan anyaman janur khusus sebagai simbol permohonan maaf dan damai kepada alam semesta. Selama ritual berlangsung, suasana hening dan khidmat meliputi seluruh desa. Tradisi Tolak Bala mengajarkan pentingnya menjaga keselarasan hidup, kerendahan hati manusia di hadapan Pencipta, serta kepedulian bersama untuk saling melindungi keselamatan lingkungan tempat tinggal.",
  location: "Berbagai wilayah di Kalimantan Barat",
  period: "Tradisi masyarakat adat Kalimantan Barat",
  image: "/img/cultures/tolak-bala.jpg",
  tags: ["Ritual", "Perlindungan", "Komunal"],
},

  // rumah adat
  {
  id: "kalbar-rumah-radakng",
  provinceId: "kalimantan-barat",
  category: "Rumah Adat",
  title: "Rumah Radakng",
  coordinates: [0.02, 109.34],
  isLandmark: true,
  description:
    "Rumah Radakng merupakan rumah adat masyarakat Dayak yang berasal dari Kalimantan Barat. Rumah ini dikenal sebagai salah satu rumah adat terpanjang di Indonesia karena dapat mencapai puluhan hingga ratusan meter dan dihuni oleh banyak keluarga dalam satu bangunan yang sama. Bentuk Rumah Radakng mencerminkan kehidupan masyarakat Dayak yang menjunjung tinggi kebersamaan dan gotong royong. Pada masa lalu, beberapa keluarga hidup bersama di dalam rumah panjang ini sehingga memudahkan mereka untuk saling membantu, menjaga keamanan, dan mempererat hubungan kekeluargaan. Selain berfungsi sebagai tempat tinggal, Rumah Radakng juga menjadi pusat berbagai kegiatan adat, musyawarah, dan perayaan budaya. Di dalam rumah ini, nilai-nilai budaya dan pengetahuan tradisional diwariskan dari generasi ke generasi. Keunikan Rumah Radakng terletak pada ukurannya yang sangat panjang, bentuk panggung yang melindungi penghuni dari banjir dan hewan liar, serta ukiran khas Dayak yang menghiasi bagian-bagian rumah.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Rumah Adat - Rumah Radakng.mp3",
  narrator:
    "Rumah Radakng merupakan rumah adat masyarakat Dayak yang berasal dari Kalimantan Barat. Rumah ini dikenal sebagai salah satu rumah adat terpanjang di Indonesia karena dapat mencapai puluhan hingga ratusan meter dan dihuni oleh banyak keluarga dalam satu bangunan yang sama. Bentuk Rumah Radakng mencerminkan kehidupan masyarakat Dayak yang menjunjung tinggi kebersamaan dan gotong royong. Pada masa lalu, beberapa keluarga hidup bersama di dalam rumah panjang ini sehingga memudahkan mereka untuk saling membantu, menjaga keamanan, dan mempererat hubungan kekeluargaan. Selain berfungsi sebagai tempat tinggal, Rumah Radakng juga menjadi pusat berbagai kegiatan adat, musyawarah, dan perayaan budaya. Di dalam rumah ini, nilai-nilai budaya dan pengetahuan tradisional diwariskan dari generasi ke generasi. Keunikan Rumah Radakng terletak pada ukurannya yang sangat panjang, bentuk panggung yang melindungi penghuni dari banjir dan hewan liar, serta ukiran khas Dayak yang menghiasi bagian-bagian rumah.",
  location: "Pontianak, Kalimantan Barat",
  period: "Arsitektur tradisional Dayak, ratusan tahun silam",
  image: "/img/cultures/rumah-radakng.jpg",
  tags: ["Dayak", "Komunal", "Arsitektur"],
},
{
  id: "kalbar-rumah-betang",
  provinceId: "kalimantan-barat",
  category: "Rumah Adat",
  title: "Rumah Betang",
  coordinates: [0.8, 112.9],
  isLandmark: true,
  description:
    "Rumah Betang merupakan rumah adat yang banyak ditemukan pada masyarakat Dayak di wilayah Kalimantan, termasuk Kalimantan Barat. Rumah ini dibangun dalam bentuk panggung dengan ukuran yang besar dan mampu menampung banyak keluarga dalam satu atap. Keberadaan Rumah Betang lahir dari kebutuhan masyarakat untuk hidup bersama dalam lingkungan yang aman dan harmonis. Tinggal dalam satu rumah mengajarkan pentingnya toleransi, saling menghormati, dan menjaga kebersamaan. Selain sebagai tempat tinggal, Rumah Betang juga digunakan untuk berbagai kegiatan adat, pertemuan masyarakat, dan upacara tradisional. Keunikan rumah ini terletak pada bentuk panggung yang tinggi untuk menghindari banjir serta kemampuannya menjadi simbol persatuan dalam kehidupan masyarakat Dayak.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Rumah Betang adalah rumah panjang tradisional khas suku Dayak di Kalimantan Barat yang menjadi simbol persatuan dan keharmonisan hidup komunal. Dibangun tinggi di atas tiang-tiang kayu raksasa untuk menghindari banjir tahunan dan serangan binatang liar, Rumah Betang memiliki deretan bilik keluarga yang memanjang di satu sisi dan selasar luas tanpa sekat di sisi lainnya. Di selasar inilah seluruh warga berkumpul untuk melakukan berbagai aktivitas sosial, mulai dari menganyam kerajinan, mendiskusikan hukum adat, hingga menggelar upacara besar. Tinggal bersama di Rumah Betang mengajarkan warga tentang toleransi yang tinggi, saling menghormati perbedaan, gotong royong tanpa batas, serta pentingnya menjaga keutuhan komunitas adat.",
  location: "Kapuas Hulu, Kalimantan Barat",
  period: "Arsitektur tradisional Dayak",
  image: "/img/cultures/rumah-betang.jpg",
  tags: ["Dayak", "Persatuan", "Rumah Panjang"],
},
{
  id: "kalbar-rumah-melayu",
  provinceId: "kalimantan-barat",
  category: "Rumah Adat",
  title: "Rumah Melayu Pontianak",
  coordinates: [0.03, 109.34],
  isLandmark: true,
  description:
    "Rumah Melayu Pontianak merupakan rumah adat masyarakat Melayu yang berkembang di Kalimantan Barat, khususnya di wilayah Pontianak dan sekitarnya. Rumah ini umumnya dibangun dalam bentuk rumah panggung dengan struktur yang disesuaikan dengan kondisi lingkungan yang banyak dipengaruhi oleh sungai dan lahan rawa. Rumah Melayu Pontianak mencerminkan nilai kesopanan, keteraturan, dan keterbukaan yang menjadi bagian dari budaya Melayu. Tata ruang rumah biasanya dirancang untuk memudahkan interaksi antaranggota keluarga sekaligus menyambut tamu dengan baik. Keunikan rumah ini terletak pada bentuk arsitektur yang elegan, penggunaan ornamen khas Melayu, serta kemampuannya beradaptasi dengan lingkungan sungai di Kalimantan Barat.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Rumah Melayu Pontianak merupakan representasi arsitektur tradisional masyarakat Melayu yang bermukim di tepian Sungai Kapuas, Kalimantan Barat. Rumah panggung ini dirancang dengan tiang-tiang tinggi untuk beradaptasi dengan pasang surut air sungai dan tanah rawa yang basah. Bentuk atapnya yang tinggi dan bersudut curam melambangkan kesopanan serta berfungsi mengalirkan air hujan dengan cepat. Memiliki jendela-jendela besar di sekeliling dinding kayu untuk ventilasi udara yang maksimal, Rumah Melayu memiliki pembagian ruang yang jelas, termasuk serambi depan untuk menerima tamu luar dengan ramah. Arsitektur ini mencerminkan keterbukaan, kesantunan bertutur kata, dan keanggunan budaya Melayu yang harmonis dengan alam bantaran sungai.",
  location: "Pontianak, Kalimantan Barat",
  period: "Arsitektur tradisional Melayu",
  image: "/img/cultures/rumah-melayu.jpg",
  tags: ["Melayu", "Arsitektur", "Sungai"],
},
{
  id: "kalbar-rumah-baluk",
  provinceId: "kalimantan-barat",
  category: "Rumah Adat",
  title: "Rumah Baluk",
  coordinates: [1.05, 109.62],
  isLandmark: true,
  description:
    "Rumah Baluk merupakan rumah adat masyarakat Dayak Bidayuh di Kalimantan Barat. Berbeda dengan rumah adat lainnya yang berfungsi sebagai tempat tinggal, Rumah Baluk lebih banyak digunakan sebagai tempat pelaksanaan upacara adat dan kegiatan penting masyarakat. Rumah ini dibangun sebagai pusat kegiatan bersama yang memperkuat hubungan sosial dalam komunitas. Melalui berbagai ritual dan pertemuan yang dilaksanakan di dalamnya, masyarakat menjaga tradisi, mempererat persaudaraan, dan mewariskan nilai-nilai budaya kepada generasi berikutnya. Keunikan Rumah Baluk terletak pada bentuk bangunannya yang bundar dan fungsinya sebagai pusat kehidupan adat masyarakat Dayak Bidayuh.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Rumah Adat - Rumah Baluk.mp3",
  narrator:
    "Rumah Baluk adalah rumah adat yang sangat unik dan sakral milik suku Dayak Bidayuh di Kabupaten Bengkayang, Kalimantan Barat. Berbeda dengan rumah panjang pada umumnya, Rumah Baluk berbentuk bundar menyerupai tabung dengan atap kerucut menjulang tinggi, ditopang oleh puluhan tiang kayu ulin setinggi belasan meter dari tanah. Akses masuknya menggunakan satu tangga kayu gantung tunggal. Bangunan sakral ini tidak digunakan sebagai tempat tinggal sehari-hari, melainkan sebagai tempat menyimpan tengkorak leluhur hasil ritual masa lalu, serta pusat pelaksanaan ritual adat Nyobeng untuk memohon kesuburan tanah dan keselamatan desa. Bentuk bundarnya melambangkan kesatuan tekad bulat masyarakat Bidayuh.",
  location: "Kabupaten Bengkayang, Kalimantan Barat",
  period: "Tradisi Dayak Bidayuh",
  image: "/img/cultures/rumah-baluk.jpg",
  tags: ["Dayak", "Ritual", "Warisan"],
},


//  kerajinan
  {
  id: "kalbar-tenun-dayak",
  provinceId: "kalimantan-barat",
  category: "Kerajinan",
  title: "Tenun Ikat Dayak",
  coordinates: [0.1, 111.5],
  isLandmark: true,
  description:
    "Tenun Ikat Dayak merupakan salah satu kerajinan tradisional yang diwariskan secara turun-temurun oleh masyarakat Dayak di Kalimantan Barat. Kain ini dibuat melalui proses menenun yang rumit, di mana benang terlebih dahulu diikat dan diberi warna sebelum ditenun menjadi sebuah kain yang indah. Bagi masyarakat Dayak, kain tenun bukan sekadar bahan pakaian. Setiap motif yang ditampilkan mengandung cerita, identitas, dan nilai budaya yang diwariskan dari generasi ke generasi. Motif-motif tersebut biasanya terinspirasi oleh alam, kehidupan masyarakat, serta simbol-simbol yang memiliki makna khusus dalam budaya Dayak. Selain digunakan sebagai pakaian adat, Tenun Ikat Dayak juga sering digunakan dalam berbagai upacara adat dan acara penting masyarakat. Keunikan kerajinan ini terletak pada proses pembuatannya yang membutuhkan ketelitian tinggi serta motif khas yang menjadikan setiap kain memiliki karakter tersendiri.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Kerajinan - Tenun Ikat Dayak.mp3",
  narrator:
    "Tenun Dayak merupakan karya seni kerajinan tekstil tradisional yang sarat akan keindahan estetika dan makna spiritual di Kalimantan Barat. Dibuat menggunakan alat tenun bukan mesin tradisional dari benang kapas alami, kain tenun ini dihiasi dengan motif-motif geometris rumit yang menggambarkan flora, fauna hutan tropis, serta simbol-simbol mistis pelindung. Proses pewarnaannya menggunakan bahan-bahan alami dari akar pohon, daun-daun hutan, dan lumpur untuk menghasilkan warna-warna bumi yang khas. Bagi masyarakat Dayak, menenun bukan sekadar keterampilan tangan, melainkan sarana mencurahkan doa, harapan, dan identitas budaya yang mencerminkan ketekunan, kesabaran, serta kehalusan jiwa sang penenun perempuan.",
  location: "Kabupaten Sintang, Kalimantan Barat",
  period: "Tradisi Dayak, ratusan tahun",
  image: "/img/cultures/tenun-dayak.jpg",
  tags: ["Kain", "Dayak", "Motif"],
},

{
  id: "kalbar-bidai",
  provinceId: "kalimantan-barat",
  category: "Kerajinan",
  title: "Anyaman Bidai",
  coordinates: [0.8, 111.2],
  isLandmark: true,
  description:
    "Anyaman Bidai merupakan kerajinan tradisional masyarakat Dayak yang dibuat dari rotan, bambu, atau bahan alami lainnya yang banyak ditemukan di hutan Kalimantan. Kerajinan ini umumnya berbentuk tikar dan digunakan dalam kehidupan sehari-hari. Kehadiran Bidai menunjukkan bagaimana masyarakat Dayak memanfaatkan sumber daya alam secara bijaksana untuk memenuhi kebutuhan hidup mereka. Selain digunakan sebagai perlengkapan rumah tangga, Bidai juga sering dijadikan hiasan dan cendera mata khas Kalimantan Barat. Keunikannya terletak pada pola anyaman yang rapi, kuat, dan memiliki motif khas yang berbeda di setiap daerah.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Kerajinan - Anyaman Bidai.mp3",
  narrator:
    "Bidai adalah kerajinan anyaman tikar tradisional khas masyarakat Dayak di Kalimantan Barat yang terkenal karena kekuatan dan ketahanannya yang luar biasa. Kerajinan ini dianyam secara manual dari belahan rotan pilihan dan kulit kayu pohon kapuak yang seratnya sangat kuat. Bidai dihiasi dengan motif-motif hiasan tradisional yang sederhana namun elegan. Selain digunakan sebagai alas lantai rumah panjang untuk menyambut tamu atau berkumpul bersama keluarga, Bidai juga berfungsi penting dalam menjemur hasil panen padi di bawah terik matahari. Keterampilan menganyam Bidai diwariskan dari para ibu kepada anak-anak perempuan mereka sebagai lambang ketelitian, kedekatan dengan alam, dan kemandirian ekonomi keluarga.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, turun-temurun",
  image: "/img/cultures/bidai.jpg",
  tags: ["Anyaman", "Rotan", "Dayak"],
},

{
  id: "kalbar-ukiran-dayak",
  provinceId: "kalimantan-barat",
  category: "Kerajinan",
  title: "Ukiran Dayak",
  coordinates: [0.5, 111.0],
  isLandmark: true,
  description:
    "Ukiran Dayak merupakan salah satu bentuk seni tradisional yang berkembang dalam kehidupan masyarakat Dayak di Kalimantan Barat. Ukiran ini biasanya diterapkan pada rumah adat, perisai, peralatan tradisional, hingga berbagai benda budaya lainnya. Bagi masyarakat Dayak, ukiran bukan hanya hiasan, melainkan media untuk menyampaikan identitas, nilai budaya, dan hubungan mereka dengan alam. Motif-motif yang digunakan sering kali menggambarkan tumbuhan, hewan, atau simbol-simbol yang dianggap penting dalam kehidupan masyarakat. Keunikan kerajinan ini terletak pada detail motif yang rumit dan bentuknya yang khas sehingga mudah dikenali sebagai bagian dari budaya Dayak.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Ukiran Dayak adalah mahakarya seni rupa tradisional yang menghiasi hampir setiap sudut kehidupan masyarakat Dayak di Kalimantan Barat. Dipahat pada kayu ulin, tanduk rusa, atau bambu, ukiran ini memiliki ciri khas bentuk meliuk-liuk yang dinamis dan saling sambung-menyambung. Motif yang paling sering digambarkan adalah burung enggang yang melambangkan kebebasan dan kesucian, naga air yang melambangkan kekuatan alam bawah, serta motif kamang atau wajah leluhur pelindung. Ukiran ini dapat ditemukan pada dinding rumah adat, gagang mandau, perisai talawang, hingga tiang kubur pusaka. Seni mengukir ini menjadi media visual bagi seniman Dayak untuk menuturkan sejarah, mitologi, dan nilai-nilai spiritual leluhur.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, turun-temurun",
  image: "/img/cultures/ukiran-dayak.jpg",
  tags: ["Ukiran", "Seni", "Dayak"],
},

{
  id: "kalbar-manik-dayak",
  provinceId: "kalimantan-barat",
  category: "Kerajinan",
  title: "Manik-Manik Dayak",
  coordinates: [0.3, 111.3],
  isLandmark: true,
  description:
    "Kerajinan Manik-Manik Dayak merupakan karya seni tradisional yang dibuat dari rangkaian manik-manik berwarna-warni yang disusun menjadi berbagai bentuk, seperti kalung, gelang, hiasan kepala, hingga aksesoris pakaian adat. Dalam budaya Dayak, manik-manik memiliki peran penting karena sering digunakan dalam berbagai kegiatan adat dan perayaan budaya. Warna serta pola yang digunakan tidak hanya berfungsi sebagai hiasan, tetapi juga mencerminkan identitas dan kekayaan budaya masyarakat Dayak. Saat ini, kerajinan manik-manik juga banyak dijadikan suvenir dan karya seni khas Kalimantan Barat.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Kerajinan Manik Dayak merupakan seni merangkai manik-manik kecil berwarna-warni yang menjadi bagian integral dari busana adat dan aksesoris masyarakat Dayak di Kalimantan Barat. Manik-manik ini dirangkai membentuk motif-motif tradisional yang kaya akan simbolisme, seperti motif burung enggang, tameng pelindung, atau wajah roh leluhur. Warna yang digunakan biasanya didominasi oleh merah, kuning, hijau, hitam, dan putih, yang masing-masing melambangkan unsur alam dan kehidupan spiritual. Hasil rajutan manik dipasang pada topi adat, sabuk, gendongan bayi, tas, hingga pakaian resmi upacara. Kerajinan manik ini mencerminkan keindahan citarasa seni, ketelitian yang tinggi, serta identitas budaya yang dijaga dengan bangga.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, turun-temurun",
  image: "/img/cultures/manik-dayak.jpg",
  tags: ["Manik-Manik", "Aksesoris", "Dayak"],
},

// Pakaian Adat
{
  id: "kalbar-king-bibinge",
  provinceId: "kalimantan-barat",
  category: "Pakaian Adat",
  title: "King Bibinge",
  coordinates: [0.5, 111.0],
  isLandmark: true,
  description:
    "King Bibinge merupakan pakaian adat perempuan masyarakat Dayak di Kalimantan Barat. Pakaian ini biasanya dibuat dari kain tradisional dan dihiasi dengan berbagai ornamen khas Dayak yang menampilkan keindahan serta kekayaan budaya daerah. Bagi masyarakat Dayak, King Bibinge bukan hanya pakaian yang dikenakan untuk menutupi tubuh, tetapi juga menjadi simbol identitas dan kebanggaan budaya. Motif dan hiasan yang terdapat pada pakaian ini sering terinspirasi dari alam, seperti tumbuhan dan hewan yang memiliki hubungan erat dengan kehidupan masyarakat Dayak. King Bibinge biasanya dikenakan dalam upacara adat, penyambutan tamu, pertunjukan seni, dan berbagai perayaan budaya. Keunikannya terletak pada perpaduan warna yang mencolok, hiasan manik-manik yang detail, serta aksesoris tradisional yang membuat tampilannya semakin khas dan menarik.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Pakaian Adat - King Bibinge.mp3",
  narrator:
    "King Bibinge merupakan pakaian adat tradisional perempuan suku Dayak di Kalimantan Barat yang terbuat dari bahan alami kulit kayu kapuak atau ampuro. Kulit kayu tersebut dipukul-pukul hingga lunak dan tipis menyerupai kain, kemudian dijahit menjadi rompi tanpa lengan dan kain bawahan bermotif indah. Pakaian ini dihiasi dengan anyaman manik-manik berwarna-warni yang dirangkai membentuk motif burung enggang atau flora hutan, serta dipercantik dengan ikat kepala berhiaskan bulu burung enggang yang suci. King Bibinge dikenakan oleh para perempuan Dayak saat upacara adat, pesta panen, dan pernikahan, memancarkan aura keanggunan alami, keteguhan hati, serta ikatan batin yang erat dengan kelestarian hutan belantara.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, turun-temurun",
  image: "/img/cultures/king-bibinge.jpg",
  tags: ["Pakaian", "Dayak", "Perempuan"],
},

{
  id: "kalbar-king-baba",
  provinceId: "kalimantan-barat",
  category: "Pakaian Adat",
  title: "King Baba",
  coordinates: [0.5, 111.0],
  isLandmark: true,
  description:
    "King Baba merupakan pakaian adat laki-laki masyarakat Dayak di Kalimantan Barat. Pakaian ini sering dipadukan dengan berbagai perlengkapan tradisional seperti ikat kepala, perhiasan khas Dayak, dan senjata adat sebagai pelengkap busana. Kehadiran King Baba mencerminkan keberanian, tanggung jawab, dan penghormatan terhadap tradisi yang diwariskan oleh para leluhur. Pakaian ini juga menunjukkan hubungan masyarakat Dayak dengan alam karena pada masa lalu sebagian bahan pembuatannya berasal dari sumber daya alam yang tersedia di sekitar mereka. King Baba biasanya digunakan dalam upacara adat, festival budaya, dan pertunjukan seni tradisional. Keunikannya terletak pada motif khas Dayak, penggunaan aksesoris tradisional, serta tampilannya yang mencerminkan karakter kuat masyarakat Dayak.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Pakaian Adat - King Baba.mp3",
  narrator:
    "King Baba adalah pakaian adat tradisional laki-laki suku Dayak di Kalimantan Barat yang menunjukkan keunikan kearifan lokal dalam memanfaatkan hasil hutan. Pakaian ini terdiri dari rompi tanpa lengan dan ikat pinggang yang seluruhnya dibuat dari serat kulit kayu pohon kapuak yang dikeringkan dan diolah secara tradisional. Untuk menunjukkan kegagahan sang pemakai, King Baba dilengkapi dengan ikat kepala yang dihiasi sehelai bulu burung enggang gading yang panjang, serta senjata tradisional Mandau yang terselip di pinggang. Dikenakan dalam upacara adat besar dan ritual penyambutan tamu, King Baba melambangkan kewibawaan, keberanian, dan tanggung jawab seorang laki-laki Dayak sebagai pelindung keluarga dan penjaga tradisi leluhur.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Dayak, turun-temurun",
  image: "/img/cultures/king-baba.jpg",
  tags: ["Pakaian", "Dayak", "Laki-laki"],
},

{
  id: "kalbar-telok-belanga",
  provinceId: "kalimantan-barat",
  category: "Pakaian Adat",
  title: "Telok Belanga",
  coordinates: [0.03, 109.34],
  isLandmark: true,
  description:
    "Telok Belanga merupakan pakaian tradisional masyarakat Melayu yang berkembang di Kalimantan Barat. Pakaian ini terdiri dari baju berlengan panjang yang dipadukan dengan celana panjang serta kain samping yang dikenakan di bagian luar. Bagi masyarakat Melayu, Telok Belanga mencerminkan nilai kesopanan, kehormatan, dan tata krama yang dijunjung tinggi dalam kehidupan sehari-hari. Desainnya yang sederhana namun rapi menunjukkan pentingnya menjaga sikap dan penampilan saat berinteraksi dengan orang lain. Pakaian ini biasanya dikenakan dalam acara adat, kegiatan keagamaan, perayaan budaya, dan berbagai kegiatan resmi lainnya. Keunikan Telok Belanga terletak pada desainnya yang elegan, nyaman digunakan, serta tetap mempertahankan ciri khas budaya Melayu hingga saat ini.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Telok Belanga merupakan pakaian adat resmi laki-laki Melayu di Kalimantan Barat yang sarat akan nilai kesopanan, kerapian, dan keagungan budaya. Busana ini terdiri dari baju kurung berkerah bulat tanpa lipatan dengan kancing tunggal di bagian leher, dipadukan dengan celana panjang longgar berwarna senada. Ciri khas Telok Belanga terletak pada penggunaan kain samping bermotif songket Melayu yang dililitkan di pinggang hingga batas lutut, serta penutup kepala berupa peci hitam atau tanjak kain yang elegan. Pakaian ini mencerminkan kesantunan berprilaku, kewibawaan, dan kepatuhan terhadap nilai-nilai keagamaan, biasa dikenakan dalam menghadiri pesta pernikahan adat, upacara resmi kerajaan, dan perayaan hari besar keagamaan.",
  location: "Pontianak, Kalimantan Barat",
  period: "Tradisi Melayu, turun-temurun",
  image: "/img/cultures/telok-belanga.jpg",
  tags: ["Pakaian", "Melayu", "Kesopanan"],
},

{
  id: "kalbar-baju-kurung",
  provinceId: "kalimantan-barat",
  category: "Pakaian Adat",
  title: "Baju Kurung Melayu",
  coordinates: [0.03, 109.34],
  isLandmark: true,
  description:
    "Baju Kurung Melayu merupakan pakaian adat perempuan Melayu yang banyak digunakan di Kalimantan Barat. Pakaian ini terdiri dari baju longgar yang dipadukan dengan kain panjang atau rok sehingga memberikan kesan anggun dan sopan. Baju Kurung mencerminkan nilai kesederhanaan, kesopanan, dan penghormatan terhadap norma-norma yang berlaku dalam masyarakat Melayu. Bentuknya yang longgar dirancang untuk memberikan kenyamanan sekaligus mencerminkan budaya berpakaian yang santun. Pakaian ini sering dikenakan dalam acara keluarga, perayaan budaya, kegiatan keagamaan, dan upacara adat. Keunikannya terletak pada desain yang sederhana namun elegan, serta kemampuannya bertahan sebagai salah satu simbol identitas masyarakat Melayu dari generasi ke generasi.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Baju Kurung merupakan busana tradisional perempuan Melayu di Kalimantan Barat yang melambangkan keanggunan, kesopanan budi pekerti, dan kepatuhan terhadap norma adat. Pakaian ini memiliki potongan longgar yang menutup tubuh dengan sopan, panjang bajunya menjuntai hingga batas lutut atau paha, serta memiliki kerah bulat khas Melayu. Baju Kurung dipadukan dengan kain bawahan panjang bermotif songket indah yang dililitkan rapi. Dikenakan dalam berbagai upacara adat, pernikahan, dan hari besar keagamaan, Baju Kurung memancarkan keindahan wanita Melayu yang anggun, menjaga kehormatan diri, menjunjung tinggi kesantunan bertata krama, serta melestarikan kehalusan adat istiadat leluhur.",
  location: "Seluruh Kalimantan Barat",
  period: "Tradisi Melayu, turun-temurun",
  image: "/img/cultures/baju-kurung.jpg",
  tags: ["Pakaian", "Melayu", "Perempuan"],
},

// cerita rakyat
{
  id: "kalbar-batu-menangis",
  provinceId: "kalimantan-barat",
  category: "Cerita Rakyat",
  title: "Batu Menangis",
  coordinates: [0.5, 109.3],
  isLandmark: true,
  description:
    "Batu Menangis adalah legenda populer Kalimantan Barat tentang Darmi, seorang gadis cantik jelita yang durhaka kepada ibunya. Karena merasa malu dengan keadaan sang ibu yang miskin, Darmi menyangkal ibu kandungnya sendiri di depan banyak orang. Hati yang terluka membuat ibunya berdoa memohon keadilan, hingga akhirnya Darmi dikutuk berubah menjadi batu yang terus meneteskan air mata penyesalan.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Cerita Rakyat - Batu Menangis.mp3",
  narrator:
    "Batu Menangis merupakan cerita rakyat terkenal dari Kalimantan Barat yang mengisahkan seorang gadis cantik bernama Darmi yang memiliki sifat sombong dan durhaka kepada ibunya. Darmi merasa malu memiliki ibu yang miskin dan sering menyangkal bahwa wanita tua tersebut adalah ibunya. Sikap buruknya akhirnya membuat sang ibu sangat sedih hingga memohon kepada Tuhan agar anaknya diberi pelajaran. Doa tersebut terkabul dan Darmi perlahan berubah menjadi batu. Legenda ini diwariskan secara turun-temurun sebagai pengingat pentingnya menghormati orang tua, terutama ibu yang telah berjuang membesarkan anak-anaknya.",
  location: "Kalimantan Barat",
  period: "Cerita rakyat turun-temurun",
  image: "/img/cultures/batu-menangis.jpg",
  tags: ["Legenda", "Kedurhakaan", "Pesan Moral"],
},

{
  id: "kalbar-si-bungsu",
  provinceId: "kalimantan-barat",
  category: "Cerita Rakyat",
  title: "Si Bungsu Tujuh Bersaudara",
  coordinates: [0.7, 110.1],
  isLandmark: true,
  description:
    "Si Bungsu Tujuh Bersaudara mengisahkan petualangan seorang anak bungsu yang cerdas dan berhati emas. Ditinggalkan oleh orang tua mereka di tengah hutan rimba, ia memimpin kakak-kakaknya menghadapi bahaya. Melalui ketulusan dan kebesaran hati untuk memaafkan, kisah ini menjadi teladan tentang kekuatan kebaikan dalam meluluhkan kebencian.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Alkisah, di tengah belantara Kalimantan Barat, hiduplah tujuh anak perempuan yatim piatu. Kakak-kakaknya sering bersikap malas, sementara si Bungsu adalah gadis kecil yang rajin, sabar, dan penuh kasih. Suatu ketika, karena kelaparan melanda desa, kakak-kakaknya berniat membuang si Bungsu ke dalam hutan rimba yang dihuni raksasa jahat. Mereka mengajaknya mencari kayu bakar dan meninggalkannya sendirian di tengah kegelapan malam yang pekat. Berkat ketulusan hatinya, alam bersahabat dengan si Bungsu; kunang-kunang menerangi jalannya, dan burung-burung hutan membisikkan arah pulang. Saat sampai di rumah, si Bungsu tidak menaruh dendam sedikit pun. Ia justru memeluk kakak-kakaknya dengan hangat dan membagikan buah-bahahan manis yang ia temukan. Ketulusan luar biasa si Bungsu akhirnya meluluhkan hati keras kakak-kakaknya. Mereka menangis menyesali perbuatannya dan berjanji akan selalu hidup rukun bersamanya. Dongeng ini mengajarkan kita bahwa ketulusan, kesabaran, dan kebesaran hati untuk memaafkan selalu memiliki kekuatan magis untuk mengubah kebencian menjadi kasih sayang.",
  location: "Kalimantan Barat",
  period: "Cerita rakyat turun-temurun",
  image: "/img/cultures/si-bungsu.jpg",
  tags: ["Dongeng", "Persaudaraan", "Kebaikan"],
},

{
  id: "kalbar-bujang-beji",
  provinceId: "kalimantan-barat",
  category: "Cerita Rakyat",
  title: "Kisah Bujang Beji",
  coordinates: [0.3, 111.5],
  isLandmark: true,
  description:
    "Kisah Bujang Beji menceritakan pertarungan watak antara dua tokoh sakti di hulu Sungai Melawi: Temenggung Marubai yang bijaksana dan Bujang Beji yang serakah. Kedengkian Bujang Beji membawanya pada rencana jahat membendung sungai dengan puncak bukit raksasa, yang berakhir dengan kehancuran dirinya sendiri.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Cerita Rakyat - Kisah Bujang Beji.mp3",
  narrator:
    "Kisah Bujang Beji merupakan legenda masyarakat Kalimantan Barat yang menceritakan seorang tokoh sakti bernama Bujang Beji yang memiliki sifat iri, serakah, dan sombong. Ia merasa iri terhadap Temenggung Marubai yang selalu memperoleh hasil tangkapan ikan lebih banyak. Karena rasa dengkinya, Bujang Beji berusaha menguasai seluruh sumber ikan dengan berbagai cara. Namun, semua usahanya gagal dan justru membawa kehancuran bagi dirinya sendiri. Cerita ini menjadi pengingat bahwa sifat iri hati dan keserakahan hanya akan mendatangkan kerugian.",
  location: "Kabupaten Sintang, Kalimantan Barat",
  period: "Legenda masyarakat Dayak",
  image: "/img/cultures/bujang-beji.jpg",
  tags: ["Legenda", "Keserakahan", "Dayak"],
},

{
  id: "kalbar-bukit-kelam",
  provinceId: "kalimantan-barat",
  category: "Cerita Rakyat",
  title: "Legenda Bukit Kelam",
  coordinates: [0.1, 111.5],
  isLandmark: true,
  description:
    "Legenda Bukit Kelam berkisah tentang asal-usul terbentuknya landmark batu hitam raksasa di Kabupaten Sintang. Lahir dari kegagalan Bujang Beji memindahkan bukit akibat digagalkan oleh dewi-dewi kahyangan yang murka melihat keserakahannya, bukit ini berdiri kokoh sebagai simbol runtuhnya kesombongan manusia.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Menurut legenda masyarakat Sintang, Bukit Kelam yang menjulang megah di Kalimantan Barat adalah bukti nyata dari runtuhnya kesombongan seorang manusia bernama Bujang Beji. Kala itu, Bujang Beji terbakar api cemburu karena Temenggung Marubai selalu berhasil menangkap ikan melimpah. Didorong rasa dengki yang tiada tara, ia memahat puncak bukit raksasa di daerah Nanga Jetak untuk digunakan menyumbat aliran sungai. Dengan kekuatan sihirnya, ia memikul bongkahan batu hitam raksasa itu melintasi hutan. Di tengah jalan, dewi-dewi kahyangan yang tidak menyukai keserakahan manusia menertawakannya. Mendengar tawa mengejek itu, Bujang Beji mendongak marah. Namun naas, pijakannya goyah dan tali pemikulnya putus seketika. Bongkahan batu hitam yang teramat besar itu jatuh menghantam bumi dengan guncangan yang dahsyat, menindih impian jahatnya. Batu hitam raksasa yang terhempas itulah yang kini kita kenal sebagai Bukit Kelam, tegak berdiri sebagai monumen abadi yang memperingatkan manusia akan bahayanya memelihara rasa iri hati dan keserakahan.",
  location: "Kabupaten Sintang, Kalimantan Barat",
  period: "Legenda masyarakat Dayak",
  image: "/img/cultures/bukit-kelam.jpg",
  tags: ["Legenda", "Bukit Kelam", "Pesan Moral"],
},
  // Bangunan Bersejarah
  {
    id: "kalbar-istana-kadriah",
    provinceId: "kalimantan-barat",
    category: "Bangunan Bersejarah",
    title: "Istana Kadriah",
    coordinates: [-0.026, 109.344],
    isLandmark: true,
    description:
      "Istana Kadriah merupakan istana kesultanan Melayu yang didirikan pada tahun 1771 oleh Sultan Syarif Abdurrahman Alkadrie, pendiri kota Pontianak. Terbuat dari kayu belian yang kokoh, bangunan ini memadukan arsitektur tradisional Melayu dengan sentuhan kolonial Eropa, menjadikannya ikon sejarah yang sangat berharga di Kalimantan Barat.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Bangunan Bersejarah - Istana Kadriah Kesultanan Pontianak.mp3",
    narrator:
      "Berdiri megah di dekat persimpangan Sungai Kapuas dan Sungai Landak, Istana Kadriah adalah saksi bisu lahirnya Kota Pontianak pada tahun 1771. Didirikan oleh Sultan Syarif Abdurrahman Alkadrie, bangunan panggung ini hampir seluruhnya dibangun menggunakan kayu belian atau kayu besi yang terkenal sangat kuat. Arsitekturnya yang anggun memadukan gaya lokal Melayu dengan sentuhan kolonial Prancis dan Belanda, terlihat dari jajaran jendela besar dan kaca patri berwarna-warni. Di dalam istana, pengunjung dapat melihat berbagai peninggalan sejarah kesultanan, mulai dari singgasana emas, meriam kuno pemberian bangsa Eropa, hingga cermin kaca seribu yang legendaris. Istana Kadriah tetap tegak berdiri sebagai simbol kejayaan budaya Melayu di Kalimantan Barat.",
    location: "Pontianak, Kalimantan Barat",
    period: "Didirikan pada tahun 1771 oleh Sultan Syarif Abdurrahman Alkadrie",
    image: "/img/cultures/istana-kadriah.jpg",
    tags: ["Istana", "Kesultanan", "Pontianak", "Sejarah"],
  },
  {
    id: "kalbar-masjid-jami",
    provinceId: "kalimantan-barat",
    category: "Bangunan Bersejarah",
    title: "Masjid Jami Pontianak",
    coordinates: [-0.024, 109.343],
    isLandmark: true,
    description:
      "Masjid Jami Sultan Syarif Abdurrahman adalah masjid tertua di Kota Pontianak, Kalimantan Barat, yang didirikan bersamaan dengan pembangunan Istana Kadriah pada tahun 1771. Dengan arsitektur panggung berbahan kayu belian dan atap tumpang bergaya tradisional, masjid ini menjadi simbol penyebaran agama Islam di tanah Khatulistiwa.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/kalimantan/Bangunan Bersejarah - Masjid Jami Sultan Syarif Abdurrahman.mp3",
    narrator:
      "Masjid Jami Sultan Syarif Abdurrahman adalah jantung spiritual yang mengiringi berdirinya Kota Pontianak sejak tahun 1771. Terletak tidak jauh dari Istana Kadriah, masjid tertua di Kalimantan Barat ini didirikan oleh pendiri kota, Sultan Syarif Abdurrahman Alkadrie. Bangunan masjid yang berbentuk panggung ini ditopang oleh tiang-tiang raksasa dari kayu belian pilihan yang kokoh menghadapi cuaca dan aliran sungai. Desain arsitekturnya sangat unik dengan atap tumpang bertingkat khas Nusantara dan jendela-jendela besar khas Melayu untuk sirkulasi udara yang sejuk. Di dalam masjid, nuansa kedamaian begitu terasa dengan mimbar kayu yang diukir indah serta tiang penyangga yang kokoh. Masjid Jami ini tetap menjadi pusat ibadah dan simbol abadi penyebaran agama Islam di bumi Khatulistiwa.",
    location: "Pontianak, Kalimantan Barat",
    period: "Didirikan pada tahun 1771",
    image: "/img/cultures/masjid-jami.jpg",
    tags: ["Masjid", "Sejarah", "Pontianak", "Religi"],
  },

  // ─── PAPUA ─────────────────────────────────────────────────────────────────
  // Tarian
  {
    id: "papua-tari-yospan",
    provinceId: "papua",
    category: "Tarian",
    title: "Tari Yospan",
    coordinates: [-1.0, 136.0],
    isLandmark: true,
    description:
      "Tari Yospan adalah salah satu tarian adapt merauke,yang sering dipakai dalam kondisi tertentu. yospan juga merupakan tarian persahabatan masyarakat papua.Karena hampir seluruh masyarakat papua mengenal tarian yospan. Selain yospan,merauke juga memiliki beberapa tarian adat,antara lain,tari perang,dan tari gatsi.Tari perang biasanya dilakukan pada upacara- upacara adapt tertentu,dan juga pada festival kota merauke yang diadakan satu tahun sekali, dalam memperingati ulang tahun kota Merauke.Sedangkan tari gatsi dilakukan pada acara acara tertentu dan upacara adat tertentu,tarian ini adalah tarian adat suku asli kota merauke,yaitu suku marind.Alat-alat musik yang digunakan untuk mengiringi tarian ini adalah tifa yang terbuat dari kayu yang dibolongi atau di kosongkan isinya, dan pada satu sisinya diberi penutup.Penutupnya terbuat dari kulit rusa dan juga kulit biawak yang dikeringi,agar bunyinya menjadi lebih indah.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/tari-yospan.mp3",
    narrator:
      "Ketika drum tifa mulai berdentum dan kaki-kaki mulai bergerak, semangat Papua mengalir bebas dalam Tari Yospan. Ini adalah tarian yang lahir dari jiwa muda Papua yang dinamis — memadukan tradisi leluhur dengan semangat zaman baru. Setiap langkah adalah ekspresi kebanggaan menjadi orang Papua.",
    location: "Seluruh Papua",
    period: "Abad ke-20, perpaduan tradisi dan modern",
    image: "/img/cultures/tari-yospan.jpg",
    tags: ["Pergaulan", "Modern", "Energik"],
  },
  {
    id: "papua-tari-selamat-datang",
    provinceId: "papua",
    category: "Tarian",
    title: "Tari Selamat Datang",
    coordinates: [-2.533, 140.717],
    isLandmark: true,
    description:
      "Tari Selamat Datang merupakan tarian tradisional khas masyarakat Papua yang digunakan sebagai bentuk penghormatan dan ungkapan kegembiraan dalam menyambut tamu. Tarian ini dikenal dengan gerakannya yang energik dan dinamis, serta penggunaan berbagai aksesoris khas seperti kalung, hiasan kepala dari kerang, gigi, dan tulang hewan. Tari Selamat Datang biasanya dibawakan oleh sekelompok penari pria yang mengenakan pakaian adat Papua lengkap dengan tameng dan tombak. Tarian ini diiringi oleh musik tradisional seperti tifa, gitar, ukulele, dan stem bass yang menambah semarak suasana penyambutan.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/tari-selamat-datang.mp3",
    narrator:
      "Tari Selamat Datang merupakan tarian tradisional khas masyarakat Papua yang digunakan sebagai bentuk penghormatan dan ungkapan kegembiraan dalam menyambut tamu. Tarian ini dikenal dengan gerakannya yang energik dan dinamis, serta penggunaan berbagai aksesoris khas seperti kalung, hiasan kepala dari kerang, gigi, dan tulang hewan. Tari Selamat Datang biasanya dibawakan oleh sekelompok penari pria yang mengenakan pakaian adat Papua lengkap dengan tameng dan tombak. Tarian ini diiringi oleh musik tradisional seperti tifa, gitar, ukulele, dan stem bass yang menambah semarak suasana penyambutan.",
    location: "Papua Timur dan berbagai wilayah di Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/tari-selamat-datang.jpg",
    tags: ["Penyambutan", "Tradisional", "Energik"],
  },
  {
    id: "papua-tari-perang",
    provinceId: "papua",
    category: "Tarian",
    title: "Tari Perang",
    coordinates: [-1.336, 133.174],
    isLandmark: true,
    description:
      "Tari Perang merupakan tarian tradisional khas Papua yang melambangkan keberanian, kepahlawanan, dan semangat juang masyarakat Papua. Dahulu, tarian ini dibawakan sebelum peperangan antar suku untuk membangkitkan semangat para prajurit. Seiring perkembangan zaman, Tari Perang kini lebih sering dipentaskan sebagai pertunjukan budaya dan tarian penyambutan tamu, sekaligus sebagai bentuk penghormatan kepada leluhur serta upaya pelestarian warisan budaya Papua.",
    youtubeId: "",
    narrator:
      "Dengan hentakan kaki, teriakan semangat, dan iringan tifa yang menggema, Tari Perang menggambarkan keberanian serta semangat juang masyarakat Papua. Kini, tarian ini tidak lagi digunakan untuk peperangan, melainkan sebagai simbol penghormatan kepada leluhur dan identitas budaya Papua.",
    location: "Papua dan Papua Barat",
    period: "Pra-sejarah hingga masa kini",
    image: "/img/cultures/tari-perang.jpg",
    tags: ["Kepahlawanan", "Tradisional", "Ritual"],
  },
  {
    id: "papua-sprado",
    provinceId: "papua",
    category: "Tarian",
    title: "Tari Sprado",
    coordinates: [-2.548, 140.717],
    isLandmark: true,
    description:
      "Tarian Sprado merupakan tarian tradisional Papua yang menceritakan proses penobatan atau pengangkatan kepala suku. Tarian ini menggambarkan kehidupan masyarakat Papua yang menjunjung tinggi musyawarah dan ritual adat dalam memilih pemimpin baru. Melalui gerakan dan simbol-simbol adat, Sprado menjadi wujud penghormatan terhadap nilai kepemimpinan, persatuan, dan warisan leluhur masyarakat Papua.",
    youtubeId: "",
    narrator:
      "Sprado mengisahkan proses pengangkatan kepala suku dalam kehidupan masyarakat Papua. Melalui tarian ini, masyarakat mengekspresikan rasa hormat kepada pemimpin serta menjaga tradisi dan nilai-nilai adat yang diwariskan oleh leluhur.",
    location: "Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/sprado.jpg",
    tags: ["Kepemimpinan", "Upacara Adat", "Tradisional"],
  },

  // Alat Musik
  {
    id: "papua-tifa",
    provinceId: "papua",
    category: "Musik",
    title: "Tifa Papua",
    coordinates: [-2.5, 140.7],
    isLandmark: true,
    description:
      "Tifa adalah alat musik drum tradisional Papua dan Maluku yang terbuat dari kayu berongga dengan kulit biawak atau rusa sebagai membran. Ukurannya bervariasi dari kecil hingga sangat besar. Dalam budaya Papua, Tifa bukan hanya instrumen musik — ia adalah media komunikasi antar kampung dan sarana ritual adat yang sakral.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/alat-musik-tifa.mp3",
    narrator:
      "Dentuman Tifa terdengar jauh menembus hutan Papua, membawa pesan dari kampung ke kampung. Setiap ritme yang dipukul menceritakan sesuatu — perayaan kemenangan, peringatan bahaya, atau undangan pesta. Tifa adalah suara Papua yang paling murni dan paling kuat.",
    location: "Seluruh Papua",
    period: "Instrumen purba, pra-sejarah Papua",
    image: "/img/cultures/tifa.jpg",
    tags: ["Drum", "Ritual", "Komunikasi"],
  },

  {
    id: "papua-triton",
    provinceId: "papua",
    category: "Musik",
    title: "Triton",
    coordinates: [-2.5, 140.7],
    isLandmark: true,
    description:
      "Triton merupakan alat musik tradisional Papua yang terbuat dari kulit kerang laut dan dimainkan dengan cara ditiup. Alat musik ini banyak ditemukan di wilayah pesisir seperti Biak, Yapen, Waropen, Nabire, Wondama, hingga Raja Ampat. Pada awalnya, Triton digunakan sebagai sarana komunikasi, penanda peristiwa penting, atau alat pemanggil masyarakat. Seiring perkembangan zaman, Triton juga digunakan sebagai alat musik tradisional dan sarana hiburan.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/alat-musik-triton.mp3",
    narrator:
      "Triton adalah alat musik tiup khas Papua yang berasal dari kulit kerang laut. Dahulu, suaranya digunakan untuk memanggil masyarakat, memberi tanda, dan menyampaikan pesan antarkampung. Kini, Triton juga menjadi bagian penting dalam pertunjukan seni and pelestarian budaya Papua.",
    location:
      "Wilayah pesisir Papua, terutama Biak, Yapen, Waropen, Nabire, Wondama, dan Raja Ampat",
    period:
      "Tradisional, digunakan sejak masa lampau oleh masyarakat pesisir Papua",
    image: "/img/cultures/triton.jpg",
    tags: ["Alat Musik Tiup", "Kulit Kerang", "Komunikasi"],
  },

  {
    id: "papua-butshake",
    provinceId: "papua",
    category: "Musik",
    title: "Butshake",
    coordinates: [-8.493, 140.401],
    isLandmark: true,
    description:
      "Butshake merupakan alat musik tradisional khas suku Muyu di Kabupaten Merauke, Papua. Alat musik ini terbuat dari bambu yang diisi dengan buah kenari dan dimainkan dengan cara diayunkan atau dikocok menggunakan tangan. Saat dimainkan, butir-butir kenari di dalam bambu saling berbenturan sehingga menghasilkan bunyi gemericik yang khas. Butshake umumnya digunakan sebagai pengiring dalam pesta dan tarian adat masyarakat Papua.",
    youtubeId: "",
    narrator:
      "Butshake adalah alat musik tradisional masyarakat Muyu di Papua yang menghasilkan suara gemericik khas dari benturan buah kenari di dalam bambu. Instrumen sederhana ini sering dimainkan untuk mengiringi tarian dan berbagai perayaan adat, mencerminkan kedekatan masyarakat Papua dengan alam sekitarnya.",
    location: "Kabupaten Merauke, Papua Selatan",
    period:
      "Tradisional, diwariskan secara turun-temurun oleh masyarakat suku Muyu",
    image: "/img/cultures/butshake.jpg",
    tags: ["Alat Musik", "Bambu", "Buah Kenari"],
  },
  {
    id: "papua-kecapi-mulut",
    provinceId: "papua",
    category: "Musik",
    title: "Kecapi Mulut",
    coordinates: [-4.083, 138.95],
    isLandmark: true,
    description:
      "Kecapi Mulut merupakan alat musik tradisional khas suku Dani yang berasal dari Lembah Baliem, Kabupaten Jayawijaya, Papua. Alat musik ini terbuat dari bambu wuluh dan dimainkan dengan cara dijepit di antara bibir, kemudian ditiup sambil menarik talinya. Getaran yang dihasilkan menciptakan bunyi khas yang sering digunakan sebagai hiburan maupun pengiring dalam kehidupan sehari-hari masyarakat Dani.",
    youtubeId: "",
    narrator:
      "Kecapi Mulut adalah alat musik tradisional suku Dani yang terbuat dari bambu wuluh. Instrumen ini dimainkan dengan cara dijepit di antara bibir sambil menarik talinya, menghasilkan suara unik yang mencerminkan kreativitas dan kearifan masyarakat di Lembah Baliem.",
    location: "Lembah Baliem, Kabupaten Jayawijaya, Papua Pegunungan",
    period:
      "Tradisional, diwariskan secara turun-temurun oleh masyarakat suku Dani",
    image: "/img/cultures/kecapi-mulut.jpg",
    tags: ["Alat Musik Petik", "Bambu Wuluh", "Suku Dani"],
  },

  // Pakaian Adat

  {
    id: "papua-koteka",
    provinceId: "papua",
    category: "Pakaian Adat",
    title: "Koteka",
    coordinates: [-4.1, 138.9],
    isLandmark: true,
    description:
      "Koteka merupakan pakaian adat tradisional Papua yang umumnya dikenakan oleh laki-laki, terutama masyarakat di wilayah pegunungan. Pakaian ini terbuat dari labu air yang dikeringkan dan dibentuk sesuai tradisi masing-masing suku. Bagi masyarakat Papua, koteka bukan sekadar pakaian, melainkan simbol identitas budaya yang diwariskan dari generasi ke generasi. Hingga kini, koteka masih digunakan dalam upacara adat, festival budaya, dan berbagai pertunjukan seni tradisional.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/pakaian-adat-koteka.mp3",
    narrator:
      "Koteka adalah simbol identitas budaya masyarakat Papua. Terbuat dari labu air yang dikeringkan, pakaian tradisional ini mencerminkan kedekatan masyarakat Papua dengan alam serta menjadi warisan budaya yang terus dijaga hingga saat ini.",
    location: "Wilayah Pegunungan Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/koteka.jpg",
    tags: ["Pakaian Adat Suku Dani", "Tradisional", "Identitas Budaya"],
  },
  {
    id: "papua-baju-kurung",
    provinceId: "papua",
    category: "Pakaian Adat",
    title: "Baju Kurung Papua",
    coordinates: [-2.548, 140.717],
    isLandmark: true,
    description:
      "Baju Kurung Papua merupakan pakaian adat yang biasa dikenakan oleh perempuan dalam berbagai kegiatan adat maupun acara resmi. Pakaian ini memiliki bentuk yang longgar dan nyaman digunakan serta dihiasi dengan warna-warna cerah yang mencerminkan kekayaan budaya Papua. Dalam berbagai acara adat, baju kurung sering dipadukan dengan kalung manik-manik, gelang tradisional, dan hiasan kepala khas Papua.",
    youtubeId: "",
    narrator:
      "Baju Kurung Papua melambangkan kesopanan, penghormatan, dan kebersamaan dalam kehidupan masyarakat Papua. Keindahan warna serta perpaduan aksesorinya menjadikan pakaian ini sebagai salah satu simbol budaya yang masih lestari hingga sekarang.",
    location: "Berbagai wilayah di Papua",
    period: "Tradisional, digunakan hingga masa kini",
    image: "/img/cultures/baju-kurung-papua.jpg",
    tags: ["Perempuan", "Tradisional", "Adat"],
  },
  {
    id: "papua-sali",
    provinceId: "papua",
    category: "Pakaian Adat",
    title: "Pakaian Sali",
    coordinates: [-4.1, 138.9],
    isLandmark: true,
    description:
      "Pakaian Sali merupakan pakaian adat tradisional perempuan Papua yang berasal dari wilayah Pegunungan Tengah. Pakaian ini dibuat dari kulit kayu yang diolah secara tradisional hingga menjadi lembaran yang dapat dikenakan. Dalam beberapa kelompok masyarakat Papua, sali digunakan oleh perempuan yang belum menikah sebagai bagian dari aturan adat yang diwariskan secara turun-temurun.",
    youtubeId: "",
    narrator:
      "Pakaian Sali mencerminkan penghormatan masyarakat Papua terhadap adat dan tradisi leluhur. Terbuat dari kulit kayu, pakaian ini menjadi simbol penting dalam kehidupan perempuan di wilayah Pegunungan Tengah Papua.",
    location: "Pegunungan Tengah Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/sali.jpg",
    tags: ["Perempuan", "Kulit Kayu", "Tradisional"],
  },
  {
    id: "papua-rok-rumbai",
    provinceId: "papua",
    category: "Pakaian Adat",
    title: "Rok Rumbai",
    coordinates: [-2.548, 140.717],
    isLandmark: true,
    description:
      "Rok Rumbai merupakan pakaian adat khas Papua yang terbuat dari serat tumbuhan alami seperti daun sagu atau daun pandan yang dikeringkan dan dianyam menjadi rumbai-rumbai. Pakaian ini digunakan oleh laki-laki maupun perempuan dalam berbagai kegiatan adat, tarian tradisional, dan festival budaya. Keunikan bahan pembuatannya mencerminkan kedekatan masyarakat Papua dengan alam.",
    youtubeId: "",
    audio: "/music/papua/pakaian-adat-rok-rumbai.mp3",
    narrator:
      "Dibuat dari serat tumbuhan alami, Rok Rumbai menjadi simbol kearifan masyarakat Papua dalam memanfaatkan alam. Hingga kini, pakaian tradisional ini masih digunakan dalam berbagai upacara adat dan pertunjukan budaya.",
    location: "Berbagai wilayah di Papua",
    period: "Tradisional, digunakan hingga masa kini",
    image: "/img/cultures/rok-rumbai.jpg",
    tags: ["Serat Alam", "Tradisional", "Budaya"],
  },

  // upacara adat
  {
    id: "papua-upacara-bakar-batu",
    provinceId: "papua",
    category: "Upacara Adat",
    title: "Upacara Bakar Batu",
    coordinates: [-4.1, 138.9],
    isLandmark: true,
    description:
      "Upacara Bakar Batu merupakan tradisi adat masyarakat Papua, terutama suku Dani, Lani, dan Yali, yang dilaksanakan untuk merayakan berbagai peristiwa penting seperti kelahiran, pernikahan, penyambutan tamu, hingga perdamaian. Dalam upacara ini, batu-batu dipanaskan hingga membara untuk memasak ubi, sayuran, dan daging secara bersama-sama. Tradisi ini mencerminkan nilai kebersamaan, rasa syukur, dan persaudaraan yang kuat dalam kehidupan masyarakat Papua.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/upacara-adat-bakar-batu.mp3",
    narrator:
      "Asap mengepul dari batu-batu yang membara, sementara seluruh masyarakat berkumpul dalam suasana penuh kebersamaan. Bagi masyarakat Papua, Upacara Bakar Batu bukan sekadar tradisi memasak, melainkan simbol persaudaraan, rasa syukur, dan keharmonisan antar sesama.",
    location: "Wilayah Pegunungan Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/bakar-batu.jpg",
    tags: ["Komunal", "Persaudaraan", "Tradisional"],
  },
  {
    id: "papua-tanam-sasi",
    provinceId: "papua",
    category: "Upacara Adat",
    title: "Tanam Sasi",
    coordinates: [-2.533, 140.717],
    isLandmark: true,
    description:
      "Tanam Sasi merupakan tradisi adat masyarakat Papua yang bertujuan untuk melindungi dan mengelola sumber daya alam secara berkelanjutan. Melalui tradisi ini, masyarakat menetapkan larangan sementara untuk mengambil hasil alam tertentu, seperti ikan, hasil laut, atau hasil hutan. Tradisi ini mencerminkan kearifan lokal masyarakat Papua dalam menjaga keseimbangan alam demi keberlangsungan generasi mendatang.",
    youtubeId: "",
    narrator:
      "Tanam Sasi mengajarkan bahwa alam harus dijaga dan dimanfaatkan dengan bijaksana. Melalui aturan adat yang dihormati bersama, masyarakat Papua menunjukkan bahwa pelestarian lingkungan telah menjadi bagian penting dari kehidupan mereka sejak dahulu.",
    location: "Berbagai wilayah di Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/tanam-sasi.jpg",
    tags: ["Lingkungan", "Kearifan Lokal", "Konservasi"],
  },
  {
    id: "papua-wor",
    provinceId: "papua",
    category: "Upacara Adat",
    title: "Wor",
    coordinates: [-1.038, 136.082],
    isLandmark: true,
    description:
      "Wor merupakan tradisi adat masyarakat Biak yang memadukan nyanyian, doa, tarian, dan ungkapan budaya dalam satu rangkaian kegiatan. Tradisi ini dilaksanakan dalam berbagai peristiwa penting seperti kelahiran, pernikahan, penyambutan tamu, serta permohonan keselamatan. Syair-syair dalam Wor mengandung pesan moral dan nilai kehidupan yang diwariskan dari generasi ke generasi.",
    youtubeId: "",
    audio: "/music/papua/upacara-adat-wor.mp3",
    narrator:
      "Melalui lantunan syair, tarian, dan doa, masyarakat Biak menyampaikan rasa syukur, harapan, serta penghormatan kepada leluhur. Tradisi Wor menjadi salah satu warisan budaya yang menjaga identitas masyarakat Biak hingga saat ini.",
    location: "Pulau Biak, Papua",
    period: "Tradisional masyarakat Biak",
    image: "/img/cultures/wor.jpg",
    tags: ["Biak", "Doa", "Tradisi Lisan"],
  },
  {
    id: "papua-kiuturu-nandauw",
    provinceId: "papua",
    category: "Upacara Adat",
    title: "Kiuturu Nandauw",
    coordinates: [-2.533, 140.717],
    isLandmark: true,
    description:
      "Kiuturu Nandauw merupakan salah satu upacara adat Papua yang dilaksanakan sebagai bentuk penghormatan terhadap tradisi dan warisan leluhur. Upacara ini melibatkan partisipasi masyarakat secara bersama-sama dan menjadi momen penting untuk mempererat hubungan sosial antaranggota komunitas. Pelaksanaannya biasanya disertai dengan tarian tradisional, nyanyian daerah, serta prosesi adat yang dipimpin oleh tokoh adat setempat.",
    youtubeId: "",
    narrator:
      "Kiuturu Nandauw menjadi pengingat akan pentingnya menjaga warisan leluhur. Melalui upacara ini, masyarakat Papua mempererat kebersamaan sekaligus meneruskan nilai-nilai budaya kepada generasi berikutnya.",
    location: "Papua",
    period: "Tradisional, diwariskan secara turun-temurun",
    image: "/img/cultures/kiuturu-nandauw.jpg",
    tags: ["Leluhur", "Kebersamaan", "Tradisional"],
  },

  // kerajinan
  {
    id: "papua-noken",
    provinceId: "papua",
    category: "Kerajinan",
    title: "Noken Papua",
    coordinates: [-3.3, 135.5],
    isLandmark: true,
    description:
      "Noken merupakan tas tradisional khas Papua yang dibuat secara manual menggunakan serat tumbuhan, kulit kayu, atau benang yang dianyam dengan teknik khusus. Noken digunakan untuk membawa berbagai kebutuhan sehari-hari, seperti hasil panen, kayu bakar, hingga menggendong bayi. Bagi masyarakat Papua, noken bukan sekadar tas, tetapi juga simbol kerja keras, tanggung jawab, dan kedekatan dengan alam. Karena nilai budayanya yang tinggi, UNESCO telah menetapkan Noken sebagai Warisan Budaya Tak Benda yang perlu dilestarikan.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/kerajinan-noken.mp3",
    narrator:
      "Setiap simpul pada Noken menyimpan kisah tentang kehidupan masyarakat Papua. Dibuat dengan penuh kesabaran, Noken bukan hanya alat untuk membawa barang, tetapi juga simbol kasih sayang, tanggung jawab, dan warisan budaya yang terus diwariskan dari generasi ke generasi.",
    location: "Seluruh Papua",
    period: "Tradisi masyarakat Papua, diwariskan secara turun-temurun",
    image: "/img/cultures/noken.jpg",
    tags: ["UNESCO", "Anyaman", "Tradisional"],
  },
  {
    id: "papua-ukiran-asmat",
    provinceId: "papua",
    category: "Kerajinan",
    title: "Ukiran Asmat",
    coordinates: [-5.55, 138.1],
    isLandmark: true,
    description:
      "Ukiran Asmat merupakan kerajinan tradisional khas masyarakat Asmat di Papua Selatan yang dibuat dari kayu pilihan dan dipahat secara manual. Setiap ukiran memiliki motif yang berbeda, menggambarkan kehidupan masyarakat, alam, hewan, maupun kisah para leluhur. Bagi masyarakat Asmat, ukiran tidak hanya dipandang sebagai karya seni, tetapi juga sebagai sarana untuk menjaga hubungan dengan sejarah dan tradisi leluhur.",
    youtubeId: "",
    audio: "/music/papua/kerajinan-ukiran-asmat.mp3",
    narrator:
      "Di tangan para pengrajin Asmat, sepotong kayu berubah menjadi karya seni yang penuh makna. Setiap pahatan menceritakan kisah tentang leluhur, kehidupan, dan hubungan erat masyarakat Asmat dengan alam sekitarnya.",
    location: "Kabupaten Asmat, Papua Selatan",
    period: "Tradisi masyarakat Asmat, diwariskan secara turun-temurun",
    image: "/img/cultures/ukiran-asmat.jpg",
    tags: ["Kayu", "Leluhur", "Seni Ukir"],
  },
  {
    id: "papua-patung-asmat",
    provinceId: "papua",
    category: "Kerajinan",
    title: "Patung Asmat",
    coordinates: [-5.55, 138.1],
    isLandmark: true,
    description:
      "Patung Asmat merupakan hasil kerajinan tradisional masyarakat Asmat yang dibuat dari kayu dan dipahat secara manual. Patung ini umumnya menggambarkan manusia, leluhur, atau simbol-simbol yang memiliki arti penting dalam kehidupan masyarakat. Selain sebagai karya seni, patung Asmat juga menjadi simbol penghormatan kepada leluhur dan bagian penting dari berbagai ritual adat.",
    youtubeId: "",
    narrator:
      "Patung Asmat bukan sekadar karya seni, tetapi juga wujud penghormatan kepada leluhur. Melalui setiap pahatan, masyarakat Asmat menjaga nilai-nilai budaya dan mewariskan kisah kehidupan kepada generasi berikutnya.",
    location: "Kabupaten Asmat, Papua Selatan",
    period: "Tradisi masyarakat Asmat, diwariskan secara turun-temurun",
    image: "/img/cultures/patung-asmat.jpg",
    tags: ["Patung", "Leluhur", "Tradisional"],
  },
  {
    id: "papua-lukisan-kulit-kayu",
    provinceId: "papua",
    category: "Kerajinan",
    title: "Lukisan Kulit Kayu Papua",
    coordinates: [-2.533, 140.717],
    isLandmark: true,
    description:
      "Lukisan Kulit Kayu Papua merupakan kerajinan tradisional yang menggunakan kulit kayu sebagai media berkarya. Setelah melalui proses pengolahan, permukaan kulit kayu dihiasi dengan berbagai motif khas yang terinspirasi dari alam, kehidupan masyarakat, hewan, tumbuhan, serta simbol budaya. Kerajinan ini menjadi sarana untuk menyampaikan cerita, pengetahuan, dan nilai-nilai budaya yang diwariskan secara turun-temurun.",
    youtubeId: "",
    narrator:
      "Melalui goresan motif pada lembaran kulit kayu, masyarakat Papua menceritakan kisah tentang alam, kehidupan, dan warisan leluhur. Setiap lukisan menjadi bukti eratnya hubungan masyarakat Papua dengan lingkungan sekitarnya.",
    location: "Berbagai wilayah di Papua",
    period: "Tradisi masyarakat Papua, diwariskan secara turun-temurun",
    image: "/img/cultures/lukisan-kulit-kayu.jpg",
    tags: ["Kulit Kayu", "Seni Tradisional", "Motif Khas"],
  },

  // Cerita Rakyat
  {
    id: "papua-cerita-rakyat-cendrawasih",
    provinceId: "papua",
    category: "Cerita Rakyat",
    title: "Asal Usul Burung Cendrawasih",
    coordinates: [-2.9, 132.3],
    isLandmark: true,
    description:
      "Di daerah Fakfak, tepatnya di Pegunungan Bumberi, hiduplah seorang perempuan tua bersama seekor anjing betina. Keduanya hidup bahagia dengan mengandalkan hasil hutan untuk bertahan hidup. Suatu hari, setelah memakan buah pandan, anjing tersebut melahirkan seekor anak anjing, sementara perempuan tua itu melahirkan seorang anak laki-laki bernama Kweiya. Kweiya tumbuh menjadi pemuda yang rajin membuka hutan untuk berkebun. Suatu ketika, seorang pria tua datang dan membantu Kweiya dengan memberikan kapak besi. Pria tersebut kemudian diterima sebagai bagian dari keluarga dan memiliki beberapa anak bersama ibu Kweiya. Namun, seiring waktu, saudara-saudara tiri Kweiya merasa iri dan menyakitinya. Merasa sedih dan kecewa, Kweiya mengasingkan diri hingga akhirnya berubah menjadi seekor burung yang indah bersama ibunya. Burung tersebut kemudian dikenal sebagai Burung Cenderawasih. Sementara saudara-saudaranya yang menyesal juga berubah menjadi berbagai jenis burung lain yang memenuhi hutan Papua. Legenda ini menjelaskan asal mula munculnya Burung Cenderawasih serta berbagai jenis burung yang hidup di hutan Papua.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/cerita-rakyat-burung-cendrawasih.mp3",
    narrator:
      "Dahulu di Pegunungan Bumberi, hiduplah seorang pemuda bernama Kweiya bersama ibunya. Kweiya dikenal sebagai anak yang rajin dan baik hati. Namun, rasa iri dari saudara-saudara tirinya membuat hidupnya berubah. Setelah disakiti oleh mereka, Kweiya memilih mengasingkan diri. Dalam kesedihan yang mendalam, ia dan ibunya berubah menjadi burung yang sangat indah. Masyarakat Papua percaya bahwa sejak saat itulah Burung Cenderawasih hadir sebagai lambang keindahan, kasih sayang, dan warisan leluhur Papua.",
    location: "Pegunungan Bumberi, Fakfak, Papua Barat",
    period: "Legenda masyarakat adat Papua",
    image: "/img/cultures/cendrawasih.jpg",
    tags: ["Legenda", "Burung", "Mitologi", "Fakfak", "Cenderawasih"],
  },
  {
    id: "papua-cerita-rakyat-danau-sentani",
    provinceId: "papua",
    category: "Cerita Rakyat",
    title: "Asal Usul Danau Sentani",
    coordinates: [-2.6, 140.5],
    isLandmark: true,
    description:
      "Menurut cerita rakyat masyarakat Sentani, dahulu penduduk Kampung Yomoko hidup tanpa air dan api. Haboi bersama Ondofolo Wally kemudian melakukan perjalanan menuju Gunung Dobonsolo untuk meminta air kepada Dobonai, penguasa air. Setelah melalui perjalanan panjang dan memenuhi syarat yang diberikan, mereka berhasil memperoleh air suci. Namun, dalam perjalanan pulang mereka tergoda untuk berburu sehingga wadah yang berisi air tersebut pecah. Air suci itu kemudian mengalir deras dan menggenangi dataran rendah hingga membentuk sebuah danau yang sangat luas. Danau tersebut kemudian dikenal sebagai Danau Sentani. Legenda ini menjadi bagian penting dari identitas budaya masyarakat Sentani serta menggambarkan hubungan erat manusia dengan alam.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/cerita-rakyat-danau-sentani.mp3",
    narrator:
      "Konon, Haboi dan Ondofolo Wally melakukan perjalanan panjang ke Gunung Dobonsolo untuk mendapatkan air bagi masyarakatnya. Setelah berhasil membawa pulang air suci, mereka tergoda berburu di tengah perjalanan. Tanpa disadari, wadah berisi air itu pecah dan airnya mengalir deras hingga membentuk sebuah danau yang sangat luas. Masyarakat Papua percaya bahwa peristiwa inilah yang melahirkan Danau Sentani, sumber kehidupan yang masih lestari hingga sekarang.",
    location: "Danau Sentani, Kabupaten Jayapura, Papua",
    period: "Legenda masyarakat Sentani",
    image: "/img/cultures/danau-sentani.jpg",
    tags: ["Legenda", "Danau", "Sentani", "Mitologi", "Alam"],
  },
  {
    id: "papua-cerita-rakyat-kasuari-dan-dara-mahkota",
    provinceId: "papua",
    category: "Cerita Rakyat",
    title: "Kasuari dan Dara Mahkota",
    coordinates: [-4.0, 138.0],
    isLandmark: true,
    description:
      "Dahulu kala, Kasuari adalah burung yang memiliki sayap besar dan mampu terbang dengan sangat baik. Namun, karena kesombongannya, Kasuari sering berlaku curang dan tidak mau berbagi makanan dengan burung-burung lain. Merasa kesal, para burung sepakat mengadakan perlombaan terbang untuk memberi pelajaran kepada Kasuari. Burung Dara Mahkota yang bertubuh kecil kemudian mengajukan diri sebagai lawannya. Dengan kecerdikan yang dimilikinya, Dara Mahkota berhasil memperdaya Kasuari sehingga sayap Kasuari patah dan tidak lagi dapat digunakan untuk terbang. Sejak saat itu, menurut legenda, Kasuari kehilangan kemampuan terbang dan hanya dapat berjalan di tanah. Cerita ini mengajarkan pentingnya sikap rendah hati serta tidak bersikap sombong terhadap sesama.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Dahulu, Kasuari adalah burung yang dapat terbang tinggi. Karena merasa paling kuat, ia sering bersikap sombong dan tidak mau berbagi makanan dengan burung lain. Suatu hari, Dara Mahkota menantangnya dalam perlombaan terbang. Dengan kecerdikannya, Dara Mahkota berhasil mengalahkan Kasuari. Sejak saat itu, Kasuari kehilangan kemampuan terbang dan belajar bahwa kesombongan hanya akan membawa penyesalan.",
    location: "Papua",
    period: "Cerita rakyat masyarakat Papua",
    image: "/img/cultures/kasuari-dan-dara-mahkota.jpg",
    tags: ["Fabel", "Burung", "Pesan Moral", "Kasuari", "Dara Mahkota"],
  },

  // Rumah Adat
  {
  id: "papua-honai",
  provinceId: "papua",
  category: "Rumah Adat",
  title: "Rumah Honai",
  coordinates: [-4.083, 138.950],
  isLandmark: true,
  description:
    "Rumah Honai merupakan rumah adat khas masyarakat suku Dani yang mendiami wilayah Lembah Baliem di Papua Pegunungan. Rumah ini memiliki bentuk bulat dengan atap kerucut yang terbuat dari jerami atau ilalang, serta dinding yang disusun dari kayu. Berbeda dengan rumah pada umumnya, Honai tidak memiliki jendela dan hanya memiliki satu pintu kecil. Desain tersebut dibuat untuk menjaga suhu di dalam rumah tetap hangat karena wilayah pegunungan Papua memiliki udara yang sangat dingin, terutama pada malam hari.\n\nSelain sebagai tempat tinggal, Honai menjadi pusat kehidupan keluarga masyarakat Dani. Di dalam rumah inilah anggota keluarga berkumpul, beristirahat, berdiskusi, serta mewariskan berbagai pengetahuan, adat istiadat, dan nilai-nilai kehidupan kepada generasi muda. Bangunan ini juga menjadi bukti bagaimana masyarakat Papua mampu memanfaatkan bahan-bahan alami yang tersedia di lingkungan sekitar untuk menciptakan hunian yang nyaman.\n\nHingga sekarang, Rumah Honai tetap menjadi salah satu ikon budaya Papua. Keunikannya terletak pada bentuk arsitekturnya yang sederhana namun mampu menjaga kehangatan secara alami, sekaligus mencerminkan nilai kebersamaan, kekeluargaan, dan keharmonisan masyarakat dengan alam.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/Rumah adat - Honai.mp3",
  narrator:
    "Rumah Honai merupakan rumah adat khas masyarakat suku Dani yang mendiami wilayah Lembah Baliem di Papua Pegunungan. Rumah ini memiliki bentuk bulat dengan atap kerucut yang terbuat dari jerami atau ilalang, serta dinding yang disusun dari kayu. Berbeda dengan rumah pada umumnya, Honai tidak memiliki jendela dan hanya memiliki satu pintu kecil. Desain tersebut dibuat untuk menjaga suhu di dalam rumah tetap hangat karena wilayah pegunungan Papua memiliki udara yang sangat dingin, terutama pada malam hari.\n\nSelain sebagai tempat tinggal, Honai menjadi pusat kehidupan keluarga masyarakat Dani. Di dalam rumah inilah anggota keluarga berkumpul, beristirahat, berdiskusi, serta mewariskan berbagai pengetahuan, adat istiadat, dan nilai-nilai kehidupan kepada generasi muda. Bangunan ini juga menjadi bukti bagaimana masyarakat Papua mampu memanfaatkan bahan-bahan alami yang tersedia di lingkungan sekitar untuk menciptakan hunian yang nyaman.\n\nHingga sekarang, Rumah Honai tetap menjadi salah satu ikon budaya Papua. Keunikannya terletak pada bentuk arsitekturnya yang sederhana namun mampu menjaga kehangatan secara alami, sekaligus mencerminkan nilai kebersamaan, kekeluargaan, dan keharmonisan masyarakat dengan alam.",
  location: "Lembah Baliem, Papua Pegunungan",
  period: "Tradisi masyarakat suku Dani",
  image: "/img/cultures/honai.jpg",
  tags: ["Honai", "Suku Dani", "Lembah Baliem", "Rumah Adat"],
},

{
  id: "papua-ebei",
  provinceId: "papua",
  category: "Rumah Adat",
  title: "Rumah Ebei",
  coordinates: [-4.082, 138.951],
  isLandmark: true,
  description:
    "Rumah Ebei merupakan rumah adat yang digunakan oleh perempuan dan anak-anak dalam kehidupan masyarakat suku Dani di Papua. Bentuk bangunannya hampir menyerupai Rumah Honai dengan atap jerami berbentuk kerucut dan dinding kayu, namun memiliki fungsi yang berbeda sesuai pembagian peran dalam kehidupan adat.\n\nRumah ini menjadi tempat para perempuan menjalankan berbagai aktivitas sehari-hari, mulai dari beristirahat, mengurus kebutuhan keluarga, hingga mengajarkan keterampilan hidup kepada anak-anak. Berbagai nilai budaya, adat istiadat, serta kebiasaan masyarakat diwariskan dari generasi ke generasi melalui kehidupan sehari-hari di dalam Ebei.\n\nKeberadaan Rumah Ebei menunjukkan bahwa masyarakat Dani memiliki sistem kehidupan keluarga yang teratur dan saling melengkapi. Rumah ini menjadi simbol pentingnya peran perempuan dalam menjaga keharmonisan keluarga sekaligus melestarikan tradisi budaya Papua.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Rumah Ebei merupakan rumah adat yang diperuntukkan bagi perempuan dan anak-anak dalam masyarakat suku Dani. Bentuknya hampir sama dengan Rumah Honai, tetapi memiliki fungsi yang berbeda dalam kehidupan sehari-hari. Di rumah inilah para ibu mengurus keluarga, mendidik anak-anak, serta mengajarkan berbagai keterampilan dan nilai budaya yang diwariskan oleh leluhur. Kehadiran Ebei menunjukkan bahwa masyarakat Dani memiliki pembagian peran yang jelas antara anggota keluarga sehingga kehidupan masyarakat berjalan dengan tertib. Rumah ini juga menjadi tempat tumbuhnya ikatan kekeluargaan yang erat serta pusat pembelajaran budaya bagi generasi muda. Hingga kini, Ebei tetap menjadi bagian penting dari kehidupan tradisional masyarakat Papua.",
  location: "Lembah Baliem, Papua Pegunungan",
  period: "Tradisi masyarakat suku Dani",
  image: "/img/cultures/ebei.jpg",
  tags: ["Ebei", "Suku Dani", "Perempuan", "Rumah Adat"],
},

{
  id: "papua-wamai",
  provinceId: "papua",
  category: "Rumah Adat",
  title: "Rumah Wamai",
  coordinates: [-4.084, 138.949],
  isLandmark: true,
  description:
    "Rumah Wamai merupakan bangunan tradisional masyarakat Papua yang digunakan sebagai kandang atau tempat memelihara babi. Dalam kehidupan masyarakat Papua, terutama pada berbagai suku di wilayah pegunungan, babi memiliki kedudukan yang sangat penting, bukan hanya sebagai hewan ternak tetapi juga sebagai simbol kesejahteraan, status sosial, dan bagian dari berbagai upacara adat.\n\nBabi sering digunakan dalam pesta adat, pembayaran mas kawin, penyelesaian sengketa, hingga berbagai bentuk penghormatan dalam kehidupan masyarakat. Oleh karena itu, Wamai dibangun secara khusus untuk menjaga dan merawat hewan tersebut agar tetap sehat.\n\nKeberadaan Rumah Wamai menunjukkan eratnya hubungan antara kehidupan masyarakat Papua dengan tradisi yang diwariskan oleh leluhur. Bangunan ini menjadi bagian penting dari kompleks rumah adat yang mendukung keberlangsungan kehidupan sosial dan budaya masyarakat Papua.",
  youtubeId: "cyJ9fpoYh_M",
  narrator:
    "Rumah Wamai merupakan bangunan tradisional yang digunakan masyarakat Papua sebagai tempat memelihara babi, hewan yang memiliki nilai ekonomi dan budaya yang sangat tinggi. Dalam kehidupan masyarakat adat, babi bukan hanya dipelihara sebagai ternak, tetapi juga digunakan dalam berbagai upacara adat, pesta budaya, hingga simbol kehormatan dan kesejahteraan keluarga. Karena memiliki peran yang sangat penting, masyarakat membangun Wamai sebagai tempat khusus untuk merawat ternak tersebut. Kehadiran rumah ini menunjukkan bagaimana kehidupan masyarakat Papua sangat erat kaitannya dengan adat dan tradisi yang diwariskan turun-temurun. Wamai menjadi bukti bahwa setiap bangunan dalam budaya Papua memiliki fungsi yang penting bagi kehidupan masyarakatnya.",
  location: "Papua",
  period: "Tradisi masyarakat Papua",
  image: "/img/cultures/wamai.jpg",
  tags: ["Wamai", "Babi", "Rumah Adat", "Papua"],
},

{
  id: "papua-kariwari",
  provinceId: "papua",
  category: "Rumah Adat",
  title: "Rumah Kariwari",
  coordinates: [-2.600, 140.520],
  isLandmark: true,
  description:
    "Rumah Kariwari merupakan rumah adat yang berasal dari masyarakat Tobati dan Enggros di kawasan Danau Sentani, Papua. Berbeda dengan rumah adat Papua lainnya yang umumnya berbentuk bulat, Kariwari memiliki bentuk segi delapan dengan atap yang menjulang tinggi sehingga menjadi ciri khas tersendiri.\n\nPada masa lalu, rumah ini digunakan sebagai tempat pendidikan adat bagi anak laki-laki yang mulai memasuki usia remaja. Di dalam Kariwari, mereka dibimbing untuk mempelajari adat istiadat, keterampilan hidup, kepemimpinan, serta tanggung jawab sebagai anggota masyarakat. Rumah ini menjadi tempat penting dalam membentuk karakter dan mempersiapkan generasi penerus.\n\nHingga kini, Rumah Kariwari dikenal sebagai salah satu simbol pendidikan tradisional masyarakat Papua. Keunikan bentuk arsitekturnya berpadu dengan nilai-nilai budaya yang menekankan pentingnya pendidikan karakter dan pelestarian adat istiadat.",
  youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/Rumah adat - Kariwari.mp3",
  narrator:
    "Rumah Kariwari merupakan rumah adat yang berasal dari masyarakat Tobati dan Enggros di kawasan Danau Sentani, Papua. Berbeda dengan rumah adat Papua lainnya yang umumnya berbentuk bulat, Kariwari memiliki bentuk segi delapan dengan atap yang menjulang tinggi sehingga menjadi ciri khas tersendiri.\n\nPada masa lalu, rumah ini digunakan sebagai tempat pendidikan adat bagi anak laki-laki yang mulai memasuki usia remaja. Di dalam Kariwari, mereka dibimbing untuk mempelajari adat istiadat, keterampilan hidup, kepemimpinan, serta tanggung jawab sebagai anggota masyarakat. Rumah ini menjadi tempat penting dalam membentuk karakter dan mempersiapkan generasi penerus.\n\nHingga kini, Rumah Kariwari dikenal sebagai salah satu simbol pendidikan tradisional masyarakat Papua. Keunikan bentuk arsitekturnya berpadu dengan nilai-nilai budaya yang menekankan pentingnya pendidikan karakter dan pelestarian adat istiadat.",
  location: "Danau Sentani, Jayapura, Papua",
  period: "Tradisi masyarakat Tobati dan Enggros",
  image: "/img/cultures/kariwari.jpg",
  tags: ["Kariwari", "Danau Sentani", "Tobati", "Enggros"],
},

  // senjata tradisional
  {
    id: "papua-panah",
    provinceId: "papua",
    category: "Senjata",
    title: "Busur dan Panah Papua",
    coordinates: [-3.3, 138.5],
    isLandmark: true,
    description:
      "Busur dan panah merupakan senjata tradisional yang sangat dikenal di Papua dan telah digunakan oleh berbagai suku sejak zaman dahulu. Senjata ini dibuat dari bahan-bahan alami seperti kayu, bambu, dan serat tumbuhan yang mudah ditemukan di lingkungan sekitar. Anak panah biasanya memiliki ujung yang diruncingkan agar lebih efektif digunakan. Bagi masyarakat Papua, busur dan panah bukan hanya alat berburu, tetapi juga melambangkan keterampilan, ketelitian, dan kemampuan bertahan hidup. Pada masa lalu, senjata ini digunakan untuk berburu hewan di hutan serta melindungi diri dari ancaman. Kini, busur dan panah lebih sering digunakan dalam festival budaya, pertunjukan adat, dan berbagai kegiatan pelestarian tradisi. Keunikan senjata ini terletak pada bahan pembuatannya yang berasal dari alam serta teknik penggunaannya yang membutuhkan konsentrasi dan ketepatan tinggi.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/senjata-busur-dan-panah.mp3",
    narrator:
      "Sejak kecil, anak-anak Papua belajar memegang busur dan mengarahkan panah dengan penuh ketelitian. Di tengah hutan, kemampuan memanah menjadi bekal penting untuk berburu dan bertahan hidup. Hingga kini, busur dan panah tetap diwariskan dari generasi ke generasi sebagai simbol keterampilan, keberanian, dan warisan budaya masyarakat Papua.",
    location: "Seluruh Papua",
    period: "Senjata tradisional masyarakat Papua",
    image: "/img/cultures/panah-papua.jpg",
    tags: ["Berburu", "Keahlian", "Warisan", "Tradisional"],
  },
  {
    id: "papua-pisau-belati",
    provinceId: "papua",
    category: "Senjata",
    title: "Pisau Belati Papua",
    coordinates: [-4.0, 138.0],
    isLandmark: true,
    description:
      "Pisau belati merupakan senjata tradisional Papua yang biasanya dibuat dari tulang hewan, batu, atau bahan alami lainnya yang diolah menjadi bilah tajam. Ukurannya yang relatif kecil membuat senjata ini mudah dibawa dan digunakan dalam berbagai aktivitas. Selain berfungsi sebagai alat pertahanan diri, pisau belati juga digunakan untuk berburu, mengolah hasil buruan, dan membantu berbagai pekerjaan sehari-hari. Keberadaan pisau belati mencerminkan keterampilan masyarakat Papua dalam memanfaatkan sumber daya alam yang tersedia di sekitarnya. Saat ini, senjata ini lebih banyak digunakan sebagai perlengkapan adat dan simbol kekayaan budaya Papua.",
    youtubeId: "cyJ9fpoYh_M",
    audio: "/music/papua/senjata-pisau-belati.mp3",
    narrator:
      "Bagi masyarakat Papua, pisau belati bukan sekadar senjata. Dengan bilah tajam yang dibuat dari bahan alami, alat ini membantu berbagai aktivitas sehari-hari, mulai dari berburu hingga mengolah hasil hutan. Hingga kini, pisau belati tetap dipertahankan sebagai bagian dari identitas budaya dan warisan leluhur Papua.",
    location: "Seluruh Papua",
    period: "Senjata tradisional masyarakat Papua",
    image: "/img/cultures/pisau-belati-papua.jpg",
    tags: ["Belati", "Tradisional", "Warisan", "Pertahanan"],
  },
  {
    id: "papua-kapak-batu",
    provinceId: "papua",
    category: "Senjata",
    title: "Kapak Batu Papua",
    coordinates: [-4.1, 138.9],
    isLandmark: true,
    description:
      "Kapak batu merupakan salah satu alat sekaligus senjata tradisional yang telah digunakan oleh masyarakat Papua sejak masa lampau. Kapak ini dibuat dengan mengikat batu yang telah diasah pada gagang kayu menggunakan serat tumbuhan atau bahan alami lainnya. Pada masa lalu, kapak batu digunakan untuk menebang pohon, membuat peralatan, berburu, dan berbagai kebutuhan sehari-hari. Kehadirannya menunjukkan kemampuan masyarakat Papua dalam mengolah bahan-bahan alami menjadi alat yang kuat dan tahan lama. Saat ini, kapak batu lebih banyak dijadikan simbol budaya dan benda koleksi yang menggambarkan kehidupan masyarakat Papua pada masa lampau.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Jauh sebelum mengenal logam, masyarakat Papua telah menciptakan kapak batu untuk membantu kehidupan sehari-hari. Dengan alat sederhana ini, mereka membuka hutan, membuat peralatan, dan memenuhi kebutuhan hidup. Hingga sekarang, kapak batu tetap dikenang sebagai bukti kecerdasan dan keterampilan leluhur Papua dalam memanfaatkan alam.",
    location: "Wilayah Pegunungan Papua",
    period: "Masa prasejarah hingga tradisi masyarakat Papua",
    image: "/img/cultures/kapak-batu-papua.jpg",
    tags: ["Prasejarah", "Alat Tradisional", "Warisan", "Batu"],
  },
  {
    id: "papua-tombak",
    provinceId: "papua",
    category: "Senjata",
    title: "Tombak Papua",
    coordinates: [-3.8, 137.2],
    isLandmark: true,
    description:
      "Tombak merupakan salah satu senjata tradisional yang banyak digunakan oleh masyarakat Papua. Senjata ini terdiri dari gagang panjang yang terbuat dari kayu dengan ujung yang diruncingkan atau dilengkapi mata tombak dari bahan tertentu. Tombak telah menjadi bagian penting dalam kehidupan masyarakat Papua selama bertahun-tahun, baik sebagai alat berburu maupun sebagai simbol keberanian. Pada masa lalu, tombak digunakan untuk berburu hewan berukuran besar serta melindungi diri dari ancaman. Saat ini, tombak lebih sering dijumpai dalam pertunjukan budaya, festival adat, dan berbagai kegiatan pelestarian budaya. Keunikan tombak Papua terletak pada bentuknya yang sederhana namun efektif serta teknik pembuatannya yang masih mempertahankan tradisi leluhur.",
    youtubeId: "cyJ9fpoYh_M",
    narrator:
      "Di tangan masyarakat Papua, tombak menjadi simbol keberanian dan ketangguhan. Senjata ini telah digunakan sejak dahulu untuk berburu dan melindungi kelompok. Meski zaman telah berubah, tombak masih sering ditampilkan dalam upacara adat dan festival budaya sebagai pengingat akan semangat serta warisan leluhur Papua.",
    location: "Seluruh Papua",
    period: "Senjata tradisional masyarakat Papua",
    image: "/img/cultures/tombak-papua.jpg",
    tags: ["Keberanian", "Berburu", "Tradisional", "Warisan"],
  },
];

export const getCulturesByProvince = (provinceId) =>
  CULTURES.filter(c => c.provinceId === provinceId);

export const getCulturesByCategory = (provinceId, category) => {
  if (category === 'Semua') {
    return getCulturesByProvince(provinceId);
  }
  return CULTURES.filter(c => c.provinceId === provinceId && c.category === category);
};

export const getCultureById = (id) => CULTURES.find(c => c.id === id);

/** Returns all cultures — used by generateStaticParams to pre-render culture pages at build time. */
export const getCultures = () => CULTURES;
