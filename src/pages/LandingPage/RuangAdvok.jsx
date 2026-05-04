import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WaIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CONTACT_OPTIONS = [
  {
    id: 4,
    title: "WhatsApp BEM PNJ",
    desc: "Chat langsung dengan pengurus",
    icon: <WaIcon />,
  },
];

const RuangAdvok = () => {
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [kategori, setKategori] = useState("");
  const [pesan, setPesan] = useState("");
  const [isAnonim, setIsAnonim] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "ip_fallback_" + Math.random().toString(36).substring(7);
    }
  };

  const checkFrontendRateLimit = () => {
    const now = Date.now();
    const TIME_WINDOW = 60 * 1000;
    const MAX_SUBMITS = 5;

    const historyStr = localStorage.getItem("advokasi_submits");
    let history = historyStr ? JSON.parse(historyStr) : [];

    history = history.filter((time) => now - time < TIME_WINDOW);

    if (history.length >= MAX_SUBMITS) {
      localStorage.setItem("advokasi_submits", JSON.stringify(history));
      return false;
    }

    history.push(now);
    localStorage.setItem("advokasi_submits", JSON.stringify(history));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAnonim && nama.trim() === "") {
      toast.warning("Mohon isi nama kamu, atau centang 'Kirim secara anonim'.");
      return;
    }
    if (jurusan === "") {
      toast.warning("Mohon pilih Jurusan terlebih dahulu.");
      return;
    }
    if (kategori === "") {
      toast.warning("Mohon pilih Kategori terlebih dahulu.");
      return;
    }
    if (pesan.trim() === "") {
      toast.warning("Kolom Aspirasi / Masukan tidak boleh kosong.");
      return;
    }

    if (!checkFrontendRateLimit()) {
      toast.error(
        "Terlalu banyak pengiriman dalam waktu singkat. Tunggu beberapa saat.",
      );
      return;
    }

    setLoading(true);
    const currentIP = await getUserIP();
    const submitData = new URLSearchParams();

    submitData.append("nama", isAnonim ? "Anonim" : nama);
    submitData.append("jurusan", jurusan);
    submitData.append("kategori", kategori);
    submitData.append("pesan", pesan);
    submitData.append("user_ip", currentIP);

    try {
      const response = await fetch(import.meta.env.VITE_URL_APPS_SCRIPT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: submitData,
      });

      const result = await response.json();

      if (
        result.status === "error" &&
        result.message === "RATE_LIMIT_EXCEEDED"
      ) {
        toast.error(
          "Kamu terlalu banyak mengirim.",
        );
      } else if (result.status === "success") {
        toast.success("Aspirasi berhasil dikirim!");
        setNama("");
        setJurusan("");
        setKategori("");
        setPesan("");
        setIsAnonim(false);
      } else {
        toast.error(
          "Gagal mengirim: " + (result.message || "Kesalahan sistem"),
        );
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden" id="aspirasi">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col pt-4"
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aspirasi Mahasiswa
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl text-slate-900 mb-6 leading-tight font-black"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ada yang ingin
            <br />
            kamu sampaikan?
          </h2>

          <p
            className="text-slate-600 text-sm md:text-base leading-relaxed mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Kami adalah simpul aspirasi mahasiswa PNJ. Setiap masukan, keluhan,
            atau ide yang kamu sampaikan akan kami terima, catat, dan
            perjuangkan. Tidak ada suara yang terlalu kecil.
          </p>

          <div className="flex flex-col gap-3">
            {CONTACT_OPTIONS.map((contact) => (
              <a
                key={contact.id}
                href="#"
                className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                    {contact.icon}
                  </div>
                  <div>
                    <h4
                      className="text-slate-800 text-sm font-bold group-hover:text-blue-600 transition-colors"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {contact.title}
                    </h4>
                    <p
                      className="text-slate-500 text-xs mt-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {contact.desc}
                    </p>
                  </div>
                </div>
                <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ChevronRight />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <h3
              className="text-xl text-[#01002A] italic font-bold tracking-tight text-blue-500"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Form Aspirasi & Masukan
            </h3>
          </div>

          <form
            className="flex flex-col gap-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Nama (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Nama kamu..."
                  value={isAnonim ? "Anonim" : nama}
                  onChange={(e) => setNama(e.target.value)}
                  disabled={isAnonim}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Jurusan <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 outline-none cursor-pointer"
                  onChange={(e) => setJurusan(e.target.value)}
                  value={jurusan}
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="tik">Teknik Informatika & Komputer</option>
                  <option value="sipil">Teknik Sipil</option>
                  <option value="mesin">Teknik Mesin</option>
                  <option value="elektro">Teknik Elektro</option>
                  <option value="akuntansi">Akuntansi</option>
                  <option value="an">Administrasi Niaga</option>
                  <option value="tgp">Teknik Grafika & Penerbitan</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 outline-none cursor-pointer"
                onChange={(e) => setKategori(e.target.value)}
                value={kategori}
              >
                <option value="">Pilih Kategori</option>
                <option value="fasilitas">Fasilitas</option>
                <option value="akademik">Akademik</option>
                <option value="ukt">UKT / Keuangan</option>
                <option value="organisasi">Organisasi</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">
                Aspirasi / Masukan <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={pesan}
                placeholder="Tuliskan aspirasi, keluhan, atau ide-idemu di sini..."
                onChange={(e) => setPesan(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                id="anonim"
                checked={isAnonim}
                onChange={(e) => setIsAnonim(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="anonim"
                className="text-sm text-slate-600 font-medium cursor-pointer"
              >
                Kirim secara anonim
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>🚀 Kirim Aspirasi</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RuangAdvok;
