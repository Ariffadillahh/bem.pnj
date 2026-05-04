import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuCalendarDays } from "react-icons/lu";

import logoSekre from "../../../../assets/images/kemas/logo-kemas.png";
import fotoSekre from "../../../../assets/images/kemas/kabid.png";

const Sekretaris = () => {
  const sekreData = {
    id: "sekretaris",
    namaBidang: "Biro Sekretaris Umum",
    tahun: "BEM PNJ 2026",
    tagline: "Tertib Administrasi, Profesionalitas Organisasi",
    deskripsiUtama:
      "Bertanggung jawab dalam pengelolaan sistem administrasi kesekretariatan, pengarsipan dokumen, serta pengadaan sarana dan prasarana demi kelancaran birokrasi BEM PNJ 2026.",
    logo: logoSekre,
    fotoKabid: fotoSekre,
    agenda: [
      {
        nama: "Pengelolaan Surat Menyurat",
        deskripsi:
          "Manajemen alur surat masuk dan keluar secara terstruktur untuk memastikan koordinasi birokrasi yang cepat dan tepat.",
      },
      {
        nama: "Standardisasi Dokumen",
        deskripsi:
          "Penyusunan format baku untuk proposal, laporan pertanggungjawaban, dan dokumen resmi organisasi lainnya.",
      },
      {
        nama: "Database Inventaris Organisasi",
        deskripsi:
          "Pendataan dan pemeliharaan seluruh aset fisik maupun digital yang dimiliki oleh BEM PNJ guna mendukung kegiatan operasional.",
      },
    ],
  };

  // --- REUSABLE SLIDER COMPONENT ---
  const ContentSlider = ({ items, title }) => {
    const [index, setIndex] = useState(0);
    const next = () => setIndex((p) => (p === items.length - 1 ? 0 : p + 1));
    const prev = () => setIndex((p) => (p === 0 ? items.length - 1 : p - 1));

    return (
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-xl border bg-gradient-to-br from-[#01002A] to-slate-900 border-yellow-500/20 w-full">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-blue-400">
              <LuCalendarDays className="text-xl md:text-2xl" />
            </div>
            <h3 className="text-sm md:text-lg font-black uppercase tracking-widest text-blue-400">
              {title}
            </h3>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-yellow-500 text-white hover:text-blue-900 flex items-center justify-center border border-white/10 transition-all"
            >
              <LuChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-yellow-500 text-white hover:text-blue-900 flex items-center justify-center border border-white/10 transition-all"
            >
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-[140px] md:min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 md:space-y-4"
            >
              <h4 className="text-xl md:text-3xl font-black text-white leading-tight">
                {items[index].nama}
              </h4>
              <p className="text-blue-100/80 text-sm md:text-lg leading-relaxed">
                {items[index].deskripsi}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex gap-1.5 md:gap-2 mt-6 md:mt-8">
          {items.map((_, i) => (
            <div
              key={i}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-6 md:w-8 bg-yellow-500"
                  : "w-1.5 md:w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16 md:mb-20">
          {/* TEKS & DESKRIPSI (Order 1: Atas di Mobile, Kiri di Laptop) */}
          <div className="flex-1 text-center md:text-left order-1">
            <img
              src={sekreData.logo}
              alt="Logo Sekretaris"
              className="w-16 md:w-24 mb-4 md:mb-6 mx-auto md:mx-0"
            />
            <h1 className="text-3xl md:text-6xl font-black text-[#01002A] font-syne uppercase leading-[1.1] md:leading-[0.9]">
              Biro Sekretaris <span className="text-blue-500">Umum</span>
            </h1>
            <p className="text-yellow-600 font-bold mt-3 md:mt-4 tracking-[0.2em] uppercase text-[10px] md:text-sm">
              {sekreData.tahun} • #SimpulPerubahan
            </p>

            <div className="mt-6 md:mt-8 border-l-4 border-yellow-500 pl-4 md:pl-6 py-1 md:py-2 text-left max-w-lg mx-auto md:mx-0">
              <p className="text-slate-400 italic font-medium text-sm md:text-lg mb-2">
                "{sekreData.tagline}"
              </p>
              <p className="text-slate-700 text-lg md:text-2xl font-bold leading-snug">
                {sekreData.deskripsiUtama}
              </p>
            </div>
          </div>

          <div className="w-full max-w-[280px] md:max-w-sm order-2">
            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[6px] md:border-8 border-slate-50 shadow-xl relative group">
              <img
                src={sekreData.fotoKabid}
                alt="Sekretaris Umum"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01002A]/60 to-transparent" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <ContentSlider
            items={sekreData.agenda}
            title="Daftar Agenda Sekretaris Umum"
          />
        </div>
      </div>
    </section>
  );
};

export default Sekretaris;
