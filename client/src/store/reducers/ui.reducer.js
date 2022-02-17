import { LIGHT_MODE, DARK_MODE } from "../constants/ui";

const checkTheme = () => {
  if (
    window.localStorage.theme === "dark" ||
    (!("theme" in window.localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  } else {
    return "light";
  }
};

const initialState = {
  theme: checkTheme(),
};

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      window.localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      return {
        ...state,
        theme: "dark",
      };
    case LIGHT_MODE:
      window.localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      return {
        ...state,
        theme: "light",
      };
    default:
      return state;
  }
};

export default UiReducer;
