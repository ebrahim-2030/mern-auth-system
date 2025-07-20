import axios from "axios";
import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  // state to hold form input values
  const [formData, setFormData] = useState({});

  // state to display error message
  const [error, setError] = useState(null);

  // state to manage loading during api call
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // handle for submision
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all fields are profided
    if (!formData.email || !formData.password) {
      return setError("All fields are required!");
    }

    try {
      // start loading and clear error
      setLoading(true);
      setError(null);

      // send signin request to the backend
      const res = await axios.post("/api/auth/signin", formData);

      // redirect to home page
      navigate("/");
    } catch (err) {
      if (err.response) {
        // input validation check user existing error
        if (err.response.status === 400 || err.response.status === 404) {
          setError(err.response.data.message);
        } else if (err.response.status >= 500) {
          // server error
          setError("Server Error, Please try again letter.");
        } else {
          // upexpected errors
          setError("Something went wrong!");
        }
      } else {
        setError("Network Error, Please check your connection.");
      }
      // // log error for debuggin
      // console.error("SIGNIN ERROR:", err);
    } finally {
      // stop loading regarless of result
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-t from-teal-100 flex justify-center   text-zinc-600  ">
      {/* signup form  */}
      <div className="flex flex-col items-center justify-center sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-500   px-2">
          Signin
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-96 mt-8  flex flex-col items-center gap-4"
        >
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
            className="bg-teal-500 hover:bg-teal-600 transition-all duration-150 text-white w-full px-6 py-2 mt-4 rounded font-medium cursor-pointer"
          >
            {loading ? "Signin . . ." : "Signin"}
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
