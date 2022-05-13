import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ADMIN_LOGIN_SUCCESS,
  LOGIN_SUCCESS,
  configContentType,
  SERVER_ROOT_URL,
} from "../store/constants";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  const adminLogin = async () => {
    const body = JSON.stringify(credentials);
    const loginToast = toast.loading("Logging you in...");
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/auth/adminLogin`,
        body,
        configContentType
      );
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data });
      setTimeout(() => {
        toast.update(loginToast, {
          render: "Successfully logged in",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        navigate("/admin", { replace: true });
      }, 0);
    } catch (err) {
      toast.update(loginToast, {
        render: "Error in logging yout in",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const userLogin = async () => {
    const body = JSON.stringify(credentials);
    const loginToast = toast.loading("Logging you in...");
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/auth/login`,
        body,
        configContentType
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      setTimeout(() => {
        toast.update(loginToast, {
          render: `Hey ${res.data.user.firstName}, Good to have you back 😃`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        navigate("/home", { replace: true });
      }, 0);
    } catch (err) {
      toast.update(loginToast, {
        render: "Error in logging you in",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleLogin = (e) => {
    if (!credentials.isAdmin) {
      userLogin();
    } else {
      adminLogin();
    }
    setCredentials({ username: "", password: "", isAdmin: false });
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAdmin = () => {
    setCredentials((prev) => ({ ...prev, isAdmin: !credentials.isAdmin }));
  };

  return {
    state: {
      credentials,
    },
    handleChange,
    toggleAdmin,
    handleLogin,
  };
};

export default useLogin;
