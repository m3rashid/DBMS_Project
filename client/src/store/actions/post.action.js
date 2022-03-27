import axios from "axios";
import { toast } from "react-toastify";

import {
  POSTS_LOADING,
  POSTS_LOADED,
  POST_LOADED,
  SERVER_ROOT_URL,
  tokenConfig,
} from "../constants";

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
      dispatch({
        type: POSTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
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
        dispatch({
          type: POST_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        toast.error("Error loading post");
      });
  };
