import axios from "axios";
import { toast } from "react-toastify";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD,
  // RESET_PASSWORD_FAIL,
  AUTH_ERROR,
  // RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  USER_LOADING,
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

export const forgotPassword = ({ username, email }) => ({
  type: FORGOT_PASSWORD,
  payload: { username, email },
});

export const loadUser = () => (dispatch, getState) => {
  dispatch(userLoading());
  axios
    .get(`${SERVER_ROOT_URL}/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      toast.success("Hello User");
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
      toast.error("Error in loading user");
    });
};

export const login =
  ({ username, password }) =>
  (dispatch) => {
    dispatch(userLoading());
    const body = JSON.stringify({ username, password });
    axios
      .post(`${SERVER_ROOT_URL}/auth/login`, body, configContentType)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(clearErrors);
        toast.success("Successfully logged in");
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        // make it to show errors
        toast.error("Error in logging in");
      });
  };
