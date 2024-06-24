const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dusan.rula@gmail.com',
    pass: 'fbppviagpecfmlke'
  }
});

// Load participant data from JSON file
const participantDataPath = path.join(__dirname, 'participants.json');
let participantData = JSON.parse(fs.readFileSync(participantDataPath, 'utf-8'));

const saveParticipantData = (data) => {
  fs.writeFileSync(participantDataPath, JSON.stringify(data, null, 2), 'utf-8');
};

const generateParticipantTable = (date) => {
  if (!participantData[date]) return '';

  const { participants } = participantData[date];
  const hostelMintMales = participants.filter(p => p.team === 'hostel mint' && p.sex === 'male');
  const hostelMintFemales = participants.filter(p => p.team === 'hostel mint' && p.sex === 'female');
  const teamBeachMales = participants.filter(p => p.team === 'team beach' && p.sex === 'male');
  const teamBeachFemales = participants.filter(p => p.team === 'team beach' && p.sex === 'female');

  const formatParticipants = (list) => list.map((p, index) => `${index + 1}. ${p.name} (${p.drinkingName})`).join('<br>');

  return `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 8px; background-color: #f2f2f2;">Hostel Mint Males</th>
          <th style="border: 1px solid black; padding: 8px; background-color: #f2f2f2;">Hostel Mint Females</th>
          <th style="border: 1px solid black; padding: 8px; background-color: #f2f2f2;">Team Beach Males</th>
          <th style="border: 1px solid black; padding: 8px; background-color: #f2f2f2;">Team Beach Females</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; padding: 8px;">${formatParticipants(hostelMintMales)}</td>
          <td style="border: 1px solid black; padding: 8px;">${formatParticipants(hostelMintFemales)}</td>
          <td style="border: 1px solid black; padding: 8px;">${formatParticipants(teamBeachMales)}</td>
          <td style="border: 1px solid black; padding: 8px;">${formatParticipants(teamBeachFemales)}</td>
        </tr>
      </tbody>
    </table>
  `;
};

app.post('/send-email', (req, res) => {
  const { participants, date, participantEmail, drinkingName } = req.body;

  // Update participant data
  if (!participantData[date]) {
    participantData[date] = { participants: [] };
  }
  participantData[date].participants.push(...participants);
  saveParticipantData(participantData);

  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  const adminMailOptions = {
    from: 'dusan.rula@gmail.com',
    to: 'dusan.rula@gmail.com',
    subject: 'New Watermelon Beach Party Participants',
    html: `
      <h2>New Participant</h2>
      <p>Name: ${participants[participants.length - 1].name}</p>
      <p>Sex: ${participants[participants.length - 1].sex}</p>
      <p>Team: ${participants[participants.length - 1].team}</p>
      <p>Email: ${participants[participants.length - 1].email}</p>
      <p>Drinking Name: ${participants[participants.length - 1].drinkingName}</p>
      <h3>Participants for ${formattedDate}</h3>
      ${generateParticipantTable(date)}
      <h3>Full JSON Data</h3>
      <pre>${JSON.stringify(participantData, null, 2)}</pre>
    `
  };

  const participantMailOptions = {
    from: 'dusan.rula@gmail.com',
    to: participantEmail,
    subject: 'Watermelon Beach Party Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: white; padding: 20px;">
        <img src="cid:partyImage" alt="Watermelon Party" style="width: 100%; max-width: 600px; margin: 0 auto; display: block;" />
        <div style="padding: 20px; text-align: center;">
          <h2 style="font-size: 24px;">Thank you for signing up!</h2>
          <p style="font-size: 18px;">Dear ${drinkingName},</p>
          <p style="font-size: 18px;">Please proceed to the front desk of Hostel Mint or the Hostel Beach, in Split, Croatia, to make the payment. (12 euros for the hostel guests)</p>
          <p style="font-size: 18px;">We will see you at Kasjuni Beach on ${formattedDate} at 17:00 for Beach Outing, or at 19:30 for the game.</p>
          <p style="font-size: 18px;">Please hydrate well before the event.</p>
          <p style="font-size: 18px;">Watermelon Beach Party Crew</p>
        </div>
      </div>
    `,
    attachments: [{
      filename: 'party.jpg',
      path: path.join(__dirname, 'party.jpg'),
      cid: 'partyImage' // same cid value as in the html img src
    }]
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email to admin:', error);
      return res.status(500).send('Error sending email to admin');
    }
    console.log('Email sent to admin:', info.response);

    transporter.sendMail(participantMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending confirmation email:', error);
        return res.status(500).send('Error sending confirmation email');
      }
      console.log('Confirmation email sent:', info.response);
      res.send('Emails sent successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// v 2.0