import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function Admin() {
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [trainId, setTrainId] = useState("");
  const [newTotalSeats, setNewTotalSeats] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTrain = async () => {
    if (!trainName || !source || !destination || !totalSeats) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/trains",
        {
          train_name: trainName,
          source,
          destination,
          total_seats: totalSeats,
        },
        {
          headers: {
            "api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyZXNobWl0aGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI3OTQ4NDUsImV4cCI6MTcyMjc5ODQ0NX0.GBvT3r1Z1yzqD0OSRGLNJOZsVcGfITPKaxWSk7vT8f8",
          },
        }
      );
      setMessage("Train added successfully!");
      setTrainName("");
      setSource("");
      setDestination("");
      setTotalSeats("");
    } catch (error) {
      console.error("Error adding train:", error);
      setMessage("Error adding train. Please try again.");
    }
  };

  const handleUpdateSeats = async () => {
    if (!trainId || !newTotalSeats) {
      setMessage("Please provide train ID and new total seats.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/trains/${trainId}`,
        {
          total_seats: newTotalSeats,
        },
        {
          headers: {
            "api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyZXNobWl0aGEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI3OTQ4NDUsImV4cCI6MTcyMjc5ODQ0NX0.GBvT3r1Z1yzqD0OSRGLNJOZsVcGfITPKaxWSk7vT8f8", // Ensure this matches the backend's expected header
          },
        }
      );
      setMessage("Seats updated successfully!");
      setTrainId("");
      setNewTotalSeats("");
    } catch (error) {
      console.error("Error updating seats:", error);
      setMessage("Error updating seats. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="login">Add a New Train</h2>
      <input
        type="text"
        placeholder="Train Name"
        value={trainName}
        className="input-type"
        onChange={(e) => setTrainName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        className="input-type"
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        className="input-type"
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="text"
        placeholder="Total Seats"
        value={totalSeats}
        className="input-type"
        onChange={(e) => setTotalSeats(e.target.value)}
      />
      <button onClick={handleAddTrain} className="login-button">
        Add Train
      </button>

      <h2 className="login">Update Train Seats</h2>
      <input
        type="text"
        placeholder="Train ID"
        value={trainId}
        className="input-type"
        onChange={(e) => setTrainId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Total Seats"
        value={newTotalSeats}
        className="input-type"
        onChange={(e) => setNewTotalSeats(e.target.value)}
      />
      <button onClick={handleUpdateSeats} className="login-button">
        Update Seats
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Admin;
