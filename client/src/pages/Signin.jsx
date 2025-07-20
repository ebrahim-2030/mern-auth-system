import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-t from-teal-100 flex justify-center   text-zinc-600  ">
      {/* signup form  */}
      <div className="flex flex-col items-center justify-center sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-500   px-2">
          Signin
        </h1>
        <form className="w-96 mt-8  flex flex-col items-center gap-4">
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

          {/* submit button */}
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full px-6 py-2 mt-4 rounded font-medium cursor-pointer"
          >
            Signin
          </button>
        </form>

        {/* error message */}

        {/* <div className="w-full mt-2 bg-red-300 rounded text-white  text-start flex  items-center gap-2 px-2">
            <RiErrorWarningFill /> 
          </div> */}

        {/* signin redirect */}
        <div className="mt-4 text-zinc-500">
          Don't have account?
          <button
            onClick={() => navigate("/signup")}
            className="text-teal-500 cursor-pointer hover:underline ml-1"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
