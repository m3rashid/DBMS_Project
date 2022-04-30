import React from "react";

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

const FriendActions = () => {
  const sendFriendRequest = () => {};
  const blockuser = () => {};

  return (
    <div className="flex items-center justify-between p-2">
      <SmallButton onClick={sendFriendRequest} label="Add Friend" />
      <SmallButton onClick={blockuser} label="Block User" />
    </div>
  );
};

export default FriendActions;
