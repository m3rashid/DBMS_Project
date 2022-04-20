import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  DELETE_TOPIC_SUCCESS,
  SERVER_ROOT_URL,
  tokenConfig,
} from "../store/constants";
import { useDispatch } from "react-redux";

const useTopic = () => {
  const dispatch = useDispatch();
  const [topicName, setTopicName] = React.useState("");

  const deleteTopic = async (topicID) => {
    const topicToast = toast.loading("Deleting topic...");
    const body = JSON.stringify({ topicID });
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/deleteTopic`,
        body,
        tokenConfig()
      );
      dispatch({
        type: DELETE_TOPIC_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(topicToast, {
          render: "Successfully deleted Topic",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }, 0);
    } catch (err) {
      toast.update(topicToast, {
        render: "Error deleting Topic",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const updateTopic = async (topicName, topicID) => {
    const topicToast = toast.loading("Updating topic...");
    const body = JSON.stringify({ topicName, topicID });
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/updateTopic`,
        body,
        tokenConfig()
      );
      dispatch({
        type: DELETE_TOPIC_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(topicToast, {
          render: "Successfully updated Topic",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }, 0);
    } catch (err) {
      toast.update(topicToast, {
        render: "Error updating Topic",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const createTopic = async () => {
    const topicToast = toast.loading("Creating a topic...");
    const body = JSON.stringify({ topicName });
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/createTopic`,
        body,
        tokenConfig()
      );
      dispatch({
        type: DELETE_TOPIC_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(topicToast, {
          render: "Successfully created topic",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }, 0);
    } catch (err) {
      toast.update(topicToast, {
        render: "Error in creating topic",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  const createThisTopic = () => {
    createTopic();
    setTopicName("");
  };

  return {
    state: {
      topicName,
    },
    deleteTopic,
    updateTopic,
    createThisTopic,
    setTopicName,
  };
};

export default useTopic;
