const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bookings.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      postalCode TEXT NOT NULL,
      date TEXT NOT NULL,
      timeFrom TEXT NOT NULL,
      timeTo TEXT NOT NULL
    )
  `);
});

module.exports = db;
