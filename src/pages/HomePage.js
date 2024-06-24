import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  const handleSexSelection = (sex) => {
    navigate(`/dates?sex=${sex}`);
  };

  return (
    <div className="home-page">
      <div className="content">
        <h1>WATERMELON BEACH OUTING AND PARTY</h1>
        <p>Select your sex:</p>
        <div className="button-container">
          <button className="selection-button" onClick={() => handleSexSelection('male')}>Male</button>
          <button className="selection-button" onClick={() => handleSexSelection('female')}>Female</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
