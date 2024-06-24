const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dusan.rula@gmail.com', // replace with your email
    pass: 'fbppviagpecfmlke' // replace with your email password or an app-specific password
  }
});


const formatParticipantsList = (participants) => {
  return participants.map((participant, index) => `
    ${index + 1}. Name: ${participant.name}
       Sex: ${participant.sex}
       Drinking Name: ${participant.drinkingName}
       Email: ${participant.email}
  `).join('\n');
};

const sendEmail = ({ participants, date }) => {
  const newParticipant = participants[participants.length - 1];
  const emailContent = `
    New Participant Details:
    Name: ${newParticipant.name}
    Sex: ${newParticipant.sex}
    Drinking Name: ${newParticipant.drinkingName}
    Email: ${newParticipant.email}

    All Participants for ${date}:
    ${formatParticipantsList(participants)}
  `;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'dusan.rula@gmail.com',
    subject: 'New Participant Details',
    text: emailContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendEmail };
