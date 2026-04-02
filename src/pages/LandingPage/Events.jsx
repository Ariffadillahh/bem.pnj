import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/PostCard";

export default function Events() {
  const {
    data: responseData,
    isLoading,
    isError,
  } = usePosts({
    category: "Event",
    per_page: 5,
  });

  const rawEvents = responseData?.data || [];
  const now = new Date();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const mappedEvents = rawEvents
    .filter((post) => post.status === "Published")
    .map((post) => {
      const eventDateObj = post.event_date
        ? new Date(post.event_date)
        : new Date();

      const endDate = new Date(eventDateObj.getTime() + 10 * MS_PER_DAY);

      let eventStatus = "Akan Datang";

      if (now >= eventDateObj && now <= endDate) {
        eventStatus = "Sedang Berjalan";
      } else if (now > endDate) {
        eventStatus = "Selesai";
      }

      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        desc: post.short_description || "Tidak ada deskripsi singkat.",
        date: post.event_date || "Tanggal belum ditentukan",
        category: post.category,
        thumbnail: post.thumbnail,
        author: post.creator_name || "BEM PNJ",
        status: eventStatus,
        eventDateObj: eventDateObj,
      };
    })
    .filter((e) => e.status !== "Selesai")
    .sort((a, b) => a.eventDateObj - b.eventDateObj);

  const ongoing = mappedEvents.filter((e) => e.status === "Sedang Berjalan");
  const upcoming = mappedEvents.filter((e) => e.status === "Akan Datang");

  return (
    <section
      id="events"
      className="py-24 relative"
      style={{ background: "#f7f9fc" }}
    >
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden leading-none"
        style={{ height: 60 }}
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,0 L0,0 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="text-xs font-bold tracking-[0.18em] uppercase mb-3"
            style={{ fontFamily: "'Syne', sans-serif", color: "#5399EF" }}
          >
            Program Kerja
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black mb-3"
            style={{ fontFamily: "'Syne', sans-serif", color: "#01002A" }}
          >
            Events <span style={{ color: "#5399EF" }}>BEM PNJ</span>
          </h2>
          <p
            style={{
              color: "rgba(1,0,42,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: 480,
            }}
          >
            Event yang sedang berjalan dan yang akan segera hadir dari Badan
            Eksekutif Mahasiswa PNJ.
          </p>
        </motion.div>

        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#5399EF]">
            <Loader2 className="animate-spin" size={40} />
            <p className="font-medium text-slate-500 text-sm">
              Memuat data event...
            </p>
          </div>
        )}

        {isError && (
          <div className="py-20 text-center text-red-500 font-medium">
            Gagal memuat event. Silakan coba beberapa saat lagi.
          </div>
        )}

        {!isLoading && !isError && ongoing.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#16a34a", fontFamily: "'Syne', sans-serif" }}
              >
                Sedang Berjalan
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoing.map((e, i) => (
                <PostCard key={e.id} post={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && !isError && upcoming.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#5399EF" }}
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#5399EF", fontFamily: "'Syne', sans-serif" }}
              >
                Akan Datang
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((e, i) => (
                <PostCard key={e.id} post={e} index={i} />
              ))}
            </div>
          </div>
        )}

        {!isLoading &&
          !isError &&
          ongoing.length === 0 &&
          upcoming.length === 0 && (
            <div className="py-20 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
              Belum ada event yang akan datang atau sedang berjalan.
            </div>
          )}
      </div>
    </section>
  );
}
