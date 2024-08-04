// src/components/Booking/Booking.js
import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./index.css";

const Booking = () => {
  const location = useLocation();
  const [bookingMessage, setBookingMessage] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const trainId = new URLSearchParams(location.search).get("trainId");

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      return now.toLocaleString(); // Format as a readable string
    };
    const bookTrain = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/book",
          { train_id: trainId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookingMessage(response.data.message);
        setCurrentDate(getCurrentDate());
      } catch (error) {
        console.error("Error booking train:", error);
        setBookingMessage("Booking failed");
      }
    };

    bookTrain();
  }, [trainId]);

  return (
    <div className="form-container">
      {/* <h2 className="login">Booking</h2> */}
      <p className="login-success">{bookingMessage}</p>
      <SiTicktick className="booked" />
      <p className="booking">
        <strong>Booking Date and Time:</strong> {currentDate}
      </p>
    </div>
  );
};

export default Booking;
