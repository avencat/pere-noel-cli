const mailer = require('./mailer');
const formatTextMessage = require('./text-formatters');
const formatHtmlMessage = require('./html-formatters');

const MAX_SEND_EMAIL_RETRY = process.env.MAX_SEND_EMAIL_RETRY || 5;

function SendEmailErrorException(sender, receiver, error) {
  this.sender = sender;
  this.receiver = receiver;
  this.error = error;
  this.name = 'SendEmailError';
  this.message = `Max send email retry reached for ${sender.firstName} to ${receiver.firstName}.`;
  this.toString = () => this.message;
}

async function sendEmail(sender, receiver, tryCount = 0) {
  try {
    const info = await mailer.sendMail({
      from: `"${process.env.MAILER_SENDER}" <${process.env.MAILER_EMAIL}>`,
      to: `"${sender.firstName}, ${sender.sex ? 'apprentie lutine' : 'apprenti lutin'}" <${sender.email}>`,
      subject: `🎅 ${sender.firstName}, à qui dois-tu offrir un 🎁 de Noël ? 🎄🤶`,
      text: formatTextMessage(sender, receiver),
      html: formatHtmlMessage(sender, receiver),
    });

    if (tryCount) {
      console.log(info);
    }
  } catch (e) {
    console.error(e);

    if (tryCount < MAX_SEND_EMAIL_RETRY) {
      setTimeout(sendEmail, (tryCount + 1) * 1000, sender, receiver, tryCount + 1);
    } else {
      throw new SendEmailErrorException(sender, receiver);
    }
  }
}

module.exports = sendEmail;
