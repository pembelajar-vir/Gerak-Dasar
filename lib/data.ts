// Data Konfigurasi Pembelajaran PJOK SD: Variasi & Kombinasi Gerak Dasar
// Terbuka, modular, dan mudah dikustomisasi oleh pendidik

export interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
  indicator: string;
}

export interface MaterialTopic {
  id: string;
  category: 'lokomotor' | 'non-lokomotor' | 'manipulatif' | 'kombinasi';
  title: string;
  subtitle: string;
  definition: string;
  keyExamples: string[];
  tipsAman: string;
  biomekanika: string;
  quizQuick: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MissionActivity {
  id: string;
  stageNumber: number;
  title: string;
  type: 'lokomotor' | 'non-lokomotor' | 'manipulatif' | 'kombinasi' | 'kuis';
  instruction: string;
  targetMotion: 'jump' | 'squat' | 'left' | 'right' | 'run' | 'catch';
  targetCount: number;
  timeLimitSec: number;
  pedagogicalFeedbackCorrect: string;
  pedagogicalFeedbackIncorrect: string;
  conceptReinforcement: string;
}

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedbackCorrect: string;
  feedbackWrong: string;
  category: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  nip: string;
  unitKerja: string;
  email: string;
  avatarUrl: string;
  photoPageUrl: string;
}

export const DEVELOPER_INFO: DeveloperProfile = {
  name: 'Robiyanto, S.Pd.',
  title: 'Guru PJOK & Pengembang Media Pembelajaran Interaktif',
  nip: '199307202019021005',
  unitKerja: 'SD Negeri 2 Kebondalem, Banjarnegara',
  email: 'robiyantospd07@guru.sd.belajar.id',
  avatarUrl: 'https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png',
  photoPageUrl: 'https://ibb.co.com/ynYY4X34',
};

export const CP_TP_DATA = {
  fase: 'Fase B & C (Kelas 3 - 6 SD)',
  elemen: 'Keterampilan Gerak & Pengetahuan Gerak',
  capaianPembelajaran:
    'Pada akhir fase ini, peserta didik dapat menunjukkan kemampuan dalam mempraktikkan variasi dan kombinasi pola gerak dasar lokomotor, non-lokomotor, dan manipulatif secara mandiri, berkoordinasi, berirama, dan bersemangat dalam berbagai bentuk aktivitas jasmani dan permainan anak sederhana.',
  tujuanPembelajaran: [
    {
      id: 'tp-1',
      code: 'TP 1.1',
      title: 'Identifikasi Gerak Dasar',
      description: 'Siswa mampu membedakan ciri utama gerak lokomotor, non-lokomotor, dan manipulatif dengan tepat.',
      indicator: 'Menyebutkan contoh dan klasifikasi gerak tanpa tertukar.',
    },
    {
      id: 'tp-2',
      code: 'TP 1.2',
      title: 'Praktik Variasi Gerak',
      description: 'Siswa mampu melakukan variasi kecepatan (lambat-cepat) dan arah gerak (depan, samping, atas).',
      indicator: 'Melakukan gerak lari di tempat, lompat tinggi, dan liukan badan terarah.',
    },
    {
      id: 'tp-3',
      code: 'TP 1.3',
      title: 'Integrasi Kombinasi Gerak',
      description: 'Siswa mempraktikkan gabungan 2 atau 3 pola gerak secara berurutan dan mengalir.',
      indicator: 'Melakukan kombinasi lari-menekuk-lompat atau tangkap bola virtual.',
    },
    {
      id: 'tp-4',
      code: 'TP 1.4',
      title: 'Sikap Sportif & Keselamatan',
      description: 'Siswa memelihara ruang gerak aman, percaya diri, dan mematuhi panduan aktivitas PID.',
      indicator: 'Menjaga jarak aman di depan sensor kamera PID tanpa bertubrukan.',
    },
  ],
  pidTips: [
    'Pastikan pencahayaan ruangan kelas cukup terang agar kamera PID mendeteksi siluet tubuh dengan akurat.',
    'Posisikan siswa berjarak 1,5 hingga 2,5 meter di depan kamera Papan Interaktif Digital.',
    'Jika menggunakan mode kelompok, atur giliran siswa secara bergantian 1 siswa per putaran tantangan gerak.',
    'Gunakan mode layar sentuh PID jika ruang kelas sempit atau siswa memerlukan adaptasi motorik khusus.',
  ],
};

