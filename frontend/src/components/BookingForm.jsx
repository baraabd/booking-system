import React, { useState } from 'react';
import '../BookingForm.css';

function BookingForm({ onProceedToService }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleProceedToService = (e) => {
    e.preventDefault();
    const userDetails = { name, email, phone, address, postalCode };
    onProceedToService(userDetails);
  };

  return (
    <div className="booking-form-container">
      <h2 className="form-title">Enter Your Details</h2>

      <form onSubmit={handleProceedToService} className="booking-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter your postal code"
            required
          />
        </div>

        <button type="submit" className="confirm-button">
          Proceed to Service Details
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
