import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_ROOT_URL, tokenConfig } from "../store/constants";

async function deleteUser(userID, avatarID) {
  const userToast = toast.loading("Deleting User...");
  const body = JSON.stringify({ userID, avatarID });
  try {
    await axios.post(
      `${SERVER_ROOT_URL}/admin/deleteUser`,
      body,
      tokenConfig()
    );
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
}

export default deleteUser;
