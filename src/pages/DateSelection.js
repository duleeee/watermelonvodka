import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import participantData from '../participants.json'; // Import the JSON data
import partyImage from '../assets/party.jpg'; // Ensure this path is correct
import './DatesPage.css';

const DateSelection = ({ selectedSex }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dates = Object.keys(participantData);
    const available = dates.filter(date => {
      const { participants } = participantData[date];
      const males = participants.filter(p => p.sex === 'male').length;
      const females = participants.filter(p => p.sex === 'female').length;
      const total = participants.length;

      if (total >= 28 || (selectedSex === 'male' && males >= 16) || (selectedSex === 'female' && females >= 28)) {
        return false;
      }
      return true;
    });
    setAvailableDates(available);
    console.log('Available dates:', available);
  }, [selectedSex]);

  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate.replace(/, \d{4}/, ''); // Remove the year
  };

  const handleSelectDate = (date) => {
    navigate(`/participant-details?date=${date}`);
  };

  return (
    <div className="dates-page">
      <div className="background-image" style={{ backgroundImage: `url(${partyImage})` }} />
      <div className="content">
        <h2>Choose available date:</h2>
        <div className="dates-container">
          {availableDates.length > 0 ? (
            availableDates.map(date => (
              <button key={date} className="date-button" onClick={() => handleSelectDate(date)}>
                {formatDate(date)}
              </button>
            ))
          ) : (
            <p>No available dates</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelection;


// v2.0