import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import '../timeSlott.css';  // Import the global styles

const MIN_TIME = 360; // 06:00 AM
const MAX_TIME = 1200; // 08:00 PM

function TimeSlots({ onTimeSelect }) {
  const [timeRange, setTimeRange] = useState([480, 1020]); // Default 8:00 AM to 5:00 PM

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    const fromTime = convertMinutesToTime(value[0]);
    const toTime = convertMinutesToTime(value[1]);
    onTimeSelect(fromTime, toTime);
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="time-slots-container">
      <h2>Välj en period som passar dig bäst!</h2>
      <div className="time-range-display">
        <span>Från: <strong>{convertMinutesToTime(timeRange[0])}</strong></span>
        <span>Till: <strong>{convertMinutesToTime(timeRange[1])}</strong></span>
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
      />
    </div>
  );
}

export default TimeSlots;
