// AppLoader.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../features/authSlice.js";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-teal-500 font-bold">Loading app...</div>;
  }

  return children;
};

export default AppLoader;
