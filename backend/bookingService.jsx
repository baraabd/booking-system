const db = require('./db');

// Insert a new booking
const insertBooking = (booking) => {
  const { name, email, phone, address, postalCode, date, timeFrom, timeTo } = booking;

  return new Promise((resolve, reject) => {
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

// Query all bookings
const getBookings = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM bookings', [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  insertBooking,
  getBookings
};
