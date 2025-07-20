import { FaHandsClapping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center pt-32 sm:pt-0 text-zinc-600 ">
      <div className="sm:flex sm:justify-center sm:items-center gap-10 lg:gap-16 xl:gap-20">
        <div className="flex flex-col items-center text-center gap-3">
          <FaHandsClapping size={40} className="text-teal-500" />
          <h2 className="text-2xl font-medium bg-teal-500  text-white px-2">
            Hey, <span className="">Welcome!</span>
          </h2>
          <p className="text-zinc-500">
            Please sign up using your email and password, <br /> or continue
            with your Google account.?
          </p>
        </div>
        <div className="flex flex-col items-center mt-10 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-500   px-2">Signup</h1>
          <form className="w-96 mt-8  flex flex-col items-center gap-4">
            <input
              className="w-full outline-none pb-1 border-b-2  border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <input
              className="w-full outline-none pb-1 border-b-2 border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="w-full outline-none pb-1 border-b-2 border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full px-6 py-2 mt-4 rounded font-medium cursor-pointer"
            >
              Signup
            </button>
          </form>
          <div className="mt-4 text-zinc-500">
            Aleardy have and account?
            <button
              onClick={() => navigate("/signin")}
              className="text-teal-500 cursor-pointer hover:underline ml-1"
            >
              Signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
