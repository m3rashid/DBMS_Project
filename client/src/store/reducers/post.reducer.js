import {
  // ADD_POST_SUCCESS,
  // ADD_POST_FAIL,
  // DELETE_POST_SUCCESS,
  // DELETE_POST_FAIL,
  // POSTS_LOADING,
  POSTS_LOADED,
  POST_LOADED,
  BOOKMARKS_LOADED,
} from "../constants";

const initialState = {
  posts: {},
  post: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        ...state,
        posts: {
          ...action.payload.posts,
        },
      };

    case POST_LOADED:
      return {
        ...state,
        post: {
          ...action.payload.post,
        },
      };

    case BOOKMARKS_LOADED:
      return {
        ...state,
        bookmarks: {
          ...action.payload.bookmarks,
        },
      };
    default:
      return state;
  }
};

export default postReducer;
