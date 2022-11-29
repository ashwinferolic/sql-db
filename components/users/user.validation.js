const Joi = require("joi");

const registerUserSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  mobileNumber: Joi.string()
    .pattern(new RegExp(/^[7-9][0-9]{9}$/))
    .message("Please enter a valid mobile no")
    .length(10)
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  address: Joi.object().required().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string(),
  mobileNumber: Joi.string()
    .pattern(new RegExp(/^[7-9][0-9]{9}$/))
    .message("Please enter a valid mobile no")
    .length(10),
  password: Joi.string().min(6),
  address: Joi.object().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().required(),
  mobileNumber: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const sendPINSchema = Joi.object({
  email: Joi.string().required(),
});

const verifyPINSchema = Joi.object({
  code: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  sendPINSchema,
  verifyPINSchema,
};
