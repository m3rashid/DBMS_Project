const express = require("express");
const router = express.Router();

const Joi = require("joi");

router.post("/signup", (req, res) => {
  const { name, userame, password, confirmPassword } = req.body;
  res.json({ name, userame, password, confirmPassword });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({ username, password });
});

module.exports = router;
