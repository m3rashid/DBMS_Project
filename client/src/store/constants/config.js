export const configContentType = {
  headers: {
    "Content-type": "application/json",
  },
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  if (token) {
    configContentType.headers["authorization"] = token;
  }
  return configContentType;
};

export const SERVER_ROOT_URL = "http://localhost:5000";
