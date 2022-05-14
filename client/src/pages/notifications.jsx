import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Notif from "../components/user/notif";
import { SERVER_ROOT_URL } from "../store/constants";
import { headers } from "../hooks/globals";
import Loader from "../components/loader";

const getText = (notif, loggedInUserID) => {
  switch (notif.status) {
    case "REQUESTED":
      return notif.fromID === loggedInUserID
        ? `You sent ${notif.firstName} a friend request`
        : `${notif.firstName} sent you a friend request`;
    case "FRIENDS":
      return `You and ${notif.firstName} became friends`;
    case "BLOCKED_TO":
      return notif.fromID === loggedInUserID
        ? `You blocked ${notif.firstName}`
        : `You were blocked by ${notif.firstName}`;
    case "BLOCKED_BY":
      return notif.fromID === loggedInUserID
        ? `You were blocked by ${notif.firstName}`
        : `You blocked ${notif.firstName}`;
    default:
      return "Good to see you bro";
  }
};

const Notifications = () => {
  const auth = useSelector((state) => state.auth);
  const loggedInUserID = auth.user.userID;

  const [notifs, setNotifs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const body = JSON.stringify({ userId: loggedInUserID });
    axios
      .post(`${SERVER_ROOT_URL}/notifs`, body, { headers })
      .then((res) => setNotifs(res.data.notifs))
      .catch((err) => toast.error("Error loading post"))
      .finally(() => setLoading(false));

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        {loading ? (
          <Loader />
        ) : notifs.length > 0 ? (
          notifs.map((notif, index) => {
            const text = getText(notif, loggedInUserID);
            return (
              <Notif
                notif={{ ...notif, text }}
                key={index}
                bgColor="bg-gray-800"
                isNotification={true}
              />
            );
          })
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
