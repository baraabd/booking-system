import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles.css';  // Import the global styles

function CalendarComponent({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  );
}

export default CalendarComponent;
