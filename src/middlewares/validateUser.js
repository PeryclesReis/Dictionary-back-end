const Joi = require('joi');
const userModel = require('../models/userModel');
const {
  HTTP_BAD_REQUEST,
} = require('../utils');

const validateUser = async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return {
      error: true,
      code: HTTP_BAD_REQUEST,
      message: 'Dados incorretos!',
    };
  }

  const { name, email } = req.body;

  const userAlreadyRegister = await userModel.userSeach(name, email);
  if (userAlreadyRegister) {
    return {
      error: {
        code: HTTP_BAD_REQUEST,
        message: 'Usuário já existe!',
      }
    };
  }
  next();
}

module.exports = validateUser;
