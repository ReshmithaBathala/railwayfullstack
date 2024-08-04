import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TrainList from "./components/TrainList/TrainList";
import Booking from "./components/Booking/Booking";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./components/Admin/Admin";
import "./App.css";
// import BookingDetails from "./components/BookingDetails/BookingDetails";
import Bookings from "./components/Bookings/Bookings";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("");
  };

  console.log("Current Role:", role);

  return (
    <div className="app">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={role === "admin" ? "/admin" : "/trains"} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/trains" /> : <Register />}
          />
          <Route
            path="/trains"
            element={isAuthenticated ? <TrainList /> : <Navigate to="/login" />}
          />
          <Route
            path="/booking"
            element={isAuthenticated ? <Booking /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/booking/:bookingId"
            element={
              isAuthenticated ? <BookingDetails /> : <Navigate to="/login" />
            }
          /> */}
          <Route
            path="/bookings"
            element={isAuthenticated ? <Bookings /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              isAuthenticated && role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
