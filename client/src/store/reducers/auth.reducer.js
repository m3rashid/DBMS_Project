import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_POST_SUCCESS,
  DELETE_TOPIC_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  ADMIN_LOADING,
  ADMIN_LOADED,
  TOPIC_GOT,
  TOPIC_GOT_FAIL,
  AVATAR_CHANGE,
  UPDATE_PROFILE,
} from "../constants";

const initialState = {
  isAuthUser: false,
  isAuthAdmin: false,
  token: "",
  isLoading: false,
  user: null,
  avatar: null,
  users: null,
  topics: null,
  posts: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_SUCCESS:
      return { ...state, users: action.payload.users };
    case DELETE_POST_SUCCESS:
      return { ...state, posts: action.payload.posts };
    case DELETE_TOPIC_SUCCESS:
      return { ...state, topics: action.payload.topics };

    case USER_LOADING:
    case ADMIN_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthUser: true,
        isAuthAdmin: false,
        isLoading: false,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthUser: false,
        isAuthAdmin: true,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case ADMIN_LOGIN_FAIL:
      localStorage.removeItem("connect-token");
      localStorage.removeItem("lastLogin");
      return { ...initialState, topics: state.topics, posts: state.posts };

    case LOGIN_SUCCESS:
      localStorage.setItem("connect-token", action.payload.token);
      localStorage.setItem("lastLogin", "user");
      return {
        ...state,
        ...action.payload,
        token: "",
        isAuthUser: true,
        isAuthAdmin: false,
        isLoading: false,
      };

    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("connect-token", action.payload.token);
      localStorage.setItem("lastLogin", "admin");
      return {
        ...state,
        ...action.payload,
        token: "",
        isAuthAdmin: true,
        isAuthUser: false,
        isLoading: false,
      };

    case REGISTER_SUCCESS:
      return { ...state };
    case TOPIC_GOT:
      return { ...state, topics: action.payload };
    case TOPIC_GOT_FAIL:
      return { ...state };
    case AVATAR_CHANGE:
      return { ...state, avatar: action.payload };
    case UPDATE_PROFILE:
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default authReducer;
