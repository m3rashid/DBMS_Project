const { comparePassword } = require("../utils/auth");
const pool = require("../utils/database");

const login = async (username, password) => {
  pool.getConnection((error, connection) => {
    if (error) throw new Error(error);

    // make a join here instead of 2 queries
    connection.query(
      `select * from User where username = "${username}"`,
      (err, result) => {
        if (err) throw new Error(err);

        const user = result[0];
        if (!user) throw new Error("User not found");

        const isValid = comparePassword(password, user.password);
        if (!isValid) throw new Error("Invalid Credentials");

        connection.query(
          `select * from Avatar where avatarID = "${user.avatarID}"`,
          (err2, result2) => {
            if (err2) throw new Error(err2);

            connection.release();
            const avatar = result2[0];
            return { user, avatar };
          }
        );
      }
    );
  });
};

module.exports = login;
