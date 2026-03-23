import { motion } from "framer-motion";

const stats = [
  { val: "47", label: "Pengurus Aktif" },
  { val: "12+", label: "Kementerian" },
  { val: "8K+", label: "Mahasiswa Terwakili" },
  { val: "30+", label: "Program Kerja" },
];

const floatingCards = [
  {
    icon: "🗓",
    title: "Pesta Mahasiswa 2025",
    sub: "Sedang Berjalan",
    color: "#22c55e",
  },
  {
    icon: "📢",
    title: "Orasi UKT 2025",
    sub: "Pernyataan Sikap",
    color: "#5399EF",
  },
  {
    icon: "🏆",
    title: "BEM Terbaik Se-Jakarta",
    sub: "Penghargaan",
    color: "#f59e0b",
  },
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
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "#ffffff" }}
    >
      {/* BG decorations */}
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
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.025]"
          style={{
            background:
              "repeating-linear-gradient(-45deg, #5399EF 0, #5399EF 1px, transparent 1px, transparent 30px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
           
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
              <br />
              <span style={{ color: "#5399EF" }}>EKSEKUTIF</span>
              <br />
              MAHASISWA
            </motion.h1>

            {/* Institution */}
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

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.55 }}
              className="text-base sm:text-lg leading-relaxed mb-9 max-w-md"
              style={{
                color: "rgba(1,0,42,0.52)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Mewakili, memperjuangkan, dan menginspirasi seluruh mahasiswa PNJ
              menuju kampus yang demokratis dan berdaya.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
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
                Lihat Event
              </a>
              <a
                href="#about"
                className="px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#5399EF",
                  background: "rgba(83,153,239,0.08)",
                  border: "1.5px solid rgba(83,153,239,0.35)",
                }}
              >
                Tentang Kami
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.6 }}
              className="flex flex-wrap gap-6 sm:gap-8"
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative hidden lg:flex items-center justify-center mx-auto"
            style={{ width: 500, height: 500 }}
          >
            {/* Outer ring */}
            <div
              className="absolute"
              style={{
                width: 420,
                height: 420,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(83,153,239,0.09) 0%, rgba(1,0,42,0.05) 100%)",
                border: "1.5px solid rgba(83,153,239,0.14)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            {/* Inner dashed ring */}
            <div
              className="absolute"
              style={{
                width: 295,
                height: 295,
                borderRadius: "50%",
                border: "1px dashed rgba(83,153,239,0.2)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />

            {/* Center logo block */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className="flex items-center justify-center font-black text-white mb-3"
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 28,
                  background: "linear-gradient(135deg, #5399EF, #01002A)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 42,
                  boxShadow:
                    "0 24px 60px rgba(83,153,239,0.35), 0 4px 16px rgba(1,0,42,0.2)",
                }}
              >
                B
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#01002A",
                  letterSpacing: "0.04em",
                }}
              >
                BEM PNJ
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#5399EF",
                  marginTop: 4,
                }}
              >
                Kabinet Simpul Perubahan 2026
              </div>
            </motion.div>

            {/* Floating info cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                { top: "6%", left: "-8%" },
                { top: "46%", right: "-12%" },
                { bottom: "4%", left: "2%" },
              ];
              const delays = [0.9, 1.05, 1.2];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.82, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: delays[i],
                    duration: 0.45,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    position: "absolute",
                    ...positions[i],
                    background: "#fff",
                    border: "1.5px solid rgba(1,0,42,0.08)",
                    borderRadius: 14,
                    padding: "10px 14px",
                    boxShadow: "0 8px 28px rgba(1,0,42,0.09)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 185,
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${card.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: 11,
                        color: "#01002A",
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        color: card.color,
                        marginTop: 2,
                        fontWeight: 600,
                      }}
                    >
                      {card.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Orbit dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={deg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.06 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? "#5399EF" : "rgba(1,0,42,0.12)",
                  transform: `rotate(${deg}deg) translateX(210px) rotate(-${deg}deg)`,
                  marginLeft: -4,
                  marginTop: -4,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
