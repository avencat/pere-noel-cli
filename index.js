require('dotenv').config();

const users = require('./users');
const randomizeGiverAndReceiver = require('./random');
const sendEmail = require('./send-email');

const MAX_RETRY = process.env.MAX_RETRY || 5;

function getRandomGiverReceiverMap(tryCount = 0) {
  try {
    return randomizeGiverAndReceiver(users);
  } catch (error) {
    console.error(error);

    if (tryCount >= MAX_RETRY) {
      throw error;
    } else {
      return getRandomGiverReceiverMap(tryCount + 1);
    }
  }
}

async function sendAllEmails(map, iteration = 0) {
  const match = map[iteration];

  try {
    await sendEmail(users[match.giver], users[match.receiver]);
  } catch (e) {
    console.error(e);
  } finally {
    if (iteration + 1 < map.length) {
      setTimeout(sendAllEmails, (iteration + 1) * 100, map, iteration + 1);
    }
  }
}

function app() {
  const map = getRandomGiverReceiverMap();

  sendAllEmails(map).then(() => {
    console.log(`Sent ${map.length} messages.`);
  });
}

app();
