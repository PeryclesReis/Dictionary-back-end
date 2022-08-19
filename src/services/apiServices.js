const apiExternalModel = require('../models/apiExternal');
const { readFile } = require('fs').promises;

const words = async (word) => {
  const response = await apiExternalModel.words(word);
  return response.data;
};

const dictionary = async () => {
  const nomeDoArquivo = '/home/perycles/Documentos/processo seletivo/dictionary-main/back-end-dictionary/src/data/englishWords.txt';
  let words;

  const data = await apiExternalModel.wordsList();

  if (data && data.length === 0) {
    const result = await readFile(nomeDoArquivo, 'utf8', (err, data) => {
      if (err) {
        throw new Error(err);
      };

      return data;
    });

    words = result.split('\n');
    await apiExternalModel.insertWordsList(words);
    return words;
  }

  return data[0].words;
};

module.exports = {
  words,
  dictionary
};
