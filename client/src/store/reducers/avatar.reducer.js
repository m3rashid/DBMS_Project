import { AVATAR_CHANGE } from "../constants/avatar";

// TODO this to be saved in the database and fetched on userl load
const initialState = {
  sex: "man",
  faceColor: "#1ff456",
  earSize: "small", // small or big
  hairColor: "#123fff",
  hairStyle: "womanShort", // normal, thick, mohawk, womanLong, womanShort
  hatColor: "red",
  hatStyle: "none", // none, beanie, turban
  glassesStyle: "round", // none, round, square
  noseStyle: "round", // short, long, round
  mouthStyle: "laugh", // laugh, smile, peace
  shirtStyle: "hoody", // 	hoody, short, polo
  shirtColor: "black",
  bgColor: "gray",
  isGradient: false,
};

const AvatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVATAR_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default AvatarReducer;
