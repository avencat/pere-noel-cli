function NoPossibleMatchesLeftException(user, exclusions, actualMatches, leftUsers) {
  this.user = user;
  this.exclusions = exclusions;
  this.actualMatches = actualMatches;
  this.leftUsers = leftUsers;
  this.name = 'NoPossibleMatchesLeft';
  this.message = `No possible matches left for ${user}.`;
  this.toString = () => this.message;
}

function randomizeGiverAndReceiver(users) {
  let usersSlug = Object.keys(users);

  const usersArray = Object.values(users).sort((a, b) => {
    if (!a || !a.exclusions || !Array.isArray(a.exclusions)) {
      return 1;
    } else if (!b || !b.exclusions || !Array.isArray(b.exclusions)) {
      return -1;
    }

    if (a.exclusions.length < b.exclusions.length) {
      return 1;
    } else if (a.exclusions.length > b.exclusions.length) {
      return -1;
    }

    return 0;
  });

  const results = [];

  usersArray.forEach(user => {
    const possibleMatches = usersSlug.filter(slug => (
      slug !== user.slug
      && (
        !user.exclusions
        || !Array.isArray(user.exclusions)
        || !user.exclusions.includes(slug)
      )
    ));

    if (!possibleMatches.length) {
      throw new NoPossibleMatchesLeftException(user.slug, user.exclusions, results, usersSlug);
    }

    const randomNumber = Math.ceil(Math.random() * possibleMatches.length) - 1;

    results.push({ giver: user.slug, receiver: users[possibleMatches[randomNumber]].slug });
    usersSlug = usersSlug.filter(slug => slug !== possibleMatches[randomNumber]);
  });

  return results;
}

module.exports = randomizeGiverAndReceiver;
