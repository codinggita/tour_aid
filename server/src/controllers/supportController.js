const nodemailer = require('nodemailer');

const submitSupportRequest = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.SUPPORT_EMAIL || 'support@touraid.com',
      subject: `New Support Request from ${name}`,
      text: `You have received a new support request.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('--- MOCK EMAIL LOG (Configure SMTP_USER and SMTP_PASS in .env to send real emails) ---');
      console.log(`To: ${mailOptions.to}`);
      console.log(`From: ${mailOptions.from}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body:\n${mailOptions.text}`);
      console.log('--------------------------------------------------------------------------------------');
      
      return res.status(200).json({ message: 'Your message has been sent' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Your message has been sent' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
};

module.exports = {
  submitSupportRequest,
};
