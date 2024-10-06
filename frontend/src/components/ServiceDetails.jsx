import React, { useState, useEffect } from 'react';
import '../ServiceDetails.css';

// Define price ranges for each service
const servicesData = {
  'Hemstädning': [
    { min: 0, max: 49, prisInnanRut: 1225 },
    { min: 50, max: 59, prisInnanRut: 1357 },
    { min: 60, max: 69, prisInnanRut: 1449 },
    { min: 70, max: 79, prisInnanRut: 1501 },
    { min: 80, max: 89, prisInnanRut: 1513 },
    { min: 90, max: 99, prisInnanRut: 1584 },
    { min: 100, max: 109, prisInnanRut: 1635 },
    { min: 110, max: 119, prisInnanRut: 1666 },
    { min: 120, max: 129, prisInnanRut: 1677 },
    { min: 130, max: 139, prisInnanRut: 1668 },
    { min: 140, max: 159, prisInnanRut: 1749 },
  ],
  'Flyttstädning': [
    { min: 0, max: 49, prisInnanRut: 2891 },
    { min: 50, max: 59, prisInnanRut: 3422 },
    { min: 60, max: 69, prisInnanRut: 3933 },
    { min: 70, max: 79, prisInnanRut: 4424 },
    { min: 80, max: 89, prisInnanRut: 4895 },
    { min: 90, max: 99, prisInnanRut: 5346 },
    { min: 100, max: 109, prisInnanRut: 5777 },
    { min: 110, max: 119, prisInnanRut: 6188 },
    { min: 120, max: 129, prisInnanRut: 6579 },
    { min: 130, max: 139, prisInnanRut: 6950 },
    { min: 140, max: 159, prisInnanRut: 7791 },
  ],
  'Flyttning': [
    { min: 0, max: 49, prisInnanRut: 5292 },
    { min: 50, max: 59, prisInnanRut: 6254 },
    { min: 60, max: 69, prisInnanRut: 7176 },
    { min: 70, max: 79, prisInnanRut: 8058 },
    { min: 80, max: 89, prisInnanRut: 8900 },
    { min: 90, max: 99, prisInnanRut: 9702 },
    { min: 100, max: 109, prisInnanRut: 10464 },
    { min: 110, max: 119, prisInnanRut: 11186 },
    { min: 120, max: 129, prisInnanRut: 11862 },
    { min: 130, max: 139, prisInnanRut: 12510 },
    { min: 140, max: 159, prisInnanRut: 13992 },
  ],
};

function ServiceDetails({ onProceedToUser }) {
  const [selectedService, setSelectedService] = useState('Hemstädning');
  const [totalArea, setTotalArea] = useState(50); // Default value for slider
  const [priceBeforeRut, setPriceBeforeRut] = useState(0);
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [rutDiscount, setRutDiscount] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Discount for new customer

  useEffect(() => {
    // Calculate price based on selected service and area
    const area = parseFloat(totalArea) || 0;
    const priceRanges = servicesData[selectedService];
    
    const priceRange = priceRanges.find(
      (range) => area >= range.min && area <= range.max
    );

    if (priceRange) {
      const calculatedPriceBeforeRut = priceRange.prisInnanRut;
      setPriceBeforeRut(calculatedPriceBeforeRut);

      // Calculate price per m²
      const pricePerM2 = priceRange.prisInnanRut / priceRange.max;
      setPricePerSquareMeter(pricePerM2);

      // Apply discount logic
      let discountedPrice = calculatedPriceBeforeRut;
      if (rutDiscount) {
        discountedPrice /= 2; // Apply Rut discount
      }

      // Apply new customer discount if applicable
      if (appliedDiscount) {
        discountedPrice -= (appliedDiscount / 100) * discountedPrice;
      }

      setCalculatedPrice(discountedPrice);
    }
  }, [totalArea, selectedService, rutDiscount, appliedDiscount]);

  const handleRutCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setRutDiscount(isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceDetails = {
      serviceName: selectedService,
      priceBeforeRut,
      pricePerSquareMeter, // Pass price per square meter
      totalArea,
      discount: rutDiscount ? 50 : appliedDiscount, // Apply Rut or new customer discount
      amount: calculatedPrice,
    };
    onProceedToUser(serviceDetails);
  };

  return (
    <div className="service-details-container">
      <h2>Välj vilken service du vill ha!</h2>

      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Välj service:</label>
          <div className="service-buttons">
            {Object.keys(servicesData).map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => setSelectedService(service)}
                className={service === selectedService ? 'selected' : ''}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Total yta (kvm):</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="159"
              value={totalArea}
              step="1"
              onChange={(e) => setTotalArea(e.target.value)}
            />
            <div className="slider-value" style={{ left: `${(totalArea / 159) * 100}%` }}>
              {totalArea} kvm
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={rutDiscount}
              onChange={handleRutCheckboxChange}
            />
            Jag har rätt till Rutavdrag
          </label>
        </div>

        <div className="form-group">
          <label>Pris innan Rut: {priceBeforeRut} kr</label>
        </div>
        
        <div className="form-group">
          <label>Totalt pris: {calculatedPrice.toFixed(2)} kr</label>
        </div>

        <button type="submit" className="confirm-button-datum">Fortsätt till datum och tid</button>
      </form>
    </div>
  );
}

export default ServiceDetails;
