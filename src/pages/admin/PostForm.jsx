import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import toast from "react-hot-toast";
import {
  Image as ImageIcon,
  X,
  Save,
  ArrowLeft,
  Loader2,
  Settings,
  Calendar as CalendarIcon,
  Link as LinkIcon,
  Eye,
} from "lucide-react";

import { useCreatePost, useUpdatePost, usePost } from "../../hooks/usePosts";

export default function PostForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: postData, isLoading: isLoadingPost } = usePost(id);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost(id);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "Published",
    type: "News",
    link: "",
    event_date: "",
    imagePreview: null,
    file: null,
  });

  const showEventDate = formData.type === "Event";
  const showLink = formData.type === "Prestasi";

  const handleUpload = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const editor = useCreateBlockNote({ uploadFile: handleUpload });

  useEffect(() => {
    if (isEdit && postData) {
      const formatToInputDate = (dateStr) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          if (isNaN(year)) return "";
          return `${year}-${month}-${day}`;
        } catch (e) {
          return "";
        }
      };

      setFormData({
        title: postData.title || "",
        slug: postData.slug || "",
        status: postData.status || "Published",
        type: postData.category || "News",
        link: postData.link || "",
        event_date: formatToInputDate(postData.event_date),
        imagePreview: postData.thumbnail || null,
        file: null,
      });

      if (postData.content) {
        try {
          editor.replaceBlocks(editor.document, JSON.parse(postData.content));
        } catch (e) {
          console.error("Gagal parse konten editor", e);
        }
      }
    }
  }, [postData, isEdit, editor]);

  useEffect(() => {
    if (!isEdit && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imagePreview: previewUrl,
        file: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.type);
    data.append("status", formData.status);

    if (formData.file) data.append("thumbnail", formData.file);
    if (isEdit) data.append("_method", "PUT");

    data.append("content", JSON.stringify(editor.document));

    if (showEventDate) data.append("event_date", formData.event_date);
    if (showLink) data.append("link", formData.link);

    try {
      if (isEdit) {
        await updatePostMutation.mutateAsync(data);
        toast.success("Berhasil diperbarui!");
      } else {
        if (!formData.file) return toast.error("Thumbnail wajib diupload!");
        await createPostMutation.mutateAsync(data);
        toast.success("Berhasil dipublikasikan!");
      }
      navigate("/admin/posts");
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan konten.");
    }
  };

  if (isEdit && isLoadingPost)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="font-medium">Menyiapkan data konten...</p>
      </div>
    );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 w-full px-4 pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/posts")}
            className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {isEdit ? "Edit Konten" : "Buat Konten Baru"}
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              SIGAP PNJ Admin Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/posts")}
            className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              createPostMutation.isPending || updatePostMutation.isPending
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-100"
          >
            {createPostMutation.isPending || updatePostMutation.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            {/* ROW: Kategori & Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-4 flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      id: "News",
                      label: "Berita",
                      icon: "📰",
                      activeClass:
                        "bg-blue-50 border-blue-200 text-blue-600 shadow-blue-50",
                    },
                    {
                      id: "Orasi",
                      label: "Orasi",
                      icon: "📢",
                      activeClass:
                        "bg-purple-50 border-purple-200 text-purple-600 shadow-purple-50",
                    },
                    {
                      id: "Event",
                      label: "Event",
                      icon: "📅",
                      activeClass:
                        "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-emerald-50",
                    },
                    {
                      id: "Prestasi",
                      label: "Prestasi",
                      icon: "🏆",
                      activeClass:
                        "bg-orange-50 border-orange-200 text-orange-600 shadow-orange-50",
                    },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: cat.id })}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 font-bold text-sm transition-all duration-200 ${
                        formData.type === cat.id
                          ? `${cat.activeClass} border-current shadow-md scale-105`
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 min-w-[200px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:text-right">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className={`w-full pl-12 pr-6 py-3 rounded-full border-none font-bold text-sm appearance-none cursor-pointer outline-none transition-all shadow-lg ${
                      formData.status === "Published"
                        ? "bg-emerald-500 text-white shadow-emerald-200"
                        : "bg-slate-700 text-white shadow-slate-200"
                    }`}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white">
                    <Eye size={16} />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Judul Konten <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-0 py-2 bg-transparent border-b-2 border-slate-100 rounded-none outline-none focus:border-blue-500 transition-all text-3xl font-black placeholder:text-slate-200"
                    placeholder="Masukkan judul..."
                    required
                  />
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase">
                    <Settings size={12} />
                    <span>Slug:</span>
                    <span className="text-blue-400 italic">
                      {formData.slug || "auto-generate"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showEventDate && (
                    <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                        <CalendarIcon size={14} /> Tanggal Pelaksanaan
                      </label>
                      <input
                        type="date"
                        value={formData.event_date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            event_date: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-800"
                      />
                    </div>
                  )}

                  {showLink && (
                    <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-orange-700 uppercase tracking-widest">
                        <LinkIcon size={14} /> Link Prestasi / Sertifikat
                      </label>
                      <input
                        type="url"
                        value={formData.link}
                        onChange={(e) =>
                          setFormData({ ...formData, link: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-white border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-orange-800"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Thumbnail Cover
                </label>
                <div className="relative group aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-blue-400 hover:bg-blue-50/30">
                  {formData.imagePreview ? (
                    <>
                      <img
                        src={formData.imagePreview}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            imagePreview: null,
                            file: null,
                          })
                        }
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur text-red-500 rounded-xl shadow-xl hover:scale-110 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center p-6 w-full h-full justify-center">
                      <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon size={28} />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Pilih Gambar
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <div className="mb-6 flex items-center justify-between">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {formData.type === "News" || formData.type === "Orasi"
                    ? "Isi Konten Utama"
                    : "Description"}
                </label>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 font-bold uppercase">
                  <Settings size={12} />
                  Smart Editor Active
                </div>
              </div>
              <div className="bg-slate-50/50 rounded-3xl p-2 md:p-8 min-h-[600px] border border-slate-100">
                <BlockNoteView
                  editor={editor}
                  theme="light"
                  className="prose prose-slate max-w-none min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
