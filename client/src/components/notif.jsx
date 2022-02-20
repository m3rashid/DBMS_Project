import React from "react";

const Notif = ({ username, text }) => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 p-2 py-3 md:px-4 rounded-md flex gap-4 w-full">
        <div className="">
          <img
            className="h-16 w-16 rounded-full"
            src={process.env.REACT_APP_IMG}
            alt={username}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="font-semibold">@{username}</div>
          <div className="">{text}</div>
        </div>
      </div>
    </>
  );
};

export default Notif;
