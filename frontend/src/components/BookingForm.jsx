import React, { useState } from 'react';
import '../styles.css';  // Import the global styles


function BookingForm({ onBookingSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Submit handler for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Booking data to be sent to the backend
    const bookingData = {
      name,
      email,
      phone,
      address,
      postalCode,
      date: new Date().toLocaleDateString(), // Replace with actual selected date
      timeFrom: '10:00',  // Replace with actual selected time
      timeTo: '11:00',    // Replace with actual selected time
    };

    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:3001/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("BookingForm");

        setSuccess('Booking confirmed successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPostalCode('');
        onBookingSubmit(data.booking);  // Pass booking data back to the parent component (if needed)
      } else {
        console.log("BookingForm_Not");

        setError(data.message || 'An error occurred while confirming the booking.');
      }
    } catch (error) {
      setError('An error occurred while confirming the booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Enter Your Details</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}


export default BookingForm;
