const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const tokenSchema = Joi.object({
  otp: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  loginSchema,
  tokenSchema,
};
