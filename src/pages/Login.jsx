import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json(); // Changed to json
      console.log("Server Response:", result);

      if (result.message==="Login successful") {
        alert("Login Successful");

        // Use AuthContext to save login state with token and user object
        login(result.user);

        // Redirect to home/dashboard
        navigate("/");
      } if(result.message==="Invalid email or password"){
        alert(result.message || "Login failed");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Server not running or connection error");
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Login
          </button>
          
<div className="divider">OR</div>

<button
  type="button"
  className="google-btn"
  onClick={() => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  }}
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="google"
    className="google-icon"
  />
  Continue with Google
</button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <Link to="/register" className="switch-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
