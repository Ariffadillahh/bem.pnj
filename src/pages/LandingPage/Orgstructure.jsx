import React from "react";
import { motion } from "framer-motion";

// ── DATA STRUKTUR (Tanpa Nama) ─────────────────────────────
const STRUKTUR = {
  ketua: { jabatan: "KETUA UMUM" },
  wakil: { jabatan: "WAKIL KETUA UMUM" },
  bpi: {
    jabatan: "BADAN PENGEMBANGAN INTERNAL",
    bawahan: [
      { jabatan: "DIVISI PENGAWASAN INTERNAL" },
      { jabatan: "DIVISI PENGEMBANGAN SUMBER DAYA MANUSIA" },
    ],
  },
  biro: [
    { jabatan: "BIRO BENDAHARA UMUM" },
    { jabatan: "BIRO SEKRETARIS UMUM" },
  ],
  bidang: [
    {
      jabatan: "BIDANG PERGERAKAN DAN PENGABDIAN",
      departemen: [
        { jabatan: "DEPARTEMEN POLITIK KAJIAN AKSI STRATEGIS" },
        { jabatan: "DEPARTEMEN SOSIAL MASYARAKAT" },
      ],
    },
    {
      jabatan: "BIDANG KEMAHASISWAAN",
      departemen: [
        { jabatan: "DEPARTEMEN ADVOKASI" },
        { jabatan: "DEPARTEMEN PENALARAN DAN KEILMUAN" },
      ],
    },
    {
      jabatan: "BIDANG RUANG KREASI MAHASISWA",
      departemen: [
        { jabatan: "DEPARTEMEN SENI DAN OLAHRAGA" },
        { jabatan: "DEPARTEMEN KEROHANIAN" },
      ],
    },
    {
      jabatan: "BIDANG KOMUNIKASI DAN INFORMASI",
      departemen: [
        { jabatan: "DEPARTEMEN HUBUNGAN MAHASISWA" },
        { jabatan: "DEPARTEMEN DESAIN KREATOR" },
      ],
    },
  ],
};

// ── BOX STYLES ─────────────────────────────────────────────────
const BOX = {
  ketua: {
    bg: "linear-gradient(135deg, #1e3a8a 0%, #01002A 100%)",
    text: "#fff",
    shadow: "0 10px 30px rgba(1,0,42,0.3)",
    minW: 200,
    px: 20,
    py: 16,
    fontSize: 13,
  },
  wakil: {
    bg: "linear-gradient(135deg, #2255cc 0%, #01002A 100%)",
    text: "#fff",
    shadow: "0 8px 24px rgba(34,85,204,0.35)",
    minW: 210,
    px: 16,
    py: 14,
    fontSize: 12,
  },
  bpi: {
    bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    text: "#fff",
    shadow: "0 6px 20px rgba(59,130,246,0.3)",
    minW: 240,
    px: 16,
    py: 12,
    fontSize: 11,
  },
  divisi: {
    bg: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    text: "#fff",
    shadow: "0 4px 14px rgba(37,99,235,0.3)",
    minW: 240,
    px: 12,
    py: 12,
    fontSize: 10,
  },
  biro: {
    bg: "linear-gradient(135deg, #01002A 0%, #1e3a8a 100%)",
    text: "#fff",
    shadow: "0 6px 20px rgba(1,0,42,0.25)",
    minW: 220,
    px: 14,
    py: 14,
    fontSize: 11,
  },
  bidang: {
    bg: "linear-gradient(135deg, #1d4ed8 0%, #01002A 100%)",
    text: "#fff",
    shadow: "0 6px 20px rgba(29,78,216,0.3)",
    minW: "100%",
    px: 12,
    py: 14,
    fontSize: 10,
  },
  departemen: {
    bg: "linear-gradient(135deg, #1e40af 0%, #172554 100%)",
    text: "#fff",
    shadow: "0 4px 12px rgba(1,0,42,0.2)",
    minW: "100%",
    px: 10,
    py: 12,
    fontSize: 9,
  },
};

const LINE_COLOR = "#3b82f6"; // Biru cerah (Blue-500) agar terlihat menyala
const LINE_WIDTH = 3; // Ketebalan garis

// ── KOMPONEN PENDUKUNG ─────────────────────────────────────────
function Box({ type = "ketua", jabatan, delay = 0, isMobile = false }) {
  const s = BOX[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: s.bg,
        color: s.text,
        boxShadow: s.shadow,
        borderRadius: 8,
        width: isMobile ? "100%" : s.minW,
        padding: `${s.py}px ${s.px}px`,
        textAlign: "center",
        position: "relative",
        zIndex: 10,
        border: "1px solid rgba(255,255,255,0.1)", // Efek glossy tipis
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: s.fontSize,
          lineHeight: 1.4,
          letterSpacing: "0.04em",
        }}
      >
        {jabatan}
      </div>
    </motion.div>
  );
}

