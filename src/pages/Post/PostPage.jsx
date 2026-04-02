import React, { useState, useEffect } from "react";
import GuestLayouts from "../../components/layout/GuestLayout";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/PostCard";
import { Search, X, FileText } from "lucide-react";

const CATEGORIES = [
  { value: "All", label: "Semua", icon: "✦" },
  { value: "News", label: "News", icon: "📰" },
  { value: "Orasi", label: "Orasi", icon: "📢" },
  { value: "Events", label: "Event", icon: "🗓" },
  { value: "Prestasi", label: "Prestasi", icon: "🏆" },
];

const PER_PAGE_OPTIONS = [10, 20, 50];

function PostPage() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 450);
    return () => clearTimeout(t);
  }, [searchInput]);

  const queryParams = {
    page,
    per_page: perPage,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(category !== "All" && { category }),
  };

  const { data, isLoading, isError } = usePosts(queryParams);
  const posts = data?.data || [];
  const meta = data?.meta || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBA";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const pageNums = meta.last_page
    ? Array.from({ length: meta.last_page }, (_, i) => i + 1)
        .filter(
          (p) => p === 1 || p === meta.last_page || Math.abs(p - page) <= 1,
        )
        .reduce((acc, p, idx, arr) => {
          if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
          acc.push(p);
          return acc;
        }, [])
    : [];

  return (
    <GuestLayouts>
      <div className="min-h-screen bg-white">
        <div className="pt-28 pb-10" style={{ background: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-0">
            <div className="mb-8">
              <div
                className="text-xs font-black tracking-[0.18em] uppercase mb-3"
                style={{ fontFamily: "'Syne',sans-serif", color: "#5399EF" }}
              >
                Publikasi BEM PNJ
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-xl">
                  <h1
                    className="text-4xl md:text-5xl font-black leading-none tracking-tight mb-3"
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      color: "#01002A",
                    }}
                  >
                    Semua <span style={{ color: "#5399EF" }}>Postingan</span>
                  </h1>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      color: "rgba(1,0,42,0.5)",
                    }}
                  >
                    Berita, orasi, event, dan prestasi terbaru dari BEM
                    Politeknik Negeri Jakarta.
                  </p>
                </div>

                <div className="w-full lg:w-[360px] flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={15} style={{ color: "#5399EF" }} />
                    </div>
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Cari judul postingan..."
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: "#01002A",
                        background: "#fff",
                        border: "1.5px solid rgba(83,153,239,0.28)",
                        boxShadow: "0 2px 12px rgba(1,0,42,0.05)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#5399EF";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(83,153,239,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(83,153,239,0.28)";
                        e.target.style.boxShadow =
                          "0 2px 12px rgba(1,0,42,0.05)";
                      }}
                    />
                    {searchInput && (
                      <button
                        onClick={() => setSearchInput("")}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                        style={{ color: "rgba(1,0,42,0.3)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#01002A")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(1,0,42,0.3)")
                        }
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {debouncedSearch && (
                    <p
                      className="text-xs mt-1.5 pl-1"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: "rgba(1,0,42,0.4)",
                      }}
                    >
                      Hasil untuk{" "}
                      <span style={{ color: "#5399EF", fontWeight: 600 }}>
                        "{debouncedSearch}"
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl"
              style={{
                background: "#f7f9fc",
                border: "1.5px solid rgba(1,0,42,0.07)",
              }}
            >
              <div className="flex flex-wrap gap-2 items-center">
                {CATEGORIES.map(({ value, label, icon }) => {
                  const active = category === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setCategory(value);
                        setPage(1);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        color: active ? "#fff" : "rgba(1,0,42,0.55)",
                        background: active ? "#01002A" : "#fff",
                        border: active
                          ? "none"
                          : "1.5px solid rgba(1,0,42,0.1)",
                        boxShadow: active
                          ? "0 3px 12px rgba(1,0,42,0.18)"
                          : "none",
                        transform: active ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      <span className="text-sm">{icon}</span> {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {!isLoading && posts.length > 0 && (
                  <span
                    className="text-xs hidden sm:block"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      color: "rgba(1,0,42,0.35)",
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "#01002A" }}>
                      {posts.length}
                    </span>{" "}
                    postingan
                  </span>
                )}
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="text-xs font-bold rounded-xl px-3 py-1.5 outline-none cursor-pointer transition-all"
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    color: "#01002A",
                    background: "#fff",
                    border: "1.5px solid rgba(1,0,42,0.1)",
                    appearance: "none",
                  }}
                >
                  {PER_PAGE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      Tampilkan {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-0">
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg,rgba(83,153,239,0.3),rgba(1,0,42,0.05))",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto pt-8 pb-24 px-5 md:px-0">
          {isLoading && (
            <div className="py-20 flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(83,153,239,0.1)" }}
              >
                <svg
                  className="animate-spin"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5399EF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <p
                className="text-sm"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  color: "rgba(1,0,42,0.4)",
                }}
              >
                Memuat postingan...
              </p>
            </div>
          )}

          {isError && (
            <div className="py-20 text-center">
              <p
                className="text-sm font-semibold text-red-500"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                Gagal memuat postingan. Silakan coba lagi.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts.map((post, index) => (
                    <PostCard
                      key={post.id || post.slug}
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
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="py-20 flex flex-col items-center gap-3 rounded-2xl text-center"
                  style={{
                    background: "rgba(83,153,239,0.03)",
                    border: "1.5px dashed rgba(83,153,239,0.18)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(83,153,239,0.09)" }}
                  >
                    <FileText size={24} style={{ color: "#5399EF" }} />
                  </div>
                  <p
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      color: "rgba(1,0,42,0.5)",
                    }}
                  >
                    {debouncedSearch
                      ? `Tidak ada postingan cocok dengan "${debouncedSearch}"`
                      : "Belum ada postingan yang ditemukan."}
                  </p>
                  {(debouncedSearch || category !== "All") && (
                    <button
                      onClick={() => {
                        setSearchInput("");
                        setCategory("All");
                      }}
                      className="text-xs font-bold hover:underline mt-1"
                      style={{
                        color: "#5399EF",
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      Reset filter
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {!isLoading && !isError && meta?.last_page > 1 && (
            <div className="mt-12 flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Syne',sans-serif",
                  background: page === 1 ? "#f3f4f6" : "#01002A",
                  color: page === 1 ? "#9ca3af" : "#fff",
                }}
              >
                ← Prev
              </button>

              <div className="flex items-center gap-1">
                {pageNums.map((p, i) =>
                  p === "…" ? (
                    <span
                      key={`dot-${i}`}
                      className="px-2 text-sm"
                      style={{ color: "rgba(1,0,42,0.3)" }}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        background:
                          p === page ? "#5399EF" : "rgba(83,153,239,0.07)",
                        color: p === page ? "#fff" : "rgba(1,0,42,0.55)",
                        border:
                          p === page
                            ? "none"
                            : "1px solid rgba(83,153,239,0.18)",
                        boxShadow:
                          p === page
                            ? "0 4px 14px rgba(83,153,239,0.35)"
                            : "none",
                      }}
                    >
                      {p}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => setPage((p) => (p < meta.last_page ? p + 1 : p))}
                disabled={page === meta.last_page}
                className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Syne',sans-serif",
                  background: page === meta.last_page ? "#f3f4f6" : "#01002A",
                  color: page === meta.last_page ? "#9ca3af" : "#fff",
                }}
              >
                Next →
              </button>

              <span
                className="hidden sm:block text-xs ml-2"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  color: "rgba(1,0,42,0.38)",
                }}
              >
                Halaman{" "}
                <strong style={{ color: "#01002A" }}>
                  {meta.current_page}
                </strong>{" "}
                dari{" "}
                <strong style={{ color: "#01002A" }}>{meta.last_page}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </GuestLayouts>
  );
}

export default PostPage;
