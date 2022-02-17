const app = require("../../../index");

const login = require("./login");
const signup = require("./signup");

app.post("/auth/login", login);
app.post("/auth/signup", signup);
