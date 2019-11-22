const glob = require('glob');

function loadUser() {
  const userFiles = glob.sync(`users/*.json`);

  const users = {};

  userFiles.forEach(file => {
    const user = require(`./${file}`);

    if (file !== 'users/example.json') {
      users[user.slug] = user;
    }
  });

  return users;
}

module.exports = loadUser();
