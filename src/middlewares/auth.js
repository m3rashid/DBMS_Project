const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(""),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().min(1).max(6).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
});

const adminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
});

const validateLogin = async (req, res, next) => {
  await loginSchema.validateAsync({ ...req.body });
  next();
};

const validateSignup = async (req, res, next) => {
  await signupSchema.validateAsync({ ...req.body });
  next();
};

const validateAdminLogin = async (req, res, next) => {
  await adminLoginSchema.validateAsync({ ...req.body });
  next();
};

module.exports = {
  validateLogin,
  validateSignup,
  validateAdminLogin,
};
