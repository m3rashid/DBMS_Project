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

export const SERVER_ROOT_URL = "http://localhost:5000";
