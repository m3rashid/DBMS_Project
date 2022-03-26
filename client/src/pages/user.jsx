import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import moment from "moment";

import { darkMode, lightMode } from "../store/actions/ui.action";
import UserAvatarSettings from "../components/userAvatarSettings";
import { logout } from "../store/actions/auth.action";
import { AuthWrapper } from "../components/authWrapper";
import { useNavigate } from "react-router-dom";

const User = () => {
  // const [gotUser, setGotUser] = React.useState();
  // const { userId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth = useSelector((state) => state.auth);
  const avatarSettings = genConfig(auth.avatar);
  const user = auth.user;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch(lightMode());
    } else if (theme === "light") {
      dispatch(darkMode());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const commons =
    "bg-gray-50 dark:bg-gray-900 p-2 rounded-md relative dark:text-gray-200";
  const buttonStyles =
    "bg-blue-500 text-gray-200 p-2 px-4 rounded-full font-semibold";

  const h3Styles = "font-bold text-xl ml-1 my-3 text-center sm:text-left";

  return (
    <AuthWrapper>
      <div className="flex flex-col gap-4 p-2">
        <div className={`${commons}`}>
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
        <div className={`${commons}`}>
          <h3 className={h3Styles}>User Details</h3>
          <p>Member Since: {moment(user.createdAt).format("MMMM Do YYYY")}</p>
          <p>Last Changed: {moment(user.updatedAt).format("MMMM Do YYYY")}</p>
          {user.dob && <p>{user.dob}</p>}
          <p>Email: {user.email}</p>
          {user.phNumber && <p>Phone: {user.phNumber}</p>}
          {user.reputation && <p>Reputation: {user.reputation}</p>}
        </div>
        <div className={`${commons}`}>
          <h3 className={h3Styles}>Customize your avatar</h3>
          <UserAvatarSettings />
        </div>
        <div className={`${commons}`}>
          <div className="flex gap-4 justify-center my-3 mb-4">
            <button
              onClick={handleThemeChange}
              className={`${buttonStyles} w-[170px]`}
            >
              {theme === "dark" ? "Use Light Theme" : "Use Dark Theme"}
            </button>
            <button
              className={`${buttonStyles} w-[100px]`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className={`${commons} text-center`}>
            JMI Connect &copy; {moment(new Date()).format("YYYY")}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default User;