export const MATERIAL_TOPICS: MaterialTopic[] = [
  {
    id: 'mat-lokomotor',
    category: 'lokomotor',
    title: 'Gerak Lokomotor',
    subtitle: 'Gerak Berpindah Tempat',
    definition:
      'Gerak lokomotor adalah keterampilan gerak tubuh yang menyebabkan seluruh anggota tubuh berpindah dari satu titik ke titik lainnya di dalam ruang gerak.',
    keyExamples: [
      'Berjalan (langkah teratur dengan satu kaki selalu menapak tanah)',
      'Berlari (fase melayang singkat saat kedua kaki tidak menyentuh tanah)',
      'Melompat (menolak dengan SATU kaki, mendarat dengan DUA kaki)',
      'Meloncat (menolak dengan DUA kaki, mendarat dengan DUA kaki)',
      'Berderap dan Meluncur (galloping & sliding menyamping)',
    ],
    tipsAman: 'Selalu mendarat dengan lutut sedikit mengeper (fleksi) untuk meredam benturan pada sendi.',
    biomekanika: 'Arahkan pandangan ke depan dan ayunkan lengan berlawanan dengan langkah kaki untuk menjaga keseimbangan.',
    quizQuick: {
      question: 'Manakah di bawah ini yang merupakan contoh gerak lokomotor?',
      options: ['Mengayun lengan di tempat', 'Meloncat ke depan melewati rintangan', 'Meliukkan pinggang ke kiri'],
      correctIndex: 1,
      explanation: 'Tepat sekali! Meloncat ke depan menyebabkan tubuh berpindah posisi, sehingga termasuk gerak lokomotor.',
    },
  },
  {
    id: 'mat-nonlokomotor',
    category: 'non-lokomotor',
    title: 'Gerak Non-Lokomotor',
    subtitle: 'Gerak Tanpa Berpindah Tempat',
    definition:
      'Gerak non-lokomotor adalah keterampilan gerak yang dilakukan oleh bagian tubuh tertentu tanpa menyebabkan tubuh berpindah posisi dari tempat semula.',
    keyExamples: [
      'Membungkuk (menekuk sendi panggul ke depan)',
      'Mengayun (gerakan lengan atau tungkai melingkar bolak-balik)',
      'Meliuk (merotasi atau melengkungkan tubuh ke samping/belakang)',
      'Memutar (rotasi sumbu tubuh seperti poros kepala atau bahu)',
      'Meregang (peregangan statis otot lengan, punggung, dan kaki)',
    ],
    tipsAman: 'Lakukan pemanasan peregangan secara bertahap dan jangan memaksakan sendi melebihi batas kelenturan.',
    biomekanika: 'Kaki menjadi tumpuan kokoh (base of support) di lantai sementara bagian tubuh atas bergerak dinamis.',
    quizQuick: {
      question: 'Saat kamu merentangkan tangan lalu meliukkan badan ke samping kanan dan kiri di tempat, kamu melakukan...',
      options: ['Gerak Non-Lokomotor', 'Gerak Manipulatif', 'Gerak Lokomotor'],
      correctIndex: 0,
      explanation: 'Hebat! Tubuhmu tetap berada di tempat yang sama saat meliuk, itu adalah ciri khas gerak non-lokomotor.',
    },
  },
  {
    id: 'mat-manipulatif',
    category: 'manipulatif',
    title: 'Gerak Manipulatif',
    subtitle: 'Gerak Memakai Objek / Alat',
    definition:
      'Gerak manipulatif adalah keterampilan gerak tubuh yang melibatkan penguasaan, pengendalian, dan koordinasi dengan sebuah benda atau alat (seperti bola, simpai, raket, atau tongkat).',
    keyExamples: [
      'Melempar (mendorong objek menjauh dengan koordinasi lengan dan jari)',
      'Menangkap (menerima dan menghentikan objek bergerak dengan kedua tangan)',
      'Menendang & Menggiring (mengarahkan bola menggunakan berbagai sisi kaki)',
      'Memukul (mengontak objek dengan tangan atau alat pemukul/raket)',
    ],
    tipsAman: 'Fokuskan pandangan mata selalu pada arah datangnya benda sebelum melakukan kontak fisik.',
    biomekanika: 'Koordinasi mata-tangan (hand-eye coordination) dan mata-kaki merupakan fondasi utama gerak manipulatif.',
    quizQuick: {
      question: 'Aktivitas menangkap bola kasti yang melambung di udara termasuk jenis gerak apa?',
      options: ['Gerak Lokomotor Murni', 'Gerak Manipulatif', 'Gerak Statis'],
      correctIndex: 1,
      explanation: 'Bagus sekali! Karena ada objek (bola) yang dikontrol dan ditangkap, gerakan ini adalah gerak manipulatif.',
    },
  },
  {
    id: 'mat-kombinasi',
    category: 'kombinasi',
    title: 'Variasi & Kombinasi Gerak',
    subtitle: 'Integrasi Gerak Cerdas Olahraga',
    definition:
      'Variasi adalah melakukan satu gerak dengan berbagai cara (misal: jalan cepat, lambat, zig-zag). Kombinasi adalah merangkaikan dua atau tiga jenis gerak dasar berbeda menjadi satu rangkaian utuh yang terpadu.',
    keyExamples: [
      'Kombinasi Lari + Melompat: Berlari cepat lalu melompat meraih sasaran di udara (Atletik / Lompat Jauh).',
      'Kombinasi Menekuk + Melempar: Menekuk lutut (non-lokomotor) lalu melempar bola ke sasaran keranjang (Basket).',
      'Kombinasi Lari + Menangkap + Berputar: Berlari menyambut bola, menangkapnya, lalu berputar mengumpan kawan (Kasti/Rounders).',
    ],
    tipsAman: 'Jaga irama napas dan fokus konsentrasi agar peralihan antargerak berlangsung mulus dan tidak kaku.',
    biomekanika: 'Transisi momentum: Tenaga yang dihasilkan dari lari (kinetik) dialihkan menjadi daya dorong vertikal saat melompat.',
    quizQuick: {
      question: 'Siswa berlari kencang menuju garis batas lalu melompat tinggi menyundul bola. Rangkaian ini merupakan...',
      options: ['Variasi jalan santai', 'Kombinasi gerak lokomotor dan manipulatif', 'Gerak non-lokomotor murni'],
      correctIndex: 1,
      explanation: 'Benar 100%! Berlari dan melompat (lokomotor) dirangkaikan dengan menyundul bola (manipulatif) adalah kombinasi gerak.',
    },
  },
];

