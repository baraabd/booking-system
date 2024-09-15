import React, { useState } from 'react';
import '../ServiceDetails.css';

function ServiceDetails({ onConfirmBooking }) {  
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBooking({
      serviceName,
      servicePrice: parseFloat(servicePrice),
      totalArea: parseFloat(totalArea),
      discount: parseFloat(discount),
      amount: parseFloat(amount),
    });
  };

  return (
    <div className="service-details-container">
      <h2>Enter Service Details</h2>

      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Service Name:</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            required
          />
        </div>

        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="number"
            step="0.01"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            placeholder="Enter service price"
            required
          />
        </div>

        <div className="form-group">
          <label>Total Area (sqm):</label>
          <input
            type="number"
            step="0.01"
            value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)}
            placeholder="Enter total area"
            required
          />
        </div>

        <div className="form-group">
          <label>Discount (%):</label>
          <input
            type="number"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter final amount"
            required
          />
        </div>

        <button type="submit" className="confirm-button">Confirm Booking</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
