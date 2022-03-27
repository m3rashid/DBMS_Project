import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_ROOT_URL, tokenConfig } from "../store/constants";

async function deleteTopic(topicID) {
  const topicToast = toast.loading("Deleting topic...");
  const body = JSON.stringify({ topicID });
  try {
    await axios.post(
      `${SERVER_ROOT_URL}/admin/deleteTopic`,
      body,
      tokenConfig()
    );
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
}

export default deleteTopic;
