import React from 'react';
import '../Confirmation.css';  // Import the global styles

function Confirmation({ bookingDetails }) {
  if (!bookingDetails) {
    return <div>No booking details available.</div>;
  }

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmed!</h2>
      <p>Thank you, {bookingDetails.name}!</p>
      <p>Your booking is confirmed for:</p>
      <p>Date: {bookingDetails.date.toLocaleDateString()}</p>
      <p>Time: {bookingDetails.timeFrom} - {bookingDetails.timeTo}</p>
      <p>Email: {bookingDetails.email}</p>
      <p>Phone: {bookingDetails.phone}</p>
      <p>Address: {bookingDetails.address}</p> {/* Display the address */}
      <p>Postal Code: {bookingDetails.postalCode}</p> {/* Display the postal code */}
    </div>
  );
}

export default Confirmation;
