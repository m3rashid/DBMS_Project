import React from "react";
import { FaComment, FaHeart, FaBookmark } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import UserTitle from "../components/atoms/userTitle";
import Notif from "../components/user/notif";
import usePostDetail from "../hooks/usePostDetail";
import { SERVER_ROOT_URL } from "../store/constants";
import { headers } from "../hooks/globals";
import Loader from "../components/loader";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const auth = useSelector((state) => state.auth);
  const loggedUser = auth.user;

  const { postId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [singlePost, setSinglePost] = React.useState({});
  const [classification, setClassification] = React.useState({});
  const [allComments, setAllComments] = React.useState([]);

  React.useEffect(() => {
    const userId = loggedUser.userID;
    const body = JSON.stringify({ postId, userId });
    axios
      .post(`${SERVER_ROOT_URL}/post/one`, body, {
        headers,
      })
      .then((res) => {
        setLoading(false);
        setSinglePost(res.data.post);
        setClassification(res.data.classification);
        setAllComments(res.data.comments);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error loading post");
      });
  }, [postId, loggedUser]);

  const {
    state: {
      user,
      avatar,
      topic,
      postDetail,
      isLiked,
      Likes,
      Bookmarked,
      commentsCount,
      analysis,
      commentOpen,
      commentText,
      inputCharLength,
      addCommentLoading,
    },
    handleLikeSubmit,
    handleCommentSubmit,
    handleOpenComment,
    handleBookmark,
    handleCommentChange,
  } = usePostDetail(singlePost, classification, loggedUser);

  const iconContainerStyles =
    "select-none flex gap-2 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 cursor-pointer";

  const handleAddComment = async (e) => {
    e.preventDefault();
    const comment = await handleCommentSubmit();
    setAllComments((prev) => [...prev, comment]);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <div className="flex flex-col  bg-gray-50 dark:bg-gray-900 rounded-md w-full shadow-md">
          <UserTitle
            post={postDetail}
            user={user}
            avatar={avatar}
            classification={analysis}
          />

          <div className="">
            <div className="w-full bg-gray-200 dark:bg-gray-800  dark:text-gray-200 pt-2">
              <Link to={`/topic/${topic.topicID}`}>
                <span className="font-semibold px-4 text-blue-500">
                  # {topic.name}
                </span>
              </Link>
              <div
                className={`dark:text-gray-20 px-4 pt-2 ${
                  postDetail.description && "font-semibold"
                }`}
              >
                {postDetail.title}
              </div>
              <div
                className="dark:text-gray-20 px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: postDetail.description,
                }}
              ></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-3">
              <div className={iconContainerStyles} onClick={handleLikeSubmit}>
                <span
                  className={
                    isLiked
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  <FaHeart />
                </span>
                <p className="dark:text-gray-200">{Likes}</p>
              </div>
              <div className={iconContainerStyles} onClick={handleOpenComment}>
                <span className="text-gray-700 dark:text-gray-300">
                  <FaComment />
                </span>
                <p className="dark:text-gray-200">{commentsCount}</p>
              </div>
            </div>
            <div className={iconContainerStyles} onClick={handleBookmark}>
              <span
                className={
                  Bookmarked
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                <FaBookmark />
              </span>
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
                    onClick={handleAddComment}
                    disabled={addCommentLoading}
                  >
                    Add Comment
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 mt-4 mb-1">
                {addCommentLoading ? (
                  <Loader />
                ) : (
                  allComments?.map((comment, index) => (
                    <Notif key={index} comment={comment} />
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
