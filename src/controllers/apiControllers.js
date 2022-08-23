const apiExternalController = require('../services/apiServices');

const words = async (req, res) => {
  const { word } = req.params;
  const response = await apiExternalController.words(word);

  return res.status(200).json({ response });
}

const dictionary = async (req, res) => {
  const { data } = req.file;
  const response = await apiExternalController.dictionary(data);

  return res.status(200).json({ response });
};

module.exports = {
  words,
  dictionary
};
