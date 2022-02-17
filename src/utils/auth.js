const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err || !hash) {
      return new Error();
    }
    return hash;
  });
};

const comparePassword = (password, hash) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return new Error();
    }
    return result;
  });
};

module.exports = { hashPassword, comparePassword };
