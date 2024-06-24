
import React from 'react';
import { Link } from 'react-router-dom';

const GenderSelection = () => {
  return (
    <div>
      <h2>What's your sex:</h2>
      <Link to="/dates?gender=male"><button>A Male</button></Link>
      <Link to="/dates?gender=female"><button>A Female</button></Link>
    </div>
  );
};

export default GenderSelection;
