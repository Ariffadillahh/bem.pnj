import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../data/mockData";

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

export default function Navbar({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
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
  }, []);

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
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* LOGO SECTION */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
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
              {/* Di HP tulisan ini disembunyikan agar layout tidak hancur */}
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

          {/* DESKTOP LINKS (Hanya muncul di Layar Laptop/lg) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-semibold transition-colors duration-200"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.03em",
                    color: isActive ? "#5399EF" : "#01002A",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "100%" : "0%",
                      background: "#5399EF",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* ACTION BUTTONS (Search & Menu) */}
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
              {/* Shortcut KBD hanya muncul di layar iPad ke atas */}
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

            {/* Hamburger Button (Hanya muncul jika layar di bawah Laptop/lg) */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:bg-[#5399EF]/10"
              style={{ color: "#01002A" }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.97)",
                borderBottom: "1px solid rgba(1,0,42,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[#5399EF]/10"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color:
                        activeSection === link.href.replace("#", "")
                          ? "#5399EF"
                          : "#01002A",
                      background:
                        activeSection === link.href.replace("#", "")
                          ? "rgba(83,153,239,0.06)"
                          : "transparent",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
