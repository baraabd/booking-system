import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import ReactSlider from 'react-slider';

import '../styles.css';  // Import the global styles

// Define constants for the limits
const MINUTES_IN_A_DAY = 1440;
const MIN_TIME = 360; // 06:00 AM
const MAX_TIME = 1200; // 08:00 PM

function TimeSlots({ onTimeSelect }) {
  const [timeRange, setTimeRange] = useState([480, 1020]); // Default 8:00 AM to 5:00 PM
  const [isTimeSelected, setIsTimeSelected] = useState(false); // Track if the user has confirmed the time

  // Handles time range change when slider is being adjusted
  const handleTimeRangeChange = (value) => {
    setTimeRange(value); // Update the time range in the component's state
    setIsTimeSelected(false); // Reset the confirmation state if the user adjusts the time
  };

  // Handles the final time selection when the user clicks the "Confirm Time" button
  const handleConfirmTime = () => {
    const [from, to] = timeRange;
    const fromTime = convertMinutesToTime(from);
    const toTime = convertMinutesToTime(to);
    setIsTimeSelected(true); // Mark that the user has confirmed the time
    onTimeSelect(fromTime, toTime); // Pass the selected times to the parent component
  };

  // Helper function to convert minutes into time format (HH:MM AM/PM)
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedMinutes = mins.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${formattedMinutes} ${period}`;
  };

  return (
    <div className="time-slots-container">
      <h2>Select Time Slot</h2>
      <div className="time-range-display">
        <span>From: {convertMinutesToTime(timeRange[0])}</span>
        <span>To: {convertMinutesToTime(timeRange[1])}</span>
      </div>

      <ReactSlider
        className="time-slider"
        thumbClassName="time-slider-thumb"
        trackClassName="time-slider-track"
        min={MIN_TIME} // Start slider at 06:00 AM
        max={MAX_TIME} // End slider at 08:00 PM
        step={30} // Step in 30-minute intervals
        value={timeRange}
        onChange={handleTimeRangeChange} // Update time range while slider is being moved
        minDistance={60} // Ensure at least 1 hour between start and end times
        pearling
      />

      <button className="confirm-time-button" onClick={handleConfirmTime}>
        Confirm Time
      </button>

      {isTimeSelected && (
        <div className="confirmation-message">
          <p>Time Confirmed! Proceed to enter your details.</p>
        </div>
      )}
    </div>
  );
}

export default TimeSlots;
