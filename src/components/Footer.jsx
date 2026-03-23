import { motion } from "framer-motion";

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Events", href: "#events" },
  { label: "Berita & Orasi", href: "#posts" },
  { label: "Struktur Organisasi", href: "#struktur" },
  { label: "Tentang BEM PNJ", href: "#about" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#01002A" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0"
                style={{
                  background: "linear-gradient(135deg, #5399EF, #2255cc)",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 4px 16px rgba(83,153,239,0.4)",
                }}
              >
                B
              </div>
              <div>
                <div
                  className="font-black text-white text-base leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  BEM PNJ
                </div>
                <div
                  className="text-xs leading-none mt-0.5"
                  style={{
                    color: "#5399EF",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Politeknik Negeri Jakarta
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-5 max-w-xs"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Mewakili, memperjuangkan, dan menginspirasi seluruh mahasiswa PNJ
              menuju kampus yang demokratis dan berdaya.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "background .2s, color .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(83,153,239,0.2)";
                    e.currentTarget.style.color = "#5399EF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Navigasi
            </div>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
            >
              Kontak
            </div>
            <ul
              className="flex flex-col gap-3 text-sm"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <li>Kampus Politeknik Negeri Jakarta</li>
              <li>Jl. Prof. Dr. G.A. Siwabessy, Depok</li>
              <li>Jawa Barat 16425</li>
              <li className="mt-2">
                <a
                  href="mailto:bem@pnj.ac.id"
                  className="hover:text-white transition-colors"
                  style={{ color: "#5399EF" }}
                >
                  bem@pnj.ac.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span>
            © {new Date().getFullYear()} Badan Eksekutif Mahasiswa Politeknik
            Negeri Jakarta. Seluruh hak dilindungi.
          </span>
          <span
            className="flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Kabinet Simpul Perubahan
          </span>
        </div>
      </div>
    </footer>
  );
}
