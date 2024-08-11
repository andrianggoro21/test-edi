import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/reducer/authReducer";

const Navbar = () => {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={`/dashboard/${user.id}`}>
          My Website
        </Link>
        <div className="ml-auto">
          {isLogin ? (
            <div>
              <span className="navbar-text">{user.email}</span>
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
