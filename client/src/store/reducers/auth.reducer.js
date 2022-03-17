import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
} from "../constants/auth";
const initialState = {
  isAuthUser: false,
  isAuthAdmin: false,
  token: localStorage.getItem("connect-token"),
  isLoading: false,
  user: null,
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
        isAuthUser: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("connect-token");
      return {
        ...state,
        token: null,
        isAuthUser: false,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("connect-token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthUser: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
