import React from 'react';
import '../Confirmation.css';  // Import the global styles

function BookingConfirmed({ bookingDetails }) {
  const { name, email, phone, address, postalCode, serviceName, servicePrice, totalArea, discount, amount, date, timeFrom, timeTo } = bookingDetails;

  return (
    <div className="booking-confirmed-container">
      <h2>Booking Confirmed</h2>
      <p>Thank you for booking with us, {name}!</p>

      <div className="booking-info">
        {/* User Information */}
        <div className="booking-row">
          <span className="booking-label">Name:</span>
          <span className="booking-value">{name}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Email:</span>
          <span className="booking-value">{email}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Phone:</span>
          <span className="booking-value">{phone}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Address:</span>
          <span className="booking-value">{address}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Postal Code:</span>
          <span className="booking-value">{postalCode}</span>
        </div>

        {/* Date and Time */}
        <div className="booking-row">
          <span className="booking-label">Date:</span>
          <span className="booking-value">{new Date(date).toLocaleDateString()}</span>
        </div>

        <div className="booking-row">
          <span className="booking-label">Time Slot:</span>
          <span className="booking-value">{timeFrom} - {timeTo}</span>
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
