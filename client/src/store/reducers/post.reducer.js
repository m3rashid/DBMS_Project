import {
  POSTS_LOADED,
  POST_LOADED,
  BOOKMARKS_LOADED,
  BOOKMARKS_LOADING,
  POSTS_LOADING,
} from "../constants";

const initialState = {
  posts: {},
  post: {},
  bookmarks: {},
  bookmarksLoading: false,
  postsLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        ...state,
        postsLoading: false,
        posts: { ...action.payload.posts },
      };
    case POST_LOADED:
      return {
        ...state,
        postsLoading: false,
        post: { ...action.payload.post },
      };
    case BOOKMARKS_LOADED:
      return {
        ...state,
        bookmarksLoading: false,
        bookmarks: { ...action.payload.bookmarks },
      };
    case BOOKMARKS_LOADING:
      return { ...state, bookmarksLoading: true };
    case POSTS_LOADING:
      return { ...state, postsLoading: true };
    default:
      return state;
  }
};

export default postReducer;
