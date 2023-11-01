import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../../Style/Login.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/login`, {
        email,
        password,
      });
      if (res && res.data.token) {
        console.log("Login successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
          id: res.data.user.id,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        console.log("Invalid message");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
    setEmail("");
    setPassword("");
  };

  // Define the responseGoogle function

  const googleClientId =
    "41942115968-rkdh44odsthmt3ona2kodnrq65guaafc.apps.googleusercontent.com"; // Replace with your actual Google client ID

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form className="register-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="register-button">
          Login
        </button>
      </form>
      <div className="forgot-password">
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </div>
    </div>
  );
};

export default Login;
