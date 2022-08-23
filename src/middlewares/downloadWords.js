const axios = require('axios');
const fs = require('fs');
const request = require('request');

const downloadFileWords = async (req, _res, next) => {
  const dest = '/home/perycles/Documentos/processo seletivo/dictionary-main/back-end-dictionary/src/uploads/englishWords.txt';
  const url = 'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt';

  const result = await axios(url);

  req.file = result;

  next();
};

module.exports = downloadFileWords;
