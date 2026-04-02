import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSignIn } from "../../hooks/useAuth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const signInMutation = useSignIn();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Mohon isi email dan password");
      return;
    }

    signInMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("auth_token", data.token);

          const userSession = {
            isAuthenticated: true,
            id: data.data.id,
            role: data.data.role === "SuperAdmin" ? "superAdmin" : "admin",
            name: data.data.username,
            email: data.data.email,
            departemen: data.data.departemen,
            jabatan: data.data.jabatan,
          };

          localStorage.setItem("user", JSON.stringify(userSession));

          toast.success("Login berhasil!");

          const from = location.state?.from?.pathname || "/admin/dashboard";
          navigate(from, { replace: true });
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || "Terjadi kesalahan saat login";
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={signInMutation.isPending}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {signInMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
