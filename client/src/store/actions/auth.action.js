import axios from "axios";
import { toast } from "react-toastify";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD,
  // RESET_PASSWORD_FAIL,
  AUTH_ERROR,
  // RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  AVATAR_CHANGE,
  TOPIC_GOT,
  TOPIC_GOT_FAIL,
} from "../constants/auth";

import {
  configContentType,
  tokenConfig,
  SERVER_ROOT_URL,
} from "../constants/config";
import { clearErrors, returnErrors } from "./error.action";

export const logout = () => {
  toast.success("Successfully logout");
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const userLoading = () => ({
  type: USER_LOADING,
});

export const changeAvatar = (config) => {
  return {
    type: AVATAR_CHANGE,
    payload: config,
  };
};

export const forgotPassword = ({ username, email }) => ({
  type: FORGOT_PASSWORD,
  payload: { username, email },
});

export const loadUser = () => (dispatch) => {
  dispatch(userLoading());
  axios
    .get(`${SERVER_ROOT_URL}/auth`, tokenConfig())
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      toast.success("Hello " + res.data.user.firstName + ". Welcome back");
      toast.info("See what all happened in your absence");
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      toast.info("Could not find your logged in session");
    });
};

export const login =
  ({ username, password, isAdmin }) =>
  (dispatch) => {
    dispatch(userLoading());
    const body = JSON.stringify({ username, password, isAdmin });
    const loginToast = toast.loading("Logging you in, Please wait...");
    axios
      .post(`${SERVER_ROOT_URL}/auth/login`, body, configContentType)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(clearErrors);
        toast.update(loginToast, {
          render: "Successfully logged in",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        toast.update(loginToast, {
          render: "Error in logging you in",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

export const register =
  ({
    firstName,
    lastName,
    username,
    email,
    gender,
    password,
    confirmPassword,
  }) =>
  (dispatch) => {
    dispatch(userLoading());
    const body = JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      gender,
      password,
      confirmPassword,
    });
    const registerToast = toast.loading("Signup in progress, Please wait...");

    axios
      .post(`${SERVER_ROOT_URL}/auth/signup`, body, configContentType)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(clearErrors);
        toast.update(registerToast, {
          render: "Successfully created your account",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        toast.info("Please login to continue");
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, REGISTER_FAIL)
        );
        dispatch({
          type: REGISTER_FAIL,
        });
        toast.update(registerToast, {
          render: "Error in register",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

export const adminLogin =
  ({ username, password, isAdmin }) =>
  (dispatch) => {
    dispatch(userLoading());
    const loginToast = toast.loading("Logging you in, Please wait...");
    const body = JSON.stringify({ username, password, isAdmin });
    axios
      .post(`${SERVER_ROOT_URL}/auth/adminLogin`, body, configContentType)
      .then((res) => {
        dispatch({
          type: ADMIN_LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(clearErrors);
        toast.update(loginToast, {
          render: "Successfully logged in",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: ADMIN_LOGIN_FAIL,
        });
        toast.update(loginToast, {
          render: "Error in logging yout in",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

export const getTopics = () => (dispatch) => {
  axios
    .get(`${SERVER_ROOT_URL}/admin/topics`, tokenConfig())
    .then((res) => {
      dispatch({
        type: TOPIC_GOT,
        payload: res.data.topics,
      });
    })
    .catch((err) => {
      dispatch({
        type: TOPIC_GOT_FAIL,
      });
    });
};
