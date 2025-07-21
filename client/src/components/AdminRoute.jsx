import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    // get the user from the store
  const { user } = useSelector((state) => state.auth);
  
  // if user is not logged in, redirect to the signin page
  if (!user) return <Navigate to="/signin" />;

  // if user is not admin, redirect to the not-found page
  return user.isAdmin ? <Outlet /> : <Navigate to="/not-found" />;
};

export default AdminRoute;
