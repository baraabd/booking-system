import React from 'react';
import '../Confirmation.css';

function BookingConfirmed({ bookingDetails }) {
  const {
    name,
    email,
    phone,
    address,
    postalCode,
    bookingDate,
    timeFrom,
    timeTo,
    serviceName,
    servicePrice,
    totalArea,
    discount,
  } = bookingDetails || {};

  // Apply discount to the amount calculation
  const baseAmount = totalArea * servicePrice;
  const discountAmount = (discount / 100) * baseAmount;
  const finalAmount = baseAmount - discountAmount;

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
      <p>Kontrollera att din bokning stämmer, sen klick Bekräta!</p>
      <div className="booking-info">
        <div className="booking-row"><span className="booking-label">Namn:</span> <span className="booking-value">{name || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">E-post:</span> <span className="booking-value">{email || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Phonenummer:</span> <span className="booking-value">{phone || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Adress:</span> <span className="booking-value">{address || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Postnummer:</span> <span className="booking-value">{postalCode || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Datum:</span> <span className="booking-value">{formattedDate}</span></div>
        <div className="booking-row"><span className="booking-label">Service tillgänglig:</span> <span className="booking-value">{timeFrom || 'N/A'} - {timeTo || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Service Namn:</span> <span className="booking-value">{serviceName || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Service Pris (per m²):</span> <span className="booking-value">SEK{servicePrice || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Total yta (sqm):</span> <span className="booking-value">{totalArea || 'N/A'} m²</span></div>
        <div className="booking-row"><span className="booking-label">Rabatt:</span> <span className="booking-value">{discount || 0}%</span></div>
        <div className="booking-row"><span className="booking-label">Totalt belopp:</span> <span className="booking-value">SEK{finalAmount.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
