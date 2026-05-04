import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

const dummyEvents = [
  {
    id: "019d2cc4-efcc-7128-b471-e246240e55b8",
    title: "PNJ Sci-Tech Festival 2026",
    slug: "pnj-sci-tech-2026",
    category: "Event",
    status: "Published",
    thumbnail: "https://via.placeholder.com/150",
    event_date: "15 May 2026 08:00",
    short_description: "Festival teknologi terbesar di PNJ.",
    creator_name: "Admin BEM",
  },
  {
    id: "029d2cc4-efcc-7128-b471-e246240e55b9",
    title: "Pesta Mahasiswa 2026",
    slug: "pesta-mahasiswa-2026",
    category: "Event",
    status: "Published",
    thumbnail: "https://via.placeholder.com/150",
    event_date: "20 Jun 2026 18:00",
    short_description: "Perayaan akhir semester ganjil.",
    creator_name: "Arif Fadillah WK",
  },
  {
    id: "039d2cc4-efcc-7128-b471-e246240e55b0",
    title: "Orasi UKT Terbuka",
    slug: "orasi-ukt-terbuka",
    category: "Aksi",
    status: "Published",
    thumbnail: "https://via.placeholder.com/150",
    event_date: "01 Jul 2026 10:00",
    short_description: "Mimbar bebas terkait kebijakan UKT.",
    creator_name: "Kementerian Advokasi",
  },
  {
    id: "049d2cc4-efcc-7128-b471-e246240e55b1",
    title: "Bina Desa BEM PNJ",
    slug: "bina-desa-bem-pnj",
    category: "Sosial",
    status: "Published",
    thumbnail: "https://via.placeholder.com/150",
    event_date: "17 Aug 2026 06:00",
    short_description: "Pengabdian masyarakat di desa mitra.",
    creator_name: "Kementerian Sosial",
  },
];

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  if (countDown < 0)
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const format = (val) => val.toString().padStart(2, "0");

  return {
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
  };
};

const EventCard = ({ event }) => {
  const { days, hours, minutes, seconds } = useCountdown(event.event_date);

  return (
    <div
      className="w-full h-auto p-6 sm:p-7 rounded-[24px] border border-white/10 flex flex-col"
      style={{
        background: "linear-gradient(145deg, #2A4A9C, #1C3373)",
      }}
    >
      <div className="flex justify-between items-start mb-5">
        <span className="bg-[#F5A623] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full tracking-wider flex items-center gap-1 shadow-md">
          <span>⚡</span> SEGERA
        </span>
        <span className="text-2xl sm:text-3xl drop-shadow-md">🎉</span>
      </div>

      <h3
        className="text-white text-xl sm:text-2xl font-bold mb-3 leading-snug drop-shadow-sm"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {event.title}
      </h3>
      <div
        className="flex items-center text-blue-200 text-xs sm:text-sm mb-6 gap-2"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span>📅</span>
        <span>{event.event_date} - Aula Utama PNJ</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
        {[
          { label: "HARI", value: days },
          { label: "JAM", value: hours },
          { label: "MENIT", value: minutes },
          { label: "DETIK", value: seconds },
        ].map((time, idx) => (
          <div
            key={idx}
            className="bg-white/10 rounded-xl p-2 sm:p-3 flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm"
          >
            <span
              className="text-white text-2xl sm:text-3xl font-black mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {time.value}
            </span>
            <span className="text-blue-200 text-[9px] sm:text-[10px] font-bold tracking-widest">
              {time.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          className="absolute left-0 top-0 h-full bg-[#F5A623] rounded-full"
        />
      </div>

      <button className="w-full bg-[#F5A623] hover:bg-[#E09612] transition-all active:scale-95 text-white text-sm sm:text-base font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
        Lihat Detail <span className="text-lg">→</span>
      </button>
    </div>
  );
};

const stats = [
  { val: "100+", label: "Pengurus Aktif" },
  { val: "4+", label: "Program Kerja" },
  { val: "8K+", label: "Mahasiswa Terwakili" },
];

const ChevronDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden md:pt-26 pt-16"
      style={{ background: "#ffffff" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -top-40 -right-40 opacity-[0.055]"
          width="720"
          height="720"
          viewBox="0 0 720 720"
        >
          <circle
            cx="360"
            cy="360"
            r="300"
            fill="none"
            stroke="#5399EF"
            strokeWidth="80"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 opacity-[0.04]"
          width="380"
          height="380"
          viewBox="0 0 380 380"
        >
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 52 + 26}
                cy={row * 52 + 26}
                r="3"
                fill="#01002A"
              />
            )),
          )}
        </svg>
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(83,153,239,0.07) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div className="text-center lg:text-left mt-8 lg:mt-0">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.18,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="font-black leading-none tracking-tighter mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(46px, 6vw, 70px)",
                color: "#01002A",
              }}
            >
              BADAN
              <br className="hidden lg:block" />
              <span style={{ color: "#5399EF" }}> EKSEKUTIF </span>
              <br className="hidden lg:block" />
              MAHASISWA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="font-bold mb-5"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(1,0,42,0.38)",
              }}
            >
              Politeknik Negeri Jakarta
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.55 }}
              className="text-base sm:text-lg leading-relaxed mb-9 mx-auto lg:mx-0 max-w-md"
              style={{
                color: "rgba(1,0,42,0.52)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Mewakili, memperjuangkan, dan menginspirasi seluruh mahasiswa PNJ
              menuju kampus yang demokratis dan berdaya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
            >
              <a
                href="#events"
                className="px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "#01002A",
                  boxShadow: "0 8px 28px rgba(1,0,42,0.2)",
                }}
              >
                Berita & Kajian
              </a>
              <a
                href="#aspirasi"
                className="px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#5399EF",
                  background: "rgba(83,153,239,0.08)",
                  border: "1.5px solid rgba(83,153,239,0.35)",
                }}
              >
                Sampaikan Aspirasi
              </a>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8"
              style={{
                borderTop: "1px solid rgba(1,0,42,0.07)",
                paddingTop: 28,
              }}
            >
              {stats.map(({ val, label }) => (
                <div key={label}>
                  <div
                    className="font-black"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(22px,2.5vw,30px)",
                      color: "#5399EF",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      color: "rgba(1,0,42,0.4)",
                      marginTop: 3,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div> */}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center justify-center w-full min-h-[450px] lg:min-h-[550px] mt-10 lg:mt-0"
          >
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-[300px] sm:w-[360px] lg:w-[400px] h-auto"
              style={{
                boxShadow: "0 24px 60px rgba(1,0,42,0.15)",
                borderRadius: "24px",
              }}
            >
              {dummyEvents.map((event) => (
                <SwiperSlide key={event.id} className="rounded-[24px]">
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 lg:mt-12 text-xs text-slate-400 font-medium animate-pulse flex items-center gap-2">
              <span>←</span> Geser kartu <span>→</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ color: "rgba(1,0,42,0.25)" }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
}
