const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
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
  try {
    await loginSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};

const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};

const validateAdminLogin = async (req, res, next) => {
  try {
    await adminLoginSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  validateLogin,
  validateSignup,
  validateAdminLogin,
};
