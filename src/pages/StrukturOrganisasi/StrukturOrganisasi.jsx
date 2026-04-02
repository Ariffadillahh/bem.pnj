import React from "react";
import GuestLayouts from "../../components/layout/GuestLayout";

const StrukturOrganisasi = () => {
  return (
    <GuestLayouts>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            🚧 Dalam Pengembangan
          </h1>
          <p className="text-slate-600 mb-6">
            Halaman Struktur Organisasi sedang dalam tahap pengembangan. Silakan
            kembali lagi nanti ya!
          </p>

          <div className="flex justify-center">
            <div className="animate-pulse bg-blue-500 h-2 w-24 rounded-full"></div>
          </div>
        </div>
      </div>
    </GuestLayouts>
  );
};

export default StrukturOrganisasi;
