import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DrinkingNameEntry = () => {
  const [drinkingName, setDrinkingName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sex = query.get('sex');
  const date = query.get('date');
  const name = query.get('name');
  const email = query.get('email');

  const handleContinue = () => {
    if (!drinkingName) {
      alert('huh, enter your drinking name.');
      return;
    }
    navigate(`/add-another-person?sex=${sex}&date=${date}&name=${name}&email=${email}&drinkingName=${drinkingName}`);
  };

  return (
    <div>
      <h2>Enter Your Drinking Name</h2>
      <input type="text" placeholder="Drinking Name" value={drinkingName} onChange={(e) => setDrinkingName(e.target.value)} />
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default DrinkingNameEntry;
