import React, { useState, useEffect } from "react";
import GuestLayouts from "../../components/layout/GuestLayout";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/PostCard";
import { Search, X, FileText } from "lucide-react";

const PER_PAGE_OPTIONS = [10, 20, 50];

function PrestasiPage() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 450);
    return () => clearTimeout(t);
  }, [searchInput]);

  // HARCODED: Parameter kategori diset "Prestasi" secara permanen
  const queryParams = {
    page,
    per_page: perPage,
    category: "Prestasi",
    ...(debouncedSearch && { search: debouncedSearch }),
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
        <div className="pt-28 pb-6" style={{ background: "#ffffff" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-0">
            {/* Judul & Search Box */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1
                  className="text-4xl md:text-5xl font-black text-[#01002A]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Prestasi <span style={{ color: "#5399EF" }}>Mahasiswa</span>
                </h1>
                <p
                  className="text-sm mt-2 text-slate-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Jejak langkah membanggakan dari mahasiswa PNJ.
                </p>
              </div>

              {/* Kotak Pencarian */}
              <div className="w-full md:w-[320px] relative shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari prestasi..."
                  className="w-full pl-10 pr-10 py-3 md:py-2.5 rounded-2xl md:rounded-xl text-sm outline-none border transition-all bg-[#f7f9fc] focus:bg-white focus:ring-4"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#01002A",
                    borderColor: "rgba(1,0,42,0.07)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#5399EF";
                    e.target.style.boxShadow = "0 0 0 4px rgba(83,153,239,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(1,0,42,0.07)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {debouncedSearch && (
              <p
                className="text-xs mt-4 text-slate-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Menampilkan hasil untuk{" "}
                <span className="font-semibold" style={{ color: "#5399EF" }}>
                  "{debouncedSearch}"
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-0">
          <div
            className="h-px mt-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(83,153,239,0.3) 0%, transparent 100%)",
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
                className="text-sm text-slate-500"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                Memuat prestasi...
              </p>
            </div>
          )}

          {isError && (
            <div className="py-20 text-center">
              <p
                className="text-sm font-semibold text-red-500"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                Gagal memuat prestasi. Silakan coba lagi.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <div>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  className="mt-4 py-20 flex flex-col items-center gap-3 rounded-2xl text-center"
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
                    className="text-sm font-bold text-slate-600"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {debouncedSearch
                      ? `Tidak ada prestasi cocok dengan "${debouncedSearch}"`
                      : "Belum ada data prestasi."}
                  </p>
                  {debouncedSearch && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="text-xs font-bold hover:underline mt-1"
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        color: "#5399EF",
                      }}
                    >
                      Reset pencarian
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* BAGIAN BAWAH: INFO HALAMAN, PER PAGE & PAGINATION */}
          {!isLoading && !isError && posts.length > 0 && (
            <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-4">
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="text-xs font-bold rounded-xl px-4 py-2.5 outline-none cursor-pointer transition-all"
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    color: "#01002A",
                    background: "#f7f9fc",
                    border: "1.5px solid rgba(1,0,42,0.07)",
                    appearance: "none",
                  }}
                >
                  {PER_PAGE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      Tampilkan {n} baris
                    </option>
                  ))}
                </select>

                <span
                  className="text-sm hidden sm:block text-slate-500"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  Menampilkan{" "}
                  <strong style={{ color: "#01002A" }}>{posts.length}</strong>{" "}
                  prestasi
                </span>
              </div>

              {meta?.last_page > 1 && (
                <div className="flex items-center gap-2">
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

                  <div className="flex items-center gap-1 hidden sm:flex">
                    {pageNums.map((p, i) =>
                      p === "…" ? (
                        <span
                          key={`dot-${i}`}
                          className="px-2 text-sm text-slate-400"
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
                            background: p === page ? "#5399EF" : "transparent",
                            color: p === page ? "#fff" : "rgba(1,0,42,0.55)",
                            border:
                              p === page
                                ? "none"
                                : "1px solid rgba(1,0,42,0.05)",
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
                    onClick={() =>
                      setPage((p) => (p < meta.last_page ? p + 1 : p))
                    }
                    disabled={page === meta.last_page}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      background:
                        page === meta.last_page ? "#f3f4f6" : "#01002A",
                      color: page === meta.last_page ? "#9ca3af" : "#fff",
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </GuestLayouts>
  );
}

export default PrestasiPage;
