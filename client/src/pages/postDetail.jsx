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

  const handleLike = () => {};
  const handleOpenComment = () => {
    setCommentOpen(!commentOpen);
  };
  const handleBookmark = () => {};

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <div className="flex flex-col  bg-[white] rounded-md w-full shadow-md">
          <UserTitle time="Monday 11:00 IST" />
          <div className="">
            <div className={`w-full bg-gray-100 p-4 `}>
              <div className={`${body && "font-semibold"}`}>{title}</div>
              <div className="">{body}</div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3">
              <div
                className="flex gap-2 items-center justify-center hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                onClick={handleLike}
              >
                <FontAwesomeIcon
                  className={liked ? "text-red-500" : "text-gray-500"}
                  icon={faHeart}
                  size="xl"
                />
                <p className="">{no_likes}</p>
              </div>
              <div
                className="flex gap-2 items-center justify-center hover:bg-gray-200 rounded-md p-2 cursor-pointer"
                onClick={handleOpenComment}
              >
                <FontAwesomeIcon className="" icon={faComment} size="xl" />
                <p className="">{no_comments}</p>
              </div>
            </div>
            <div
              className=" hover:bg-gray-200 p-2 rounded-md cursor-pointer"
              onClick={handleBookmark}
            >
              <FontAwesomeIcon
                className={bookmarked ? "text-black" : "text-gray-500"}
                icon={faBookmark}
                size="xl"
              />
            </div>
          </div>
          {commentOpen ? (
            <div className="bg-gray-100 max-h-[500px] overflow-auto p-2 rounded-md">
              <div className="flex flex-col gap-2 items-end">
                <textarea
                  rows="3"
                  placeholder="Add a comment"
                  className="outline-none rounded-md py-2 px-3 w-full resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="bg-green-300 rounded-full px-3 py-1 text-lg font-semibold max-w-[200px] mb-3">
                  Add Comment
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md p-1 px-2 bg-[white]"
                  >
                    <img
                      className="h-14 w-14 rounded-full"
                      src={process.env.REACT_APP_IMG}
                      alt=""
                    />
                    <div className="ml-2">
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
