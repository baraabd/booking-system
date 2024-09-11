const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db'); // Import the database connection
const { insertBooking, getBookings } = require('./services/bookingService'); // Import service functions

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to insert a booking
app.post('/api/book', async (req, res) => {
  const { name, email, phone, address, postalCode, date, timeFrom, timeTo } = req.body;

  try {
    const newBooking = await insertBooking({ name, email, phone, address, postalCode, date, timeFrom, timeTo });
    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Route to get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
