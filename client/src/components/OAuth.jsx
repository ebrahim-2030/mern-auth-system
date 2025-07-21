import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { signinStart, signinSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const userData = {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.photoURL,
      };

      dispatch(signinStart());

      // send google auth request to backend
      const res = await axios.post("/api/auth/google", userData);
      const data = res.data.data;

      // if response status is 200 or 201, signin success
      if (res.status === 200 || res.status === 201) {
        dispatch(signinSuccess(data));
        navigate("/");
      }else{
        dispatch(signinFailure(res.data.message));
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400 || err.response.status === 404) {
          dispatch(signinFailure(err.response.data.message));
        } else if (err.response.status >= 500) {
          dispatch(signinFailure("Server Error, Please try again later."));
        } else {
          dispatch(signinFailure("Something went wrong!"));
        }
      } else {
        dispatch(signinFailure("Network Error! Please try again later."));
      }
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="border-teal-500 border-2 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-150 w-full px-6 py-2 rounded font-medium cursor-pointer flex justify-center items-center gap-2"
    >
      <AiFillGoogleCircle size={24} />
      Continue with Google
    </button>
  );
};

export default OAuth;
