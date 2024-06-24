import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import participantData from '../participants.json'; // Import the JSON data
import './DatesPage.css';

const DatesPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dates = Object.keys(participantData);
    const available = dates.filter(date => {
      const { males, females } = participantData[date];
      return (males < 15 && females < 24);
    });
    setAvailableDates(available);
  }, []);

  const handleSelectDate = (date) => {
    navigate(`/participant-details?date=${date}`);
  };

  return (
    <div className="dates-page">
      <h2>Select an Available Date</h2>
      <div className="dates-container">
        {availableDates.map(date => (
          <button key={date} className="date-button" onClick={() => handleSelectDate(date)}>
            {date} - 19:00
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatesPage;
