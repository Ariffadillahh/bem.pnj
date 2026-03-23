import { motion } from "framer-motion";
import { EVENTS } from "../../data/mockData";

function EventCard({ event, index }) {
  const isOngoing = event.status === "ongoing";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative flex flex-col rounded-2xl p-6 overflow-hidden group cursor-pointer"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(1,0,42,0.08)",
        boxShadow: "0 4px 24px rgba(1,0,42,0.05)",
        transition: "border-color .3s, box-shadow .3s, transform .3s",
      }}
      whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(83,153,239,0.14)" }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{
          background: isOngoing
            ? "linear-gradient(90deg, #22c55e, #4ade80)"
            : "linear-gradient(90deg, #5399EF, #7FB3F5)",
        }}
      />

      {/* Status badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
          style={{
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "0.08em",
            color: isOngoing ? "#16a34a" : "#5399EF",
            background: isOngoing
              ? "rgba(34,197,94,0.08)"
              : "rgba(83,153,239,0.08)",
            border: isOngoing
              ? "1px solid rgba(34,197,94,0.2)"
              : "1px solid rgba(83,153,239,0.2)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isOngoing ? "#22c55e" : "#5399EF",
              animation: isOngoing ? "pulse 1.5s infinite" : "none",
            }}
          />
          {isOngoing ? "SEDANG BERJALAN" : "AKAN DATANG"}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            color: "rgba(1,0,42,0.4)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {event.date}
        </span>
      </div>

      {/* Category chip */}
      <div className="mb-3">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#5399EF",
            background: "rgba(83,153,239,0.06)",
            letterSpacing: "0.05em",
          }}
        >
          {event.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-black mb-2.5 leading-tight group-hover:text-[#5399EF] transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
      >
        {event.title}
      </h3>

      {/* Desc */}
      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{
          color: "rgba(1,0,42,0.55)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {event.desc}
      </p>

      {/* Dept */}
      <div
        className="flex items-center gap-2 text-xs mb-4"
        style={{
          color: "rgba(1,0,42,0.4)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5399EF"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        {event.dept}
      </div>

      {/* Progress bar (ongoing only) */}
      {isOngoing && (
        <div>
          <div
            className="flex justify-between text-xs mb-1.5"
            style={{
              color: "rgba(1,0,42,0.4)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>Progress</span>
            <span className="font-bold" style={{ color: "#01002A" }}>
              {event.progress}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(83,153,239,0.12)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #5399EF, #7FB3F5)" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${event.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
        </div>
      )}
    </motion.article>
  );
}

export default function Events() {
  const ongoing = EVENTS.filter((e) => e.status === "ongoing");
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");

  return (
    <section
      id="events"
      className="py-24 relative"
      style={{ background: "#f7f9fc" }}
    >
      {/* Top wave separator */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden leading-none"
        style={{ height: 60 }}
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="text-xs font-bold tracking-[0.18em] uppercase mb-3"
            style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
          >
            Program Kerja
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black mb-3"
            style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
          >
            Events <span style={{ color: "#5399EF" }}>BEM PNJ</span>
          </h2>
          <p
            style={{
              color: "rgba(1,0,42,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: 480,
            }}
          >
            Event yang sedang berjalan dan yang akan segera hadir dari Badan
            Eksekutif Mahasiswa PNJ.
          </p>
        </motion.div>

        {/* Ongoing */}
        {ongoing.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#16a34a", fontFamily: "'Syne', sans-serif" }}
              >
                Sedang Berjalan
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ongoing.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#5399EF" }}
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#5399EF", fontFamily: "'Syne', sans-serif" }}
              >
                Akan Datang
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
