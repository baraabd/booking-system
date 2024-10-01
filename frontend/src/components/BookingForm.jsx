import React, { useState, useEffect } from 'react';
import '../BookingForm.css';

function BookingForm({ discount: initialDiscount, onConfirmBooking, checkUserExists }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(initialDiscount || 0);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = async (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);

    if (email && phoneValue) {
      // Check user eligibility for discount after both email and phone are entered
      const userExists = await checkUserExists(email);
      if (!userExists) {
        setDiscountMessage('Grattis! Du är ny kund hos oss och får 10% rabatt!');
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
      <h2 className="form-title">Ange dina uppgifter</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Namn:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ange ditt namn"
            required
          />
        </div>

        <div className="form-group">
          <label>E-post:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ange din e-postadress"
            required
          />
        </div>

        <div className="form-group">
          <label>Telefonnummer:</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Ange ditt telefonnummer"
            required
          />
        </div>

        {discountMessage && <p className='discountMessage'>{discountMessage}</p>}

        <div className="form-group">
          <label>Adress:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ange din adress"
            required
          />
        </div>

        <div className="form-group">
          <label>Postnummer:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Ange ditt postnummer"
            required
          />
        </div>

        <button type="submit" className="confirm-button-user">Sammanfatta på service</button>
      </form>
    </div>
  );
}

export default BookingForm;
