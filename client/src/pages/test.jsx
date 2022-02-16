import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";

// to be stored in the database
const config = genConfig({
  sex: "man",
  faceColor: "#1ff456",
  earSize: "small", // small or big
  hairColor: "#123fff",
  hairStyle: "", // normal, thick, mohawk, womanLong, womanShort
  hatColor: "",
  hatStyle: "", // none, beanie, turban
  glassesStyle: "round", // none, round, square
  noseStyle: "", // short, long, round
  mouthStyle: "", // laugh, smile, peace
  shirtStyle: "", // 	hoody, short, polo
  shirtColor: "",
  bgColor: "",
  isGradient: true,
});

const Test = () => {
  return (
    <>
      <div>
        <Avatar className="w-16 h-16" {...config} />
      </div>
    </>
  );
};

export default Test;
