import React from 'react';
import '../Confirmation.css';

function BookingConfirmed({ bookingDetails }) {
  const {
    name = "N/A",
    email = "N/A",
    phone = "N/A",
    address = "N/A",
    postalCode = "N/A",
    bookingDate,
    timeFrom = "N/A",
    timeTo = "N/A",
    serviceName = "N/A",
    pricePerSquareMeter = 0,
    totalArea = 0,
    discount = 0,
    amount = 0,
  } = bookingDetails || {};

  // Parse values to ensure they are numbers
  const parsedServicePrice = parseFloat(pricePerSquareMeter);
  console.log("parsedServicePrice:", parsedServicePrice);
  const parsedTotalArea = parseFloat(totalArea);
  console.log("parsedTotalArea: ", parsedTotalArea);


  // Apply discount to the amount calculation, ensuring all numbers are correctly parsed
  const baseAmount = parsedTotalArea * parsedServicePrice;
  console.log("baseAmount:", baseAmount);

  // Calculate discount if applicable
  const discountAmount = (parseFloat(discount) / 100) * baseAmount;
  console.log("baseAmount:", baseAmount);

  const finalAmount = baseAmount - discountAmount;

  // Ensure finalAmount is correctly formatted to avoid unexpected results
  const formattedFinalAmount = amount.toFixed(2)* 90 / 100;

  // Format the booking date for display
  const formattedDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No Date';

  return (
    <div className="booking-confirmed-container">
      <h2>Bekräfta Bokning</h2>
      <p>Kontrollera att din bokning stämmer, sen klick Bekräfta!</p>
      <div className="booking-info">
        <div className="booking-row">
          <span className="booking-label">Namn:</span>
          <span className="booking-value">{name}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">E-post:</span>
          <span className="booking-value">{email}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Phonenummer:</span>
          <span className="booking-value">{phone}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Adress:</span>
          <span className="booking-value">{address}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Postnummer:</span>
          <span className="booking-value">{postalCode}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Datum:</span>
          <span className="booking-value">{formattedDate}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Service tillgänglig:</span>
          <span className="booking-value">{timeFrom} - {timeTo}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Service Namn:</span>
          <span className="booking-value">{serviceName}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Service Pris (per m²):</span>
          <span className="booking-value">SEK {parsedServicePrice.toFixed(2)}</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Total yta (sqm):</span>
          <span className="booking-value">{parsedTotalArea} m²</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Rabatt:</span>
          <span className="booking-value">{discount}%</span>
        </div>
        <div className="booking-row">
          <span className="booking-label">Totalt belopp:</span>
          <span className="booking-value">SEK {formattedFinalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
