import React from "react";

const Navbar = () => {
  return (
    <nav className="h-[8vh] sm:h-[9.5vh] text-zinc-600 fixed inset-0">
      <div className="h-full  max-w-7xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-black italic font-mono text-teal-500">
          <span className="font-sans opacity-50">
            /<span className="opacity-50">/</span>/
          </span>
          Auth
        </h1>
        <button className="px-6 py-1.5 border-2 text-zinc-500 border-zinc-300 rounded-full font-medium cursor-pointer hover:bg-zinc-50">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
