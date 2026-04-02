import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({ post, index }) {
  const navigate = useNavigate();

  const getCategoryConfig = (category) => {
    switch (category) {
      case "Orasi":
        return {
          primary: "#01002A",
          bg: "rgba(1,0,42,0.07)",
          border: "rgba(1,0,42,0.12)",
          gradient: "linear-gradient(90deg, #01002A, #01002A88)",
          icon: "📢",
        };
      case "Prestasi":
        return {
          primary: "#d97706",
          bg: "rgba(217,119,6,0.08)",
          border: "rgba(217,119,6,0.2)",
          gradient: "linear-gradient(90deg, #d97706, #fcd34d)",
          icon: "🏆",
        };
      case "Event":
        return {
          primary: "#10b981",
          bg: "rgba(16, 185, 129, 0.08)",
          border: "rgba(16, 185, 129, 0.2)",
          gradient: "linear-gradient(90deg, #10b981, #34d399)",
          icon: "📅",
        };
      case "News":
      default:
        return {
          primary: "#5399EF",
          bg: "rgba(83,153,239,0.08)",
          border: "rgba(83,153,239,0.2)",
          gradient: "linear-gradient(90deg, #5399EF, #7FB3F5)",
          icon: "📰",
        };
    }
  };

  const theme = getCategoryConfig(post.category);

  return (
    <motion.article
      onClick={() => navigate(`/posts/${post.slug}`)}
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
      <div className="w-full aspect-video bg-slate-100 overflow-hidden relative">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No Image
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: theme.gradient }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shrink-0"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "0.08em",
              color: theme.primary,
              background: theme.bg,
              border: `1px solid ${theme.border}`,
            }}
          >
            {theme.icon} {post.category}
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
              className="text-[10px] mt-0.5 font-bold"
              style={{
                color: "rgba(83,153,239,0.8)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block mr-1 bg-[#5399EF]" />
              {post.status}
            </div>
          </div>
        </div>

        <h4
          className="font-black text-sm sm:text-base leading-snug mb-2 group-hover:text-[#5399EF] transition-colors duration-300 line-clamp-2"
          style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
        >
          {post.title}
        </h4>

        <p
          className="text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3"
          style={{
            color: "rgba(1,0,42,0.5)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {post.desc}
        </p>

        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: "1px solid rgba(1,0,42,0.06)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
            style={{
              background: theme.primary,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {post.author.charAt(0).toUpperCase()}
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
