const rules = process.env.RULES ? process.env.RULES.split('|') : [];

function formatHtmlMessageRules() {
  let rulesFormatted = '';

  if (!rules.length) {
    return '';
  }

  rules.forEach(rule => {
    rulesFormatted = `${rulesFormatted}<li>${rule}</li>`;
  });
  return (
    `
<p>Sinon, voici les ${rules.length} règles à suivre :</p>
<ul>
    ${rulesFormatted}
</ul>`
  );
}

function formatHtmlMessage(sender, receiver) {
  return `
<p>Ho ho ho ! Salut ${sender.sex ? 'petite lutine 🧝‍♀️' : 'petit lutin 🧝‍♂️‍'}️ ${sender.firstName}, c'est 🎅 !</p>

<p>Pour ce Noël 🎄, j'ai décidé de te confier la lourde ${sender.sex ? '🏋️‍♀️' : '🏋️‍♂️'} responsabilité d'offrir un cadeau à <strong>${receiver.firstName} ${receiver.lastName}</strong> !</p>

<p>${receiver.biography.replace(/\n/g, '<br>')}</p>

<p>Pour la conception, ne t'inquiète pas, j'ai bien conscience que c'est ta première journée en tant que stagiaire et que tu ne seras sûrement pas le meilleur artisan d'ici Noël ! ☺️ Néanmoins, si tu arrives à confectionner quelque chose, c'est tout à ton honneur ! 😏</p>
${formatHtmlMessageRules()}

<p><strong>Joyeux Noël ${sender.firstName} !!! 🎅🎅🎅</strong></p>`;
}

module.exports = formatHtmlMessage;
