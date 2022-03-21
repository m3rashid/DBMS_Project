import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";

import UserTitle from "./atoms/userTitle";

const Card = ({ post }) => {
  const user = {
    userName: post.userName,
    userId: post.userID,
    phNumber: post.phNumber,
    dob: post.dob,
    email: post.email,
    firstName: post.firstName,
    lastName: post.lastName,
    gender: post.gender,
  };

  const avatar = {
    avatarID: post.avatarID,
    sex: post.sex,
    faceColor: post.faceColor,
    earSize: post.earSize,
    hairColor: post.hairColor,
    hairStyle: post.hairStyle,
    hatColor: post.hatColor,
    hatStyle: post.hatStyle,
    glassesStyle: post.glassesStyle,
    noseStyle: post.noseStyle,
    mouthStyle: post.mouthStyle,
    shirtStyle: post.shirtStyle,
    shirtColor: post.shirtColor,
    bgColor: post.bgColor,
    isGradient: post.isGradient,
  };

  const topic = {
    name: post.name,
    topicID: post.topicID,
  };

  const postDetail = {
    postID: post.postID,
    title: post.title,
    description: post.description,
    likes: post.likes,
    commentsCount: post.commentsCount,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };

  // handle these
  const liked = false;
  const bookmarked = true;

  const handleLike = () => {};
  const handleBookmark = () => {};

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
        <UserTitle post={postDetail} user={user} avatar={avatar} />
        <Link to={`/post/${postDetail.postID}`}>
          <div className="w-full bg-gray-200 dark:bg-gray-800 p-4 dark:text-gray-200">
            {postDetail.title}
          </div>
        </Link>
        <div
          className="p-3 flex items-center justify-between cursor-pointer"
          onClick={handleLike}
        >
          <div className="flex gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md">
            <FontAwesomeIcon
              className={
                liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"
              }
              icon={faHeart}
              size="xl"
            />
            <p className="dark:text-gray-200">{postDetail.likes}</p>
          </div>
          <div
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
            onClick={handleBookmark}
          >
            <FontAwesomeIcon
              className={
                bookmarked
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-300"
              }
              icon={faBookmark}
              size="xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
