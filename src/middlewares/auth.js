const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return res.send(400);
  }
};

const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validateAsync({ ...req.body });
    next();
  } catch (err) {
    return res.send(400);
  }
};

module.exports = { validateLogin, validateSignup };
