import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreateBiodata from "./pages/biodata/CreateBiodata";
import EditBiodata from "./pages/biodata/EditBiodata";
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.AuthReducer);

  const showNavbar = !["/login", "/register"].includes(location.pathname);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (["/login", "/register"].includes(location.pathname)) {
        if (user && user.id) {
          navigate(`/dashboard/${user.id}`);
        }
      }
    } else {
      if (["/login", "/register"].includes(location.pathname)) {
        // Tidak perlu navigasi
      } else {
        navigate("/login");
      }
    }
  }, [navigate, user, location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Auth>
        <Routes>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/biodata/create/:id" element={<CreateBiodata />} />
          <Route path="/biodata/edit/:id" element={<EditBiodata />} />
        </Routes>
      </Auth>
    </>
  );
}

export default App;
