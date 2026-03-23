import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEARCH_POOL } from "../data/mockData";
import { IoClose } from "react-icons/io5";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5399EF"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ArrowIcon = () => (
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
);

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  const results =
    query.trim().length > 0
      ? SEARCH_POOL.filter((s) =>
          s.label.toLowerCase().includes(query.toLowerCase()),
        )
      : SEARCH_POOL.slice(0, 6);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        setHighlighted((v) => Math.min(v + 1, results.length - 1));
      if (e.key === "ArrowUp") setHighlighted((v) => Math.max(v - 1, 0));
      if (e.key === "Enter" && results[highlighted]) {
        window.location.href = results[highlighted].href;
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, highlighted]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center"
          style={{
            paddingTop: "clamp(60px, 12vh, 120px)",
            paddingLeft: 16,
            paddingRight: 16,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(1,0,42,0.4)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full z-10"
            style={{ maxWidth: 620 }}
            initial={{ opacity: 0, y: -32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Search box */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1.5px solid rgba(83,153,239,0.25)",
                boxShadow:
                  "0 32px 80px rgba(1,0,42,0.18), 0 4px 16px rgba(83,153,239,0.12)",
              }}
            >
              {/* Input row */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid rgba(83,153,239,0.1)" }}
              >
                <SearchIcon />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari event, berita, halaman..."
                  className="flex-1 text-base outline-none bg-transparent"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#01002A",
                    caretColor: "#5399EF",
                  }}
                />
                <button
                  onClick={onClose}
                  className="shrink-0 text-xs px-2 py-1 rounded-lg transition-all duration-200 hover:bg-[#5399EF]/10 flex items-center gap-1"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#5399EF",
                    border: "1px solid rgba(83,153,239,0.25)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <IoClose  size={20}/>
                  ESC
                </button>
              </div>

              <div
                className="py-2"
                style={{ maxHeight: 380, overflowY: "auto" }}
              >
                {results.length === 0 ? (
                  <div
                    className="px-5 py-8 text-center"
                    style={{
                      color: "rgba(1,0,42,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                    }}
                  >
                    Tidak ada hasil untuk{" "}
                    <strong style={{ color: "#5399EF" }}>"{query}"</strong>
                  </div>
                ) : (
                  <>
                    <div
                      className="px-5 pb-1 text-xs font-bold tracking-widest"
                      style={{
                        color: "rgba(1,0,42,0.35)",
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      {query ? `${results.length} HASIL` : "PINTASAN"}
                    </div>
                    <AnimatePresence mode="popLayout">
                      {results.map((r, i) => (
                        <motion.a
                          key={r.label}
                          href={r.href}
                          onClick={onClose}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.035, duration: 0.2 }}
                          className="flex items-center gap-4 px-5 py-3 mx-2 rounded-xl transition-all duration-150 group cursor-pointer no-underline"
                          style={{
                            background:
                              highlighted === i
                                ? "rgba(83,153,239,0.08)"
                                : "transparent",
                            border:
                              highlighted === i
                                ? "1px solid rgba(83,153,239,0.2)"
                                : "1px solid transparent",
                          }}
                          onMouseEnter={() => setHighlighted(i)}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{ background: "rgba(83,153,239,0.08)" }}
                          >
                            {r.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm font-semibold truncate"
                              style={{
                                color: "#01002A",
                                fontFamily: "'Syne', sans-serif",
                              }}
                            >
                              {r.label}
                            </div>
                            <div
                              className="text-xs truncate mt-0.5"
                              style={{
                                color: "rgba(1,0,42,0.45)",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              {r.sub}
                            </div>
                          </div>
                          <span
                            className="shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                            style={{ color: "#5399EF" }}
                          >
                            <ArrowIcon />
                          </span>
                        </motion.a>
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Footer hints */}
              <div
                className="flex items-center gap-4 px-5 py-3 text-xs"
                style={{
                  borderTop: "1px solid rgba(83,153,239,0.08)",
                  color: "rgba(1,0,42,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#f0f4fb] text-[#5399EF] font-bold text-[10px]">
                    ↑↓
                  </kbd>{" "}
                  navigasi
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#f0f4fb] text-[#5399EF] font-bold text-[10px]">
                    ↵
                  </kbd>{" "}
                  buka
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#f0f4fb] text-[#5399EF] font-bold text-[10px]">
                    ESC
                  </kbd>{" "}
                  tutup
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
