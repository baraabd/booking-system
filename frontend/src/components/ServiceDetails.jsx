import React, { useState, useEffect } from "react";
import "../ServiceDetails.css";

const servicesData = {
  Hemstädning: [
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
  Flyttstädning: [
    { min: 0, max: 49, prisInnanRut: 2891 },
    { min: 50, max: 59, prisInnanRut: 3422 },
    // ... other ranges
  ],
  Flyttning: [
    { min: 0, max: 49, prisInnanRut: 5292 },
    { min: 50, max: 59, prisInnanRut: 6254 },
    // ... other ranges
  ],
};

function ServiceDetails({ onProceedToUser }) {
  const [selectedService, setSelectedService] = useState("Hemstädning");
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

  const handleRutToggle = () => {
    setRutDiscount(!rutDiscount);
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
      <h2>Välj den bästa tjänsten</h2>
      <h2 className="head">som passar dina behov!</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label>Välj service:</label>
          <div className="service-buttons">
            {Object.keys(servicesData).map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => setSelectedService(service)}
                className={service === selectedService ? "selected" : ""}
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
            <div
              className="slider-value"
              style={{ left: `${(totalArea / 159) * 100}%` }}
            >
              {totalArea} kvm
            </div>
          </div>
        </div>

        {/* Toggle Switch for Rut Discount */}
        <div className="toggle-switch">
          <label className="switch">
            <input
              type="checkbox"
              checked={rutDiscount}
              onChange={handleRutToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">Jag har rätt till Rutavdrag</span>
        </div>

        {/* Display Pricing Dynamically Based on Rut Discount */}
        {!rutDiscount ? (
          <div className="form-group price-info">
            <label>
              Pris innan Rut: <strong>{priceBeforeRut} kr</strong>
            </label>
          </div>
        ) : (
          <div className="form-group price-info">
            <label>
              Totalt pris (med Rutavdrag):{" "}
              <strong>{calculatedPrice.toFixed(2)} kr</strong>
            </label>
          </div>
        )}

        <button type="submit" className="confirm-button-datum">
          Nästa steg, Välj datum och tid!
        </button>
      </form>
    </div>
  );
}

export default ServiceDetails;
