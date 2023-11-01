import React, { useState } from "react";
import "../Style/Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("token");
  };

  const handleBurgerClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand-name">
        Bulu
      </NavLink>
      <a
        className={`icon ${showMenu ? "active" : ""}`}
        onClick={handleBurgerClick}
      >
        <i className="fa fa-bars"></i>
      </a>
      <div className={`navbar-links ${showMenu ? "active" : ""}`}>
        <NavLink to="/" href="#">
          Home
        </NavLink>
        <NavLink to="/about" href="#">
          About
        </NavLink>
        <NavLink to="/policy" href="#">
          Policy
        </NavLink>
        <NavLink to="/contact" href="#">
          Contact
        </NavLink>
        {!auth.user ? (
          <>
            <NavLink to="/login" href="#">
              Login
            </NavLink>
            <NavLink to="/register" href="#">
              Register
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              to={auth.user.role === "admin" ? "/Admindashboard" : "/dashboard"}
              href="#"
            >
              Dashboard
            </NavLink>
            <NavLink onClick={handleLogout} to="/login" href="#">
              Log Out
            </NavLink>
          </>
        )}
        <NavLink to="/cart" href="#">
          Cart (0)
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
