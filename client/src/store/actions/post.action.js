import axios from "axios";
import { toast } from "react-toastify";

import {
  POSTS_LOADING,
  POSTS_LOADED,
  POST_LOADED,
  BOOKMARKS_LOADING,
  BOOKMARKS_LOADED,
  BOOKMARK_ADDED,
  BOOKMARK_DELETED,
  SERVER_ROOT_URL,
  tokenConfig,
} from "../constants";

export const postsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
export const bookmarksLoading = () => {
  return {
    type: BOOKMARKS_LOADING,
  };
};

export const getPosts =
  ({ userID }) =>
  (dispatch) => {
    dispatch(postsLoading());
    const body = JSON.stringify({ userID });
    axios
      .post(`${SERVER_ROOT_URL}/post/all`, body, tokenConfig())
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

export const getAllBookmarks =
  ({ userID }) =>
  (dispatch) => {
    dispatch(bookmarksLoading());
    const body = JSON.stringify({ userID });
    axios
      .post(`${SERVER_ROOT_URL}/bookmark/all`, body, tokenConfig())
      .then((res) => {
        dispatch({
          type: BOOKMARKS_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        toast.error("Error loading bookmarks");
      });
  };

export const addBookmark = (userID, postID) => (dispatch) => {
  dispatch(bookmarksLoading());
  const body = JSON.stringify({ userID, postID });
  axios
    .post(`${SERVER_ROOT_URL}/bookmark/add`, body, tokenConfig())
    .then((res) => {
      dispatch({
        type: BOOKMARK_ADDED,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("Error adding bookmark");
    });
};

export const removeBookmark = (userID, postID) => (dispatch) => {
  dispatch(bookmarksLoading());
  const body = JSON.stringify({ userID, postID });
  axios
    .post(`${SERVER_ROOT_URL}/bookmark/remove`, body, tokenConfig())
    .then((res) => {
      dispatch({
        type: BOOKMARK_DELETED,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("Error removing bookmark");
    });
};

export const addLike = (userID, postID) => (dispatch) => {
  dispatch(postsLoading());
  const body = JSON.stringify({ userID, postID });
  axios
    .post(`${SERVER_ROOT_URL}/like/add`, body, tokenConfig())
    .then((res) => {
      dispatch({
        type: POST_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("Error adding like");
    });
};

export const removeLike = (userID, postID) => (dispatch) => {
  dispatch(postsLoading());
  const body = JSON.stringify({ userID, postID });
  axios
    .post(`${SERVER_ROOT_URL}/like/remove`, body, tokenConfig())
    .then((res) => {
      dispatch({
        type: POST_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("Error removing like");
    });
};
