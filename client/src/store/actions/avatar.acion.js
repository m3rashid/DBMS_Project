import { AVATAR_CHANGE } from "../constants/avatar";

export const changeAvatar = (config) => {
  return {
    type: AVATAR_CHANGE,
    payload: config,
  };
};
