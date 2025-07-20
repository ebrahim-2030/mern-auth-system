import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-[8vh] sm:h-[9.5vh] text-zinc-600 fixed inset-0">
      <div className="h-full  max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to={"/"}>
          <h1 className="text-2xl font-black italic font-mono text-teal-500">
            <span className="font-sans opacity-50">
              /<span className="opacity-50">/</span>/
            </span>
            Auth
          </h1>
        </Link>
        <button
          onClick={() => navigate("/signup")}
          className=" font-medium cursor-pointer bg-teal-500 text-white px-6 rounded py-1"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
