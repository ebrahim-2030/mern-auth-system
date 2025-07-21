import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null; // Optional: return spinner here
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoutes;
