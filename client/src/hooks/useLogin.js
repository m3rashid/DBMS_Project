import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLogin, login } from "../store/actions/auth.action";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  const handleLogin = () => {
    if (credentials.isAdmin) {
      dispatch(adminLogin(credentials));
    } else {
      dispatch(login(credentials));
    }
    navigate("/home");
    setCredentials({
      username: "",
      password: "",
      isAdmin: false,
    });
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAdmin = () => {
    setCredentials((prev) => ({
      ...prev,
      isAdmin: !credentials.isAdmin,
    }));
  };

  return {
    state: { credentials },
    handleChange,
    toggleAdmin,
    handleLogin,
  };
};

export default useLogin;
