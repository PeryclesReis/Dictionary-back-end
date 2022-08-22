const userServices = require('../services/userServices');
const { HTTP_OK } = require('../utils');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userResgistering = await userServices.registerUser(name, email, password);

  return res.status(userResgistering.code).json({
    id: userResgistering.newUser.insertedId,
    nome: name,
    token: userResgistering.token,
    message: 'Usuário cadastrado com sucesso!'
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userServices.loginUser(email, password);

  if(result.error) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(result.code).json({
    id: result.usuario._id,
    name: result.usuario.name,
    token: result.token,
    message: 'Usuário logado com sucesso!'
  });
};

const profile = async (req, res) => {
  const { id } = req.body;
  const result = await userServices.getUser(id);

  if(result.error) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(result.code).json({
    name: result.user.name,
    email: result.user.email,
    message: 'Usuário encontrado com sucesso!'
  });
};

const addWord = async (req, res) => {
  const { id } = req.body;
  const { word } = req.params;

  await userServices.addWord(id, word);

  return res.status(HTTP_OK).json({ message: "Palavra favoritada!" });
};

const wordFavorites = async (req, res) => {
  const { id } = req.user;

  const results = await userServices.favoriteWords(id);

  return res.status(HTTP_OK).json({
    results,
    "totalDocs": results.length,
    "page": 2,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": true
  });
}

const removeWord = async (req, res) => {
  const { id } = req.body;
  const { word } = req.params;

  const result = await userServices.removeWord(id, word);

  if (result.error) return res.status(result.code).json({ message: result.message });

  return res.status(HTTP_OK).json({ message: "Palavra desfavoritada!" });
};

module.exports = {
  login,
  registerUser,
  profile,
  addWord,
  wordFavorites,
  removeWord
};
