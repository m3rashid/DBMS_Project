import React from "react";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import axios from "axios";

import {
  SERVER_ROOT_URL,
} from "../store/constants";

import { headers } from "../hooks/globals";

const maxBodyLength = 10000;

const usePostDetail = (singlePost, classification) => {
  const [loading, setLoading] = React.useState(false);

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

  const liked = false;
  const bookmarked = false;

  const [commentOpen, setCommentOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const handleLikeSubmit = () => {};

  const handleCommentSubmit = async () => {
    if (commentText.length > maxBodyLength - 50) {
      toast.error(`Comment cannot be more than ${maxBodyLength} characters`);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${SERVER_ROOT_URL}/comments/addComments`,
        JSON.stringify({
          text: commentText.replace(/\n/g, "<br/>"),
          userId: user.userId,
          postId: postDetail.postID,
        }),
        { headers }
      );
      const commentRes = await res.data.comment;
      toast.success("Comment posted successfully");
      setLoading(false);
      return commentRes;
    } catch (err) {
      setLoading(false);
      toast.error("Error adding comment");
    }

    setCommentText("");
  };

  const handleOpenComment = () => {
    setCommentOpen(!commentOpen);
  };
  const handleBookmark = () => {};

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
      liked,
      bookmarked,
      commentOpen,
      commentText,
      inputCharLength,
      analysis,
      loading,
    },
    handleLikeSubmit,
    handleCommentSubmit,
    handleOpenComment,
    handleBookmark,
    handleCommentChange,
  };
};

export default usePostDetail;
