const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD
  }
});

module.exports = transporter;
