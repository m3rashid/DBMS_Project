import axios from "axios";
import { toast } from "react-toastify";

import {
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
  tokenConfig,
  SERVER_ROOT_URL,
} from "../constants";

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
