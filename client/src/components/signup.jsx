import React from "react";
import { Link } from "react-router-dom";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

import Input from "./atoms/input";

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
      <button
        className="bg-blue-300 text-gray-200 p-2 rounded-md text-xl font-semibold"
        onClick={handleSubmit}
      >
        Signup
      </button>
      <div className="flex items-center justify-end">
        <Link to="/login">
          <p className="text-lg hover:bg-blue-500 p-2 px-6 rounded-md">
            Login here
          </p>
        </Link>
      </div>
    </>
  );
};

export default Signup;
