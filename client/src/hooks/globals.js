const token = localStorage.getItem("connect-token");
export const headers = {
  "Content-type": "application/json",
  authorization: token,
};
