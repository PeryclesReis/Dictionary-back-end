const con = require('./connections');
const axios = require('axios');

const words = async (word) => {
  const data = await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res)
    .catch(err => console.log(err.message));
  return data;
}

const wordsList = async () => {
  const db = await con();
  const words = await db
    .collection('dictionary').find().toArray();
  return words;
};

const insertWordsList = async (words) => {
  const db = await con();
  const dictionary = await db
    .collection('dictionary').insertOne({ words });
  return dictionary;
};

module.exports =  {
  words,
  insertWordsList,
  wordsList
};
