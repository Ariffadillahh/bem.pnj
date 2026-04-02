import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/PostCard";

const FILTERS = [
  { val: "all", label: "Semua" },
  { val: "News", label: "News" },
  { val: "Orasi", label: "Orasi" },
  { val: "Prestasi", label: "Prestasi" },
];

export default function Posts() {
  const navigate = useNavigate();
  const [active, setActive] = useState("all");

  const {
    data: responseData,
    isLoading,
    isError,
  } = usePosts({
    per_page: 20,
  });

  const rawPosts = responseData?.data || [];

  // Filter 3 Kategori
  const validPosts = rawPosts.filter(
    (post) =>
      (post.category === "News" ||
        post.category === "Orasi" ||
        post.category === "Prestasi") &&
      post.status === "Published",
  );

  const tabFiltered =
    active === "all"
      ? validPosts
      : validPosts.filter((p) => p.category === active);

  const finalPosts = tabFiltered.slice(0, 5);

 
  const formatDate = (dateStr) => {
    if (!dateStr) return "TBA";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="posts"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-0">
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
              Publikasi BEM PNJ
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black max-w-xl"
              style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
            >
              Berita, Orasi &amp;{" "}
              <span style={{ color: "#5399EF" }}>Prestasi</span>
            </h2>
          </motion.div>

          <div className="flex gap-2 flex-wrap">
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

        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center text-blue-500">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p className="text-sm text-slate-500 font-medium">
              Memuat data publikasi terbaru...
            </p>
          </div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-500 font-medium">
            Gagal memuat publikasi.
          </div>
        )}

        {!isLoading && !isError && finalPosts.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {finalPosts.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={{
                    title: post.title,
                    slug: post.slug,
                    desc: post.short_description,
                    author: post.creator_name || "Admin",
                    date: formatDate(post.created_at),
                    category: post.category,
                    thumbnail: post.thumbnail,
                    status: post.status,
                  }}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && !isError && finalPosts.length === 0 && (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
            Belum ada publikasi pada kategori ini.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/posts")}
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
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
          </button>
        </motion.div>
      </div>
    </section>
  );
}
