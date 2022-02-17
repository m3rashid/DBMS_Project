const Joi = require("joi");

const login = (req, res) => {
  const { username, password } = req.body;
  res.json({ username, password });
};

module.exports = login;
