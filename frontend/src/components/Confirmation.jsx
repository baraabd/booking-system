import React from 'react';
import '../Confirmation.css';  // Import the global styles

function BookingConfirmed({ bookingDetails }) {
  const { serviceName, servicePrice, totalArea, discount, amount } = bookingDetails;

  // Hardcoded user information
  const userName = "John Doe";
  const userEmail = "johndoe@example.com";
  const userPhone = "+1 234 567 890";

  return (
    <div className="booking-confirmed-container">
      <h2>Booking Confirmed</h2>
      <p>Thank you for booking with us, {userName}!</p>

      <div className="booking-info">
        {/* User Information */}
        <div className="booking-row">
          <span className="booking-label">Name:</span>
          <span className="booking-value">{userName}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Email:</span>
          <span className="booking-value">{userEmail}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Phone:</span>
          <span className="booking-value">{userPhone}</span>
        </div>

        {/* Service Information */}
        <div className="booking-row">
          <span className="booking-label">Service Name:</span>
          <span className="booking-value">{serviceName}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Service Price (per m²):</span>
          <span className="booking-value">${servicePrice}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Total Area (sqm):</span>
          <span className="booking-value">{totalArea} m²</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Discount:</span>
          <span className="booking-value">{discount}%</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Total Amount:</span>
          <span className="booking-value">${amount}</span>
        </div>
      </div>

      <div className="booking-footer">
        <p>We look forward to providing you with excellent service!</p>
      </div>
    </div>
  );
}

export default BookingConfirmed;
