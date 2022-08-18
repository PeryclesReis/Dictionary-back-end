const apiExternalModel = require('../models/apiExternal');

const words = async (word) => {
  const response = await apiExternalModel.words(word);
  return response.data;
};

module.exports = {
  words
};
