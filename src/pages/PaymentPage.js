import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const { participants, sex, date } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!participants || !sex || !date) {
      navigate('/');
      return;
    }

    const totalAmount = participants.length * 12; // 12 euros per person

    const createCheckout = async () => {
      try {
        const response = await axios.post('https://api.sumup.com/v0.1/checkouts', {
          amount: totalAmount,
          currency: 'EUR',
          checkout_reference: 'order123',
          description: `Watermelon Beach Outing and Party - ${participants.length} participants`,
          merchant_code: 'YOUR_MERCHANT_CODE',
          return_url: 'https://yourwebsite.com/payment-success',
          callback_url: 'https://yourwebsite.com/payment-callback'
        }, {
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
            'Content-Type': 'application/json'
          }
        });
        window.location.href = response.data.checkout_url;
      } catch (error) {
        console.error('Error creating checkout:', error);
      }
    };

    createCheckout();
  }, [participants, sex, date, navigate]);

  return (
    <div>
      <h2>Processing Payment...</h2>
    </div>
  );
};

export default PaymentPage;
