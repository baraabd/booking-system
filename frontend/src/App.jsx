import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingForm from './components/BookingForm';
import ServiceDetails from './components/ServiceDetails';
import BookingConfirmed from './components/Confirmation';
import './styles.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeTo, setSelectedTimeTo] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [stage, setStage] = useState(1);
  const [discountMessage, setDiscountMessage] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false); // Track if discount is applied
  const [discount, setDiscount] = useState(0); // Discount value

  // Calendar date selection handler
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStage(2); // Move to TimeSlots after selecting date
  };

  // Time slot selection handler
  const handleTimeSelect = (from, to) => {
    setSelectedTimeFrom(from);
    setSelectedTimeTo(to);
    setStage(3); // Move to BookingForm after selecting time slot
  };

  // Function to check if the user exists in the system
  const checkUserExists = async (email) => {
    const query = `
      query {
        checkUserExists(email: "${email}")
      }
    `;

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      console.log(result);
      if (result.data && result.data.checkUserExists !== undefined) {
        return result.data.checkUserExists;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false; // Return false if any error occurs
    }
  };

  // User details form submission handler
  const handleProceedToService = async (details) => {
    const userExists = await checkUserExists(details.email);
    if (userExists) {
      setDiscountMessage('Congratulations! You are already in our system and get a 10% discount!');
      setDiscountApplied(true);
      setDiscount(10); // Automatically set discount to 10% for returning users
    } else {
      setDiscountMessage('');
      setDiscountApplied(false);
      setDiscount(0); // Default to 0% discount for new users
    }
    setUserDetails(details);
    setStage(4); // Move to ServiceDetails after form submission
  };

  // Function to send the booking information to the backend
  const saveBookingToBackend = async (bookingDetails) => {
    const query = `
      mutation {
        addBooking(
          name: "${bookingDetails.name}",
          email: "${bookingDetails.email}",
          phone: "${bookingDetails.phone}",
          address: "${bookingDetails.address}",
          postalCode: "${bookingDetails.postalCode}",
          bookingDate: "${bookingDetails.bookingDate}",
          bookingStart: "${bookingDetails.timeFrom}",
          bookingEnd: "${bookingDetails.timeTo}",
          serviceName: "${bookingDetails.serviceName}",
          servicePrice: ${bookingDetails.servicePrice},
          totalArea: ${bookingDetails.totalArea},
          discount: ${bookingDetails.discount},
          amount: ${bookingDetails.amount}
        ) {
          id
          name
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      const result = await response.json();
      console.log(result); // Handle success here
    } catch (error) {
      console.error('Error:', error);
      alert('There was an issue saving your booking. Please try again.');
    }
  };

  // Service details form submission handler
  const handleConfirmBooking = async (serviceDetails) => {
    const discountedAmount = serviceDetails.amount - (serviceDetails.amount * (discount / 100)); // Apply discount

    const bookingDetails = {
      ...userDetails, // Combine user details
      ...serviceDetails, // Combine service details
      bookingDate: selectedDate.toISOString(), // Format selected date to ISO string
      timeFrom: selectedTimeFrom, // Include selected time from
      timeTo: selectedTimeTo, // Include selected time to
      discount: discount, // Apply discount
      amount: discountedAmount.toFixed(2), // Update the final amount with discount
    };

    setServiceDetails(bookingDetails);

    // Save booking to backend
    await saveBookingToBackend(bookingDetails);

    setStage(5); // Move to BookingConfirmed (confirmation) stage
  };

  return (
    <div>
      {stage === 1 && <CalendarComponent onDateSelect={handleDateSelect} />}
      {stage === 2 && <TimeSlots onTimeSelect={handleTimeSelect} />}
      {stage === 3 && (
        <>
          {discountMessage && <p>{discountMessage}</p>} {/* Show discount message if applicable */}
          <BookingForm onProceedToService={handleProceedToService} />
        </>
      )}
      {stage === 4 && <ServiceDetails discount={discount} onConfirmBooking={handleConfirmBooking} />}
      {stage === 5 && <BookingConfirmed bookingDetails={serviceDetails} />}
    </div>
  );
}

export default App;
