import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Loader2, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import BaseModal from "../../components/modal/BaseModal";
import BaseConfirmModal from "../../components/modal/BaseConfirmModal";

import {
  useUsers,
  useCreateAccount,
  useUpdateUser,
  useDeleteUser,
} from "../../hooks/useAuth";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    departemen: "",
    jabatan: "",
    role: "Admin",
  });

  const {
    data: responseData,
    isLoading,
    isError,
    isFetching,
  } = useUsers(debouncedSearch, page);

  const createMutation = useCreateAccount();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const users = responseData?.data || [];
  const meta = responseData?.meta;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ ...user, password: "" });
    } else {
      setEditingUser(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        departemen: "",
        jabatan: "",
        role: "Admin",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      updateMutation.mutate(
        { id: editingUser.id, ...formData },
        {
          onSuccess: () => {
            toast.success("User berhasil diperbarui!");
            setIsModalOpen(false);
          },
          onError: (error) =>
            toast.error(error.response?.data?.message || "Gagal update"),
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("User berhasil dibuat!");
          setIsModalOpen(false);
        },
        onError: (error) =>
          toast.error(error.response?.data?.message || "Gagal membuat user"),
      });
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete.id, {
        onSuccess: () => {
          toast.success("User berhasil dihapus!");
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-slate-900">
        <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">User Info</th>
                <th className="px-6 py-4 font-semibold">Departemen</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
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
                      <div className="h-3 bg-slate-100 rounded w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-slate-100 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-slate-100 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-8 bg-slate-100 rounded w-20 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-red-500 font-medium"
                  >
                    Gagal memuat data dari server.
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Tidak ada user ditemukan.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {user.username}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">
                        {user.departemen}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {user.jabatan}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 border rounded-md text-xs font-semibold ${
                          user.role === "SuperAdmin"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button
                        onClick={() => openModal(user)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(user);
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

        {meta && meta.last_page > 1 && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 font-medium">
            <span className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              Showing {meta.from || 0} - {meta.to || 0} of {meta.total}
            </span>

            <div className="flex justify-center sm:justify-end gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 transition-all"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === meta.last_page || isFetching}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User Details" : "Create New User"}
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
              form="user-form"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2 disabled:bg-slate-400 transition-colors"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Save User
            </button>
          </div>
        }
      >
        <form id="user-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                <span>Password</span>
                {editingUser && (
                  <span className="text-slate-400 text-xs font-normal">
                    (Leave blank to keep current)
                  </span>
                )}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Departemen
                </label>
                <select
                  value={formData.departemen}
                  onChange={(e) =>
                    setFormData({ ...formData, departemen: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50"
                  required
                >
                  <option value="">Pilih...</option>
                  <option value="Fakultas Teknik">Fakultas Teknik</option>
                  <option value="P&K">P&K</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50"
                >
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Jabatan
              </label>
              <input
                type="text"
                value={formData.jabatan}
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Staff IT"
                required
              />
            </div>
          </div>
        </form>
      </BaseModal>

      <BaseConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Apakah Anda yakin ingin menghapus user "${itemToDelete?.username}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
