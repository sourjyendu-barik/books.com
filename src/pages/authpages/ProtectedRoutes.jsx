import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>checking authentication....</p>;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
