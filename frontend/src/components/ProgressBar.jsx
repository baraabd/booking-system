import React from 'react';
import '../ProgressBar.css';  // Import the CSS for styling

const ProgressBar = ({ currentStage }) => {
  const stages = [
    { label: "Select Service", stage: 1 },
    { label: "Select Date & Time", stage: 2 },
    { label: "User Info", stage: 3 },
    { label: "Confirmation", stage: 4 }
  ];

  return (
    <div className="progress-bar-container">
      {stages.map((step, index) => (
        <div key={index} className={`progress-step ${currentStage >= step.stage ? 'active' : ''}`}>
          <span className="step-number">{index + 1}</span>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
