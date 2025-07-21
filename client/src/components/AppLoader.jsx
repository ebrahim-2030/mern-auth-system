import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../features/authSlice";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser()).finally(() => {
      // done loading after user fetch
      setLoading(false); 
    });
  }, [dispatch]);

  if (loading) return <div className="h-screen flex justify-center items-center text-3xl font-bold text-teal-500">Loading...</div>; // or a spinner

  return children;
};

export default AppLoader;
