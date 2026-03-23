export const EVENTS = [
  {
    id: 1,
    title: "PESTA MAHASISWA PNJ 2025",
    desc: "Perayaan tahunan mahasiswa PNJ yang menggabungkan budaya, seni, olahraga, dan kompetisi antar prodi dalam satu panggung besar.",
    status: "ongoing",
    date: "12–26 Mar 2025",
    dept: "Kementerian Sosial & Budaya",
    progress: 60,
    category: "Sosial Budaya",
  },
  {
    id: 2,
    title: "MUSYAWARAH BESAR BEM PNJ 2025",
    desc: "Forum tertinggi pengambilan keputusan organisasi BEM PNJ untuk menetapkan program kerja dan kebijakan strategis tahun 2025.",
    status: "upcoming",
    date: "5 Apr 2025",
    dept: "Sekretaris Jenderal",
    progress: 0,
    category: "Organisasi",
  },
  {
    id: 3,
    title: "PKKMB POLITEKNIK NEGERI JAKARTA",
    desc: "Pengenalan Kehidupan Kampus bagi Mahasiswa Baru PNJ, agenda wajib penyambutan dan orientasi akademik.",
    status: "upcoming",
    date: "14 Jul 2025",
    dept: "Kementerian Dalam Negeri",
    progress: 0,
    category: "Akademik",
  },
];

export const POSTS = [
  {
    id: 1,
    type: "orasi",
    title: "Suara Mahasiswa: Tolak Kenaikan UKT 2025",
    desc: "BEM PNJ menyatakan sikap resmi menolak rencana kenaikan Uang Kuliah Tunggal yang dianggap memberatkan mahasiswa tidak mampu.",
    date: "18 Mar 2025",
    author: "Presiden BEM PNJ",
    readTime: "3 mnt",
  },
  {
    id: 2,
    type: "news",
    title: "BEM PNJ Raih Penghargaan BEM Terbaik Se-Jakarta",
    desc: "Dalam ajang BEM Award 2025, BEM Politeknik Negeri Jakarta berhasil meraih predikat BEM terbaik kategori program kerja inovatif.",
    date: "15 Mar 2025",
    author: "Tim Media",
    readTime: "2 mnt",
  },
  {
    id: 3,
    type: "news",
    title: "Pelantikan Kabinet BEM PNJ 2025 Resmi Digelar",
    desc: "Sebanyak 47 pengurus BEM PNJ periode 2025 resmi dilantik dalam upacara sakral yang dihadiri seluruh pimpinan kampus.",
    date: "10 Mar 2025",
    author: "Tim Media",
    readTime: "4 mnt",
  },
  {
    id: 4,
    type: "orasi",
    title: "Pernyataan Sikap: Dukung RUU Perlindungan Data Mahasiswa",
    desc: "BEM PNJ bersama aliansi BEM se-Politeknik mendesak DPR untuk segera mengesahkan regulasi perlindungan data pribadi mahasiswa.",
    date: "6 Mar 2025",
    author: "Menteri Hukum & HAM",
    readTime: "5 mnt",
  },
  {
    id: 5,
    type: "news",
    title: "Open Recruitment Kementerian BEM PNJ 2025 Dibuka",
    desc: "BEM PNJ membuka kesempatan bagi seluruh mahasiswa PNJ aktif untuk bergabung dalam 12 kementerian yang tersedia.",
    date: "1 Mar 2025",
    author: "Tim Media",
    readTime: "2 mnt",
  },
];

export const ORG = {
  top: {
    role: "Presiden BEM",
    name: "Ahmad Fauzan",
    initial: "AF",
    prodi: "Teknik Mesin 2022",
  },
  second: [
    {
      role: "Wakil Presiden",
      name: "Siti Rahayu",
      initial: "SR",
      prodi: "Teknik Sipil 2022",
    },
    {
      role: "Sekretaris Jenderal",
      name: "Budi Santoso",
      initial: "BS",
      prodi: "Akuntansi 2022",
    },
    {
      role: "Bendahara Umum",
      name: "Dewi Lestari",
      initial: "DL",
      prodi: "Manajemen 2022",
    },
  ],
  kementerian: [
    {
      name: "Kemendagri",
      fullName: "Kementerian Dalam Negeri",
      head: "Rizky A.",
      initial: "RA",
    },
    {
      name: "Kemlu",
      fullName: "Kementerian Luar Negeri",
      head: "Putri M.",
      initial: "PM",
    },
    {
      name: "Kemenhum",
      fullName: "Kementerian Hukum & HAM",
      head: "Yoga P.",
      initial: "YP",
    },
    {
      name: "Kemensosbudaya",
      fullName: "Kementerian Sosial & Budaya",
      head: "Nadia F.",
      initial: "NF",
    },
    {
      name: "Kemenristekdik",
      fullName: "Kementerian Ristekdik",
      head: "Farid H.",
      initial: "FH",
    },
    {
      name: "Kemenkom",
      fullName: "Kementerian Komunikasi",
      head: "Laras S.",
      initial: "LS",
    },
  ],
};

export const SEARCH_POOL = [
  ...EVENTS.map((e) => ({
    label: e.title,
    sub: "Event · " + e.date,
    icon: "🗓",
    href: "#events",
  })),
  ...POSTS.map((p) => ({
    label: p.title,
    sub: (p.type === "orasi" ? "Orasi" : "News") + " · " + p.date,
    icon: p.type === "orasi" ? "📢" : "📰",
    href: "#posts",
  })),
  {
    label: "Struktur Organisasi",
    sub: "Halaman",
    icon: "🏛",
    href: "#struktur",
  },
  { label: "Tentang BEM PNJ", sub: "Halaman", icon: "ℹ️", href: "#about" },
];

export const STATS = [
  { val: "12+", label: "Kementerian" },
  { val: "47", label: "Pengurus Aktif" },
  { val: "30+", label: "Program Kerja" },
  { val: "8K+", label: "Mahasiswa Terwakili" },
];

export const NAV_LINKS = [
  { label: "Events", href: "#events" },
  { label: "Berita & Orasi", href: "#posts" },
  { label: "Struktur Organisasi", href: "#struktur" },
  { label: "Docs", href: "/docs" },
];
