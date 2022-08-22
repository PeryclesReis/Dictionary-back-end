const userModel = require('../models/userModel');
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
  const profile = await userModel.userSeach(id);

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

module.exports = {
  registerUser,
  loginUser,
  getUser
};
