const sgMail = require('@sendgrid/mail');
const faunadb = require('faunadb');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  console.log('Event:', event);
  const { name, email, drinkingName } = JSON.parse(event.body);

  console.log('Parsed data:', { name, email, drinkingName });

  // Save participant data to FaunaDB
  try {
    const result = await client.query(
      q.Create(
        q.Collection('participants'),
        { data: { name, email, drinkingName } }
      )
    );
    console.log('FaunaDB result:', result);
  } catch (error) {
    console.error('FaunaDB error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save participant', details: error.toString() })
    };
  }

  const signupTime = new Date().toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short' });

  const adminMailOptions = {
    to: 'dusan.rula@gmail.com',
    from: 'dusan.rula@gmail.com', // Use the email address or domain you verified with SendGrid
    subject: 'New Watermelon Beach Party Participant Signup',
    html: `
      <h2>New Participant Signup</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Drinking Name:</strong> ${drinkingName}</p>
      <p><strong>Signup Time:</strong> ${signupTime}</p>
    `
  };

  const participantMailOptions = {
    to: email,
    from: 'dusan.rula@gmail.com', // Use the email address or domain you verified with SendGrid
    subject: 'Watermelon Beach Party Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: white; padding: 20px;">
        <img src="cid:partyImage" alt="Watermelon Party" style="width: 100%; max-width: 600px; margin: 0 auto; display: block;" />
        <div style="padding: 20px; text-align: center;">
          <h2 style="font-size: 24px;">Thank you for signing up!</h2>
          <p style="font-size: 18px;">Dear ${drinkingName},</p>
          <p style="font-size: 18px;">Please proceed to the front desk of Hostel Mint or the Hostel Beach to pay for the event. The price is 12 euros per person for hostel guests. Please show them this screen, ${drinkingName}, ${email}, ${name}. We'll send you the confirmation email after the payment.</p>
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

  try {
    const adminResult = await sgMail.send(adminMailOptions);
    console.log('Admin email sent:', adminResult);

    const participantResult = await sgMail.send(participantMailOptions);
    console.log('Participant email sent:', participantResult);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.toString() })
    };
  }
};
