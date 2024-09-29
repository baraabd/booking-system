import React, { useState, useEffect } from 'react';
import '../ServiceDetails.css';

const services = [
  { name: 'Hemstädning', price: 13 },
  { name: 'Flyttstädning', price: 32 },
  { name: 'Flyttning', price: 79 },
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
    const serviceDetails = { serviceName: selectedService, servicePrice, totalArea, discount, amount };
    onProceedToUser(serviceDetails);  
  };
  
  

  return (
    <div className="service-details-container">
      <h2>Ange vilket service du vill!</h2>

      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Serice namn:</label>
          <select value={selectedService} onChange={handleServiceChange}>
            {services.map(service => (
              <option key={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Service Pris (per m²):</label>
          <input
            type="number"
            value={servicePrice}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Total yta (sqm): {totalArea}</label>
          <input
            type="range"
            min="10"
            max="500"
            value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Rabatt (%):</label>
          <input
            type="number"
            min="0"
            max="10"
            value={discount}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Totalt belopp:</label>
          <input
            type="number"
            value={amount}
            readOnly
          />
        </div>

        <button type="submit" className="confirm-button-datum">Fortsätt till datum och tid</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
