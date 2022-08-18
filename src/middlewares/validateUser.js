const Joi = require('joi');

const validateUser = (body) => (
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).validate(body)
);

module.exports = {
  validateUser
};