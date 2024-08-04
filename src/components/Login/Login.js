// src/components/Login/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./index.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log(token);
      onLogin(role);
      navigate("/trains");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="login">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        className="input-type"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="input-type"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="login-button">
        Login
      </button>
      <p className="list-item">
        Don't have an account <br />
        <Link to="/register" className="link-item">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
