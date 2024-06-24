import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ParticipantForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sex = query.get('sex');
  const date = query.get('date');

  const [email, setEmail] = useState('');
  const [realName, setRealName] = useState('');
  const [drinkingName, setDrinkingName] = useState('');

  const handleSubmit = () => {
    // Submit participant details to backend and navigate to payment
    navigate('/payment');
  };

  return (
    <div>
      <h2>Enter Participant Details</h2>
      <p>Date: {date}</p>
      <p>Sex: {sex}</p>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Real Name" value={realName} onChange={(e) => setRealName(e.target.value)} />
      <input type="text" placeholder="Drinking Name" value={drinkingName} onChange={(e) => setDrinkingName(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ParticipantForm;
