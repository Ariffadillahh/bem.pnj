import { useState, useEffect } from "react";
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBlockNote, SuggestionMenuController, getDefaultReactSlashMenuItems } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../lib/axios";
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
  Layers,
} from "lucide-react";

import { useCreatePost, useUpdatePost, usePost } from "../../hooks/usePosts";
import { CATEGORY_OPTIONS, TYPE_OPTIONS } from "../../data/TypeDataForm"; 

const uploadToCloudinary = async (file, folder) => {
  try {
    const { data: signData } = await api.get(`/generate-signature?folder=${folder}`);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signData.api_key);
    formData.append("timestamp", signData.timestamp);
    formData.append("signature", signData.signature);
    formData.append("folder", signData.folder);

    const res = await axios.post(signData.upload_url, formData);

    return { url: res.data.secure_url, public_id: res.data.public_id };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Gagal mengunggah gambar ke server.");
  }
};

const { video, audio, file, ...allowedBlockSpecs } = defaultBlockSpecs;
const customSchema = BlockNoteSchema.create({ blockSpecs: allowedBlockSpecs });

export default function PostForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: postData, isLoading: isLoadingPost } = usePost(id);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost(id);

  const [isUploading, setIsUploading] = useState(false);
  const [sessionUploads, setSessionUploads] = useState([]);
  const [thumbnailToDelete, setThumbnailToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "Published",
    category: "News",
    type: TYPE_OPTIONS["News"][0], 
    link: "",
    event_date: "",
    imagePreview: null,
    file: null,
    thumbnail_public_id: null,
  });

  const showEventDate = formData.category === "Event";
  const showLink = formData.category === "Prestasi";

  const editor = useCreateBlockNote({
    schema: customSchema,
    uploadFile: async (file) => {
      const toastId = toast.loading("Mengunggah gambar ke editor...");
      try {
        const uploaded = await uploadToCloudinary(file, "sigap/blocknote");
        setSessionUploads((prev) => [...prev, uploaded]);
        toast.success("Gambar berhasil disisipkan!", { id: toastId });
        return uploaded.url;
      } catch (error) {
        toast.error("Gagal mengunggah gambar editor.", { id: toastId });
        return "";
      }
    },
  });

  const getCustomSlashMenuItems = (editor) => {
    return getDefaultReactSlashMenuItems(editor).filter(
      (item) => item.title !== "Video" && item.title !== "Audio" && item.title !== "File"
    );
  };

  const removeThumbnail = async () => {
    if (formData.thumbnail_public_id) {
      setThumbnailToDelete(formData.thumbnail_public_id);
    }
    setFormData({ ...formData, imagePreview: null, file: null, thumbnail_public_id: null });
  };

  const handleCategoryChange = (categoryId) => {
    setFormData({
      ...formData,
      category: categoryId,
      type: TYPE_OPTIONS[categoryId][0], 
    });
  };

  useEffect(() => {
    if (isEdit && postData) {
      const formatToInputDate = (dateStr) => {
        if (!dateStr) return "";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getFullYear())) return "";
          return date.toISOString().split("T")[0];
        } catch (e) { return ""; }
      };

      setFormData({
        title: postData.title || "",
        slug: postData.slug || "",
        status: postData.status || "Published",
        category: postData.category || "News",
        type: postData.type || TYPE_OPTIONS[postData.category || "News"][0],
        link: postData.link || "",
        event_date: formatToInputDate(postData.event_date),
        imagePreview: postData.thumbnail || null,
        thumbnail_public_id: postData.thumbnail_public_id || null,
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
      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
        file: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let newThumbnail = null;

    try {
      if (formData.file) {
        newThumbnail = await uploadToCloudinary(formData.file, "sigap/posts");
        setSessionUploads((prev) => [...prev, newThumbnail]);
      }

      if (thumbnailToDelete) {
        try {
          await api.post("/delete-image", { public_id: thumbnailToDelete });
        } catch (err) {
          console.warn("Gagal hapus thumbnail lama.", err);
        } finally {
          setThumbnailToDelete(null);
        }
      }

      const currentContentJson = JSON.stringify(editor.document);
      const orphanedImages = sessionUploads.filter((upload) => {
        const isStillInContent = currentContentJson.includes(upload.url);
        const isThumbnail = newThumbnail && upload.url === newThumbnail.url;
        const isOldThumbnail = formData.imagePreview === upload.url;
        return !isStillInContent && !isThumbnail && !isOldThumbnail;
      });

      orphanedImages.forEach((img) => {
        api.post("/delete-image", { public_id: img.public_id }).catch(() => {});
      });

      const payload = {
        ...formData,
        thumbnail: newThumbnail ? newThumbnail.url : formData.imagePreview,
        thumbnail_public_id: newThumbnail ? newThumbnail.public_id : formData.thumbnail_public_id,
        content: currentContentJson,
      };

      if (isEdit) {
        await updatePostMutation.mutateAsync(payload);
      } else {
        await createPostMutation.mutateAsync(payload);
      }

      toast.success("Berhasil disimpan!");
      navigate("/admin/posts");
    } catch (error) {
      if (newThumbnail) api.post("/delete-image", { public_id: newThumbnail.public_id }).catch(() => {});
      toast.error(error.response?.data?.message || "Gagal menyimpan postingan.");
    } finally {
      setIsUploading(false);
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
      {/* Header (Batal & Create Buttons) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/posts")} className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{isEdit ? "Edit Konten" : "Buat Konten Baru"}</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">SIGAP PNJ Admin Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate("/admin/posts")} className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-all">Batal</button>
          <button onClick={handleSubmit} disabled={createPostMutation.isPending || updatePostMutation.isPending || isUploading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-100">
            {(createPostMutation.isPending || updatePostMutation.isPending || isUploading) ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {isUploading ? "Mengunggah..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-3">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all duration-200 ${
                        formData.category === cat.id ? `${cat.activeClass} border-current shadow-md scale-105` : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>{cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 w-full lg:w-auto">
                <div className="space-y-4 flex-1 lg:w-48">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipe</label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      {TYPE_OPTIONS[formData.category].map((typeOption) => (
                        <option key={typeOption} value={typeOption}>
                          {typeOption}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Layers size={16} /></div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 lg:w-48">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className={`w-full pl-10 pr-6 py-3 rounded-xl border-none font-bold text-sm appearance-none cursor-pointer outline-none transition-all shadow-md ${
                        formData.status === "Published" ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-slate-700 text-white shadow-slate-200"
                      }`}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white"><Eye size={16} /></div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Judul Konten <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-0 py-2 bg-transparent border-b-2 border-slate-100 rounded-none outline-none focus:border-blue-500 transition-all text-3xl font-black placeholder:text-slate-200" placeholder="Masukkan judul..." required />
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase">
                    <Settings size={12} /><span>Slug:</span><span className="text-blue-400 italic">{formData.slug || "auto-generate"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showEventDate && (
                    <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase tracking-widest"><CalendarIcon size={14} /> Tanggal Pelaksanaan</label>
                      <input type="date" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-800" />
                    </div>
                  )}

                  {showLink && (
                    <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-orange-700 uppercase tracking-widest"><LinkIcon size={14} /> Link Prestasi / Sertifikat</label>
                      <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-2 bg-white border border-orange-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-orange-800" placeholder="https://..." />
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thumbnail Cover</label>
                <div className="relative group aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center transition-all hover:border-blue-400 hover:bg-blue-50/30">
                  {formData.imagePreview ? (
                    <>
                      <img src={formData.imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      <button type="button" onClick={removeThumbnail} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur text-red-500 rounded-xl shadow-xl hover:scale-110 transition-all"><X size={18} /></button>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center p-6 w-full h-full justify-center">
                      <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600 mb-3 group-hover:scale-110 transition-transform"><ImageIcon size={28} /></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Gambar</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
              <div className="mb-6 flex items-center justify-between">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{formData.category === "News" || formData.category === "Orasi" ? "Isi Konten Utama" : "Description"}</label>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 font-bold uppercase"><Settings size={12} /> Smart Editor Active</div>
              </div>
              <div className="bg-slate-50/50 rounded-3xl p-2 md:p-8 min-h-[600px] border border-slate-100">
                <BlockNoteView editor={editor} theme="light" slashMenu={false} className="prose prose-slate max-w-none min-h-[500px]">
                  <SuggestionMenuController triggerCharacter={"/"} getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)} />
                </BlockNoteView>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}