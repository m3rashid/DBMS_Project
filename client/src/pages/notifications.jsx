import React from "react";
import { AuthWrapper } from "../components/authWrapper";
import Notif from "../components/notif";

const notifs = [];

const Notifications = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        {notifs.length > 0 ? (
          notifs.map(({ username, notif }, index) => (
            <Notif username={username} text={notif} key={index} />
          ))
        ) : (
          <div className="text-2xl mt-10 text-center">
            No Notifications found
          </div>
        )}
      </div>
    </AuthWrapper>
  );
};

export default Notifications;
