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
    console.log(appliedDiscount);

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
          {discountMessage && <p>{discountMessage}</p>}
        </div>

        <div className="form-group">
          <label>Telefonnummer:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ange ditt telefonnummer"
            required
          />
        </div>

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
