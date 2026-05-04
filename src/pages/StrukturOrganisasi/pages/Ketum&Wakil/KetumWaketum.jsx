import React from "react";

import logoBem from "../../../../assets/images/logo.png";
import fotoKetum from "../../../../assets/images/kemas/kabid.png";
import fotoWaketum from "../../../../assets/images/kemas/kabid.png";

const KetumWaketum = () => {
  const dataPimpinan = {
    id: "pimpinan-bem",
    namaBidang: "Ketua & Wakil Ketua Umum",
    tahun: "BEM PNJ 2026",
    logo: logoBem,
    pimpinan: [
      {
        id: "ketua-umum",
        jabatan: "Ketua BEM PNJ 2026",
        nama: "Muhammad Farrel Adyatma Izaaz",
        jurusan: "Administrasi Niaga '23",
        foto: fotoKetum,
        deskripsi:
          "Kabinet Simpul Perubahan BEM PNJ Periode 2026 resmi melangkah! Sebagai nakhoda utama dan representasi arah gerak organisasi BEM PNJ 2026, mari berkenalan dengan Ketua BEM PNJ 2026 🦁🧭",
      },
      {
        id: "wakil-ketua",
        jabatan: "Wakil Ketua BEM PNJ 2026",
        nama: "Annatasya Cahya Putri",
        jurusan: "Teknik Mesin '23",
        foto: fotoWaketum,
        deskripsi:
          "Kabinet Simpul Perubahan BEM PNJ Periode 2026 resmi melangkah! Sebagai mitra strategis ketua dan pengawas sinergi organisasi BEM PNJ 2026, mari berkenalan dengan Wakil Ketua BEM PNJ 2026 🤝📈",
      },
    ],
  };

  return (
    <section className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 md:mb-24">
          <div className="order-1">
            <img
              src={dataPimpinan.logo}
              alt="Logo BEM PNJ"
              className="w-20 object-contain"
            />
          </div>

          <div className="text-center md:text-right order-2">
            <h1 className="text-3xl md:text-4xl font-black text-[#01002A] font-syne uppercase leading-[1.1] md:leading-[0.9]">
              Ketua & Wakil <span className="text-blue-500">Ketua Umum</span>
            </h1>
            <p className="text-yellow-600 font-bold mt-3 md:mt-4 tracking-[0.2em] uppercase text-[10px] md:text-sm">
              {dataPimpinan.tahun} • #SimpulPerubahan
            </p>
          </div>
        </div>

        {/* PROFIL PIMPINAN SECTION */}
        <div className="space-y-20 md:space-y-32">
          {dataPimpinan.pimpinan.map((person, index) => (
            <div
              key={person.id}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
            >
              {/* TEKS PROFIL */}
              <div
                className={`flex-1 text-center md:text-left order-1 ${index % 2 !== 0 ? "md:order-2" : "md:order-1"}`}
              >
                <h2 className="text-xs md:text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
                  {person.jabatan}
                </h2>
                <h3 className="text-2xl md:text-4xl font-black text-[#01002A] font-syne mb-1">
                  {person.nama}
                </h3>
                <p className="text-slate-400 font-bold text-sm md:text-base mb-6">
                  {person.jurusan}
                </p>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  {person.deskripsi}
                </p>
              </div>

              <div
                className={`w-full max-w-[280px] md:max-w-sm order-2 ${index % 2 !== 0 ? "md:order-1" : "md:order-2"}`}
              >
                <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[6px] md:border-8 border-slate-50 shadow-xl relative group">
                  <img
                    src={person.foto}
                    alt={person.nama}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01002A]/40 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KetumWaketum;
