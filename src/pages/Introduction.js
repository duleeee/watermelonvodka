import React from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';

const Introduction = () => {
  return (
    <div className="introduction-page">
      <div className="contentw">
        <h1>Watermelon Beach Party</h1>
        <h2>What is it?</h2>
        <p>It's a drinking game, or as some would call it, a drinking sport. Two teams, each half male, half female, compete to see who can drink more Vodka and Fanta from a drunk watermelon on the beach. Team Beach and Hostel Mint have 24 contestants total, 12 in each team, 6 male and 6 female. Each contestant has a number written on their shoulder from 1 to 12 and their drinking name written on their arm.</p>
        <h2>How it Works:</h2>
        <p>The coach picks a number, and the contestants with that number from both teams run across the beach (like 10 meters, don't worry) to drink from the watermelon placed between the two teams. The contestant who gets drunk first wins. Needless to say, we are expecting male winners and lots of fun. :)</p>
        <h2>Schedule:</h2>
        <p>
          <strong>Start Time:</strong> The outing starts at about 16:00. We will begin gathering on the beach to get some sun and hydrate or something.<br />
          <strong>Game Start:</strong> The games will begin at about 19:15.
        </p>
        <h2>Event Location:</h2>
        <p>
          <strong>Location:</strong> Our next event is in Split, Croatia, on Tuesday, June 25th, at Kasjuni Beach. It is a must-see beach located west of the city, right next to Marjan Hill. The place features a DJ on the beach, beds, and a bar.
        </p>
        <h2>Post-Event Plans:</h2>
        <p>
          <strong>After-Event:</strong> After the event, we will visit some bars near Diocletian's Palace.
        </p>
        <h2>Participation Details:</h2>
        <p>
          <strong>Sign-Up:</strong> The signup sheet is at the front desk.<br />
          <strong>Cost:</strong> The cover is 20 euros per person (12 euros for hostel guests of the Beach and Mint hostels), which includes the game (and obviously, lots of drinking from the watermelon).
        </p>
      </div>
      <div className="button-container">
        <Link to="/home"><button className="signup-button">Sign me up</button></Link>
      </div>
    </div>
  );
};

export default Introduction;
