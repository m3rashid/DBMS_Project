import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faBookmark,
  faUser,
  // faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const user = useSelector((state) => state.auth.user);

  const iconStyles = "text-gray-600 dark:text-gray-300";
  const divStyles =
    "rounded-md px-4 py-3 my-1 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <>
      <div className="fixed bottom-0 bg-gray-50 dark:bg-gray-900 w-full flex items-center justify-around rounded-t-md md:hidden">
        <Link to="/home">
          <div className={divStyles}>
            <FontAwesomeIcon icon={faHome} size="xl" className={iconStyles} />
          </div>
        </Link>
        <Link to="/notifications">
          <div className={divStyles}>
            <FontAwesomeIcon icon={faBell} size="xl" className={iconStyles} />
          </div>
        </Link>
        <Link to="/bookmarks">
          <div className={divStyles}>
            <FontAwesomeIcon
              icon={faBookmark}
              size="xl"
              className={iconStyles}
            />
          </div>
        </Link>
        {/* <Link to="/chat">
          <div className={divStyles}>
            <FontAwesomeIcon
              icon={faMessage}
              size="xl"
              className={iconStyles}
            />
          </div>
        </Link> */}
        <Link to={`/user/${user.userID}`}>
          <div className={divStyles}>
            <FontAwesomeIcon icon={faUser} size="xl" className={iconStyles} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
