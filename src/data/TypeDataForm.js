export const CATEGORY_OPTIONS = [
  {
    id: "News",
    label: "Berita",
    icon: "📰",
    activeClass: "bg-blue-50 border-blue-200 text-blue-600 shadow-blue-50",
  },
  {
    id: "Orasi",
    label: "Kajian",
    icon: "📢",
    activeClass:
      "bg-purple-50 border-purple-200 text-purple-600 shadow-purple-50",
  },
  {
    id: "Event",
    label: "Event",
    icon: "📅",
    activeClass:
      "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-emerald-50",
  },
  {
    id: "Prestasi",
    label: "Prestasi",
    icon: "🏆",
    activeClass:
      "bg-orange-50 border-orange-200 text-orange-600 shadow-orange-50",
  },
];

export const TYPE_OPTIONS = {
  News: ["Berita Kampus", "Berita Nasional", "Liputan Khusus", "Opini"],
  Orasi: ["Kajian Isu", "Pernyataan Sikap", "Seruan Aksi", "Rilis Pers"],
  Event: ["Webinar", "Workshop", "Kompetisi / Lomba", "Sosialisasi"],
  Prestasi: ["Akademik", "Non-Akademik", "Kelembagaan", "Beasiswa"],
};
