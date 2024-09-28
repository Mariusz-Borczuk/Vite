import React from 'react';
import './WelcomeSign.scss'; // We'll add CSS animations in this file

const WelcomeSign: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome to the Weather App!</h1>
    </div>
  );
};

export default WelcomeSign;
