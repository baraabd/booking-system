import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import '../timeSlott.css';  // Import the global styles

const MINUTES_IN_A_DAY = 1440;
const MIN_TIME = 360; // 06:00 AM
const MAX_TIME = 1200; // 08:00 PM

function TimeSlots({ onTimeSelect }) {
  const [timeRange, setTimeRange] = useState([480, 1020]); // Default 8:00 AM to 5:00 PM
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    setIsTimeSelected(false);
  };

  const handleConfirmTime = () => {
    const [from, to] = timeRange;
    const fromTime = convertMinutesToTime(from);
    const toTime = convertMinutesToTime(to);
    setIsTimeSelected(true);
    onTimeSelect(fromTime, toTime);
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedMinutes = mins.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${formattedMinutes} ${period}`;
  };

  return (
    <div className='slott-continer'>
    <div className="time-slots-container">
      <h2>Select Time Slot</h2>
      <div className="time-range-display">
        <span>From: <strong>{convertMinutesToTime(timeRange[0])}</strong></span>
        <span>To: <strong>{convertMinutesToTime(timeRange[1])}</strong></span>
      </div>

      <ReactSlider
        className="time-slider"
        thumbClassName="time-slider-thumb"
        trackClassName="time-slider-track"
        min={MIN_TIME}
        max={MAX_TIME}
        step={30}
        value={timeRange}
        onChange={handleTimeRangeChange}
        minDistance={60}
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
    </div>
  );
}

export default TimeSlots;
