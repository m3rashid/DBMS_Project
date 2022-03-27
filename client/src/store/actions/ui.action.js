import { DARK_MODE, LIGHT_MODE } from "../constants";

export const darkMode = () => {
  return {
    type: DARK_MODE,
  };
};

export const lightMode = () => ({
  type: LIGHT_MODE,
});
