import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";
import { addBookmark, removeBookmark } from "../../store/actions/post.action";

import UserTitle from "../atoms/userTitle";
import { useDispatch } from "react-redux";

const Card = ({ post, loggedUser, reload }) => {
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
    reputation: post.postReputation,
  };

  const classification = {
    identity_attack: post.identity_attack,
    insult: post.insult,
    obscene: post.obscene,
    severe_toxicity: post.severe_toxicity,
    sexual_explicit: post.sexual_explicit,
    threat: post.threat,
    toxicity: post.toxicity,
  };
  const dispatch = useDispatch();

  // handle these
  const liked = false;
  const [bookmarked, setBookmarked] = React.useState(post.isBookmarked === 1);
  const commented = false;

  const handleLike = () => {};
  const handleBookmark = () => {
    bookmarked
      ? dispatch(removeBookmark(loggedUser.userID, post.postID))
      : dispatch(addBookmark(loggedUser.userID, post.postID));
    setBookmarked(!bookmarked);
    reload();
  };
  const handleComment = () => {};

  return (
    <>
      <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
        <UserTitle
          post={postDetail}
          user={user}
          avatar={avatar}
          classification={classification}
        />
        <div className="w-full bg-gray-200 dark:bg-gray-800 dark:text-gray-200 pt-2">
          <Link to={`/topic/${topic.topicID}`}>
            <span className="font-semibold px-4 text-blue-500">
              # {topic.name}
            </span>
          </Link>
          <Link to={`/post/${postDetail.postID}`}>
            <div className="w-full px-4 py-2">
              {postDetail.title}
              {postDetail.description && (
                <span className="px-4 text-blue-500">read more ...</span>
              )}
            </div>
          </Link>
        </div>
        <div
          className="p-3 flex items-center justify-between cursor-pointer"
          onClick={handleLike}
        >
          <div className="flex gap-3">
            <div
              className="flex gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              onClick={handleLike}
            >
              <span
                className={
                  liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                }
              >
                <FaHeart size={22} />
              </span>
              <p className="dark:text-gray-200">{postDetail.likes}</p>
            </div>
            <Link to={`/post/${postDetail.postID}`}>
              <div
                className="flex gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
                onClick={handleComment}
              >
                <span
                  className={
                    commented
                      ? "text-blue-500"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  <FaComment size={22} />
                </span>
                <p className="dark:text-gray-200">{postDetail.commentsCount}</p>
              </div>
            </Link>
          </div>
          <div
            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
            onClick={handleBookmark}
          >
            <span
              className={
                bookmarked
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-300"
              }
              size="xl"
            >
              <FaBookmark size={22} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
