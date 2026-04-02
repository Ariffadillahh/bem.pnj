import { ExternalLink, Link2 } from "lucide-react";
import React from "react";

const LinkCard = ({ link }) => {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300"
      style={{
        border: "1.5px solid rgba(1,0,42,0.08)",
        boxShadow: "0 4px 20px rgba(1,0,42,0.05)",
        transition: "border-color .3s, box-shadow .3s, transform .3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(83,153,239,0.35)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(83,153,239,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(1,0,42,0.08)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(1,0,42,0.05)";
      }}
    >
      <div
        className="h-[3px] flex-shrink-0"
        style={{
          background: "linear-gradient(90deg, #5399EF, #5399EF55)",
        }}
      />

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(83,153,239,0.1)" }}
          >
            <Link2 size={16} style={{ color: "#5399EF" }} />
          </div>
          <h3
            className="text-sm font-black text-[#01002A] leading-snug line-clamp-2 group-hover:text-[#5399EF] transition-colors duration-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {link.title}
          </h3>
        </div>

        <p
          className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5 flex-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {link.description || "Tidak ada deskripsi tersedia."}
        </p>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#5399EF",
            background: "rgba(83,153,239,0.08)",
            border: "1.5px solid rgba(83,153,239,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#5399EF";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#5399EF";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(83,153,239,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(83,153,239,0.08)";
            e.currentTarget.style.color = "#5399EF";
            e.currentTarget.style.borderColor = "rgba(83,153,239,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Buka Tautan
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};

export default LinkCard;
