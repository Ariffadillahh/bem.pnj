import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Link as LinkIcon,
  FileText,
  Menu,
  LogOut,
  X,
  ShieldAlert,
  AlertTriangle,
  Key,
  Loader2,
  User,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import BaseModal from "../modal/BaseModal";
import {
  useSignOut,
  useChangePassword,
  useUpdateUser,
} from "../../hooks/useAuth";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    departemen: "",
    jabatan: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [profileForm, setProfileForm] = useState({
    username: "",
    departemen: "",
    jabatan: "",
    role: "",
  });

  const signOutMutation = useSignOut();
  const changePasswordMutation = useChangePassword();
  const updateProfileMutation = useUpdateUser();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setProfileForm({
        username: parsedUser.name || "",
        departemen: parsedUser.departemen || "",
        jabatan: parsedUser.jabatan || "",
        role: parsedUser.role === "superAdmin" ? "SuperAdmin" : "Admin",
      });
    } else {
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Student Links",
      path: "/admin/student-links",
      icon: <LinkIcon size={20} />,
    },
    { title: "Posts", path: "/admin/posts", icon: <FileText size={20} /> },
  ];

  if (currentUser.role === "superAdmin") {
    menuItems.splice(1, 0, {
      title: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    });
  }

  const confirmLogout = () => {
    signOutMutation.mutate(undefined, {
      onSettled: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        setIsLogoutModalOpen(false);
        navigate("/auth/sign-in");
        toast.success("Berhasil logout.");
      },
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      return toast.error("Konfirmasi password baru tidak cocok!");
    }
    changePasswordMutation.mutate(passwordForm, {
      onSuccess: () => {
        toast.success("Password berhasil diubah!");
        setIsChangePasswordOpen(false);
        setPasswordForm({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      },
      onError: (err) =>
        toast.error(err.response?.data?.message || "Gagal merubah password."),
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!currentUser.id) {
      return toast.error("ID User tidak ditemukan. Silakan login ulang.");
    }

    updateProfileMutation.mutate(
      { id: currentUser.id, ...profileForm },
      {
        onSuccess: () => {
          toast.success("Profil berhasil diperbarui!");
          const updatedUser = {
            ...currentUser,
            name: profileForm.username,
            departemen: profileForm.departemen,
            jabatan: profileForm.jabatan,
          };
          setCurrentUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setIsEditProfileOpen(false);
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Gagal update profil."),
      },
    );
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans">
      {/* --- BACKDROP UNTUK MOBILE SIDEBAR --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-40 w-72 lg:w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } lg:relative lg:translate-x-0 flex flex-col h-full`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <ShieldAlert size={18} />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-800">
              SIGAP
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2 mt-2">
            Main Menu
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)} // Auto tutup di HP saat menu diklik
              className={`flex items-center gap-3 px-4 py-3.5 lg:py-3 rounded-xl transition-all duration-200 ${
                location.pathname.includes(item.path)
                  ? "bg-blue-50 text-blue-700 font-bold border border-blue-100/50 shadow-sm"
                  : "text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div
                className={`${
                  location.pathname.includes(item.path)
                    ? "text-blue-600"
                    : "text-slate-400"
                } transition-colors`}
              >
                {item.icon}
              </div>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-sm shrink-0">
              {currentUser.name ? currentUser.name.charAt(0) : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 truncate">
                {currentUser.name || "Admin"}
              </p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                {currentUser.role || "Staff"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 shrink-0 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* BRANDING MOBILE AGAR TIDAK KOSONG */}
            <div className="lg:hidden flex items-center gap-2">
              <span className="font-black text-lg text-slate-800 tracking-tight">
                SIGAP
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-4 ml-auto relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-slate-50 p-1.5 pl-3 rounded-xl border border-transparent hover:border-slate-200 transition-all group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-wider">
                  {currentUser.role}
                </p>
              </div>
              <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold uppercase shadow-md group-hover:bg-blue-600 transition-all">
                {currentUser.name ? currentUser.name.charAt(0) : "A"}
              </div>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <div className="px-5 py-2.5 border-b border-slate-50 mb-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                    {currentUser.name ? currentUser.name.charAt(0) : "A"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="p-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsEditProfileOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors"
                  >
                    <User size={16} /> Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsChangePasswordOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors"
                  >
                    <Key size={16} /> Change Password
                  </button>
                </div>

                <hr className="my-1 border-slate-100" />

                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-0">
          <Outlet />
        </div>
      </main>

      {/* --- MODALS --- */}
      <BaseModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Update Profile"
        maxWidth="max-w-md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="profile-form"
              disabled={updateProfileMutation.isPending}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2 transition-all shadow-md shadow-blue-200"
            >
              {updateProfileMutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}{" "}
              Save Changes
            </button>
          </div>
        }
      >
        <form
          id="profile-form"
          onSubmit={handleUpdateProfile}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Email Address (Read Only)
            </label>
            <input
              type="text"
              value={currentUser.email}
              readOnly
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={profileForm.username}
              onChange={(e) =>
                setProfileForm({ ...profileForm, username: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Departemen
            </label>
            <input
              type="text"
              value={profileForm.departemen}
              onChange={(e) =>
                setProfileForm({ ...profileForm, departemen: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Jabatan
            </label>
            <input
              type="text"
              value={profileForm.jabatan}
              onChange={(e) =>
                setProfileForm({ ...profileForm, jabatan: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
              required
            />
          </div>
        </form>
      </BaseModal>

      <BaseModal
        isOpen={isChangePasswordOpen}
        onClose={() =>
          !changePasswordMutation.isPending && setIsChangePasswordOpen(false)
        }
        title="Change Password"
        maxWidth="max-w-md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="change-password-form"
              disabled={changePasswordMutation.isPending}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-200 transition-all hover:bg-blue-700 disabled:bg-blue-400"
            >
              {changePasswordMutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}{" "}
              Save Password
            </button>
          </div>
        }
      >
        <form
          id="change-password-form"
          onSubmit={handleChangePassword}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Old Password
            </label>
            <input
              type="password"
              value={passwordForm.old_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  old_password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.new_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  new_password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
              required
              minLength={8}
              placeholder="Minimal 8 karakter"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.new_password_confirmation}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  new_password_confirmation: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
              required
              placeholder="••••••••"
            />
          </div>
        </form>
      </BaseModal>

      <BaseModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        maxWidth="max-w-sm"
        footer={
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={signOutMutation.isPending}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 border border-transparent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              disabled={signOutMutation.isPending}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 shadow-md shadow-red-200 transition-all disabled:bg-red-400"
            >
              {signOutMutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}{" "}
              Yes, Log Out
            </button>
          </div>
        }
      >
        <div className="text-center pt-2">
          <div className="mx-auto w-16 h-16 bg-red-50 border-4 border-red-100 rounded-full flex items-center justify-center mb-5">
            <AlertTriangle className="text-red-500" size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">
            Ready to Leave?
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed px-2">
            Sesi Anda akan berakhir. Pastikan semua pekerjaan telah disimpan
            sebelum keluar dari AdminPanel.
          </p>
        </div>
      </BaseModal>
    </div>
  );
}
