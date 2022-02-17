import { AVATAR_CHANGE } from "../constants/avatar";

export const changeAvatar = ({ config }) => ({
  type: AVATAR_CHANGE,
  payload: config,
});
