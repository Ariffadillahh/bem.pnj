import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GuestLayouts from "../../components/layout/GuestLayout";
import { usePost } from "../../hooks/usePosts";
import BlockNoteRenderer from "../../components/BlockNoteRender";

export default function PostDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = usePost(slug);

  const getCategoryTheme = (category) => {
    switch (category) {
      case "Orasi":
        return { color: "#01002A", bg: "rgba(1,0,42,0.1)", icon: "📢" };
      case "Prestasi":
        return { color: "#d97706", bg: "rgba(217,119,6,0.1)", icon: "🏆" };
      case "Event":
        return { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: "📅" };
      default:
        return { color: "#5399EF", bg: "rgba(83,153,239,0.1)", icon: "📰" };
    }
  };

  if (isLoading) {
    return (
      <GuestLayouts>
        <div className="min-h-screen flex items-center justify-center pt-16">
          <p className="text-gray-500 font-medium animate-pulse">
            Memuat publikasi...
          </p>
        </div>
      </GuestLayouts>
    );
  }

  if (isError || !post) {
    return (
      <GuestLayouts>
        <div className="min-h-screen flex flex-col items-center justify-center pt-16 gap-4">
          <p className="text-red-500 font-medium text-lg">
            Publikasi tidak ditemukan.
          </p>
          <button
            onClick={() => navigate("/posts")}
            className="px-6 py-2 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200"
          >
            Kembali ke Daftar Postingan
          </button>
        </div>
      </GuestLayouts>
    );
  }

  const theme = getCategoryTheme(post.category);

  return (
    <GuestLayouts>
      <article className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/posts")}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#5399EF] transition-colors mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          &larr; Kembali
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="inline-flex items-center gap-2 text-sm font-bold px-4 py-1.5 rounded-full"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: theme.color,
                background: theme.bg,
              }}
            >
              {theme.icon} {post.category}
            </span>

            <span className="text-sm text-gray-400 font-medium">
              • Dipublikasikan pada {post.created_at}
            </span>

            {post.event_date && (
              <span className="text-sm font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-md">
                Acara: {post.event_date}
              </span>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-8"
            style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-100">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: theme.color,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {(post.creator_name || "A").charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-bold text-gray-800 text-sm">
                {post.creator_name || "Admin"}
              </p>
              <p className="text-xs text-gray-400">
                BEM Politeknik Negeri Jakarta
              </p>
            </div>
          </div>
        </motion.div>

        {post.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-xl shadow-gray-200/50"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white"
        >
          <BlockNoteRenderer content={post.content} />
        </motion.div>
      </article>
    </GuestLayouts>
  );
}
