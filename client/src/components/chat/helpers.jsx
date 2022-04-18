import React from "react";
import moment from "moment";

export const SentMessage = ({ chat }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-md shadow-md p-2 self-end min-w-[150px] max-w-[320px]">
        {/* <p className="font-semibold">@{chat.userName}</p> */}
        {chat.message}
      </div>
      <p className="text-gray-500 self-end">
        {moment(chat.createdAt).format("DD-MMM hh:mm a")}
      </p>
    </div>
  );
};

export const ReceivedMessage = ({ chat }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="dark:bg-gray-700 dark:text-gray-200 p-2 self-start rounded-md shadow-md  min-w-[150px] max-w-[320px]">
        <p className="font-semibold">@{chat.userName}</p>
        {chat.message}
      </div>
      <p className="text-gray-500">
        {moment(chat.createdAt).format("DD-MMM hh:mm a")}
      </p>
    </div>
  );
};
