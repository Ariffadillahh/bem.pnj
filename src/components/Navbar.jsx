import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
// Pastikan kamu mengimport icon ini dari react-icons/md
import {
  MdOutlineArticle,
  MdOutlineLink,
  MdOutlineGroups,
} from "react-icons/md";

// Data Shortcut untuk Dropdown Docs
const SHORTCUTS = [
  {
    id: "short-1",
    title: "Postingan",
    description: "Berita, Event, Prestasi, Orasi dan Info Lomba",
    type: "Halaman",
    url: "/posts",
    icon: <MdOutlineArticle className="text-xl" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "short-2",
    title: "Link Mahasiswa",
    description: "Portal penting dan E-Learning",
    type: "Halaman",
    url: "/student-links",
    icon: <MdOutlineLink className="text-xl" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "short-3",
    title: "Struktur Organisasi",
    description: "Susunan kepengurusan dan divisi",
    type: "Halaman",
    url: "/struktur-organisasi",
    icon: <MdOutlineGroups className="text-xl" />,
    color: "bg-indigo-100 text-indigo-700",
  },
];

const NAV_LINKS = [
  { label: "Events", href: "/#events" },
  { label: "Berita & Orasi", href: "/#posts" },
  { label: "Struktur Organisasi", href: "/#struktur" },
  { label: "Docs", href: "#", hasDropdown: true }, // Menandai bahwa ini punya dropdown
];

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Icon Panah Kecil untuk Dropdown
const ChevronDownIcon = ({ isOpen }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Navbar({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk dropdown desktop
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false); // State untuk dropdown mobile

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = NAV_LINKS.filter(
      (l) => l.href.includes("#") && !l.hasDropdown,
    ).map((l) => l.href.split("#")[1]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === "#") return; // Abaikan jika link kosong (hanya untuk trigger dropdown mobile)

    setMobileOpen(false);
    setMobileDocsOpen(false);
    setDropdownOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.split("#")[1];
      if (location.pathname === "/") {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(1,0,42,0.06)" : "none",
          transition: "background 0.4s, box-shadow 0.4s, border 0.4s",
        }}
      >
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 relative">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 group shrink-0"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #5399EF, #01002A)",
                fontFamily: "'Syne', sans-serif",
                boxShadow: "0 4px 16px rgba(83,153,239,0.35)",
              }}
            >
              B
            </div>
            <div className="flex flex-col justify-center">
              <div
                className="font-black text-[#01002A] text-base leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                BEM PNJ
              </div>
              <div
                className="hidden sm:block text-xs sm:text-sm leading-none mt-1"
                style={{
                  color: "#5399EF",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Politeknik Negeri Jakarta
              </div>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                // RENDER DROPDOWN UNTUK DESKTOP
                return (
                  <div
                    key={link.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.03em",
                        color: dropdownOpen ? "#5399EF" : "#01002A",
                      }}
                    >
                      {link.label}
                      <ChevronDownIcon isOpen={dropdownOpen} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[360px]"
                        >
                          <div
                            className="bg-white rounded-2xl p-3 shadow-2xl border border-gray-100 relative overflow-hidden"
                            style={{
                              boxShadow: "0 20px 40px rgba(1,0,42,0.08)",
                            }}
                          >
                            <div className="flex flex-col gap-1 relative z-10">
                              {SHORTCUTS.map((item) => (
                                <a
                                  key={item.id}
                                  href={item.url}
                                  onClick={(e) => handleNavClick(e, item.url)}
                                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                  <div
                                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}
                                  >
                                    {item.icon}
                                  </div>
                                  <div>
                                    <h4
                                      className="text-sm font-bold text-[#01002A] mb-0.5"
                                      style={{
                                        fontFamily: "'Syne', sans-serif",
                                      }}
                                    >
                                      {item.title}
                                    </h4>
                                    <p
                                      className="text-xs text-slate-500 leading-snug"
                                      style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                      }}
                                    >
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // RENDER NORMAL LINK DESKTOP
              const isHashLink = link.href.startsWith("/#");
              const targetId = isHashLink ? link.href.split("#")[1] : null;
              const isActive = isHashLink
                ? activeSection === targetId && location.pathname === "/"
                : location.pathname.startsWith(link.href);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-sm font-semibold transition-colors duration-200 h-full flex items-center"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.03em",
                    color: isActive ? "#5399EF" : "#01002A",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-6 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "100%" : "0%",
                      background: "#5399EF",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#5399EF",
                background: "rgba(83,153,239,0.08)",
                border: "1px solid rgba(83,153,239,0.2)",
              }}
            >
              <SearchIcon />
              <span className="hidden sm:inline text-xs">Cari</span>
              <kbd
                className="hidden md:inline text-xs px-1.5 py-0.5 rounded-md"
                style={{
                  background: "rgba(83,153,239,0.12)",
                  color: "#5399EF",
                  fontFamily: "monospace",
                  border: "1px solid rgba(83,153,239,0.2)",
                }}
              >
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:bg-[#5399EF]/10"
              style={{ color: "#01002A" }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV LINKS */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden overflow-hidden max-h-[85vh] overflow-y-auto"
              style={{
                background: "rgba(255,255,255,0.97)",
                borderBottom: "1px solid rgba(1,0,42,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  if (link.hasDropdown) {
                    // RENDER DROPDOWN MOBILE
                    return (
                      <div key={link.label} className="flex flex-col">
                        <button
                          onClick={() => setMobileDocsOpen(!mobileDocsOpen)}
                          className="flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#5399EF]/10"
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            color: "#01002A",
                          }}
                        >
                          {link.label}
                          <ChevronDownIcon isOpen={mobileDocsOpen} />
                        </button>
                        <AnimatePresence>
                          {mobileDocsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50 rounded-xl mt-1 mx-2"
                            >
                              <div className="p-2 flex flex-col gap-1">
                                {SHORTCUTS.map((item) => (
                                  <a
                                    key={item.id}
                                    href={item.url}
                                    onClick={(e) => handleNavClick(e, item.url)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                                  >
                                    <div
                                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${item.color}`}
                                    >
                                      {item.icon}
                                    </div>
                                    <span
                                      className="text-sm font-bold text-[#01002A]"
                                      style={{
                                        fontFamily: "'Syne', sans-serif",
                                      }}
                                    >
                                      {item.title}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // RENDER NORMAL LINK MOBILE
                  const isHashLink = link.href.startsWith("/#");
                  const targetId = isHashLink ? link.href.split("#")[1] : null;
                  const isActive = isHashLink
                    ? activeSection === targetId && location.pathname === "/"
                    : location.pathname.startsWith(link.href);

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#5399EF]/10"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: isActive ? "#5399EF" : "#01002A",
                        background: isActive
                          ? "rgba(83,153,239,0.06)"
                          : "transparent",
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
