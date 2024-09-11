import React, { useState } from 'react';
import '../styles.css';  // Import the global styles


function BookingForm({ onBookingSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // State for address
  const [postalCode, setPostalCode] = useState(''); // State for postal code

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !postalCode) {
      alert('All fields are required.');
      return;
    }
    // Pass address and postalCode along with other details
    onBookingSubmit({ name, email, phone, address, postalCode });
  };

  return (
    <div className="booking-form-container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <button type="submit" className="confirm-button">Confirm Booking</button>
      </form>
    </div>
  );
}


export default BookingForm;
