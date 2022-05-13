import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_ROOT_URL } from "../../store/constants";
import { headers } from "../../hooks/globals";
import { toast } from "react-toastify";

export const SmallButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-gray-200 p-2 px-4 rounded-full font-semibold w-[170px]"
    >
      {label}
    </button>
  );
};

const FriendActions = ({ user: toID, friendshipStatus }) => {
  const [status, setStatus] = React.useState(friendshipStatus);
  const auth = useSelector((state) => state.auth);
  const fromID = auth.user.userID;
  toID = toID.userID;

  React.useEffect(() => {
    setStatus(friendshipStatus);
  }, [friendshipStatus]);

  const sendFriendRequest = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/send`, body, { headers })
      .then((res) => {
        toast.success("Friend request sent");
        setStatus("REQUESTED_TO");
      })
      .catch(() => toast.error("Error loading post"));
  };

  const acceptFriendRequest = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/accept`, body, { headers })
      .then((res) => {
        toast.success("Friend request accepted");
        setStatus("FRIENDS");
      })
      .catch(() => toast.error("Error loading post"));
  };

  const denyFriendRequest = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/deny`, body, { headers })
      .then((res) => {
        toast.success("Friend request denied");
        setStatus("STRANGERS");
      })
      .catch(() => toast.error("Error loading post"));
  }

  const unfriend = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/unfriend`, body, { headers })
      .then((res) => {
        toast.success("Unfriended");
        setStatus("STRANGERS");
      })
      .catch(() => toast.error("Error loading post"));
  };

  const unSend = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/unsend`, body, { headers })
      .then((res) => {
        toast.info("Friend request cancelled");
        setStatus("STRANGERS");
      })
      .catch(() => toast.error("Error loading post"));
  };

  const blockuser = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/block`, body, { headers })
      .then((res) => {
        toast.info("User blocked");
        setStatus("BLOCKED");
      })
      .catch(() => toast.error("Error loading post"));
  };

  const unblockUser = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/unblock`, body, { headers })
      .then((res) => {
        toast.success("User UnBlocked");
        setStatus("FRIENDS");
      })
      .catch(() => toast.error("Error loading post"));
  };

  return (
    <div className="flex items-center justify-between p-2">
      {status === "STRANGERS" && (
        <SmallButton onClick={sendFriendRequest} label="Add Friend" />
      )}
      {status === "REQUESTED_TO" && (
        <SmallButton onClick={unSend} label="Unsend Request" />
      )}
      {status === "REQUESTED_BY" && (
        <>
          <SmallButton onClick={acceptFriendRequest} label="Accept Request" />
          <SmallButton onClick={denyFriendRequest} label="Deny Request" />
        </>
      )}
      {status === "FRIENDS" && (
        <>
          <h6 className="text-green-500">Friends</h6>
          <SmallButton onClick={unfriend} label="UnFriend" />
          <SmallButton onClick={blockuser} label="Block User" />
        </>
      )}
      {status === "BLOCKED" && (
        <SmallButton onClick={unblockUser} label="Unblock User" />
      )}
    </div>
  );
};

export default FriendActions;
