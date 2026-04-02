import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />; 
  }

  return children;
}
