const express = require("express");
const { INT24 } = require("mysql/lib/protocol/constants/types");
const router = express.Router();

import { issueJWT } from "../utils/jwt";
const { validateLogin, validateSignup } = require("../middlewares/auth");

router.post("/signup", validateSignup, (req, res) => {
  const { name, userame, password, confirmPassword } = req.body;
  try {
  } catch (err) {
    res.send(500);
  }
  res.json({ name, userame, email, password, confirmPassword });
});

router.post("/login", validateLogin, (req, res) => {
  const { username, password } = req.body;
  try {
    // authenticate from db here
  } catch (err) {
    res.send(500);
  }
  res.send(401);
});

module.exports = router;
