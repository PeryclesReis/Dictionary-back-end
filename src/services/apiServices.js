const apiExternalModel = require('../models/apiExternal');

const words = async (word) => {
  const response = await apiExternalModel.words(word);
  return response.data;
};

const dictionary = async (dicitionary) => {
  const data = await apiExternalModel.wordsList();
  if (data && data.length === 0) {
    const result = dicitionary.split('\n');
    await apiExternalModel.insertWordsList(result);
    return result;
  }

  return data[0].words;
};

module.exports = {
  words,
  dictionary
};
