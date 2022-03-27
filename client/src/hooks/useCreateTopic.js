import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { SERVER_ROOT_URL, tokenConfig } from "../store/constants";

const useCreateTopic = () => {
  const [topicName, setTopicName] = React.useState("");

  const createTopic = async () => {
    const topicToast = toast.loading("Creating a topic...");
    const body = JSON.stringify({ topicName });
    try {
      await axios.post(
        `${SERVER_ROOT_URL}/admin/createTopic`,
        body,
        tokenConfig()
      );
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
    createThisTopic,
    setTopicName,
  };
};

export default useCreateTopic;
