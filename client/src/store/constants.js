export const CREATE_TOPIC_SUCCESS = "CREATE_TOPIC_SUCCESS";
export const CREATE_TOPIC_FAIL = "CREATE_TOPIC_FAIL";

export const AUTH_ERROR = "AUTH_ERROR";
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";
export const AVATAR_CHANGE = "AVATAR_CHANGE";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAIL = "ADMIN_LOGIN_FAIL";

export const TOPIC_GOT = "TOPIC_GOT";
export const TOPIC_GOT_FAIL = "TOPIC_GOT_FAIL";

export const POSTS_LOADING = "POSTS_LOADING";
export const POSTS_LOADED = "POSTS_LOADED";
export const POST_LOADED = "POST_LOADED";

export const BOOKMARKS_LOADING = "BOOKMARKS_LOADING";
export const BOOKMARKS_LOADED = "BOOKMARKS_LOADED";
export const ADMIN_LOADING = "ADMIN_LOADING";
export const ADMIN_LOADED = "ADMIN_LOADED";

export const DARK_MODE = "DARK_MODE";
export const LIGHT_MODE = "LIGHT_MODE";

export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_TOPIC_SUCCESS = "DELETE_TOPIC_SUCCESS";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";

export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const configContentType = {
  headers: {
    "Content-type": "application/json",
  },
};

export const tokenConfig = () => {
  const token = localStorage.getItem("connect-token");
  if (token) {
    configContentType.headers["authorization"] = token;
  }
  return configContentType;
};

export const SERVER_ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://jmi-connect-nodejs-backend.herokuapp.com"
    : "http://localhost:5000";
