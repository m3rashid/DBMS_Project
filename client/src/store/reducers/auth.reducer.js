import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  // FORGOT_PASSWORD,
  // RESET_PASSWORD_FAIL,
  AUTH_ERROR,
  // RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  TOPIC_GOT,
  TOPIC_GOT_FAIL,
} from "../constants/auth";
const initialState = {
  isAuthUser: false,
  isAuthAdmin: false,
  token: localStorage.getItem("connect-token"),
  isLoading: false,
  user: null,
  avatar: null,
  users: null,
  topics: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthUser: true,
        isAuthAdmin: false,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case ADMIN_LOGIN_FAIL:
      localStorage.removeItem("connect-token");
      return {
        ...state,
        token: null,
        isAuthUser: false,
        isAuthAdmin: false,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("connect-token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthUser: true,
        isAuthAdmin: false,
        isLoading: false,
      };

    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("connect-token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthAdmin: true,
        isAuthUser: false,
        isLoading: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
      };

    case TOPIC_GOT:
      return {
        ...state,
        ...action.payload,
      };

    case TOPIC_GOT_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
