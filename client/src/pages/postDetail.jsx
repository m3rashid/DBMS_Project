import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import UserTitle from "../components/atoms/userTitle";
import Notif from "../components/notif";
import usePostDetail from "../hooks/usePostDetail";

import axios from "axios";
import { toast } from "react-toastify";

import { SERVER_ROOT_URL } from "../store/constants/config";
import { headers } from "../hooks/globals";
import { AuthWrapper } from "../components/authWrapper";

const PostDetail = () => {
  const { postId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [postFound, setPostFound] = React.useState(false);
  const [singlePost, setSinglePost] = React.useState({});

  React.useEffect(() => {
    axios
      .post(`${SERVER_ROOT_URL}/post/one`, JSON.stringify({ postId }), {
        headers,
      })
      .then((res) => {
        setLoading(false);
        if (!res.data.post) {
          setPostFound(false);
        } else {
          setPostFound(true);
        }
        setSinglePost(res.data.post);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error loading post");
      });
  }, [postId]);

  const {
    state: {
      user,
      avatar,
      // topic,
      postDetail,
      liked,
      bookmarked,
      commentOpen,
      commentText,
      inputCharLength,
    },
    handleLikeSubmit,
    handleCommentSubmit,
    handleOpenComment,
    handleBookmark,
    handleCommentChange,
  } = usePostDetail(singlePost);

  const iconContainerStyles =
    "flex gap-2 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 cursor-pointer";

  if (loading) {
    return null;
  }

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
          <UserTitle post={postDetail} user={user} avatar={avatar} />
          <div className="">
            <div className="w-full bg-gray-200 dark:bg-gray-800  dark:text-gray-200 p-4">
              <div
                className={`dark:text-gray-20 ${
                  postDetail.body && "font-semibold"
                }`}
              >
                {postDetail.title}
              </div>
              <div
                className="dark:text-gray-20"
                dangerouslySetInnerHTML={{
                  __html: postDetail.description,
                }}
              ></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3">
              <div className={iconContainerStyles} onClick={handleLikeSubmit}>
                <FontAwesomeIcon
                  className={
                    liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                  }
                  icon={faHeart}
                  size="xl"
                />
                <p className="dark:text-gray-200">{postDetail.likes}</p>
              </div>
              <div className={iconContainerStyles} onClick={handleOpenComment}>
                <FontAwesomeIcon
                  className="text-gray-700 dark:text-gray-300"
                  icon={faComment}
                  size="xl"
                />
                <p className="dark:text-gray-200">{postDetail.commentsCount}</p>
              </div>
            </div>
            <div className={iconContainerStyles} onClick={handleBookmark}>
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
            <div className="bg-gray-200 dark:bg-gray-800 max-h-[500px] overflow-auto p-2 rounded-b-md">
              <div className="flex flex-col gap-2 items-end mb-2">
                <textarea
                  style={{ whiteSpace: "pre-wrap" }}
                  rows="3"
                  placeholder="Add a comment"
                  className="outline-none rounded-md py-2 px-3 w-full resize-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
                  value={commentText}
                  onChange={handleCommentChange}
                />
                {inputCharLength ? (
                  <button
                    className="bg-blue-500 text-gray-200 rounded-full px-4 py-2 text-lg font-semibold max-w-[200px]"
                    onClick={handleCommentSubmit}
                  >
                    Add Comment
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 mt-4 mb-1">
                {postDetail.comments.map(({ name, comment }, index) => (
                  <Notif key={index} username={name} text={comment} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default PostDetail;
