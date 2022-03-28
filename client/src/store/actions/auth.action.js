import axios from "axios";
import { toast } from "react-toastify";

import {
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD,
  // RESET_PASSWORD_FAIL,
  AUTH_ERROR,
  // RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  ADMIN_LOADING,
  ADMIN_LOADED,
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

export const adminLoading = () => ({
  type: ADMIN_LOADING,
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

export const loadUser = () => async (dispatch) => {
  try {
    const lastLogin = localStorage.getItem("lastLogin");
    if (!lastLogin || lastLogin === "user") {
      dispatch(userLoading());
      const res = await axios.get(`${SERVER_ROOT_URL}/auth`, tokenConfig());
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      toast.success("Hello " + res.data.user.firstName + ". Welcome back");
      toast.info("See what all happened in your absence");
    } else {
      dispatch(adminLoading());
      const res = await axios.get(
        `${SERVER_ROOT_URL}/auth/admin`,
        tokenConfig()
      );
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    toast.info("Could not find your logged in session");
  }
};

export const getTopics = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${SERVER_ROOT_URL}/admin/topics`,
      tokenConfig()
    );
    dispatch({
      type: TOPIC_GOT,
      payload: res.data.topics,
    });
  } catch (err) {
    dispatch({
      type: TOPIC_GOT_FAIL,
    });
  }
};
