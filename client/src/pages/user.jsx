import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";

// to be stored in the database
import { darkMode, lightMode } from "../store/actions/ui.action";
import UserAvatarSettings from "../components/userAvatarSettings";

const User = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const avatarConfig = useSelector((state) => state.avatar);
  const avatarSettings = genConfig(avatarConfig);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch(lightMode());
    } else if (theme === "light") {
      dispatch(darkMode());
    }
  };

  const commons =
    "bg-gray-50 dark:bg-gray-900 p-2 rounded-md relative dark:text-gray-200";
  const buttonStyles =
    "bg-blue-500 text-gray-200 p-2 px-4 rounded-full font-semibold";

  const h3Styles = "font-bold text-xl ml-1 my-3 text-center sm:text-left";

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <div className={`${commons}`}>
          <div className="w-full h-28 z-0 rounded-t-md flex items-start bg-gray-300 dark:bg-gray-800"></div>
          <div className="flex items-center justify-center relative -top-16">
            <Avatar className="h-32 w-32 rounded-full" {...avatarSettings} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <p className="font-bold text-2xl">Demo UserName</p>
            <p className="text-xl">@Username</p>
          </div>
        </div>
        <div className={`${commons}`}>
          <h3 className={h3Styles}>User Details</h3>
        </div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>
          <h3 className={h3Styles}>Customize your avatar</h3>
          <UserAvatarSettings />
        </div>
        <div className={`${commons}`}>
          <button onClick={handleThemeChange} className={buttonStyles}>
            Change theme
          </button>
        </div>
        <div className={`${commons}`}>
          <button className={buttonStyles}>Logout</button>
        </div>
        <div className={`${commons}`}>name</div>
      </div>
    </>
  );
};

export default User;
