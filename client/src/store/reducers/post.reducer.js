import {
  POSTS_LOADED,
  POST_LOADED,
  BOOKMARKS_LOADED,
  BOOKMARKS_LOADING,
  POSTS_LOADING,
  ADD_LIKE,
  REMOVE_LIKE,
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

    case ADD_LIKE:
      const allPosts = Object.values(state.posts).map((post) =>
          post.postID === action.payload.postID
              ? { ...post, isLiked: true, likes: post.likes + 1 }
              : post
      );
      return { ...state, allPosts };

    case REMOVE_LIKE:
      const posts = Object.values(state.posts).map((post) =>
        post.postID === action.payload.postID
          ? { ...post, isLiked: false, likes: post.likes - 1 }
          : post
      );
      return { ...state, posts };

    default:
      return state;
  }
};

export default postReducer;
