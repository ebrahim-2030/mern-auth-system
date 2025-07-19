import React from "react";

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center text-zinc-600">
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-2xl font-medium bg-teal-500  text-white px-2">
          Hey, <span className="">Developer!</span>
        </h2>
        <p className="text-3xl font-bold  ">Welcome to our app</p>
        <p className="text-zinc-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />{" "}
          Perspiciatis voluptatum a ducimus?
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white px-6 py-2 mt-4 rounded-full cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