// ── DESKTOP LAYOUT COMPONENTS ──────────────────────────────────
const SpineRow = ({ left, right, dashed = false }) => (
  <div className="flex w-full justify-center">
    {/* Kiri */}
    <div
      className="w-1/2 flex items-center justify-end pr-11 ml-[2px] relative "
      style={{ borderRight: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
    >
      {left && left}
    </div>
    {/* Kanan */}
    <div className="w-1/2 flex items-center justify-start pl-8 relative">
      {right && (
        <>
          {/* Garis Horizontal Sambungan dengan Radius Melengkung */}
          <div
            className="absolute left-[-2.5px] top-1/4 w-8"
            style={{
              height: "50%",
              borderTop: dashed
                ? `${LINE_WIDTH}px dashed ${LINE_COLOR}`
                : `${LINE_WIDTH}px solid ${LINE_COLOR}`,
              borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
              borderTopLeftRadius: 16, // Memperhalus sudut
            }}
          />
          {right}
        </>
      )}
    </div>
  </div>
);

const BpiWithDivisi = () => (
  <div className="flex flex-col my-10 relative w-full">
    <Box type="bpi" jabatan={STRUKTUR.bpi.jabatan} delay={0.15} />
    {/* Garis lengkung ke Divisi */}
    <div
      className="absolute top-[40px] left-[234px] bottom-[24px] w-6 "
      style={{
        borderBottom: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
        borderRight: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
        borderBottomRightRadius: 16,
        zIndex: 0,
      }}
    />
    <div
      className="absolute top-10 left-[234px] w-6 h-[3px]"
      style={{ background: LINE_COLOR }}
    />
    <div className="mt-5 flex flex-col gap-3 pr-[48px]">
      {STRUKTUR.bpi.bawahan.map((d, i) => (
        <div key={i} className="flex items-center relative">
          {i === 0 && (
            <div
              className="absolute left-[234px] w-6 h-[3px]"
              style={{ background: LINE_COLOR }}
            />
          )}
          <Box type="divisi" jabatan={d.jabatan} delay={0.2 + i * 0.1} />
        </div>
      ))}
    </div>
  </div>
);

const BidangWithDepartemen = ({ data, index }) => (
  <div className="flex flex-col items-start relative w-full">
    <div className="w-full flex justify-center z-10">
      <Box type="bidang" jabatan={data.jabatan} delay={0.4 + index * 0.1} />
    </div>
    {/* Garis Vertikal & Lengkung Bawah ke Departemen */}
    <div
      className="absolute top-[40px] left-[20px] bottom-[28px] w-5"
      style={{
        borderBottom: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
        borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
        borderBottomLeftRadius: 16, // Sudut lengkung mulus
        zIndex: 0,
      }}
    />
    <div className="mt-5 flex flex-col gap-3 pl-[40px] w-full">
      {data.departemen.map((d, j) => (
        <div key={j} className="flex items-center w-full relative">
          {j === 0 && (
            <div
              className="absolute -left-[20px] w-5 h-[3px]"
              style={{ background: LINE_COLOR }}
            />
          )}
          <div className="flex-1">
            <Box
              type="departemen"
              jabatan={d.jabatan}
              delay={0.5 + index * 0.1 + j * 0.1}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function OrgStructure() {
  return (
    <section
      id="struktur"
      className="py-24 relative bg-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 font-syne mb-4 uppercase">
            Struktur <span className="text-blue-500">Organigram</span>
          </h2>

          <div className="inline-block bg-white border border-slate-200 rounded-xl shadow-sm p-4 mt-2">
            <div className="text-xs font-bold text-slate-800 mb-3 font-dm">
              Keterangan Garis:
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-600 font-dm font-medium">
                <div
                  style={{
                    width: 40,
                    height: LINE_WIDTH,
                    background: LINE_COLOR,
                    borderRadius: 2,
                  }}
                />
                <span>Komando</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-dm font-medium">
                <div
                  style={{
                    width: 40,
                    borderTop: `${LINE_WIDTH}px dashed ${LINE_COLOR}`,
                  }}
                />
                <span>Komando Koordinatif</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            VIEW MOBILE (Tampil Hanya di Layar Kecil)
            ========================================== */}
        <div className="block lg:hidden w-full">
          <div className="flex flex-col gap-2 w-full">
            {/* Level 1: Ketua */}
            <Box
              type="ketua"
              jabatan={STRUKTUR.ketua.jabatan}
              delay={0}
              isMobile
            />

            {/* Tulang Punggung Vertikal Mobile */}
            <div
              className="ml-6 pl-5 py-2 flex flex-col gap-6 "
              style={{ borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
            >
              {/* Level 2: Wakil */}
              <div className="relative">
                <div
                  className="absolute -left-5 top-1/2 w-5 rounded-tl-lg"
                  style={{ borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
                />
                <Box
                  type="wakil"
                  jabatan={STRUKTUR.wakil.jabatan}
                  delay={0.1}
                  isMobile
                />
              </div>

              {/* Level 3: BPI & Divisi */}
              <div className="relative">
                <div
                  className="absolute -left-5 top-6 w-5"
                  style={{ borderTop: `${LINE_WIDTH}px dashed ${LINE_COLOR}` }}
                />
                <Box
                  type="bpi"
                  jabatan={STRUKTUR.bpi.jabatan}
                  delay={0.2}
                  isMobile
                />

                <div
                  className="ml-5 pl-5 mt-4 flex flex-col gap-3"
                  style={{ borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
                >
                  {STRUKTUR.bpi.bawahan.map((d, i) => (
                    <div className="relative" key={i}>
                      <div
                        className="absolute -left-5 top-1/2 w-5"
                        style={{
                          borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                        }}
                      />
                      <Box
                        type="divisi"
                        jabatan={d.jabatan}
                        delay={0.3 + i * 0.1}
                        isMobile
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Level 4: Biro */}
              {STRUKTUR.biro.map((b, i) => (
                <div className="relative" key={`biro-${i}`}>
                  <div
                    className="absolute -left-5 top-1/2 w-5"
                    style={{ borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
                  />
                  <Box type="biro" jabatan={b.jabatan} delay={0.4} isMobile />
                </div>
              ))}

              {/* Level 5: Bidang & Departemen */}
              {STRUKTUR.bidang.map((b, i) => (
                <div className="relative" key={`bidang-${i}`}>
                  <div
                    className="absolute -left-5 top-6 w-5"
                    style={{ borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
                  />
                  <Box type="bidang" jabatan={b.jabatan} delay={0.5} isMobile />

                  <div
                    className="ml-5 pl-5 mt-4 flex flex-col gap-3"
                    style={{
                      borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                    }}
                  >
                    {b.departemen.map((d, j) => (
                      <div className="relative" key={j}>
                        <div
                          className="absolute -left-5 top-1/2 w-5"
                          style={{
                            borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                          }}
                        />
                        <Box
                          type="departemen"
                          jabatan={d.jabatan}
                          delay={0.6 + j * 0.1}
                          isMobile
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            VIEW DESKTOP (Tampil Hanya di Layar Besar)
            ========================================== */}
        <div className="hidden lg:block w-full">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* ROW 1: Ketua Umum */}
            <div className="flex justify-center relative z-10">
              <Box type="ketua" jabatan={STRUKTUR.ketua.jabatan} delay={0} />
            </div>

            {/* Tulang Punggung Utama Atas */}
            <div className="flex w-full justify-center h-8">
              <div
                className="w-1/2 -mr-[2px]"
                style={{ borderRight: `${LINE_WIDTH}px solid ${LINE_COLOR}` }}
              ></div>
              <div className="w-1/2"></div>
            </div>

            {/* ROW 2: Wakil Ketua */}
            <SpineRow
              right={
                <Box
                  type="wakil"
                  jabatan={STRUKTUR.wakil.jabatan}
                  delay={0.1}
                />
              }
            />

            {/* ROW 3: Badan Pengembangan Internal */}
            <SpineRow dashed right={<BpiWithDivisi />} />

            {/* ROW 4: Biro Bendahara & Biro Sekretaris (Split T-Junction) */}
            <div className="flex w-full justify-center">
              <div className="w-1/2 flex flex-col items-center relative">
                {/* Garis lengkung ke kiri */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-8"
                  style={{
                    borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                    borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                    borderTopLeftRadius: 16,
                  }}
                />
                <div className="mt-8 z-10">
                  <Box
                    type="biro"
                    jabatan={STRUKTUR.biro[0].jabatan}
                    delay={0.3}
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-center relative">
                {/* Garis lengkung ke kanan */}
                <div
                  className="absolute top-0 left-[-3px] w-1/2 h-8"
                  style={{
                    borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                    borderRight: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                    borderTopRightRadius: 16,
                  }}
                />
                <div className="mt-8 z-10">
                  <Box
                    type="biro"
                    jabatan={STRUKTUR.biro[1].jabatan}
                    delay={0.3}
                  />
                </div>
              </div>
            </div>

            {/* Garis panjang turun menuju Bidang */}
            {/* Garis panjang turun menuju Bidang (FIX CENTER) */}
            <div className="flex justify-center relative h-[118px] -mt-[77px]">
              <div
                className="w-[2.4px] h-full lg:-ml-[0px] md:-ml-[1px] "
                style={{ background: LINE_COLOR }}
              />
            </div>

            {/* ROW 5: Bracket Horizontal untuk 4 Bidang */}
            <div className="relative w-full">
              {/* Bracket Lengkung Sempurna */}
              <div
                className="absolute top-0"
                style={{
                  left: "12.5%",
                  right: "12.5%",
                  height: 24,
                  borderTop: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                  borderLeft: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                  borderRight: `${LINE_WIDTH}px solid ${LINE_COLOR}`,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              {/* Garis Vertikal Tengah untuk 2 Bidang di dalam */}
              <div
                className="absolute top-0 w-[3px] h-6"
                style={{
                  left: "37.5%",
                  background: LINE_COLOR,
                  marginLeft: -1.5,
                }}
              />
              <div
                className="absolute top-0 w-[3px] h-6"
                style={{
                  left: "62.5%",
                  background: LINE_COLOR,
                  marginLeft: -1.5,
                }}
              />

              <div className="grid grid-cols-4 gap-6 pt-6 relative z-10">
                {STRUKTUR.bidang.map((b, i) => (
                  <BidangWithDepartemen key={i} data={b} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
