import React from 'react';
import '../ProgressBar.css';  // Import the CSS for styling

const ProgressBar = ({ currentStage }) => {
  const stages = [
    { label: "Välj Service", stage: 1 },
    { label: "Välj Datum och tid", stage: 2 },
    { label: "Användarinformation", stage: 3 },
    { label: "Bekräftelse", stage: 4 }
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
