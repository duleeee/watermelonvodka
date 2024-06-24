import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenderSelection from './pages/GenderSelection';
import DateSelection from './pages/DateSelection';
import ParticipantDetails from './pages/ParticipantDetails';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';
import Introduction from './pages/Introduction';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/gender" element={<GenderSelection />} />
        <Route path="/dates" element={<DateSelection />} />
        <Route path="/participant-details" element={<ParticipantDetails />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
