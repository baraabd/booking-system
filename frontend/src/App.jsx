import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingForm from './components/BookingForm';
import ServiceDetails from './components/ServiceDetails';
import Confirmation from './components/Confirmation';
import './styles.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeTo, setSelectedTimeTo] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [stage, setStage] = useState(1);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStage(2);
  };

  const handleTimeSelect = (from, to) => {
    setSelectedTimeFrom(from);
    setSelectedTimeTo(to);
    setStage(3);
  };

  const handleProceedToService = (details) => {
    setUserDetails(details);
    setStage(4);
  };

  const handleConfirmBooking = (serviceDetails) => {
    setBookingDetails({
      ...userDetails,
      ...serviceDetails,
      date: selectedDate,
      timeFrom: selectedTimeFrom,
      timeTo: selectedTimeTo,
    });
    setStage(5);  // Move to confirmation stage
  };

  return (
    <div>
      {stage === 1 && <CalendarComponent onDateSelect={handleDateSelect} />}
      {stage === 2 && <TimeSlots onTimeSelect={handleTimeSelect} />}
      {stage === 3 && <BookingForm onProceedToService={handleProceedToService} />}
      {stage === 4 && <ServiceDetails onConfirmBooking={handleConfirmBooking} />}
      {stage === 5 && <Confirmation bookingDetails={bookingDetails} />}
    </div>
  );
}

export default App;
