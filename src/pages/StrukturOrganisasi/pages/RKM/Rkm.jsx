import React from "react";

import logo from "../../../../assets/images/kemas/logo-kemas.png";
import kobid from "../../../../assets/images/kemas/kabid.png";
import deptPNK from "../../../../assets/images/kemas/dept-pnk.png";
import deptAdvok from "../../../../assets/images/kemas/dept-advok.png";
import TemplateBidang from "../../../../components/TemplateBidang";

const Rkm = () => {
  const dataKemas = {
    id: "kemahasiswaan",
    namaBidang: "Bidang Kemahasiswaan",
    tahun: "BEM PNJ 2026",
    tagline: "Short Description / Tagline",
    deskripsiUtama:
      "Mewadahi aspirasi mahasiswa serta meningkatkan kesejahteraan dan pengembangan potensi mahasiswa PNJ.",
    logo: logo,
    fotoKabid: kobid,
    departemen: [
      {
        id: "advokasi",
        nama: "Departemen Advokasi",
        foto: deptAdvok,
        tugasFungsi: "Pelayanan & Pendampingan",
        deskripsi:
          "Tuliskan deskripsi mengenai advokasi hak-hak mahasiswa dan pelayanan aspirasi di sini. Fokus pada bagaimana departemen ini menjadi jembatan antara mahasiswa dan birokrasi kampus.",
        proker: {
          nama: "Ruang Advokasi (Ruadvok)",
          deskripsi:
            "Platform pelaporan masalah akademik, fasilitas, dan UKT mahasiswa.",
          waktu: "Setiap Saat (Sepanjang Kepengurusan)",
        },
        agenda: [
          {
            nama: "Kawal UKT",
            deskripsi:
              "Pendampingan pengajuan penurunan atau pencicilan UKT mahasiswa.",
          },
          {
            nama: "Sarasehan Pimpinan",
            deskripsi:
              "Diskusi terbuka antara mahasiswa dan jajaran direksi PNJ.",
          },
        ],
      },
      {
        id: "penalaran",
        nama: "Departemen Penalaran & Keilmuan",
        foto: deptPNK,
        tugasFungsi: "Fasilitas & Bantuan",
        deskripsi:
          "Departemen yang berfokus pada penyediaan informasi beasiswa, bantuan logistik, dan pengembangan kesejahteraan fisik maupun mental mahasiswa.",
        proker: null,
        agenda: [
          {
            nama: "Info Beasiswa Terpadu",
            deskripsi:
              "Penyebaran informasi beasiswa dari pihak kampus maupun swasta.",
          },
          {
            nama: "Bantuan Sembako Rantau",
            deskripsi:
              "Penyaluran bahan pokok untuk mahasiswa rantau yang membutuhkan.",
          },
          {
            nama: "Cek Kesehatan Gratis",
            deskripsi:
              "Bekerja sama dengan Poliklinik PNJ untuk cek tensi dan gula darah.",
          },
        ],
      },
    ],
  };

  return <TemplateBidang data={dataKemas} />;
};

export default Rkm;
