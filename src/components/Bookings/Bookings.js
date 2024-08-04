import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2 className="login">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="train-list-container">
          {bookings.map((booking) => {
            // Parse date if necessary
            const date = new Date();
            const formattedDate = isNaN(date.getTime())
              ? "Invalid date"
              : date.toLocaleDateString();

            return (
              <li key={booking.id} className="train-li-container">
                <p className="book-p">
                  <strong>Booking ID:</strong> {booking.id}
                </p>
                <p className="book-p">
                  <strong>Train ID:</strong> {booking.train_id}
                </p>
                <p className="book-p">
                  <strong>Date:</strong> {formattedDate}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
