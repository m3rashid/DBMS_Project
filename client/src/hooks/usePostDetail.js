import React from "react";

const usePostDetail = (singlePost) => {
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
    description: singlePost.description,
    likes: singlePost.likes,
    commentsCount: singlePost.commentsCount,
    createdAt: singlePost.createdAt,
    updatedAt: singlePost.updatedAt,
    comments: [],
  };

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
    },
    handleLikeSubmit,
    handleCommentSubmit,
    handleOpenComment,
    handleBookmark,
    handleCommentChange,
  };
};

export default usePostDetail;
