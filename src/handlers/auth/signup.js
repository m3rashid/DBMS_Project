const Joi = require("joi");

const signup = (req, res) => {
  const { name, userame, password, confirmPassword } = req.body;
  res.json({ name, userame, password, confirmPassword });
};

module.exports = signup;
