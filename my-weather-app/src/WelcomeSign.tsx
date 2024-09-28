import React from 'react';
import './WelcomeSign.scss'; 

const WelcomeSign: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome to the Weather App!</h1>
    </div>
  );
};

export default WelcomeSign;
