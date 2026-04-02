// src/pages/admin/StudentLinks.jsx
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import BaseModal from "../../components/modal/BaseModal";
import BaseConfirmModal from "../../components/modal/BaseConfirmModal";
import {
  useCreatePortalLink,
  useDeletePortalLink,
  usePortalLinks,
  useUpdatePortalLink,
} from "../../hooks/usePortalLinks";

export default function StudentLinks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });

  const {
    data: responseData,
    isLoading,
    isError,
    isFetching,
  } = usePortalLinks(debouncedSearch, page);
  const createMutation = useCreatePortalLink();
  const updateMutation = useUpdatePortalLink();
  const deleteMutation = useDeletePortalLink();

  const links = responseData?.data || [];
  const meta = responseData?.meta;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openModal = (link = null) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || "",
      });
    } else {
      setEditingLink(null);
      setFormData({ title: "", url: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mutation = editingLink ? updateMutation : createMutation;
    const payload = editingLink
      ? { id: editingLink.id, ...formData }
      : formData;

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success(
          `Link berhasil ${editingLink ? "diperbarui" : "dibuat"}!`,
        );
        setIsModalOpen(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Terjadi kesalahan");
      },
    });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id, {
        onSuccess: () => {
          toast.success("Link berhasil dihapus!");
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isError)
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Gagal memuat data link portal.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-slate-900">
        <h1 className="text-2xl font-bold text-slate-900">
          Link Penting Mahasiswa
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
        >
          <Plus size={18} /> Add Link
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari judul atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {isFetching && (
          <Loader2 className="animate-spin text-blue-600" size={20} />
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Link Info</th>
                <th className="px-6 py-4 font-bold">Description</th>
                <th className="px-6 py-4 font-bold">Created By</th>
                <th className="px-6 py-4 font-bold">Update By</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>

            <tbody
              className={`divide-y divide-slate-100 transition-opacity duration-200 ${isFetching && !isLoading ? "opacity-50" : "opacity-100"}`}
            >
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-48"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-3 bg-slate-100 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-slate-50 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-3 bg-slate-100 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-slate-50 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 bg-slate-100 rounded w-20 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : links.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Tidak ada link ditemukan.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr
                    key={link.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {link.title}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 mt-1 font-medium"
                      >
                        {link.url.length > 25
                          ? `${link.url.substring(0, 25)}...`
                          : link.url}{" "}
                        <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                      {link.description || (
                        <span className="text-slate-300">No description</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <p className="font-semibold text-slate-700">
                        {link.creator_name || "Admin"}
                      </p>
                      <p className="text-slate-400 mt-0.5">
                        {formatDate(link.created_at)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {link.updated_by ? (
                        <>
                          <p className="font-semibold text-slate-700">
                            {link.updater_name || "Admin"}
                          </p>
                          <p className="text-slate-400 mt-0.5">
                            {formatDate(link.updated_at)}
                          </p>
                        </>
                      ) : (
                        <span className="text-slate-300 italic">
                          Never updated
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button
                        onClick={() => openModal(link)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(link);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {meta && meta.last_page > 1 && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 font-medium">
            <span className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              Showing {meta.from || 0} - {meta.to || 0} of {meta.total} links
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm text-slate-400">
                Page {page} / {meta.last_page}
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isFetching}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 transition-all"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === meta.last_page || isFetching}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FORM MODAL */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLink ? "Edit Link" : "Create New Link"}
        maxWidth="max-w-md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="link-form"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2 disabled:bg-slate-400"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Save Link
            </button>
          </div>
        }
      >
        <form id="link-form" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., E-Learning Kampus"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              URL Destination
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Berikan deskripsi singkat..."
            ></textarea>
          </div>
        </form>
      </BaseModal>

      <BaseConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Link"
        message={`Apakah Anda yakin ingin menghapus link "${itemToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
