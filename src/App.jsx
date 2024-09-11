import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import './styles.css';  // Import the global styles

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeTo, setSelectedTimeTo] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [stage, setStage] = useState(1);

  // Handle Date Selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStage(2);  // Move to the next stage (Time Slot selection)
  };

  // Handle Time Slot Selection
  const handleTimeSelect = (from, to) => {
    setSelectedTimeFrom(from);
    setSelectedTimeTo(to);
    setStage(3);  // Move to the next stage (User Details Form)
  };

  // Handle User Details Submission
  const handleBookingSubmit = (details) => {
    setBookingDetails({
      ...details,  // Include user details like name, email, phone, address, postal code
      date: selectedDate,
      timeFrom: selectedTimeFrom,
      timeTo: selectedTimeTo,
    });
    setStage(4);  // Move to the next stage (Confirmation)
  };

  return (
    <div>
      {stage === 1 && <CalendarComponent onDateSelect={handleDateSelect} />}
      {stage === 2 && <TimeSlots onTimeSelect={handleTimeSelect} />}
      {stage === 3 && <BookingForm onBookingSubmit={handleBookingSubmit} />}
      {stage === 4 && <Confirmation bookingDetails={bookingDetails} />}
    </div>
  );
}

export default App;
