const db = require('./db');

// Check if the time slot is available
const isTimeSlotAvailable = (date, timeFrom, timeTo) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM bookings WHERE date = ? AND (timeFrom < ? AND timeTo > ?)`;
    db.all(query, [date, timeTo, timeFrom], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows.length === 0); // Available if no rows found
    });
  });
};

// Save the booking into the database
const saveBooking = (booking) => {
  return new Promise((resolve, reject) => {
    const { name, email, phone, address, postalCode, date, timeFrom, timeTo } = booking;
    const query = `
      INSERT INTO bookings (name, email, phone, address, postalCode, date, timeFrom, timeTo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [name, email, phone, address, postalCode, date, timeFrom, timeTo], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID, ...booking });
    });
  });
};

module.exports = {
  isTimeSlotAvailable,
  saveBooking
};
