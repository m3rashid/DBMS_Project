import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";

import UserTitle from "./atoms/userTitle";

const Card = () => {
  const postId = "demouserpost";
  const likes = 12;
  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia";
  const liked = false;
  const bookmarked = true;

  const handleLike = () => {};
  const handleBookmark = () => {};

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
        <UserTitle time="Monday 11:00 IST" />
        <Link to={`/post/${postId}`}>
          <div className="w-full bg-gray-200 dark:bg-gray-800 p-4 dark:text-gray-200">
            {title}
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
            <p className="dark:text-gray-200">{likes}</p>
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
