import React from "react";
import { motion } from "framer-motion";
import { LuBuilding2, LuPlay, LuFlower2, LuArrowRight } from "react-icons/lu"; // Gunakan react-icons
import logo from "../../assets/images/logo.png";

export default function About() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#FCFBF4] rounded-[2rem] border border-orange-50 flex flex-col lg:items-center lg:justify-center p-8 md:p-12 shadow-sm"
          >
            <div className="flex-1 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo BEM PNJ"
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div
              className="relative mt-8 flex items-start gap-4 p-0 bg-transparent border-none shadow-none 
              lg:absolute lg:mt-0 lg:bottom-8 lg:left-8 lg:right-8 lg:bg-white/95 lg:backdrop-blur-md lg:p-5 lg:rounded-2xl lg:shadow-[0_20px_40px_rgba(0,0,0,0.06)] lg:border lg:border-slate-100"
            >
              <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500 shrink-0">
                <LuBuilding2 size={22} />
              </div>
              <div>
                <h4
                  className="font-bold text-[#01002A] text-sm sm:text-base leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Badan Eksekutif Mahasiswa IKM PNJ
                </h4>
                <p
                  className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Organisasi kemahasiswaan eksekutif tertinggi di PNJ
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col mt-12 lg:mt-0"
          >
            <motion.div
              variants={fadeUpVariant}
              className="flex items-center gap-3 mb-4"
            >
              <span
                className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase bg-blue-50 px-3 py-1 rounded-full"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Mengenal BEM PNJ
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUpVariant}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#01002A] mb-6 leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Apa itu BEM PNJ?
            </motion.h2>

            <motion.div
              variants={fadeUpVariant}
              className="space-y-4 mb-10 text-slate-600 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>
                Badan Eksekutif Mahasiswa (BEM) Politeknik Negeri Jakarta adalah
                lembaga eksekutif tertinggi dalam struktur organisasi IKM PNJ
                yang berperan sebagai representasi utama mahasiswa.
              </p>
              <p>
                Kami bergerak aktif dalam bidang advokasi, pengembangan minat
                bakat, serta pengabdian masyarakat guna menciptakan perubahan
                nyata.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              className="grid grid-cols-3 gap-3 sm:gap-4 mb-8"
            >
              {[
                { num: "4", label: "Bidang" },
                { num: "8", label: "Departemen" },
                { num: "90+", label: "Anggota" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-blue-200 transition-all"
                >
                  <span
                    className="text-2xl sm:text-3xl font-bold text-[#5399EF]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.num}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-tighter mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUpVariant}
              href="#kabinet"
              className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-blue-500 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 text-orange-500 group-hover:text-blue-500 transition-colors">
                  <LuFlower2 size={20} />
                </div>
                <div>
                  <h4
                    className="font-bold text-[#01002A] group-hover:text-white text-sm sm:text-base transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Kabinet Simpul Perubahan
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 group-hover:text-blue-100 font-medium">
                    Pelajari visi & misi kabinet kami
                  </p>
                </div>
              </div>
              <LuArrowRight className="text-blue-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </motion.a>
          </motion.div>
        </div>

        {/* =========================================
    SECTION VIDEO (YouTube Iframe)
    ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Header Video Section */}
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-black text-[#01002A] mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Video Profil Kami
            </h2>
            <div className="h-1.5 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p
              className="text-slate-600 mt-6 max-w-2xl mx-auto text-sm sm:text-base"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Saksikan perjalanan, visi, dan semangat kolaborasi Badan Eksekutif
              Mahasiswa Politeknik Negeri Jakarta dalam satu frame.
            </p>
          </div>

          {/* Video Container (Responsive Aspect Ratio 16:9) */}
          <div className="w-full max-w-5xl relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(1,0,42,0.15)] bg-black border-[4px] md:border-[8px] border-white">
            <div className="relative w-full pt-[56.25%]">
              {" "}
              {/* Rahasia agar iframe responsif 16:9 */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jl2W9Sh4qjc?si=E3tBOfSXfCNbItOa"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
