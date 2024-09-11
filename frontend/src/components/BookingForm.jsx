import React, { useState } from 'react';
import '../styles.css';  // Import the global styles


function BookingForm({ onBookingSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !postalCode) {
      setError('All fields are required');
      return;
    }

    const bookingData = { name, email, phone, address, postalCode, date: new Date().toLocaleDateString(), timeFrom: '10:00', timeTo: '11:00' };

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred');
      } else {
        onBookingSubmit(data.booking);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setError('An error occurred while booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Enter Your Details</h2>
      {error && <p className="error">{error}</p>}
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
        <button type="submit" className="confirm-button" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
