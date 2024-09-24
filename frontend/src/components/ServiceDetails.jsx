import React, { useState, useEffect } from 'react';
import '../ServiceDetails.css';

const services = [
  { name: 'Clean house', price: 100 },
  { name: 'Move things', price: 1000 },
  { name: 'Clean apartment', price: 100 },
  { name: 'Clean and move', price: 1500 },
];

function ServiceDetails({ onProceedToUser, discount: initialDiscount }) {
  const [selectedService, setSelectedService] = useState(services[0].name);
  const [servicePrice, setServicePrice] = useState(services[0].price);
  const [totalArea, setTotalArea] = useState(50); // Default value for slider
  const [discount, setDiscount] = useState(initialDiscount || 0); // Use the passed discount
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const area = parseFloat(totalArea) || 0;
    const priceBeforeDiscount = area * servicePrice;
    const discountValue = priceBeforeDiscount * (discount / 100);
    const finalAmount = priceBeforeDiscount - discountValue;
    setAmount(finalAmount.toFixed(2));
  }, [servicePrice, totalArea, discount]);

  const handleServiceChange = (e) => {
    const selected = services.find(service => service.name === e.target.value);
    setSelectedService(selected.name);
    setServicePrice(selected.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceDetails = { selectedService, servicePrice, totalArea, discount, amount };
    onProceedToUser(serviceDetails);  
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
          <label>Total Area (sqm): {totalArea}</label>
          <input
            type="range"
            min="10"
            max="500"
            value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Discount (%):</label>
          <input
            type="number"
            min="0"
            max="10"
            value={discount}
            disabled
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

        <button type="submit" className="confirm-button">Proceed to Date & Time</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
