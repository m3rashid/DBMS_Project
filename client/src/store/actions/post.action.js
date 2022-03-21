import axios from "axios";
import { toast } from "react-toastify";

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  // DELETE_POST_SUCCESS,
  // DELETE_POST_FAIL,
  POSTS_LOADING,
  POSTS_LOADED,
  POST_LOADED,
} from "../constants/post";
import { SERVER_ROOT_URL } from "../constants/config";

import { clearErrors, returnErrors } from "./error.action";
import { tokenConfig } from "../constants/config";

export const postsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

export const getPosts = () => (dispatch, getState) => {
  dispatch(postsLoading());
  axios
    .get(`${SERVER_ROOT_URL}/post/all`, tokenConfig(getState))
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: POSTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      toast.error("Error loading posts");
    });
};

export const getSinglePost =
  ({ postId }) =>
  (dispatch, getState) => {
    dispatch(postsLoading());
    const body = JSON.stringify({ postId });
    axios
      .post(`${SERVER_ROOT_URL}/post/one`, body, tokenConfig(getState))
      .then((res) => {
        dispatch(clearErrors());
        dispatch({
          type: POST_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        toast.error("Error loading post");
      });
  };

export const addPost =
  ({ title, body, topicId }) =>
  (dispatch, getState) => {
    dispatch(postsLoading());
    axios
      .post(
        `${SERVER_ROOT_URL}/post/add`,
        { title, body, topicId },
        tokenConfig(getState)
      )
      .then((res) => {
        console.log(res.data);
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
