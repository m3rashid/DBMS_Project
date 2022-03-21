import {
  // ADD_POST_SUCCESS,
  // ADD_POST_FAIL,
  // DELETE_POST_SUCCESS,
  // DELETE_POST_FAIL,
  // POSTS_LOADING,
  // SERVER_ROOT_URL,
  POSTS_LOADED,
} from "../constants/post";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
