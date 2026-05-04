import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Menggunakan Link
import {
  MdOutlineLink,
  MdOutlineEmojiEvents,
} from "react-icons/md";
import logo from "../assets/images/logo.png";

const SHORTCUTS = [
  {
    id: "short-1",
    title: "Portal Mahasiswa",
    description: "Akses berbagai layanan dan sumber daya penting untuk mahasiswa PNJ",
    type: "Halaman",
    url: "/student-links",
    icon: <MdOutlineLink className="text-xl" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "short-2",
    title: "Peluang & Prestasi",
    description: "Informasi terbaru seputar lomba, beasiswa, dan kesempatan magang",
    type: "Halaman",
    url: "/prestasi",
    icon: <MdOutlineEmojiEvents className="text-xl" />,
    color: "bg-blue-100 text-blue-700",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Berita & Kajian", href: "/posts" },
  { label: "Struktur Organisasi", href: "/struktur-organisasi" },
  { label: "Docs", href: "#", hasDropdown: true },
];

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);

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
      (l) => l.href.includes("#") && !l.hasDropdown
    ).map((l) => l.href.split("#")[1]);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    if (href === "#") {
      e.preventDefault();
      return;
    }

    setMobileOpen(false);
    setMobileDocsOpen(false);
    setDropdownOpen(false);

    if (href.startsWith("/#")) {
      e.preventDefault();
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
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(1,0,42,0.06)" : "none",
        transition: "background 0.4s, box-shadow 0.4s",
      }}
    >
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 relative">
        
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img src={logo} alt="Logo BEM PNJ" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <div
              className="font-black text-[#01002A] text-sm sm:text-base leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              BEM PNJ
            </div>
            <div
              className="text-[10px] sm:text-xs md:text-sm leading-none mt-1 font-medium"
              style={{
                color: "#5399EF",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Politeknik Negeri Jakarta
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {NAV_LINKS.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 cursor-pointer outline-none"
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
                        <div className="bg-white rounded-2xl p-3 shadow-2xl border border-gray-100 relative overflow-hidden">
                          <div className="flex flex-col gap-1 relative z-10">
                            {SHORTCUTS.map((item) => (
                              <Link
                                key={item.id}
                                to={item.url}
                                onClick={(e) => handleNavClick(e, item.url)}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[#01002A] mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isHashLink = link.href.startsWith("/#");
            const targetId = isHashLink ? link.href.split("#")[1] : null;
            const isActive = isHashLink
              ? activeSection === targetId && location.pathname === "/"
              : link.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
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
              </Link>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#5399EF",
              background: "rgba(83,153,239,0.08)",
              border: "1px solid rgba(83,153,239,0.2)",
            }}
          >
            <SearchIcon />
            <span className="hidden sm:inline text-xs">Cari</span>
            <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: "rgba(83,153,239,0.12)", color: "#5399EF", border: "1px solid rgba(83,153,239,0.2)" }}>
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
                  return (
                    <div key={link.label} className="flex flex-col">
                      <button
                        onClick={() => setMobileDocsOpen(!mobileDocsOpen)}
                        className="flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#5399EF]/10 outline-none"
                        style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
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
                                <Link
                                  key={item.id}
                                  to={item.url}
                                  onClick={(e) => handleNavClick(e, item.url)}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                                >
                                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${item.color}`}>
                                    {item.icon}
                                  </div>
                                  <span className="text-sm font-bold text-[#01002A]" style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {item.title}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isHashLink = link.href.startsWith("/#");
                const isActive = isHashLink
                  ? activeSection === link.href.split("#")[1] && location.pathname === "/"
                  : location.pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#5399EF]/10"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: isActive ? "#5399EF" : "#01002A",
                        background: isActive ? "rgba(83,153,239,0.06)" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}