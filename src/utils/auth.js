const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    return new Error();
  }
};

const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (err) {
    return new Error();
  }
};

module.exports = { hashPassword, comparePassword };
