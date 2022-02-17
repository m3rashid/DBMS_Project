import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import UserTitle from "../components/atoms/userTitle";

const PostDetail = () => {
  const no_likes = 12;
  const no_comments = 1;
  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia";
  const body =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia";
  const comments = [
    {
      name: "something",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    },
    {
      name: "something",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    },
    {
      name: "something",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    },
  ];

  const liked = false;
  const bookmarked = false;

  const [commentOpen, setCommentOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const handleLikeSubmit = () => {};
  const handleCommentSubmit = () => {};

  const handleOpenComment = () => {
    setCommentOpen(!commentOpen);
  };
  const handleBookmark = () => {};

  const inputCharLength = () => {
    return commentText.length > 0;
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
          <UserTitle time="Monday 11:00 IST" />
          <div className="">
            <div className="w-full bg-gray-200 dark:bg-gray-800  dark:text-gray-200 p-4">
              <div className={`dark:text-gray-20 ${body && "font-semibold"}`}>
                {title}
              </div>
              <div className="dark:text-gray-20">{body}</div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3">
              <div
                className="flex gap-2 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 cursor-pointer"
                onClick={handleLikeSubmit}
              >
                <FontAwesomeIcon
                  className={
                    liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                  }
                  icon={faHeart}
                  size="xl"
                />
                <p className="dark:text-gray-200">{no_likes}</p>
              </div>
              <div
                className="flex gap-2 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 cursor-pointer"
                onClick={handleOpenComment}
              >
                <FontAwesomeIcon
                  className="text-gray-700 dark:text-gray-300"
                  icon={faComment}
                  size="xl"
                />
                <p className="dark:text-gray-200">{no_comments}</p>
              </div>
            </div>
            <div
              className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer"
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
          {commentOpen ? (
            <div className="bg-gray-300 dark:bg-gray-900 max-h-[500px] overflow-auto p-2 rounded-md">
              <div className="flex flex-col gap-2 items-end mb-2">
                <textarea
                  rows="3"
                  placeholder="Add a comment"
                  className="outline-none rounded-md py-2 px-3 w-full resize-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                  value={commentText}
                  onChange={handleCommentChange}
                />
                {inputCharLength() ? (
                  <button
                    className="bg-blue-500 text-gray-200 rounded-full px-4 py-2 text-lg font-semibold max-w-[200px] mb-3"
                    onClick={handleCommentSubmit}
                  >
                    Add Comment
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 mt-4 mb-1">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md p-1 px-2 bg-gray-50 dark:bg-gray-700"
                  >
                    <img
                      className="h-14 w-14 rounded-full"
                      src={process.env.REACT_APP_IMG}
                      alt=""
                    />
                    <div className="ml-2 dark:text-gray-200">
                      <p className="font-bold">{comment.name}</p>
                      <p className="">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
