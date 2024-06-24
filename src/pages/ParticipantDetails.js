import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import participantData from '../participants.json';
import './ParticipantDetails.css';

const ParticipantDetails = () => {
  const [step, setStep] = useState(0);
  const [participants, setParticipants] = useState([{ team: '', sex: '', date: '', name: '', email: '', drinkingName: '' }]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [availability, setAvailability] = useState({});
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const date = query.get('date');

  useEffect(() => {
    if (!participantData[date]) {
      navigate('/dates');
      return;
    }
    const { participants } = participantData[date];
    const males = participants.filter(p => p.sex === 'male').length;
    const females = participants.filter(p => p.sex === 'female').length;
    setAvailability({ males, females, participants });
    console.log('Initial Availability:', { males, females, participants });
  }, [date, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipants(prev => {
      const newParticipants = [...prev];
      newParticipants[0][name] = value;
      console.log('Updated Participants:', newParticipants);
      return newParticipants;
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (step === 1) { // Validate name at step 1
      const nameParts = participants[0].name.trim().split(/\s+/);
      if (nameParts.length !== 2) {
        setNameError('Please enter your first and last name.');
        return;
      }
      setNameError('');
    } else if (step === 2) { // Validate email at step 2
      if (!validateEmail(participants[0].email)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      setEmailError('');
    }
    setStep(prev => prev + 1);
    console.log('Next step:', step + 1);
  };

  const handleFinish = async () => {
    console.log('handleFinish triggered');
    const newAvailability = { ...availability };
    const newParticipant = participants[0];
    const participantSex = newParticipant.sex;

    if (participantSex === 'male' && newAvailability.males >= 16) {
      alert("No more slots available for males.");
      return;
    } else if (participantSex === 'female' && newAvailability.females >= 28) {
      alert("No more slots available for females.");
      return;
    }

    if (participantSex === 'male') {
      newAvailability.males += 1;
    } else {
      newAvailability.females += 1;
    }

    newAvailability.participants.push(newParticipant);
    setAvailability(newAvailability);

    setAllParticipants(prev => [...prev, newParticipant]);
    console.log('Final Participants:', allParticipants.concat(newParticipant));

    // Send email with participant details
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          participants: allParticipants.concat(newParticipant),
          date,
          participantEmail: newParticipant.email,
          drinkingName: newParticipant.drinkingName
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.text();
      console.log('Email API response:', data);
      alert(`Thank you for signing up! We have sent a confirmation email to ${newParticipant.email}.`);

      // Redirect to confirmation page
      setStep(4);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="participant-details">
      {step === 0 && (
        <div className="content">
          <h2>Select your team</h2>
          <div className="button-container">
            <button className="selection-button" onClick={() => { handleChange({ target: { name: 'team', value: 'hostel mint' } }); setStep(1); }}>Hostel Mint</button>
            <button className="selection-button" onClick={() => { handleChange({ target: { name: 'team', value: 'team beach' } }); setStep(1); }}>Team Beach</button>
            <button className="selection-button" onClick={() => { handleChange({ target: { name: 'team', value: 'other' } }); setStep(1); }}>Other</button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="content">
          <h2>Your first and last name</h2>
          <input type="text" name="name" value={participants[0].name} onChange={handleChange} />
          {nameError && <p className="error-message">{nameError}</p>}
          <div className="button-container">
            <button className="selection-button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="content">
          <h2>What's your email, {participants[0].name.split(' ')[0]}?</h2>
          <input type="email" name="email" value={participants[0].email} onChange={handleChange} />
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="button-container">
            <button className="selection-button" onClick={() => setStep(1)}>Back</button>
            <button className="selection-button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="content">
          <h2>What's your drinking name?</h2>
          <p>If you don't have a drinking name, invent one; how would your friends call you when you drink?</p>
          <input type="text" name="drinkingName" value={participants[0].drinkingName} onChange={handleChange} />
          <div className="button-container">
            <button className="selection-button" onClick={() => setStep(2)}>Back</button>
            <button className="selection-button" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="content">
          <h2>Confirmation</h2>
          <p>Please proceed to the front desk of the Hostel Mint or the Hostel Beach to pay for the event. The price is 12 euros per person for hostel guests. Please show them this screen, {participants[0].drinkingName}, {participants[0].email}, {participants[0].name}. Also, please take a screenshot for your reference. We will send you the confirmation email after the payment. </p>
          <div className="button-container">
            <button className="selection-button" onClick={handleFinish}>Finish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantDetails;
