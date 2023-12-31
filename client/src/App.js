import React, { useState, useEffect } from 'react';
import './App.css';

// It will provide the resultant data of reserved seats after successful reservation
const Seat = ({ seat }) => {
  return (
    <div
      className={`seat ${seat.isAvailable ? 'available' : 'unavailable'}`}
    >
    {seat.number}
    </div>
  );
};

const App = () => {
  const [availableSeats, setAvailableSeats] = useState(null);
  const [numSeatsToReserve, setNumSeatsToReserve] = useState(0);
  const [reservationMessage, setReservationMessage] = useState('');

  useEffect(() => {
    // Fetch available seats when the component mounts
    fetchAvailableSeats();
  }, []);

  const fetchAvailableSeats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/available-seats');
      const data = await response.json();
      setAvailableSeats(data.availableSeats);
    } catch (error) {
      console.error('Error fetching available seats:', error);
    }
  };

  // It will generate the total seats with reserved/available after successful reservation
  const generateSeats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reserve-seats-data');
      const data = await response.json();
      setSeats(data);
    } catch (error) {
      console.error('Error reserving seats:', error);
    }
  };

  const [seats, setSeats] = useState(generateSeats());

  // It will reserved the selected seat for a particular request submitted by user
  const handleReserveSeats = async () => {
    if (numSeatsToReserve <= 0 || numSeatsToReserve > 7) {
      alert('Invalid number of seats. Please enter a number between 1 and 7.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/reserve-seats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numSeats: numSeatsToReserve
        })
      });

      const data = await response.json();
      // Show a success message to the user
      setReservationMessage(data.message);
      // Fetch updated available seats after reservation
      fetchAvailableSeats();
    } catch (error) {
      console.error('Error reserving seats:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="header">Train Seat Reservation</h1>
      <div className="container">
        <label htmlFor="numSeats">Number of Seats to Reserve : </label>
        <input
          type="number"
          id="numSeats"
          value={numSeatsToReserve}
          onChange={(e) => setNumSeatsToReserve(Math.max(1, parseInt(e.target.value)))}
          min="1" 
        />
        <button onClick={handleReserveSeats}>Reserve Seats</button>
      </div>

      <div className="coach-default">
        <p className="seats-info">Available Seats : {availableSeats}</p>
      </div>
      {reservationMessage && (
        <p className="reservation-message">{reservationMessage}</p>
      )}
      {reservationMessage && (
        <div className="coach">
         {seats.map((row, rowIndex) => (
           <div className="row" key={rowIndex}>
             {row.map((seat) => (
               <Seat key={seat.number} seat={seat} />
             ))}
           </div>
         ))}
        </div>
      )}
    </div>
  );
};

export default App;