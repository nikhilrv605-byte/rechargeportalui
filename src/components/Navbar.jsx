import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src="src/assets/RechargePortal1.png"
            alt="Recharge Portal"
            className="logoR"
          />
        </div>

        <ul className="nav-links">
          {["/", "/recharge", "/subscription", "/about", "/contact"].map(
            (path, i) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className="nav-item"
                >
                  {["Home", "Recharge", "Subscription", "About", "Contact"][i]}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <div className="user-profile">
                <span className="user-name" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>
                  Hi, {user?.name || "User"}
                </span>
                <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="register-btn" onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
