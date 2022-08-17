const axios = require('axios');

const words = async () => {
  const { data } = await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res)
    .catch(err => console.log(err.message));
  return data;
}

module.exports = {
  words
};
