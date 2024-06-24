import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailEntry = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sex = query.get('sex');
  const date = query.get('date');
  const name = query.get('name');

  const handleContinue = () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    navigate(`/drinking-name-entry?sex=${sex}&date=${date}&name=${name}&email=${email}`);
  };

  return (
    <div>
      <h2>Enter Your Email</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default EmailEntry;
