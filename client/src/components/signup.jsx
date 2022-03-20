import React from "react";
import { Link } from "react-router-dom";
import { faUser, faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import Input from "./atoms/input";
import Button from "./atoms/Button";
import { useDispatch } from "react-redux";
import { register } from "../store/actions/auth.action";

const Signup = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const data = {
    name: "gender",
    label: "Gender",
    data: [
      { value: "male", label: "male" },
      { value: "female", label: "female" },
      { value: "others", label: "others" },
    ],
  };

  const changeGender = (label, container) => {
    setCredentials((prev) => ({
      ...prev,
      [container.name]: label.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(register(credentials));
  };

  return (
    <>
      <Input
        name="firstName"
        type="text"
        Icon={faUser}
        placeholder="Enter First Name"
        value={credentials.firstName}
        setValue={handleChange}
      />
      <Input
        name="lastName"
        type="text"
        Icon={faUser}
        placeholder="Enter Last Name"
        value={credentials.lastName}
        setValue={handleChange}
      />
      <Input
        name="username"
        type="text"
        Icon={faUser}
        placeholder="Enter username"
        value={credentials.username}
        setValue={handleChange}
      />
      <Input
        name="email"
        type="email"
        Icon={faUser}
        placeholder="Enter email"
        value={credentials.email}
        setValue={handleChange}
      />
      <Select
        options={data.data}
        name={data.name}
        value={credentials.gender}
        onChange={changeGender}
        placeholder={credentials.gender}
        defaultValue={credentials.gender}
        label="Single Select"
      />
      <Input
        name="password"
        Icon={faKey}
        placeholder="Enter password"
        type="password"
        value={credentials.password}
        setValue={handleChange}
      />
      <Input
        name="confirmPassword"
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
