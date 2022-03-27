import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SERVER_ROOT_URL } from "../store/constants";
import { headers } from "../hooks/globals";
import { getPosts } from "../store/actions/post.action";

const useCreatePost = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const theme = useSelector((state) => state.ui.theme);
  const { topics, avatar, user } = useSelector((state) => state.auth);
  const [text, setText] = React.useState({
    title: "",
    body: "",
    topicId: "",
  });
  const maxTitleLength = 170;
  const maxBodyLength = 10000;

  const options =
    topics &&
    topics.length &&
    topics.reduce((acc, curr) => {
      return [
        ...acc,
        {
          value: curr.topicID,
          label: curr.name,
        },
      ];
    }, []);

  const handleTopicChange = ({ value }) => {
    setText((prev) => ({
      ...prev,
      topicId: value,
    }));
  };

  const handleChange = (e) => {
    setText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.title.length > maxTitleLength + 10) {
      toast.error(`Title cannot be more than ${maxTitleLength} characters`);
      return;
    }
    if (text.body.length > maxBodyLength - 50) {
      toast.error(`Body cannot be more than ${maxBodyLength} characters`);
      return;
    }
    if (!text.topicId) {
      toast.error("Please select a topic");
      toast.info("If you cant find your topic, ask an admin to create one");
      return;
    }

    setLoading(true);
    axios
      .post(
        `${SERVER_ROOT_URL}/post/add`,
        JSON.stringify({
          ...text,
          body: text.body.replace(/\n/g, "<br/>"),
          userId: user.userID,
        }),
        { headers }
      )
      .then((res) => {
        toast.success("Post added successfully");
        dispatch(getPosts());
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error creating post");
      });

    setText({
      title: "",
      body: "",
      topicId: "",
    });
  };

  return {
    state: {
      theme,
      text,
      avatar,
      user,
      options,
      maxTitleLength,
      loading,
    },
    handleChange,
    handleSubmit,
    handleTopicChange,
  };
};

export default useCreatePost;
