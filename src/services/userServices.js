const userModel = require('../models/userModel');
// const favoriteModel = require('../models/favoriteWord');
const createToken = require('../auth');
const {
  HTTP_UNAUTHORIZED,
  HTTP_CREATED,
  HTTP_OK,
  HTTP_NOT_FOUND
} = require('../utils');

const registerUser = async (name, email, password) => {
  const newUser = await userModel.register(name, email, password);
  const token = await createToken.generateToken(name, email, newUser.insertedId);

  return {
    code: HTTP_CREATED,
    token,
    newUser
  };
}

const loginUser = async (email, password) => {
  const userAlreadyRegister = await userModel.loginSearch(email);
  if ((userAlreadyRegister && userAlreadyRegister.email) !== email || userAlreadyRegister.password !== password) {
    return {
      error: true,
      code: HTTP_UNAUTHORIZED,
      message: 'Usuário ou password incorretos!',
    };
  }

  const { password: _, ...usuario } = userAlreadyRegister;

  const token = createToken.generateToken(usuario.name, usuario.email, usuario._id);

  return {
    code: HTTP_OK,
    token,
    usuario
  };
};

const getUser = async (id) => {
  const profile = await userModel.userSeachById(id);

  if (!profile) {
    return {
      error: true,
      code: HTTP_NOT_FOUND,
      message: 'Usuário não encontrado!',
    };
  }

  return {
    code: HTTP_OK,
    user: profile
  };
};

const addWord = async (id, word) => {
  const { favorites } = await userModel.userSeachById(id);
  const date = "12/12/2022";

  if (!favorites) {
    return userModel.createFavorite(id, date, word);
  }

  const existWord = favorites.some((elem) => elem.word === word);

  if (favorites && !existWord) {
    return userModel.addWord(id, date, word);
  }

  return;
};

const favoriteWords = async (id) => {
  const result = await userModel.userSeachById(id);
  return result.favorites;
};

const removeWord = async (id, word) => {
  const { favorites } = await userModel.userSeachById(id);

  if (!favorites) {
    return {
      error: true,
      code: HTTP_NOT_FOUND,
      message: 'Não possui palavra favorita ou já foi desfavoritada!',
    };
  }

  const existWord = favorites.some((elem) => elem.word === word);

  if (favorites && existWord) {
    return userModel.removeWord(id, word);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  addWord,
  favoriteWords,
  removeWord
};
