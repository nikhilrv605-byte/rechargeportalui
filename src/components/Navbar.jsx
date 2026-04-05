import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/rechargelogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Recharge Portal"
            className="logoR"
          />
        </div>

        <button className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {["/", "/recharge", "/subscription", "/about", "/contact"].map(
            (path, i) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className="nav-item"
                  onClick={closeMobileMenu}
                >
                  {["Home", "Recharge", "Subscription", "About", "Contact"][i]}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className={`auth-buttons ${isMobileMenuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <div className="user-profile">
                <span className="user-name" onClick={() => { navigate("/profile"); closeMobileMenu(); }} style={{ cursor: 'pointer' }}>
                  Hi, {user?.name || "User"}
                </span>
                <button className="logout-btn" onClick={() => { logout(); navigate("/"); closeMobileMenu(); }}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => { navigate("/login"); closeMobileMenu(); }}>
                Login
              </button>
              <button className="register-btn" onClick={() => { navigate("/register"); closeMobileMenu(); }}>
                Register
              </button>
            </>
          )}
          <button className="theme-toggle" onClick={() => { toggleTheme(); closeMobileMenu(); }}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
