import { LIGHT_MODE, DARK_MODE } from "../constants/ui";

const dark = {
  name: "dark",
  l1: "gray-500",
  l2: "gray-600",
  l3: "gray-700",
  l4: "gray-800",
  le: "gray-900",
  text: "gray-50",
};

const light = {
  name: "light",
  l1: "gray-100",
  l2: "gray-200",
  l3: "gray-300",
  l4: "gray-400",
  le: "gray-50",
  text: "gray-400",
};

const initialState = {
  theme: dark,
  // window.localStorage.getItem("jmi-connect-theme") ||
};

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      // window.localStorage.setItem("jmi-connect-theme", "dark");
      return {
        ...state,
        theme: dark,
      };
    case LIGHT_MODE:
      // window.localStorage.setItem("jmi-connect-theme", "light");
      return {
        ...state,
        theme: light,
      };
    default:
      return state;
  }
};

export default UiReducer;
