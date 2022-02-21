import React from "react";
import { Link } from "react-router-dom";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";

import Input from "./atoms/input";
import Button from "./atoms/Button";

const Login = () => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    admin: false,
  });
  const handleLogin = () => {};
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const toggleAdmin = () => {
    setCredentials((prev) => ({
      ...prev,
      admin: !credentials.admin,
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
      <div className="flex items-center justify-center gap-2 p-2 rounded-lg dark:text-gray-200">
        <label className="text-lg" htmlFor="admin">
          Are you an Admin ?
        </label>
        <input
          type="checkbox"
          name="admin"
          id="admin"
          className="w-6 h-6 rounded-3xl"
          checked={credentials.admin}
          onChange={toggleAdmin}
        />
      </div>
      <Button Icon={faLock} label="Login" onClick={handleLogin} />
      <div className="text-center dark:text-gray-200 mt-3">
        Don't have an account?
        <Link to="/signup">
          <b> Signup</b>
        </Link>
      </div>
    </>
  );
};

export default Login;
