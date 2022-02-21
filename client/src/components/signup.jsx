import React from "react";
import { Link } from "react-router-dom";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";

import Input from "./atoms/input";
import Button from "./atoms/Button";

const Signup = () => {
  const [credentials, setCredentials] = React.useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <>
      <Input
        name="name"
        type="text"
        Icon={faUser}
        placeholder="Enter Name"
        value={credentials.name}
        setValue={handleChange}
      />
      <Input
        name=""
        type="text"
        Icon={faUser}
        placeholder="Enter username"
        value={credentials.username}
        setValue={handleChange}
      />
      <Input
        name=""
        Icon={faKey}
        placeholder="Enter password"
        type="password"
        value={credentials.password}
        setValue={handleChange}
      />
      <Input
        name=""
        Icon={faKey}
        placeholder="Confirm password"
        type="password"
        value={credentials.confirmPassword}
        setValue={handleChange}
      />
      <Button Icon={faLock} label="Signup" onClick={handleSubmit} />
      <div className="text-center dark:text-gray-200 mt-3">
        Already have an account?
        <Link to="/login">
          <b> Login</b>
        </Link>
      </div>
    </>
  );
};

export default Signup;
