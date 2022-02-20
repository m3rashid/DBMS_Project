import React from "react";
import { Link } from "react-router-dom";

import Input from "./atoms/input";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {};
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Input
        name="username"
        type="text"
        Icon={faUser}
        placeholder="Enter username"
        value={credentials.username}
        setValue={handleChange}
      />
      <Input
        name="password"
        Icon={faKey}
        placeholder="Enter password"
        type="password"
        value={credentials.password}
        setValue={handleChange}
      />
      <button
        className="bg-blue-500 text-gray-200 p-2 rounded-md text-xl font-semibold"
        onClick={handleLogin}
      >
        Login
      </button>
      <div className="text-center dark:text-gray-200 mt-3">
        Don't have an account?{" "}
        <Link to="/signup">
          <b>Signup</b>
        </Link>
      </div>
    </>
  );
};

export default Login;
