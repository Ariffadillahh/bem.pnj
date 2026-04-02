// src/pages/admin/Posts.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Inbox,
  LayoutGrid,
} from "lucide-react";
import toast from "react-hot-toast";

// Import Hooks & Components
import { usePosts, useDeletePost } from "../../hooks/usePosts";
import BaseConfirmModal from "../../components/modal/BaseConfirmModal";

export default function Posts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [perPage, setPerPage] = useState(10);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // 1. Fetch Data
  const {
    data: posts,
    isLoading,
    isFetching,
  } = usePosts({
    search,
    category,
    per_page: perPage,
  });

  // 2. Delete Mutation
  const deleteMutation = useDeletePost();

  const openDeleteModal = (post) => {
    setItemToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete.id);

      toast.success("Konten berhasil dihapus.");
      setIsDeleteModalOpen(false); 
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };
  const getCategoryBadge = (cat) => {
    const styles = {
      News: "bg-blue-100 text-blue-700",
      Orasi: "bg-purple-100 text-purple-700",
      Event: "bg-emerald-100 text-emerald-700",
      Prestasi: "bg-orange-100 text-orange-700",
    };
    return styles[cat] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Content Management
          </h1>
          <p className="text-slate-500 text-sm">
            Kelola berita, orasi, kegiatan, dan prestasi BEM.
          </p>
        </div>
        <Link
          to="/admin/posts/create"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
        >
          <Plus size={18} /> Buat Konten
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari judul..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="flex-1 md:w-40 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm font-medium text-slate-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="News">Berita</option>
            <option value="Orasi">Orasi</option>
            <option value="Event">Event</option>
            <option value="Prestasi">Prestasi</option>
          </select>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
            <LayoutGrid size={14} className="text-slate-400" />
            <select
              className="bg-transparent outline-none text-sm font-medium text-slate-600"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Konten
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Created By
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Update By
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-slate-100 transition-all duration-300 ease-in-out ${isFetching && !isLoading ? "opacity-40 pointer-events-none" : "opacity-100"}`}
            >
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin inline-block text-blue-600" />
                  </td>
                </tr>
              ) : posts?.data?.length > 0 ? (
                posts.data.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/50 transition-colors group text-sm"
                  >
                    {/* Konten & Kategori */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={post.thumbnail}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                          alt=""
                        />
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 line-clamp-1">
                            {post.title}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryBadge(post.category)}`}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Created By & Date */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">
                          {post.creator_name || "System"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {post.created_at}
                        </span>
                      </div>
                    </td>

                    {/* Update By & Date */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">
                          {post.updater_name || "-"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {post.updater_name ? post.updated_at : "-"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase ${post.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {post.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            navigate(`/admin/posts/edit/${post.id}`)
                          }
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(post)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-20 text-center text-slate-400"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <BaseConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Konten"
        message={`Apakah Anda yakin ingin menghapus konten "${itemToDelete?.title}"? Gambar di Cloudinary juga akan dibersihkan secara permanen.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
