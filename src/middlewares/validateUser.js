const Joi = require('joi');

const validateUser = (body) => (
  Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    senha: Joi.string().required(),
  }).validate(body)
);

module.exports = {
  validateUser
};