import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBell,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";

const Nav = () => {
  const avatarConfig = useSelector((state) => state.avatar);
  const avatarSettings = genConfig(avatarConfig);

  const user = {
    name: "John Doe",
    username: "johndoe",
  };

  const iconStyles = "dark:text-gray-300 p-4";
  const iconContainerStyles =
    "flex flex-row items-center px-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 w-full";
  const iconLabelStyles = "block font-semibold dark:text-gray-300";

  return (
    <div className="sticky top-0 h-min">
      <div className="hidden md:flex flex-col rounded-md bg-gray-50 dark:bg-gray-900 m-2 p-2 shadow-md">
        <Avatar
          className="rounded-md h-44 lg:h-56"
          shape="rounded"
          {...avatarSettings}
        />
        <div className="mt-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <p className="font-bold text-2xl dark:text-gray-200">{user.name}</p>
          <p className="dark:text-gray-200 text-lg">@{user.username}</p>
        </div>
      </div>
      <div className="">
        <div className="hidden sticky m-2 md:flex flex-col bg-gray-50 dark:bg-gray-900 rounded-md p-2 h-fit shadow-md mt-4">
          <Link to="/home">
            <div className={iconContainerStyles}>
              <FontAwesomeIcon icon={faHome} size="xl" className={iconStyles} />
              <p className={iconLabelStyles}>Home</p>
            </div>
          </Link>
          <Link to="/explore">
            <div className={iconContainerStyles}>
              <FontAwesomeIcon
                icon={faCompass}
                size="xl"
                className={iconStyles}
              />
              <p className={iconLabelStyles}>Explore</p>
            </div>
          </Link>
          <Link to="/notifications">
            <div className={iconContainerStyles}>
              <FontAwesomeIcon icon={faBell} size="xl" className={iconStyles} />
              <p className={iconLabelStyles}>Notifications</p>
            </div>
          </Link>
          <Link to="/bookmarks">
            <div className={iconContainerStyles}>
              <FontAwesomeIcon
                icon={faBookmark}
                size="xl"
                className={iconStyles}
              />
              <p className={iconLabelStyles}>Bookmarks</p>
            </div>
          </Link>
          <Link to="/user">
            <div className={iconContainerStyles}>
              <FontAwesomeIcon icon={faUser} size="xl" className={iconStyles} />
              <p className={iconLabelStyles}>Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;