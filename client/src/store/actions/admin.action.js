import axios from "axios";
import { toast } from "react-toastify";

import { CREATE_TOPIC_FAIL, CREATE_TOPIC_SUCCESS } from "../constants/admin";
import { tokenConfig, SERVER_ROOT_URL } from "../constants/config";
import { userLoading } from "./auth.action";
import { clearErrors, returnErrors } from "./error.action";

export const createTopic =
  ({ topicName }) =>
  (dispatch, getState) => {
    dispatch(userLoading());
    const body = JSON.stringify({ topicName });
    axios
      .post(`${SERVER_ROOT_URL}/admin/createTopic`, body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CREATE_TOPIC_SUCCESS,
        });
        dispatch(clearErrors);
        toast.success("Successfully created topic");
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            CREATE_TOPIC_FAIL
          )
        );
        dispatch({
          type: CREATE_TOPIC_FAIL,
        });
        toast.error("Error in creating post");
      });
  };
