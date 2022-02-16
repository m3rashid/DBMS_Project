import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBell,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Nav = () => {
  const user = {
    name: "John Doe",
    username: "johndoe",
    img: process.env.REACT_APP_IMG,
  };

  const iconStyles = "text-gray-500 p-4";
  const iconContainerStyles =
    "flex flex-row items-center px-2 rounded-md hover:bg-gray-200 w-full";
  const iconLabelStyles = "block font-semibold";

  return (
    <div className="sticky top-0 h-min">
      <div className="hidden md:flex flex-col rounded-md bg-[white] m-2 p-2 shadow-md">
        {/* profile */}
        <img className="rounded-md" src={user.img} alt="" />
        <div className="mt-2 p-2 hover:bg-gray-200 rounded-md">
          <p className="font-bold">{user.name}</p>
          <p className="">@{user.username}</p>
        </div>
      </div>
      <div className="">
        <div className="hidden sticky m-2 md:flex flex-col bg-[white] rounded-md p-2 h-fit shadow-md mt-4">
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
