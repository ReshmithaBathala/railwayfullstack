// src/components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="nav-elements">
      <ul className="nav-ul-container">
        {isAuthenticated ? (
          <>
            <li className="list-item">
              <Link to="/trains" className="link-item">
                Trains
              </Link>
            </li>
            <li className="list-item">
              <Link to="/bookings" className="link-item">
                Bookings
              </Link>
            </li>
            {/* <li>
              <Link to="/booking">Bookings</Link>
            </li> */}
            <li className="list-item">
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* <li>
              <Link to="/login">Login</Link>
            </li> */}
            {/* <li className="list-item">
              Don't have an account <br />
              <Link to="/register" className="link-item">
                Register here
              </Link>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
