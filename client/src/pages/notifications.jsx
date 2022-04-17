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
          <h3 className="text-center dark:text-gray-200 font-semibold text-2xl">
            No Notifications found
          </h3>
        )}
      </div>
    </>
  );
};

export default Notifications;
