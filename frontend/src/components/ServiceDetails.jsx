import React, { useState, useEffect } from 'react';
import '../ServiceDetails.css';

const services = [
  { name: 'Clean house', price: 100 },
  { name: 'Move things', price: 1000 },
  { name: 'Clean apartment', price: 100 },
  { name: 'Clean and move', price: 1500 },
];

function ServiceDetails({ onConfirmBooking }) {
  const [selectedService, setSelectedService] = useState(services[0].name);
  const [servicePrice, setServicePrice] = useState(services[0].price);
  const [totalArea, setTotalArea] = useState('');
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);

  // Function to calculate the total amount whenever the service or area changes
  useEffect(() => {
    const area = parseFloat(totalArea) || 0;
    const priceBeforeDiscount = area * servicePrice;
    const discountValue = priceBeforeDiscount * (parseFloat(discount) / 100) || 0;
    const finalAmount = priceBeforeDiscount - discountValue;
    setAmount(finalAmount.toFixed(2));
  }, [servicePrice, totalArea, discount]);

  // Function to handle service selection
  const handleServiceChange = (e) => {
    const selected = services.find(service => service.name === e.target.value);
    setSelectedService(selected.name);
    setServicePrice(selected.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBooking({
      serviceName: selectedService,
      servicePrice,
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
          <select value={selectedService} onChange={handleServiceChange}>
            {services.map(service => (
              <option key={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Service Price (per m²):</label>
          <input
            type="number"
            value={servicePrice}
            disabled
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
          />
        </div>

        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="number"
            value={amount}
            readOnly
          />
        </div>

        <button type="submit" className="confirm-button">Confirm Booking</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
