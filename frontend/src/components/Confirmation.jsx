import React from 'react';
import '../Confirmation.css';  // Ensure this file exists for styling

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
    amount,
  } = bookingDetails || {};

  const formattedDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No Date';

  // Redirect user to website or home page
  const handleGoToWebsite = () => {
    window.location.href = '/';  // Change this to your desired URL
  };

  return (
    <div className="booking-confirmed-container">
      <h2>Booking Confirmed</h2>
      <p>Thank you for booking with us, {name || 'N/A'}!</p>
      <div className="booking-info">
        <div className="booking-row"><span className="booking-label">Name:</span> <span className="booking-value">{name || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Email:</span> <span className="booking-value">{email || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Phone:</span> <span className="booking-value">{phone || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Address:</span> <span className="booking-value">{address || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Postal Code:</span> <span className="booking-value">{postalCode || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Date:</span> <span className="booking-value">{formattedDate}</span></div>
        <div className="booking-row"><span className="booking-label">Time Slot:</span> <span className="booking-value">{timeFrom || 'N/A'} - {timeTo || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Service Name:</span> <span className="booking-value">{serviceName || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Service Price (per m²):</span> <span className="booking-value">${servicePrice || 'N/A'}</span></div>
        <div className="booking-row"><span className="booking-label">Total Area (sqm):</span> <span className="booking-value">{totalArea || 'N/A'} m²</span></div>
        <div className="booking-row"><span className="booking-label">Discount:</span> <span className="booking-value">{discount || 0}%</span></div>
        <div className="booking-row"><span className="booking-label">Total Amount:</span> <span className="booking-value">${amount || 'N/A'}</span></div>
      </div>
      <button onClick={handleGoToWebsite} className="confirm-button">
        Go to Website
      </button>
    </div>
  );
}

export default BookingConfirmed;
