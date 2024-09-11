/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { saveBooking, isTimeSlotAvailable } = require('./services/bookingService'); // Import service functions
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to list all bookings
app.get('/api/bookings', (req, res) => {
  const query = 'SELECT * FROM bookings';  // SQL query to select all bookings

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Error fetching bookings' });
    }

    // If no rows are found, return a message
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    // Return the rows as JSON
    res.status(200).json(rows);
  });
});



// Route to insert a booking
app.post('/api/book', async (req, res) => {
  const { name, email, phone, address, postalCode, date, timeFrom, timeTo } = req.body;

  try {
    // Log received data for debugging
    console.log('Booking data received:', req.body);

    // Validate that all required fields are present
    if (!name || !email || !phone || !address || !postalCode || !date || !timeFrom || !timeTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save booking
    const newBooking = await saveBooking({ name, email, phone, address, postalCode, date, timeFrom, timeTo });
    console.log('Booking saved successfully');  // Log when booking is saved
    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);  // Log any error encountered
    res.status(500).json({ message: 'Error creating booking' });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 */

