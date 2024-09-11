const express = require('express');
const router = express.Router();
const { isTimeSlotAvailable, saveBooking } = require('../services/bookingService');

// Route for handling bookings
router.post('/book', async (req, res) => {
  const { name, email, phone, address, postalCode, date, timeFrom, timeTo } = req.body;

  try {
    const available = await isTimeSlotAvailable(date, timeFrom, timeTo);
    if (!available) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    const booking = await saveBooking({ name, email, phone, address, postalCode, date, timeFrom, timeTo });
    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (err) {
    console.error('Error handling booking request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
