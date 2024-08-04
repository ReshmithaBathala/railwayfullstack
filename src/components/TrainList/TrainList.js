import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/trains", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    fetchTrains();
  }, []);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/trains", {
        headers: { Authorization: `Bearer ${token}` },
        params: { source, destination },
      });
      setTrains(response.data);
    } catch (error) {
      console.error("Error searching trains:", error);
    }
  };

  const handleBook = (trainId) => {
    navigate(`/booking?trainId=${trainId}`);
  };

  return (
    <div className="train-container">
      <h2 className="train">Train List</h2>
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
      <button onClick={handleSearch} className="submit-button">
        Search
      </button>

      <ul className="train-list-container">
        {trains.map((train) => (
          <li key={train.id} className="train-li-container">
            Train Id : {train.id}
            <br />
            Train Name : {train.train_name} <br /> ( From {train.source} to{" "}
            {train.destination} ) <br />
            Seats available : {train.available_seats}
            <button onClick={() => handleBook(train.id)} className="book">
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
