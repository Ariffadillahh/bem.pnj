import { motion } from "framer-motion";
import { STATS } from "../../data/mockData";

const MISI = [
  "Mengakselerasi pelayanan advokasi yang responsif dan solutif guna menjamin hak mahasiswa melalui penguatan kanal aspirasi dan pendampingan.",
  "Mengorkestrasikan kolaborasi harmonis antar elemen IKM PNJ dengan membangun ruang sinergi yang inklusif.",
  "Memanifestasikan pergerakan yang progresif, berbasis kajian dan inovasi sebagai garda terdepan dalam mengawal isu-isu strategis tingkat kampus maupun nasional.",
  "Meningkatkan kualitas internal BEM PNJ berlandaskan asas profesionalitas dan kekeluargaan.",
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <div>
          {/* --- VISI SECTION --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div
                className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
              >
                Tujuan Kami
              </div>
              <h3
                className="text-3xl sm:text-4xl font-black"
                style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
              >
                Visi Kabinet{" "}
                <span style={{ color: "#5399EF" }}>Simpul Perubahan</span>
              </h3>
            </div>

            <div
              className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #01002A, #0a1128)",
                boxShadow: "0 20px 40px rgba(1,0,42,0.15)",
              }}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#5399EF] rounded-full blur-3xl opacity-20" />
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#5399EF] rounded-full blur-3xl opacity-20" />

              <p
                className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-white relative z-10"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                "Terwujudnya BEM PNJ yang{" "}
                <span className="text-[#5399EF]">aspiratif</span>,{" "}
                <span className="text-[#5399EF]">kolaboratif</span>, dan{" "}
                <span className="text-[#5399EF]">progresif</span> sebagai pionir
                kebaikan bagi IKM PNJ dan Indonesia."
              </p>
            </div>
          </motion.div>

          {/* --- MISI SECTION --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3
              className="text-3xl sm:text-4xl font-black"
              style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
            >
              Misi Kabinet{" "}
              <span style={{ color: "#5399EF" }}>Simpul Perubahan</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {MISI.map((misi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="relative p-8 rounded-3xl group overflow-hidden flex items-start gap-6"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(83,153,239,0.15)",
                  boxShadow: "0 8px 24px rgba(1,0,42,0.04)",
                  transition: "all .3s",
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(83,153,239,0.4)",
                  boxShadow: "0 16px 40px rgba(83,153,239,0.12)",
                }}
              >
                <div
                  className="shrink-0 text-5xl sm:text-6xl font-black transition-colors duration-300"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    color: "#01002A",
                    WebkitTextStroke: "1px #5399EF",
                    textShadow: "0px 4px 12px rgba(83,153,239,0.2)",
                  }}
                >
                  {index + 1}
                </div>

                <p
                  className="text-[15px] sm:text-base leading-relaxed pt-2"
                  style={{
                    color: "rgba(1,0,42,0.7)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {misi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
