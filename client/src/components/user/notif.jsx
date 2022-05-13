import moment from "moment";
import React from "react";
import Avatar from "react-nice-avatar";
import Loader from "../loader";

const Notif = ({ comment }) => {
 // console.log(comment);
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
  return (
    <>
      <div className="dark:text-gray-200 pl-2 pb-2 flex gap-4 w-full">
        <div className="">
          <Avatar className="h-16 w-16" {...avatar} />
        </div>
        <div className="flex flex-col items-start justify-center bg-gray-50 dark:bg-gray-700 w-full px-3 py-2 rounded-md">
          <div className="font-semibold">
            @{comment.userName} &nbsp;
            <span className="font-normal">
              on{" "}
              {moment(comment.comment_createdAt).format("DD/MM/YYYY hh:mm A")}
            </span>
          </div>
          <div className="">{comment.text}</div>
        </div>
      </div>
    </>
  );
};

export default Notif;
