import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../ThankYou.css';

function ThankYou({ onGoHome }) {
  useEffect(() => {
    // Define multiple confetti bursts to simulate a firework show
    const duration = 3 * 1000; // 3 seconds
    const end = Date.now() + duration;

    const frame = () => {
      // Randomize the confetti burst effect
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="thank-you-container">
      <h2>Tack för att du valde oss!</h2>
      <p>Vi kommer att kontakta dig så snart som möjligt.</p>
      <button onClick={onGoHome} className="go-home-button">
        Gå till startsidan
      </button>
    </div>
  );
}

export default ThankYou;
