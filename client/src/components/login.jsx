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
      <div className="flex items-center justify-end">
        <Link to="/signup">
          <p className="text-lg hover:bg-blue-500 p-2 px-6 rounded-md">
            Signup here
          </p>
        </Link>
      </div>
    </>
  );
};

export default Login;
