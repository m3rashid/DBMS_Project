import axios from "axios";
import { toast } from "react-toastify";

import { POSTS_LOADING, POSTS_LOADED, POST_LOADED } from "../constants/post";
import { SERVER_ROOT_URL } from "../constants/config";

import { clearErrors, returnErrors } from "./error.action";
import { tokenConfig } from "../constants/config";

export const postsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

export const getPosts = () => (dispatch) => {
  dispatch(postsLoading());
  axios
    .get(`${SERVER_ROOT_URL}/post/all`, tokenConfig())
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
  (dispatch) => {
    dispatch(postsLoading());
    const body = JSON.stringify({ postId });
    axios
      .post(`${SERVER_ROOT_URL}/post/one`, body, tokenConfig())
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
