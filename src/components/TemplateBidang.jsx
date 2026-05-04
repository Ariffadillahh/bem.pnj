import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AgendaSlider = ({ agendas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === agendas.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? agendas.length - 1 : prev - 1));
  };

  if (!agendas || agendas.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-900 to-[#0a1f4d] rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-yellow-500/30 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg md:text-xl font-black text-yellow-500 uppercase tracking-widest drop-shadow-md">
            Daftar Agenda
          </h3>
          <div className="flex gap-2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-blue-800/80 border border-yellow-500/30 hover:bg-yellow-500 text-yellow-400 hover:text-blue-900 flex items-center justify-center transition-all shadow-md"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-blue-800/80 border border-yellow-500/30 hover:bg-yellow-500 text-yellow-400 hover:text-blue-900 flex items-center justify-center transition-all shadow-md"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {agendas.map((agenda, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-4 drop-shadow-sm">
                  {agenda.nama}
                </h4>
                <p className="text-blue-100 text-base md:text-lg leading-relaxed font-light">
                  {agenda.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {agendas.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
              currentIndex === index
                ? "w-8 bg-yellow-400"
                : "w-2 bg-blue-700/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const TemplateBidang = ({ data }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-12 md:space-y-20 pb-20 px-4 md:px-0">
      <section
        id={data.id}
        className="relative p-6 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="w-24 h-24 md:w-26 md:h-26 flex items-center justify-center">
            <img src={data.logo} alt={`Logo ${data.namaBidang}`} />
          </div>

          <div className="text-left sm:text-right w-full">
            <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight">
              {data.namaBidang}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-yellow-600 mt-1">
              {data.tahun}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mt-12 items-center lg:items-end">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <div className="space-y-4">
              <p className="text-base md:text-lg italic text-slate-400 font-medium tracking-wide">
                "{data.tagline}"
              </p>
              <div className="border-l-4 border-yellow-500 pl-5 py-1">
                <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-semibold">
                  {data.deskripsiUtama}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[280px] sm:max-w-[320px] lg:w-80 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="relative group">
                <div className="aspect-[4/5] bg-slate-200 rounded-[2rem] flex items-center justify-center overflow-hidden border-4 border-yellow-400 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={data.fotoKabid}
                    alt="Foto Kepala Bidang"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-24">
        {data.departemen.map((dept, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={dept.id}
              id={dept.id}
              className="scroll-mt-28 space-y-10"
            >
              <div
                className={`flex items-center gap-4 ${isEven ? "justify-start" : "lg:justify-end"}`}
              >
                <h2 className="text-3xl font-extrabold text-blue-900">
                  {dept.nama}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div
                  className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] flex items-center justify-center border-4 border-yellow-400 shadow-xl overflow-hidden relative group">
                    {dept.foto ? (
                      <img
                        src={dept.foto}
                        alt={dept.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-slate-400 font-bold group-hover:scale-110 transition-transform duration-500">
                        FOTO {dept.nama.toUpperCase()} (4:5)
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                <div
                  className={`lg:col-span-7 p-8 md:p-10 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-md flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-yellow-600 uppercase tracking-[0.2em]">
                      {dept.tugasFungsi}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {dept.deskripsi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {dept.proker && (
                  <div className="lg:col-span-1 bg-gradient-to-br from-blue-800 to-blue-950 rounded-[2rem] p-6 md:p-8 shadow-2xl border border-yellow-500/30 flex flex-col h-full">
                    <div>
                      <span className="text-xs md:text-sm font-bold text-yellow-500 tracking-widest uppercase mb-2 block drop-shadow-md">
                        Program Kerja
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mb-4">
                        {dept.proker.nama}
                      </h3>
                    </div>
                    <p className="text-blue-100 text-sm md:text-base leading-relaxed font-light mt-auto">
                      {dept.proker.deskripsi}
                    </p>
                    <div className="bg-blue-900/60 border border-yellow-500/20 px-4 py-2 rounded-xl backdrop-blur-sm inline-block w-fit mt-4">
                      <span className="text-yellow-300 font-semibold text-xs md:text-sm">
                        ⏱️ Pelaksanaan: {dept.proker.waktu}
                      </span>
                    </div>
                  </div>
                )}

                {dept.agenda && dept.agenda.length > 0 && (
                  <div
                    className={`w-full h-full ${
                      dept.proker ? "lg:col-span-2" : "lg:col-span-3"
                    }`}
                  >
                    <AgendaSlider agendas={dept.agenda} />
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateBidang;
