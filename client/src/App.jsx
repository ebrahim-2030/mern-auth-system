import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-zinc-100">
      <Router>
        {/* wrap the app in Router to enaple routing */}
        {/* import the Navbar component */}
        <Navbar />
        {/* define the routes for application */}
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
