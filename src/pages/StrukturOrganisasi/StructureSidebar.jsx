import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install lucide-react untuk icon

const menuData = [
  // ... data menu Anda tetap sama ...
  {
    title: "PROFIL",
    items: [
      {
        id: "tentang",
        name: "Tentang Simpul Perubahan",
        path: "/struktur-organisasi",
      },
    ],
  },
  {
    title: "KABINET 2026",
    items: [
      {
        id: "ketum-waketum",
        name: "Ketua & Wakil Ketua Umum",
        path: "/struktur-organisasi/pimpinan",
      },
    ],
  },
  {
    title: "BADAN & BIRO",
    items: [
      {
        id: "bpi",
        name: "Badan Pengembangan Internal",
        path: "/struktur-organisasi/bpi",
        subItems: [
          {
            id: "dpi",
            name: "Divisi Pengawasan Internal",
            path: "/struktur-organisasi/bpi/#dpi",
          },
          {
            id: "dpsdm",
            name: "Divisi Pengembangan SDM",
            path: "/struktur-organisasi/bpi/#dpsdm",
          },
        ],
      },
      {
        id: "bbu",
        name: "Biro Bendahara Umum",
        path: "/struktur-organisasi/bbu",
      },
      {
        id: "bsu",
        name: "Biro Sekretaris Umum",
        path: "/struktur-organisasi/bsu",
      },
    ],
  },
  {
    title: "KEMENTERIAN / BIDANG",
    items: [
      {
        id: "bpp",
        name: "Bidang Pergerakan & Pengabdian",
        path: "/struktur-organisasi/bpp",
        subItems: [
          {
            id: "kastrat",
            name: "Departemen Politik Kajian Aksi Strategis",
            path: "/struktur-organisasi/bpp/#kastrat",
          },
          {
            id: "sosmas",
            name: "Departemen Sosial Masyarakat",
            path: "/struktur-organisasi/bpp/#sosmas",
          },
        ],
      },
      {
        id: "bk",
        name: "Bidang Kemahasiswaan",
        path: "/struktur-organisasi/bk",
        subItems: [
          {
            id: "advo",
            name: "Departemen Advokasi",
            path: "/struktur-organisasi/bk/#advokasi",
          },
          {
            id: "pnk",
            name: "Departemen Penalaran & Keilmuan",
            path: "/struktur-organisasi/bk/#penalaran",
          },
        ],
      },
      {
        id: "brkm",
        name: "Bidang Ruang Kreasi Mahasiswa",
        path: "/struktur-organisasi/brkm",
        subItems: [
          {
            id: "seor",
            name: "Departemen Seni & Olahraga",
            path: "/struktur-organisasi/brkm/#seni-olahraga",
          },
          {
            id: "rohis",
            name: "Departemen Kerohanian",
            path: "/struktur-organisasi/brkm/#kerohanian",
          },
        ],
      },
      {
        id: "kominfo",
        name: "Bidang Komunikasi & Informasi",
        path: "/struktur-organisasi/kominfo",
        subItems: [
          {
            id: "humas",
            name: "Departemen Hubungan Mahasiswa",
            path: "/struktur-organisasi/kominfo/#humas",
          },
          {
            id: "deskre",
            name: "Departemen Desain Kreator",
            path: "/struktur-organisasi/kominfo/#desain-kreator",
          },
        ],
      },
    ],
  },
];

export default function StructureSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentFullDesc = location.pathname + location.hash;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const getNavLinkClass = (targetPath, isSubMenu = false) => {
    const isActive = currentFullDesc === targetPath;
    const baseClass =
      "block w-full text-left transition-all duration-200 px-3 py-2 rounded-xl";
    const textClass = isSubMenu ? "text-[13px]" : "text-sm font-medium";

    if (isActive) {
      return `${baseClass} ${textClass} bg-blue-50 text-blue-600 font-bold shadow-sm shadow-blue-100/50`;
    }
    return `${baseClass} ${textClass} text-slate-500 hover:text-slate-900 hover:bg-slate-50`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] p-4 bg-blue-600 text-white rounded-full shadow-2xl md:hidden hover:bg-blue-700 transition-all active:scale-95"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 w-84 bg-white transform transition-transform duration-300 ease-in-out
          z-[90] 
          md:translate-x-0 md:sticky md:top-[80px] md:h-[calc(100vh-80px)] md:z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          border-r border-slate-100 overflow-y-auto custom-scrollbar p-6 md:py-8
        `}
      >
        <div className="space-y-0">
          {menuData.map((group, index) => (
            <div key={index}>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={getNavLinkClass(item.path)}
                    >
                      {item.name}
                    </NavLink>

                    {item.subItems && (
                      <ul className="mt-1.5 ml-4 border-l-2 border-slate-100 space-y-1 pl-2">
                        {item.subItems.map((sub) => (
                          <li key={sub.id}>
                            <NavLink
                              to={sub.path}
                              className={getNavLinkClass(sub.path, true)}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
