import React from "react";
import { AuthWrapper } from "../components/authWrapper";
import Notif from "../components/notif";

const notifs = [
  { username: "username", notif: "thisia kasdflkas dflkasdjf ladf" },
  { username: "user two", notif: "skjdhfkjalsd falksdfakl sdfjhkj " },
  { username: "user three", notif: "skjdhfkjalsd falksdfakl sdfjhkj " },
];

const Notifications = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center gap-4 bg-gray-50 px-2 py-4 rounded-md dark:bg-gray-900 md:w-auto m-[10px]">
        {notifs.map(({ username, notif }, index) => (
          <Notif username={username} text={notif} key={index} />
        ))}
      </div>
    </AuthWrapper>
  );
};

export default Notifications;
