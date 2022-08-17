const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const validaUser = require('../middlewares/validateUser');
const JWT_SECRET = process.env.JWT_SECRET;

const existsUser = async (body) => {
  const { name, email } = body;
  const { error } = validaUser.validateUser(body);

  if (error) {
    return {
      error: {
        code: HTTP_BAD_REQUEST,
        message: 'Dados incorretos!',
      }
    };
  }

  const userAlreadyRegister = await userModel.userSeach(name, email);
  if (userAlreadyRegister) {
    return {
      error: {
        code: HTTP_BAD_REQUEST,
        message: 'Usuário já existe!',
      }
    };
  }
  return '';
}

const registerUser = async (name, email, password) => {
  const newUser = await userModel.register(name, email, password);
  return {
    code: HTTP_CREATED,
    newUser
  };
}

const createToken = (email, password) => {
  const jwtConfig = { expiresIn: '7d' };
  const payload = { email, password };

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const loginUser = async (email, password) => {
  const userAlreadyRegister = await userModel.loginSearch(email);
  if ((userAlreadyRegister && userAlreadyRegister.email) !== email || userAlreadyRegister.password !== password) {
    return {
      error: {
        code: HTTP_UNAUTHORIZED,
        message: 'Usuário ou password incorretos!',
      }
    };
  }

  const { password: _, ...usuario } = userAlreadyRegister;

  const token = createToken(email, password);
  return {
    code: HTTP_OK,
    token,
    usuario
  };
};

module.exports = {
  registerUser,
  loginUser,
  existsUser
};
