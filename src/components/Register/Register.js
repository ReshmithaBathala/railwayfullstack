import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", {
        username,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="login">Register</h2>
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input-type"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="login-button">
        Register
      </button>
    </div>
  );
};

export default Register;
