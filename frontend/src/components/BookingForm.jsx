import React, { useState } from 'react';
import '../BookingForm.css';

function BookingForm({ discount: initialDiscount, onConfirmBooking, checkUserExists }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(initialDiscount || 0);

  const handleEmailChange = async (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue) {
      const userExists = await checkUserExists(emailValue);
      if (userExists) {
        setDiscountMessage('Congratulations! You are already in our system and get a 10% discount!');
        setAppliedDiscount(10);
      } else {
        setDiscountMessage('');
        setAppliedDiscount(0);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBooking({
      name,
      email,
      phone,
      address,
      postalCode,
      discountMessage,
      discount: parseFloat(appliedDiscount),
    });
  };

  return (
    <div className="booking-form-container">
      <h2 className="form-title">Enter Your Details</h2>

      <form onSubmit={handleSubmit} className="booking-form">
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
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
          {discountMessage && <p>{discountMessage}</p>}
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

        <button type="submit" className="confirm-button">Confirm booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
