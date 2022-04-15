import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  REGISTER_SUCCESS,
  configContentType,
  SERVER_ROOT_URL,
} from "../store/constants";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = React.useState(initialState);

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

  const handleSubmit = async () => {
    setCredentials(initialState);
    const body = JSON.stringify(credentials);
    const registerToast = toast.loading("Signup in progress...");
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/auth/signup`,
        body,
        configContentType
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(registerToast, {
          render: "Successfully created your account",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        toast.info("Please login to continue");
        navigate("/login", { replace: true });
      }, 0);
    } catch (err) {
      toast.update(registerToast, {
        render: "Error in register",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
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
