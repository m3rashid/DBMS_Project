import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { darkMode, lightMode } from "../store/actions/ui.action";
import UserAvatarSettings from "../components/user/userAvatarSettings";
import { logout } from "../store/actions/auth.action";
import { toast } from "react-toastify";
import { SERVER_ROOT_URL, tokenConfig } from "../store/constants";
import Loader from "../components/loader";
import FriendActions, { SmallButton } from "../components/user/profile";
import ChangePassword from "../components/user/changePassword";
import EditProfileDetails from "../components/user/editProfile";

const User = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const [isMe, setIsMe] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);

  const getAnotherUser = async (userId) => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/auth/other-user`,
        JSON.stringify({ userId }),
        tokenConfig()
      );
      const data = await res.data;
      setOtherUser(data);
    } catch (err) {
      toast.error(err.message || "Error in getting data");
    }
  };

  React.useEffect(() => {
    const userId = location.pathname.split("/")[2];
    if (userId === auth.user.userID) {
      setIsMe(true);
    } else {
      setIsMe(false);
      getAnotherUser(userId);
    }
  }, [location.pathname, auth.user.userID]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  if (!isMe && !otherUser) {
    return <Loader />;
  }

  const user = isMe ? auth.user : otherUser.user;
  const avatarSettings = genConfig(isMe ? auth.avatar : otherUser.avatar);

  const handleThemeChange = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const Tr = ({ label, data }) => {
    return (
      <tr>
        <td className="pr-4">{label}</td>
        <td>{data}</td>
      </tr>
    );
  };

  const commons =
    "bg-gray-50 dark:bg-gray-900 p-2 rounded-md relative dark:text-gray-200";
  const h3Styles = "font-bold text-xl ml-1 my-3 text-center sm:text-left";

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className={commons}>
        <div className="w-full h-28 z-0 rounded-t-md flex items-start bg-gray-300 dark:bg-gray-800"></div>
        <div className="flex items-center justify-center relative -top-16">
          <Avatar className="h-32 w-32 rounded-full" {...avatarSettings} />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-bold text-2xl">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="text-xl">{`@${user.userName}`}</p>
        </div>
      </div>
      <div className={commons}>
        <h3 className={h3Styles}>User Details</h3>
        <table>
          <tbody>
            <Tr
              label="Member Since"
              data={moment(user.createdAt).format("MMMM Do YYYY")}
            />
            <Tr label="Email" data={user.email} />
            <Tr
              label="Last Changed"
              data={moment(user.updatedAt).format("MMMM Do YYYY")}
            />
            {user.dob ? (
              <Tr
                label="Date of Birth"
                data={moment(user.dob).format("MMMM Do YYYY")}
              />
            ) : null}
            {user.phNumber ? (
              <Tr label="Mobile Number" data={user.phNumber} />
            ) : null}
            {user.reputation ? (
              <Tr label="Reputation" data={user.reputation} />
            ) : null}
          </tbody>
        </table>
      </div>
      {isMe ? (
        <>
          <div className={commons}>
            <UserAvatarSettings />
          </div>
          <div className={commons}>
            <ChangePassword />
          </div>
          <div className={commons}>
            <EditProfileDetails />
          </div>
        </>
      ) : (
        <div className={commons}>
          <FriendActions />
        </div>
      )}
      <div className={commons}>
        {isMe && (
          <div className="flex gap-4 justify-between my-3 px-4">
            <SmallButton
              label={theme === "dark" ? "Use Light Theme" : "Use Dark Theme"}
              onClick={handleThemeChange}
            />
            <SmallButton onClick={handleLogout} label="Logout" />
          </div>
        )}
        <div className={`${commons} text-center`}>
          JMI Connect &copy; {moment(new Date()).format("YYYY")}
        </div>
      </div>
    </div>
  );
};

export default User;
