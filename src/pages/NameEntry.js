import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NameEntry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sex = query.get('sex');
  const date = query.get('date');

  const handleContinue = () => {
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    navigate(`/email-entry?sex=${sex}&date=${date}&name=${name}`);
  };

  return (
    <div>
      <h2>Enter Your Name</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default NameEntry;
