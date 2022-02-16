import { LIGHT_MODE, DARK_MODE } from "../constants/ui";

const dark = {
  name: "dark",
  light: "",
  base: "",
  medium: "",
  dark: "",
};

const light = {
  name: "light",
  light: "",
  base: "",
  medium: "",
  dark: "",
};

const initialState = {
  theme: window.localStorage.getItem("jmi-connect-theme") || "light",
};

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      window.localStorage.setItem("jmi-connect-theme", "dark");
      return {
        ...state,
        theme: dark,
      };
    case LIGHT_MODE:
      window.localStorage.setItem("jmi-connect-theme", "light");
      return {
        ...state,
        theme: light,
      };
    default:
      return state;
  }
};

export default UiReducer;
