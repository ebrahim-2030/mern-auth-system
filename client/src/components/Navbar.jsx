import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout } from "../features/authSlice.js";
import { useState } from "react";
import axios from "axios";
import { TiUser } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const dropdownRef = useState(null);

  // handle dropdown
  const dropdownHandler = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  // add event listener
  document.addEventListener("click", dropdownHandler);

  const location = useLocation();

  const currentPath = location.pathname;

  const handleSignOut = async () => {
    try {
      const response = await axios.post("/api/auth/signout");

      if (response.status === 200) {
        dispatch(signout());
        navigate("/signin");
      }
    } catch (error) {
      // handle unexpected errors
    }
  };
  return (
    <nav className="h-[8vh] sm:h-[9.5vh] text-zinc-600 fixed inset-0 z-50">
      <div className="h-full  max-w-7xl mx-auto flex justify-between items-center px-4 ">
        <Link to={"/"}>
          <h1 className="text-2xl font-black italic font-mono text-teal-500">
            <span className="font-sans opacity-50">
              /<span className="opacity-50">/</span>/
            </span>
            Auth
          </h1>
        </Link>

        <div>
          {user ? (
            <div className="relative flex items-center">
              <div
                ref={dropdownRef}
                onClick={() => setDropdown(!dropdown)}
                className="h-11 w-11 rounded-full overflow-hidden cursor-pointer bg-teal-500 text-white flex justify-center items-center"
              >
                <span className="text-xl  capitalize">
                  {user.username.charAt(0)}
                </span>
              </div>
              <ul
                className={`absolute top-1/2 -translate-y-1/2 right-10  rounded flex  gap-2   ${
                  dropdown
                    ? "opacity-100 pointer-events-auto right-14"
                    : "opacity-0 pointer-events-none"
                } transition-all duration-300`}
              >
                <Link
                  to={"/"}
                  onClick={handleSignOut}
                  className="flex items-center gap-1 hover:text-teal-500"
                >
                  <IoMdLogOut />
                  <span>Signout</span>
                </Link>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-1 hover:text-teal-500"
                >
                  <TiUser />
                  <span>Profile</span>
                </Link>
              </ul>
            </div>
          ) : (
            <div>
              {currentPath !== "/signin" && currentPath !== "/signup" && (
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white px-6 py-2 mt-4 rounded cursor-pointer"
                >
                  Signup
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
