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

  const sendFriendRequest = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/send`, body, { headers })
      .then((res) => setStatus("REQUESTED"))
      .catch(() => toast.error("Error loading post"));
  };

  const unfriend = () => {};

  const unSend = () => {
    const body = JSON.stringify({ fromID, toID });
    axios
      .post(`${SERVER_ROOT_URL}/friendship/unsend`, body, { headers })
      .then((res) => setStatus(""))
      .catch(() => toast.error("Error loading post"));
  };

  const blockuser = () => {};

  return (
    <div className="flex items-center justify-between p-2">
      {status === "" && (
        <SmallButton onClick={sendFriendRequest} label="Add Friend" />
      )}
      {status === "REQUESTED" && (
        <SmallButton onClick={unSend} label="Unsend Request" />
      )}
      {status === "FRIENDS" && (
        <SmallButton onClick={unfriend} label="Friends" />
      )}
      <SmallButton onClick={blockuser} label="Block User" />
    </div>
  );
};

export default FriendActions;
