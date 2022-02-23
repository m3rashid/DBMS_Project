const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const avatarEnums = {
  earSize: {
    small: 0,
    big: 1,
  },
  hairStyle: {
    normal: 0,
    thick: 1,
    mohawk: 2,
    womanLong: 3,
    womanShort: 4,
  },
  hatStyle: {
    none: 0,
    beanie: 1,
    turban: 2,
  },
  glassesStyle: {
    none: 0,
    round: 1,
    square: 2,
  },
  noseStyle: {
    short: 0,
    long: 1,
    round: 2,
  },
  mouthStyle: {
    laugh: 0,
    smile: 1,
    peace: 2,
  },
  shirtStyle: {
    hoody: 0,
    short: 1,
    polo: 2,
  },
  isGradient: {
    false: 0,
    true: 1,
  },
};

const manAvatarDefault = {
  sex: "man",
  faceColor: "#eeea77",
  earSize: 1,
  hairColor: "#000000",
  hairStyle: 1,
  hatColor: "red",
  hatStyle: 0,
  glassesStyle: 0,
  noseStyle: 2,
  mouthStyle: 0,
  shirtStyle: 2,
  shirtColor: "#ff0000",
  bgColor: "#3687dd",
  isGradient: 0,
};

const womanAvatarDefault = {
  sex: "woman",
  faceColor: "#fdfaa5",
  earSize: 0,
  hairColor: "#000000",
  hairStyle: 3,
  hatColor: "red",
  hatStyle: 0,
  glassesStyle: 0,
  noseStyle: 1,
  mouthStyle: 1,
  shirtStyle: 0,
  shirtColor: "#f575cc",
  bgColor: "#3687dd",
  isGradient: 0,
};

module.exports = {
  avatarEnums,
  manAvatarDefault,
  womanAvatarDefault,
  getCircularReplacer,
};
