import React from "react";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import axios from "axios";

import { SERVER_ROOT_URL } from "../store/constants";

import { headers } from "../hooks/globals";
import { useDispatch } from "react-redux";
import {
  addBookmark,
  addLike,
  removeBookmark,
  removeLike,
} from "../store/actions/post.action";

const maxBodyLength = 10000;

const usePostDetail = (singlePost, classification, loggedUser) => {
  const user = {
    userName: singlePost.userName,
    userId: singlePost.userID,
    phNumber: singlePost.phNumber,
    dob: singlePost.dob,
    email: singlePost.email,
    firstName: singlePost.firstName,
    lastName: singlePost.lastName,
    gender: singlePost.gender,
  };

  const avatar = {
    avatarID: singlePost.avatarID,
    sex: singlePost.sex,
    faceColor: singlePost.faceColor,
    earSize: singlePost.earSize,
    hairColor: singlePost.hairColor,
    hairStyle: singlePost.hairStyle,
    hatColor: singlePost.hatColor,
    hatStyle: singlePost.hatStyle,
    glassesStyle: singlePost.glassesStyle,
    noseStyle: singlePost.noseStyle,
    mouthStyle: singlePost.mouthStyle,
    shirtStyle: singlePost.shirtStyle,
    shirtColor: singlePost.shirtColor,
    bgColor: singlePost.bgColor,
    isGradient: singlePost.isGradient,
  };

  const topic = {
    name: singlePost.name,
    topicID: singlePost.topicID,
  };

  const postDetail = {
    postID: singlePost.postID,
    title: singlePost.title,
    description: DOMPurify.sanitize(singlePost.description),
    likes: singlePost.likes,
    reputation: singlePost.postReputation,
    commentsCount: singlePost.commentsCount,
    createdAt: singlePost.createdAt,
    updatedAt: singlePost.updatedAt,
    comments: singlePost.comments,
    isBookmarked: singlePost.isBookmarked,
    isLiked: singlePost.isLiked,
  };

  const analysis = {
    identity_attack: classification.identity_attack,
    insult: classification.insult,
    obscene: classification.obscene,
    severe_toxicity: classification.severe_toxicity,
    sexual_explicit: classification.sexual_explicit,
    threat: classification.threat,
    toxicity: classification.toxicity,
  };

  const dispatch = useDispatch();

  const [isLiked, setLiked] = React.useState(postDetail.isLiked);
  const [Likes, setLikes] = React.useState(postDetail.likes);
  const [Bookmarked, setBookmarked] = React.useState(postDetail.isBookmarked);
  const [commentOpen, setCommentOpen] = React.useState(true);
  const [commentText, setCommentText] = React.useState("");
  const [commentsCount, setCommentsCount] = React.useState(
    postDetail.commentsCount
  );
  const [addCommentLoading, setAddCommentLoading] = React.useState(false);

  React.useEffect(() => {
    setLiked(postDetail.isLiked);
    setLikes(postDetail.likes);
    setBookmarked(postDetail.isBookmarked);
    setCommentsCount(postDetail.commentsCount);
  }, [
    postDetail.isLiked,
    postDetail.likes,
    postDetail.isBookmarked,
    postDetail.commentsCount,
  ]);

  const handleLikeSubmit = () => {
    if (isLiked) {
      dispatch(removeLike(loggedUser.userID, postDetail.postID));
      setLikes(Likes - 1);
    } else {
      dispatch(addLike(loggedUser.userID, postDetail.postID));
      setLikes(Likes + 1);
    }
    setLiked(!isLiked);
  };

  const handleCommentSubmit = async () => {
    if (commentText.length > maxBodyLength - 50) {
      toast.error(`Comment cannot be more than ${maxBodyLength} characters`);
      return;
    }

    try {
      setAddCommentLoading(true);
      const res = await axios.post(
        `${SERVER_ROOT_URL}/comments/addComments`,
        JSON.stringify({
          text: commentText.replace(/\n/g, "<br/>"),
          userId: loggedUser.userID,
          postId: postDetail.postID,
        }),
        { headers }
      );
      const commentRes = await res.data.comment;
      setCommentsCount(commentsCount + 1);
      return commentRes;
    } catch (err) {
      toast.error("Error adding comment");
    }
    setAddCommentLoading(false);
    setCommentText("");
  };

  const handleOpenComment = () => {
    setCommentOpen(!commentOpen);
  };

  const handleBookmark = () => {
    Bookmarked
      ? dispatch(removeBookmark(loggedUser.userID, postDetail.postID))
      : dispatch(addBookmark(loggedUser.userID, postDetail.postID));
    setBookmarked(!Bookmarked);
  };

  const inputCharLength = commentText.length > 0;

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  return {
    state: {
      user,
      avatar,
      topic,
      postDetail,
      isLiked,
      Likes,
      Bookmarked,
      commentsCount,
      commentOpen,
      commentText,
      inputCharLength,
      analysis,
      addCommentLoading,
    },
    handleLikeSubmit,
    handleCommentSubmit,
    handleOpenComment,
    handleBookmark,
    handleCommentChange,
  };
};

export default usePostDetail;
