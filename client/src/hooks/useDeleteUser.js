import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_POST_SUCCESS,
  DELETE_USER_SUCCESS,
  SERVER_ROOT_URL,
  tokenConfig,
} from "../store/constants";

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const deleteUser = async (userID, avatarID) => {
    const userToast = toast.loading("Deleting User...");
    const body = JSON.stringify({ userID, avatarID });
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/admin/deleteUser`,
        body,
        tokenConfig()
      );
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        toast.update(userToast, {
          render: "Successfully deleted User",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }, 0);
    } catch (err) {
      toast.update(userToast, {
        render: "Error deleting User",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
