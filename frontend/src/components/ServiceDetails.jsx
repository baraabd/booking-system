import React, { useState, useEffect } from 'react';
import '../ServiceDetails.css';

const services = [
  { name: 'Hemstädning', price: 13 },
  { name: 'Flyttstädning', price: 32 },
  { name: 'Flyttning', price: 79 },
];

function ServiceDetails({ onProceedToUser, discount: initialDiscount }) {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [totalArea, setTotalArea] = useState(50); // Default value for slider
  const [discount, setDiscount] = useState(initialDiscount || 0); // Use the passed discount
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const area = parseFloat(totalArea) || 0;
    const priceBeforeDiscount = area * selectedService.price;
    const discountValue = priceBeforeDiscount * (discount / 100);
    const finalAmount = priceBeforeDiscount - discountValue;
    setAmount(finalAmount.toFixed(2));
  }, [selectedService, totalArea, discount]);

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceDetails = {
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      totalArea,
      discount,
      amount,
    };
    onProceedToUser(serviceDetails);  
  };

  return (
    <div className="service-details-container">
      <h2>Ange vilket service du vill!</h2>

      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Välj service:</label>
          <div className="service-buttons">
            {services.map(service => (
              <button
                type="button"
                key={service.name}
                onClick={() => handleServiceChange(service)}
                className={service.name === selectedService.name ? 'selected' : ''}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Total yta (sqm):</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="200"
              value={totalArea}
              step="1"
              onChange={(e) => setTotalArea(e.target.value)}
            />
            <div className="slider-value" style={{ left: `${(totalArea / 200) * 100}%` }}>
              {totalArea} m²
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Rabatt (%): {discount}</label>
        </div>

        <div className="form-group">
          <label>Totalt belopp: {amount} kr</label>
        </div>

        <button type="submit" className="confirm-button-datum">Fortsätt till datum och tid</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
