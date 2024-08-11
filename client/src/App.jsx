import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreateBiodata from "./pages/biodata/CreateBiodata";
import EditBiodata from "./pages/biodata/EditBiodata";
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";

function App() {
  const location = useLocation();

  const showNavbar = !["/login", "/register"].includes(location.pathname);

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
