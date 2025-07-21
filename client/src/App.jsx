import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./components/PrivateRoutes";
import AppLoader from "./components/AppLoader";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    // wrap the app in AppLoader
    <AppLoader>
      <div className="bg-zinc-100">
        {/* wrap the app in Router to enaple routing */}
        <Router>
          {/* import the Navbar component */}
          <Navbar />
          {/* define the routes for application */}
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route element={<PrivateRoutes />}>
              <Route path={"/profile"} element={<Profile />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path={"/dashboard"} element={<Dashboard />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AppLoader>
  );
};

export default App;
