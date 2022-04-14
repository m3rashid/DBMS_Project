import React from "react";
import Notif from "../components/user/notif";

const notifs = [];

const Notifications = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
    </>
  );
};

export default Notifications;
