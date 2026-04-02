import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ExternalLink, Loader2, Link2, X } from "lucide-react";
import GuestLayouts from "../../components/layout/GuestLayout";
import { usePortalLinks } from "../../hooks/usePortalLinks";
import LinkCard from "../../components/LinkCard";

const StudentLinkPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== searchInput) {
        setDebouncedSearch(searchInput);
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, debouncedSearch]);

  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (page > 1) params.page = page;
    setSearchParams(params);
  }, [debouncedSearch, page, setSearchParams]);

  const { data, isLoading, isError } = usePortalLinks(debouncedSearch, page);

  const links = data?.data || [];
  const meta = data?.meta || {};

  return (
    <GuestLayouts>
      <div className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div
              className="text-xs font-black tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Portal Mahasiswa
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <h1
                  className="text-4xl md:text-5xl font-black leading-none tracking-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
                >
                  Akses <span style={{ color: "#5399EF" }}>Link Cepat</span>
                </h1>
                <p
                  className="text-base text-slate-500 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Kumpulan tautan penting, dokumen, dan referensi untuk
                  menunjang kegiatan kemahasiswaan PNJ.
                </p>
              </div>

              <div className="w-full lg:w-[380px] flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={16} className="text-[#5399EF]" />
                  </div>

                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Cari nama atau deskripsi..."
                    className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm text-[#01002A] placeholder:text-slate-400 outline-none transition-all"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "#ffffff",
                      border: "1.5px solid rgba(83,153,239,0.28)",
                      boxShadow: searchInput
                        ? "0 0 0 3px rgba(83,153,239,0.12)"
                        : "0 2px 12px rgba(1,0,42,0.06)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#5399EF";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(83,153,239,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(83,153,239,0.28)";
                      e.target.style.boxShadow = "0 2px 12px rgba(1,0,42,0.06)";
                    }}
                  />

                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#01002A] transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {debouncedSearch && (
                  <p
                    className="text-xs text-slate-400 mt-2 pl-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Hasil pencarian untuk{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "#5399EF" }}
                    >
                      "{debouncedSearch}"
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className="mb-10 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(83,153,239,0.35), rgba(1,0,42,0.06))",
            }}
          />

          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(83,153,239,0.1)" }}
              >
                <Loader2
                  size={22}
                  className="animate-spin"
                  style={{ color: "#5399EF" }}
                />
              </div>
              <p
                className="text-sm text-slate-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Memuat data tautan...
              </p>
            </div>
          )}

          {isError && (
            <div className="py-20 text-center">
              <p
                className="text-sm font-semibold text-red-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Gagal memuat daftar tautan. Silakan coba lagi nanti.
              </p>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              {links.length > 0 ? (
                <>
                  <p
                    className="text-xs text-slate-400 mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Menampilkan{" "}
                    <span className="font-bold" style={{ color: "#01002A" }}>
                      {links.length}
                    </span>{" "}
                    tautan
                    {debouncedSearch && (
                      <>
                        {" "}
                        dari pencarian{" "}
                        <span style={{ color: "#5399EF" }}>
                          "{debouncedSearch}"
                        </span>
                      </>
                    )}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {links.map((link, i) => (
                      <LinkCard key={link.id} link={link} index={i} />
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className="py-20 text-center rounded-2xl"
                  style={{
                    background: "rgba(83,153,239,0.04)",
                    border: "1.5px dashed rgba(83,153,239,0.2)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "rgba(83,153,239,0.1)" }}
                  >
                    <Link2 size={24} style={{ color: "#5399EF" }} />
                  </div>
                  <p
                    className="text-sm font-semibold text-slate-500"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {debouncedSearch
                      ? `Tidak ada tautan cocok dengan "${debouncedSearch}"`
                      : "Belum ada tautan yang ditambahkan."}
                  </p>
                  {debouncedSearch && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="mt-4 text-xs font-bold transition-colors hover:underline"
                      style={{
                        color: "#5399EF",
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      Hapus pencarian
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {!isLoading && !isError && meta?.last_page > 1 && (
            <div className="mt-14 flex justify-start items-center gap-3">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: page === 1 ? "#f3f4f6" : "#01002A",
                  color: page === 1 ? "#9ca3af" : "#fff",
                }}
              >
                ← Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: meta.last_page }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === meta.last_page ||
                      Math.abs(p - page) <= 1,
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span
                        key={`dot-${idx}`}
                        className="px-2 text-slate-400 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          background:
                            p === page ? "#5399EF" : "rgba(83,153,239,0.08)",
                          color: p === page ? "#fff" : "rgba(1,0,42,0.6)",
                          border:
                            p === page
                              ? "none"
                              : "1px solid rgba(83,153,239,0.2)",
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
                  setPage((old) =>
                    !meta.last_page || old === meta.last_page ? old : old + 1,
                  )
                }
                disabled={page === meta.last_page}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: page === meta.last_page ? "#f3f4f6" : "#01002A",
                  color: page === meta.last_page ? "#9ca3af" : "#fff",
                }}
              >
                Berikutnya →
              </button>
            </div>
          )}
        </div>
      </div>
    </GuestLayouts>
  );
};


export default StudentLinkPage;
