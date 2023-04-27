require('dotenv').config();
const nodemailer = require('nodemailer');
const Mailgun = require('mailgun.js');
const formData = require('form-data');

// ethereal
const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'foster.bogan@ethereal.email',
      pass: 'dtSm1zdDmP756T7VSF',
    },
  });

  let info = await transporter.sendMail({
    from: '"Kareemah" <ajimobikareemah@gmail.com>',
    to: 'bar@example.com',
    subject: 'Hello',
    html: '<h2>Sending Emails with Node.js</h2>',
  });

  res.json(info);
};

// mailgun
const sendEmail = async (req, res) => {
  const mailgun = new Mailgun(formData);

  const client = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
  });

  const msg = {
    from: 'ajimobikareemah@gmail.com',
    to: 'kareemah4netlify@gmail.com',
    subject: 'Mailgun Test',
    text: 'Testing mailgun',
  };

  const response = await client.messages.create(
    process.env.MAILGUN_API_DOMAIN,
    msg
  );
  res.json({ response, msg: 'message sent successfully' });
};

module.exports = sendEmail;
