import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POSTS } from "../../data/mockData";

const FILTERS = [
  { val: "all", label: "Semua" },
  { val: "news", label: "News" },
  { val: "orasi", label: "Orasi" },
];

function PostCard({ post, index }) {
  const isOrasi = post.type === "orasi";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        delay: index * 0.07,
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="flex flex-col rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(1,0,42,0.07)",
        boxShadow: "0 4px 20px rgba(1,0,42,0.04)",
        transition: "box-shadow .3s, transform .3s",
      }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(83,153,239,0.12)" }}
    >
      {/* Color strip */}
      <div
        className="h-1"
        style={{
          background: isOrasi
            ? "linear-gradient(90deg, #01002A, #01002A88)"
            : "linear-gradient(90deg, #5399EF, #7FB3F5)",
        }}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shrink-0"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "0.08em",
              color: isOrasi ? "#01002A" : "#5399EF",
              background: isOrasi
                ? "rgba(1,0,42,0.07)"
                : "rgba(83,153,239,0.08)",
              border: isOrasi
                ? "1px solid rgba(1,0,42,0.12)"
                : "1px solid rgba(83,153,239,0.2)",
            }}
          >
            {isOrasi ? "📢" : "📰"} {isOrasi ? "Orasi" : "News"}
          </span>
          <div className="text-right shrink-0">
            <div
              className="text-xs"
              style={{
                color: "rgba(1,0,42,0.4)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {post.date}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{
                color: "rgba(83,153,239,0.8)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {post.readTime} baca
            </div>
          </div>
        </div>

        {/* Title */}
        <h4
          className="font-black text-sm sm:text-base leading-snug mb-2 group-hover:text-[#5399EF] transition-colors duration-300"
          style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
        >
          {post.title}
        </h4>

        {/* Desc */}
        <p
          className="text-xs sm:text-sm leading-relaxed mb-4 flex-1"
          style={{
            color: "rgba(1,0,42,0.5)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {post.desc}
        </p>

        {/* Author */}
        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: "1px solid rgba(1,0,42,0.06)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
            style={{
              background: isOrasi ? "#01002A" : "#5399EF",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {post.author.charAt(0)}
          </div>
          <span
            className="text-xs"
            style={{
              color: "rgba(1,0,42,0.45)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {post.author}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Posts() {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all" ? POSTS : POSTS.filter((p) => p.type === active);

  return (
    <section
      id="posts"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="text-xs font-bold tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Publikasi
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
            >
              Berita &amp; <span style={{ color: "#5399EF" }}>Orasi</span>
            </h2>
          </motion.div>

          {/* Filter pills */}
          <div className="flex gap-2">
            {FILTERS.map((f) => {
              const isActive = active === f.val;
              return (
                <button
                  key={f.val}
                  onClick={() => setActive(f.val)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.05em",
                    color: isActive ? "#ffffff" : "#5399EF",
                    background: isActive ? "#5399EF" : "rgba(83,153,239,0.08)",
                    border: isActive
                      ? "none"
                      : "1.5px solid rgba(83,153,239,0.25)",
                    boxShadow: isActive
                      ? "0 4px 16px rgba(83,153,239,0.35)"
                      : "none",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#5399EF",
              border: "1.5px solid rgba(83,153,239,0.3)",
              background: "rgba(83,153,239,0.05)",
            }}
          >
            Lihat Semua Publikasi
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
