import { motion } from "framer-motion";
import { STATS } from "../../data/mockData";

const values = [
  {
    icon: "⚖️",
    title: "Demokratis",
    desc: "Setiap suara mahasiswa didengar dan direpresentasikan secara adil.",
  },
  {
    icon: "🔥",
    title: "Progresif",
    desc: "Bergerak maju dengan ide-ide segar dan inovasi tanpa henti.",
  },
  {
    icon: "🤝",
    title: "Kolaboratif",
    desc: "Membangun sinergi antar prodi, angkatan, dan elemen kampus.",
  },
  {
    icon: "🧭",
    title: "Independen",
    desc: "Berdiri tegak tanpa intervensi, murni untuk kepentingan mahasiswa.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top part — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="text-xs font-bold tracking-[0.18em] uppercase mb-4"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Tentang Kami
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
            >
              Suara Mahasiswa,
              <br />
              <span style={{ color: "#5399EF" }}>Gerak Nyata</span>
            </h2>
            <p
              className="leading-relaxed mb-4 text-base"
              style={{
                color: "rgba(1,0,42,0.6)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Badan Eksekutif Mahasiswa Politeknik Negeri Jakarta (BEM PNJ)
              adalah organisasi kemahasiswaan tertinggi di tingkat institusi
              yang berperan sebagai representasi suara seluruh mahasiswa.
            </p>
            <p
              className="leading-relaxed mb-8 text-base"
              style={{
                color: "rgba(1,0,42,0.6)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Kami hadir sebagai jembatan antara mahasiswa dan kampus, mendorong
              budaya kritis, kolaboratif, dan inovatif demi terciptanya
              lingkungan akademik yang sehat dan berdaya saing tinggi.
            </p>

            {/* Badge cluster */}
            <div className="flex flex-wrap gap-3">
              {["Demokratis", "Independen", "Progresif", "Kolaboratif"].map(
                (b) => (
                  <span
                    key={b}
                    className="px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: "#5399EF",
                      background: "rgba(83,153,239,0.08)",
                      border: "1.5px solid rgba(83,153,239,0.25)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: i % 2 === 0 ? "#01002A" : "#5399EF",
                  boxShadow:
                    i % 2 === 0
                      ? "0 8px 32px rgba(1,0,42,0.15)"
                      : "0 8px 32px rgba(83,153,239,0.3)",
                }}
              >
                <div
                  className="text-4xl sm:text-5xl font-black text-white mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-xs font-medium text-white/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div
              className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Nilai Kami
            </div>
            <h3
              className="text-3xl font-black"
              style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
            >
              Prinsip yang Kami Pegang
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className="p-6 rounded-2xl group"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(1,0,42,0.08)",
                  boxShadow: "0 4px 20px rgba(1,0,42,0.04)",
                  transition: "all .3s",
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(83,153,239,0.35)",
                  boxShadow: "0 16px 40px rgba(83,153,239,0.1)",
                }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4
                  className="font-black text-base mb-2"
                  style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
                >
                  {v.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "rgba(1,0,42,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
