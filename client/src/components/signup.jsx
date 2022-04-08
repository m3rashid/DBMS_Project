import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaKey, FaLock } from "react-icons/fa";
import Select from "react-select";

import Input from "./atoms/input";
import Button from "./atoms/Button";

import { AuthWrapper } from "./authWrapper";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const {
    state: { theme, credentials, data },
    handleChange,
    changeGender,
    handleSubmit,
  } = useSignup();

  return (
    <AuthWrapper>
      <Input
        name="firstName"
        type="text"
        Icon={<FaUser />}
        placeholder="Enter First Name"
        value={credentials.firstName}
        setValue={handleChange}
      />
      <Input
        name="lastName"
        type="text"
        Icon={<FaUser />}
        placeholder="Enter Last Name"
        value={credentials.lastName}
        setValue={handleChange}
      />
      <Input
        name="username"
        type="text"
        Icon={<FaUser />}
        placeholder="Enter username"
        value={credentials.username}
        setValue={handleChange}
      />
      <Input
        name="email"
        type="email"
        Icon={<FaUser />}
        placeholder="Enter email"
        value={credentials.email}
        setValue={handleChange}
      />
      <Select
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            color: theme === "dark" ? "white" : "black",
          }),
          container: (base) => ({
            ...base,
            color: theme === "dark" ? "white" : "black",
          }),
        }}
        classNamePrefix="bg-gray-200 dark:bg-gray-800 outline-none"
        options={data.data}
        name={data.name}
        value={credentials.gender}
        onChange={changeGender}
        placeholder={credentials.gender ? credentials.gender : "Select gender"}
        defaultValue={credentials.gender}
        label="Single Select"
      />
      <Input
        name="password"
        Icon={<FaKey />}
        placeholder="Enter password"
        type="password"
        value={credentials.password}
        setValue={handleChange}
      />
      <Input
        name="confirmPassword"
        Icon={<FaKey />}
        placeholder="Confirm password"
        type="password"
        value={credentials.confirmPassword}
        setValue={handleChange}
      />
      <Button Icon={<FaLock />} label="Signup" onClick={handleSubmit} />
      <div className="text-center dark:text-gray-200 mt-3">
        Already have an account?
        <Link to="/login">
          <b> Login</b>
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
