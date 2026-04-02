import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "../hooks/usePosts";
import { RiSearch2Line } from "react-icons/ri";
import { FaArrowTurnUp } from "react-icons/fa6";
import {
  MdOutlineArticle,
  MdOutlineGroups,
  MdOutlineLink,
} from "react-icons/md";

const SHORTCUTS = [
  {
    id: "short-1",
    title: "Postingan",
    description:
      "Berita, Event, Prestasi, Orasi dan Info lomba, Magang dan loker",
    type: "Halaman",
    url: "/posts",
    icon: <MdOutlineArticle className="text-xl" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "short-2",
    title: "Link Mahasiswa",
    description: "Portal penting dan E-Learning",
    type: "Halaman",
    url: "/student-links",
    icon: <MdOutlineLink className="text-xl" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "short-3",
    title: "Struktur Organisasi",
    description: "Susunan kepengurusan dan divisi",
    type: "Halaman",
    url: "/struktur-organisasi",
    icon: <MdOutlineGroups className="text-xl" />,
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function SearchModal({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  const { data: searchResults, isFetching } = useGlobalSearch(debouncedQuery);

  const isTyping = query !== debouncedQuery;
  const isLoading = isFetching || isTyping;

  const isInputEmpty = query.trim().length === 0;
  const results = isInputEmpty ? SHORTCUTS : searchResults || [];

  const getManualUrl = (item) => {
    if (item.url) return item.url;

    if (item.type === "Postingan") return `/posts/${item.slug}`;
    return `/student-links/${item.id}`;
  };

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
        navigate(getManualUrl(results[highlighted]));
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, highlighted, navigate, onClose]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const handleItemClick = (e, item) => {
    e.preventDefault();
    navigate(getManualUrl(item));
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-start justify-center"
          style={{
            paddingTop: "clamp(60px, 12vh, 120px)",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* BACKDROP HITAM DENGAN EFEK BLUR HALUS */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.6)", // Warna hitam dengan opasitas 60%
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)", // Penting untuk Safari iOS/Mac
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
          />

          {/* KOTAK MODAL PENCARIAN */}
          <motion.div
            className="relative w-full z-10"
            style={{ maxWidth: 620 }}
            initial={{ opacity: 0, y: -32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {/* Header Search Input */}
              <div
                className="flex items-center gap-3 px-5 py-4 shrink-0"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <RiSearch2Line className="text-[#5399EF] text-xl" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari konten berita, event, atau link portal..."
                  className="flex-1 text-base outline-none bg-transparent"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#01002A",
                    caretColor: "#5399EF",
                  }}
                />

                {isLoading && !isInputEmpty && (
                  <Loader2 className="animate-spin text-[#5399EF]" size={18} />
                )}

                <button
                  onClick={onClose}
                  className="shrink-0 text-xs px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-100 flex items-center gap-1"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    color: "#6b7280",
                    border: "1px solid #e5e7eb",
                    letterSpacing: "0.05em",
                  }}
                >
                  <IoClose size={20} />
                  ESC
                </button>
              </div>

              {/* Results Area */}
              <div className="py-2 overflow-y-auto flex-1 min-h-[100px]">
                {!isInputEmpty && query.trim().length < 2 ? (
                  <div className="px-5 py-8 text-center text-gray-400 text-sm font-['DM_Sans']">
                    Ketik minimal 2 huruf untuk mulai mencari...
                  </div>
                ) : !isInputEmpty && isLoading && query.trim().length >= 2 ? (
                  <div className="px-5 py-10 flex flex-col items-center justify-center gap-3 text-gray-400 text-sm font-['DM_Sans']">
                    <Loader2
                      className="animate-spin text-[#5399EF]"
                      size={32}
                    />
                    <span>Mencari data...</span>
                  </div>
                ) : !isInputEmpty && results.length === 0 && !isLoading ? (
                  <div className="px-5 py-8 text-center text-gray-400 text-sm font-['DM_Sans']">
                    Tidak ada hasil untuk{" "}
                    <strong style={{ color: "#5399EF" }}>"{query}"</strong>
                  </div>
                ) : (
                  <>
                    <div className="px-5 pb-1 pt-2 text-xs font-bold tracking-widest text-gray-400 font-['Syne'] uppercase flex items-center gap-2">
                      {isInputEmpty ? "Pintasan Halaman" : "Hasil Pencarian"}
                    </div>

                    <AnimatePresence mode="popLayout">
                      {results.map((r, i) => (
                        <motion.a
                          key={`${r.type}-${r.id || r.url}`}
                          href={getManualUrl(r)}
                          onClick={(e) => handleItemClick(e, r)}
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
                          {r.thumbnail ? (
                            <img
                              src={r.thumbnail}
                              alt={r.title}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-100"
                              onError={(e) =>
                                (e.target.src =
                                  "https://placehold.co/100x100?text=No+Image")
                              }
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 border border-slate-100 text-slate-500 shadow-sm group-hover:scale-105 transition-transform">
                              {r.icon ? r.icon : "🔗"}
                            </div>
                          )}

                          <div className="flex-1 min-w-0 flex justify-between items-center pr-2">
                            <div className="flex-col overflow-hidden w-full">
                              <div className="text-sm font-bold truncate text-[#01002A] font-['Syne']">
                                {r.title}
                              </div>
                              <div className="text-xs truncate mt-0.5 text-gray-500 font-['DM_Sans'] flex items-center gap-2">
                                {r.description}
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 shrink-0 
                                ${r.color ? r.color : r.type === "Postingan" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                            >
                              {r.type}
                            </span>
                          </div>

                          <span className="shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 text-[#5399EF]">
                            <FaArrowTurnUp className="rotate-90" />
                          </span>
                        </motion.a>
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Footer Shortcut Keys */}
              <div
                className="flex items-center justify-between px-5 py-3 text-xs shrink-0"
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  color: "rgba(1,0,42,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div className="flex gap-4">
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 font-bold text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    navigasi
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 font-bold text-[10px]">
                      ↵
                    </kbd>{" "}
                    buka
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 font-bold text-[10px]">
                      ESC
                    </kbd>{" "}
                    tutup
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
