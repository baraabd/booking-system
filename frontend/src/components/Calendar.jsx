import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Calendar.css';  // Import the global styles

function CalendarComponent({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  // Helper function to determine if a date is in the past (including today)
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for today to compare dates
    return date < today;
  };

  // Helper function to determine if a date is today
  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for today to compare dates
    return date.getTime() === today.getTime();
  };

  return (
    <div className="calendar-container" aria-label="Calendar container">
      <h2 className="calendar-title" aria-label="Select a date">Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="custom-calendar"
        aria-label="Custom calendar"
        minDate={new Date()}  // Disable selection of past dates
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            if (isPastDate(date)) {
              return 'past-date';  // Add class for past dates
            }
            if (isToday(date)) {
              return 'today-date';  // Add class for today
            }
            if (date.getTime() === selectedDate.getTime()) {
              return 'selected-date';  // Add class for the selected date
            }
          }
          return null;
        }}
        tileDisabled={({ date, view }) => view === 'month' && isPastDate(date)} // Ensure past dates are disabled
        next2Label={null}  // Hide the double arrow navigation buttons
        prev2Label={null}
        showNeighboringMonth={false} // Hide days from neighboring months
      />
    </div>
  );
}

export default CalendarComponent;
