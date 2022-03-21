import axios from "axios";

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  POSTS_LOADING,
  SERVER_ROOT_URL,
  POSTS_LOADED,
} from "../constants/post";
import { clearErrors, returnErrors } from "./error.action";
import { tokenConfig } from "../constants/config";
import { toast } from "react-toastify";

export const postsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

export const getPosts = () => (dispatch, getState) => {
  dispatch(postsLoading());
  axios
    .get(`${SERVER_ROOT_URL}/posts`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: POSTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPost =
  ({ title, content }) =>
  (dispatch, getState) => {
    dispatch(postsLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/posts`,
        { title, content },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: ADD_POST_SUCCESS,
          payload: res.data,
        });
        toast.success("Post added successfully");
      })
      .catch((err) => {
        dispatch({
          type: ADD_POST_FAIL,
        });
        toast.error("Error in adding post");
      });
  };
