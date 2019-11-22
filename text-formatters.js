const rules = process.env.RULES ? process.env.RULES.split('|') : [];

function formatTextMessageRules() {
  let rulesFormatted = '';

  if (!rules.length) {
    return '';
  }

  rules.forEach(rule => {
    rulesFormatted = `${rulesFormatted}- ${rule}\n`;
  });
  return (
    `
Sinon, voici les ${rules.length} règles à suivre :
${rulesFormatted}`
  );
}

function formatTextMessage(sender, receiver) {
  return `
Ho ho ho ! Salut ${sender.sex ? 'petite lutine 🧝‍♀️' : 'petit lutin 🧝‍♂️‍'}️ ${sender.firstName}, c'est 🎅 !

Pour ce Noël 🎄, j'ai décidé de te confier la lourde ${sender.sex ? '🏋️‍♀️' : '🏋️‍♂️'} responsabilité d'offrir un cadeau à ${receiver.firstName} ${receiver.lastName} !

${receiver.biography}

Pour la conception, ne t'inquiète pas, j'ai bien conscience que c'est ta première journée en tant que stagiaire et que tu ne seras sûrement pas le meilleur artisan d'ici Noël ! ☺️ Néanmoins, si tu arrives à confectionner quelque chose, c'est tout à ton honneur ! 😏
${formatTextMessageRules()}

Joyeux Noël ${sender.firstName} !!! 🎅🎅🎅`;
}

module.exports = formatTextMessage;
