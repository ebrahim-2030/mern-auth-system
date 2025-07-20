import axios from "axios";
import { useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // state to hold form input values
  const [formData, setFormData] = useState({});

  // state to display error message
  const [error, setError] = useState(null);

  // state to manage loading during api call
  const [loading, setLoading] = useState(false);

  // navigation hook
  const navigate = useNavigate();

  // handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // handle for submision
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all fields are profided
    if (!formData.username || !formData.email || !formData.password) {
      return setError("All filds are required!");
    }

    try {
      // start loading and clear error
      setLoading(true);
      setError(null);

      // send signup request to the backend
      const res = await axios.post("/api/auth/signup", formData);

      // redirect to signin page
      navigate("/signin");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          // input validation error
          setError(err.response.data.message);
        } else if (err.response.status === 500) {
          // server error
          setError("Our server is having a moment. Please try again.");
        } else {
          // unexpected errors
          setError("Oops! Something went wrong. Please try again.");
        }
      } else {
        // Network or other error
        setError("Network Error, Please check your connection.");
      }

      // log error for debuggin
      // console.error(
      //   "SIGNUP ERROR:",
      //   err.response?.data?.message || err.message
      // );
    } finally {
      // stop loading regarless of result
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center pt-32 sm:pt-0 text-zinc-600 ">
      <div className="sm:flex sm:justify-center sm:items-center gap-10 lg:gap-16 xl:gap-20">
        {/* welcome text section */}
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

        {/* signup form section */}
        <div className="flex flex-col items-center mt-10 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-500   px-2">
            Signup
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-96 mt-8  flex flex-col items-center gap-4"
          >
            <input
              className="w-full outline-none pb-1 border-b-2  border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              className="w-full outline-none pb-1 border-b-2 border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="w-full outline-none pb-1 border-b-2 border-b-teal-500 placeholder:text-teal-500 text-teal-500"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full px-6 py-2 mt-4 rounded font-medium cursor-pointer"
            >
              {loading ? "Signup . . ." : "Signup"}
            </button>
          </form>

          {/* error message */}
          {error && (
            <div className="w-full mt-2 bg-red-300 rounded text-white  text-start flex  items-center gap-2 px-2">
              <RiErrorWarningFill /> {error}
            </div>
          )}

          {/* signin redirect */}
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
