import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaKey, FaLock } from "react-icons/fa";

import Input from "./atoms/input";
import Button from "./atoms/Button";

import { AuthWrapper } from "./authWrapper";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    state: { credentials },
    handleChange,
    toggleAdmin,
    handleLogin,
  } = useLogin();

  return (
    <AuthWrapper>
      <Input
        name="username"
        type="text"
        Icon={<FaUser />}
        placeholder="Enter username"
        value={credentials.username}
        setValue={handleChange}
      />
      <Input
        name="password"
        Icon={<FaKey />}
        placeholder="Enter password"
        type="password"
        value={credentials.password}
        setValue={handleChange}
      />
      <div className="flex items-center justify-center gap-2 p-2 rounded-lg dark:text-gray-200">
        <label className="text-lg" htmlFor="isAdmin">
          Are you an Admin ?
        </label>
        <input
          type="checkbox"
          name="isAdmin"
          id="isAdmin"
          className="w-6 h-6 rounded-3xl"
          checked={credentials.isAdmin}
          onChange={toggleAdmin}
        />
      </div>
      <Button Icon={<FaLock />} label="Login" onClick={handleLogin} />
      <div className="text-center dark:text-gray-200 mt-3">
        Don't have an account?
        <Link to="/signup">
          <b> Signup</b>
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default Login;
