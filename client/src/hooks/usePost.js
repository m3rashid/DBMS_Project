import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

import {
  DELETE_POST_SUCCESS,
  SERVER_ROOT_URL,
  tokenConfig,
} from "../store/constants";
import { headers } from "../hooks/globals";
import { getPosts } from "../store/actions/post.action";

const usePost = () => {
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
      return [...acc, { value: curr.topicID, label: curr.name }];
    }, []);

  const handleTopicChange = ({ value }) => {
    setText((prev) => ({ ...prev, topicId: value }));
  };

  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);
      const threshold = 0.9;
      const model = await toxicity.load(threshold);
      const sentence = text.title + ". " + text.body.replace("\n", ". ");
      const predictions = await model.classify(sentence);
      const toxic = predictions[6].results[0].probabilities[1].toFixed(4);
      const totalAnalysis = predictions.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.label]: curr.results[0].probabilities[1].toFixed(4),
        };
      }, {});

      await axios.post(
        `${SERVER_ROOT_URL}/post/add`,
        JSON.stringify({
          ...text,
          body: text.body.replace(/\n/g, "<br/>"),
          userId: user.userID,
          toxicity: toxic,
          toxicityAnalysis: totalAnalysis,
        }),
        { headers }
      );
      toast.success("Post added successfully");
      dispatch(getPosts());
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Error creating post");
    }

    setText({
      title: "",
      body: "",
      topicId: "",
    });
  };

  const deletePost = async (postID) => {
    const postToast = toast.loading("Deleting post...");
    const body = JSON.stringify({ postID });
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/deletePost`,
        body,
        tokenConfig()
      );
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(postToast, {
          render: "Successfully deleted Post",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }, 0);
    } catch (err) {
      toast.update(postToast, {
        render: "Error deleting Post",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
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
    deletePost,
  };
};

export default usePost;
