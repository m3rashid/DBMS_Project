import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../store/actions/auth.action";

const useSignup = () => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
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

  return {
    state: {
      theme,
      credentials,
      data,
    },
    handleChange,
    changeGender,
    handleSubmit,
  };
};

export default useSignup;
