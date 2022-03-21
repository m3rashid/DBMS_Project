import { GET_ERRORS, CLEAR_ERRORS } from "../constants/error";

const initialState = {
  errors: null,
};

const errorReducer = () => {
  return (state = initialState, action) => {
    switch (action.type) {
      case GET_ERRORS:
        return {
          ...state,
          errors: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          errors: null,
        };
      default:
        return state;
    }
  };
};

export default errorReducer;