export const MOTION_MISSIONS: MissionActivity[] = [
  {
    id: 'mis-1',
    stageNumber: 1,
    title: 'Misi 1: Aksi Lokomotor (Lari & Lompat Bintang)',
    type: 'lokomotor',
    instruction:
      'Berdirilah di depan kamera PID! Lakukan lari cepat di tempat lalu melompat tinggi untuk menyentuh ZONA ATAS di layar!',
    targetMotion: 'jump',
    targetCount: 5,
    timeLimitSec: 25,
    pedagogicalFeedbackCorrect:
      'Luar biasa! Hentakan kaki dan tolakan melompatmu sangat bertenaga. Koordinasi gerak lokomotormu sempurna!',
    pedagogicalFeedbackIncorrect:
      'Jangan berkecil hati! Tekuk lutut lebih dalam sebelum melompat tinggi agar sensor atas mendeteksi gerakanmu!',
    conceptReinforcement:
      'Penguatan Konsep: Melompat melibatkan tolakan satu atau dua kaki dan melayang di udara, memindahkan tubuh ke atas.',
  },
  {
    id: 'mis-2',
    stageNumber: 2,
    title: 'Misi 2: Aksi Non-Lokomotor (Ayun & Meliuk Samping)',
    type: 'non-lokomotor',
    instruction:
      'Kaki tetap menapak di tempat! Rentangkan tangan dan liukkan badan ke KIRI lalu ke KANAN untuk mengaktifkan Zona Samping!',
    targetMotion: 'left',
    targetCount: 6,
    timeLimitSec: 30,
    pedagogicalFeedbackCorrect:
      'Keren sekali! Kelenturan pinggang dan ayunan lenganmu sangat stabil tanpa menggeser posisi telapak kaki!',
    pedagogicalFeedbackIncorrect:
      'Ayo coba lagi! Jaga telapak kaki tetap menempel di lantai, ayunkan tanganmu lebih lebar ke arah kotak hijau di samping!',
    conceptReinforcement:
      'Penguatan Konsep: Meliuk dan mengayun tanpa berpindah tempat melatih fleksibilitas dan stabilitas inti tubuh.',
  },
  {
    id: 'mis-3',
    stageNumber: 3,
    title: 'Misi 3: Aksi Manipulatif Virtual (Tepuk Bola Berbintang)',
    type: 'manipulatif',
    instruction:
      'Bola-bola olahraga virtual jatuh dari langit layar PID! Gunakan kedua tanganmu untuk menepis dan menangkap bola sebelum menyentuh tanah!',
    targetMotion: 'catch',
    targetCount: 8,
    timeLimitSec: 30,
    pedagogicalFeedbackCorrect:
      'Hebat! Koordinasi mata dan tanganmu sangat tangkas dalam mengendalikan objek virtual di layar!',
    pedagogicalFeedbackIncorrect:
      'Tetap fokus! Perhatikan jalur jatuh bola virtual dan gerakkan tanganmu tepat saat bola melintas di depanmu!',
    conceptReinforcement:
      'Penguatan Konsep: Menangkap dan menepis memerlukan estimasi jarak, kecepatan benda, dan ketepatan koordinasi tangan.',
  },
  {
    id: 'mis-4',
    stageNumber: 4,
    title: 'Misi 4: Tantangan Kombinasi Gerak Juara PID',
    type: 'kombinasi',
    instruction:
      'Rangkaikan gerak: Lari di tempat (Tengah) -> Membungkuk rendah (Bawah) -> Melompat tinggi meraih Piala Emas (Atas)!',
    targetMotion: 'squat',
    targetCount: 4,
    timeLimitSec: 35,
    pedagogicalFeedbackCorrect:
      'Super istimewa! Kamu berhasil menggabungkan gerak lokomotor, non-lokomotor, dan manipulasi sasaran dengan mulus!',
    pedagogicalFeedbackIncorrect:
      'Sedikit lagi! Lakukan urutannya dengan tenang: lari kecil di tempat, bungkuk sejenak, lalu lompat setinggi mungkin!',
    conceptReinforcement:
      'Penguatan Konsep: Kombinasi gerak menggabungkan beberapa pola gerak menjadi keterampilan bermain olahraga yang efektif.',
  },
];

