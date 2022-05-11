import React from "react";
import Avatar from "react-nice-avatar";
import Loader from "../loader";

const Notif = ({ comment }) => {
  console.log(comment);
  if (!comment.avatarID) {
    return <Loader />;
  }
  const avatar = {
    avatarID: comment.avatarID,
    sex: comment.sex,
    faceColor: comment.faceColor,
    earSize: comment.earSize,
    hairColor: comment.hairColor,
    hairStyle: comment.hairStyle,
    hatColor: comment.hatColor,
    hatStyle: comment.hatStyle,
    glassesStyle: comment.glassesStyle,
    noseStyle: comment.noseStyle,
    mouthStyle: comment.mouthStyle,
    shirtStyle: comment.shirtStyle,
    shirtColor: comment.shirtColor,
    bgColor: comment.bgColor,
    isGradient: comment.isGradient,
  };
  console.log(avatar);
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 p-2 py-3 md:px-4 rounded-md flex gap-4 w-full">
        <div className="">
          <Avatar className="h-16 w-16" {...avatar} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="font-semibold">@{comment.userName}</div>
          <div className="">{comment.text}</div>
        </div>
      </div>
    </>
  );
};

export default Notif;
