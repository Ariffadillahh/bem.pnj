import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchModal from "./components/SearchModal";
import Footer from "./components/Footer";

const Layouts = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  
  return (
    <div style={{ background: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layouts;