export const QUIZ_BANK: QuizItem[] = [
  {
    id: 'q1',
    category: 'Konsep Gerak Dasar',
    question: 'Di antara gerakan berikut, manakah yang merupakan ciri gerak Non-Lokomotor yang tepat?',
    options: [
      'Posisi tubuh berpindah dari sudut kelas ke pintu',
      'Gerakan dilakukan pada poros tubuh tanpa memindahkan kaki dari tempat semula',
      'Gerakan menendang bola ke gawang lawan',
      'Berlari cepat zig-zag melewati corong kerucut',
    ],
    correctIndex: 1,
    feedbackCorrect: 'Tepat sekali! Gerak non-lokomotor terjadi di tempat tanpa memindahkan posisi tubuh secara keseluruhan.',
    feedbackWrong: 'Belum tepat. Ciri utama non-lokomotor adalah tidak berpindah tempat (seperti memutar bahu, meliuk, menekuk).',
  },
  {
    id: 'q2',
    category: 'Variasi Gerak',
    question: 'Andi berjalan santai, lalu mempercepat langkahnya menjadi jalan cepat di lintasan lurus. Hal tersebut merupakan contoh dari...',
    options: [
      'Kombinasi lokomotor dan manipulatif',
      'Variasi kecepatan gerak lokomotor',
      'Gerak manipulatif bola kecil',
      'Gerak non-lokomotor statis',
    ],
    correctIndex: 1,
    feedbackCorrect: 'Hebat! Mengubah kecepatan jalan lambat ke cepat pada satu jenis gerak dasar adalah contoh variasi gerak.',
    feedbackWrong: 'Kurang tepat. Mengubah tempo/kecepatan pada gerakan yang sama (berjalan) disebut variasi gerak.',
  },
  {
    id: 'q3',
    category: 'Kombinasi Gerak Olahraga',
    question: 'Dalam permainan kasti, seorang regu pemukul berlari menuju tiang hinggap setelah memukul bola. Rangkaian gerak tersebut adalah...',
    options: [
      'Kombinasi gerak manipulatif (memukul) dan lokomotor (berlari)',
      'Gerak lokomotor murni tanpa alat',
      'Gerak non-lokomotor berpasangan',
      'Variasi gerak menekuk dan meliuk',
    ],
    correctIndex: 0,
    feedbackCorrect: 'Benar sekali! Memukul bola menggunakan tongkat (manipulatif) dilanjutkan berlari ke tiang (lokomotor) adalah kombinasi gerak.',
    feedbackWrong: 'Perhatikan kembali: Ada alat tongkat pemukul (manipulatif) dan ada perpindahan tempat lari (lokomotor).',
  },
  {
    id: 'q4',
    category: 'Biomekanika & Keamanan',
    question: 'Saat mendarat setelah melompat atau meloncat tinggi, posisi kedua lutut sebaiknya...',
    options: [
      'Lurus kaku dan terkunci rapat',
      'Sedikit ditekuk (mengeper) untuk meredam benturan',
      'Disilangkan ke kiri dan kanan',
      'Langsung menjatuhkan badan ke lantai',
    ],
    correctIndex: 1,
    feedbackCorrect: 'Sangat tepat! Lutut yang mengeper berfungsi sebagai peredam kejut alami untuk melindungi sendi dan tulang belakang.',
    feedbackWrong: 'Hati-hati! Lutut lurus saat mendarat dapat mencederai sendi. Lutut harus sedikit ditekuk (fleksi mengeper).',
  },
];
