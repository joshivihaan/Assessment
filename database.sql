-- For the seat reservation system, a MySQL database structure can be designed to store information about 
-- seats, reservations, and booked seats. Here's a basic database structure:

---------------------------------------------------------------------------------------------------

-- Table: Seats

CREATE TABLE Seats (
  seat_number INT PRIMARY KEY,
  is_booked TINYINT DEFAULT 0
);

-- seat_number (Primary Key, INT): The seat number.
-- is_booked (TINYINT): Indicates whether the seat is booked (0 for available, 1 for booked).

----------------------------------------------------------------------------------------------------

-- Table: Reservations

CREATE TABLE Reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255),
  num_seats_reserved INT
);

-- reservation_id (Primary Key, INT): Unique identifier for each reservation.
-- user_name (VARCHAR): Name of the user making the reservation.
-- num_seats_reserved (INT): Number of seats reserved in this reservation.

----------------------------------------------------------------------------------------------------

-- Table: ReservedSeats

CREATE TABLE ReservedSeats (
  reservation_id INT,
  seat_number INT,
  PRIMARY KEY (reservation_id, seat_number),
  FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id),
  FOREIGN KEY (seat_number) REFERENCES Seats(seat_number)
);

-- reservation_id (Foreign Key, INT): The reservation this seat is associated with.
-- seat_number (Foreign Key, INT): The seat number reserved in this reservation.
-- The Seats table will store information about each seat, including its availability. The Reservations table will store reservation details 
-- like the user's name and the number of seats reserved. The ReservedSeats table will store the association between reservations and the specific seats that are reserved.