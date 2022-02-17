import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBell,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const iconStyles = "text-gray-600 dark:text-gray-300";
  const divStyles =
    "rounded-md px-4 py-3 my-1 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <>
      <div className="fixed bottom-0 bg-gray-50 dark:bg-gray-900 w-full flex items-center justify-around rounded-t-md md:hidden">
        <div className={divStyles}>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} size="xl" className={iconStyles} />
          </Link>
        </div>
        <div className={divStyles}>
          <Link to="/explore">
            <FontAwesomeIcon
              icon={faCompass}
              size="xl"
              className={iconStyles}
            />
          </Link>
        </div>
        <div className={divStyles}>
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} size="xl" className={iconStyles} />
          </Link>
        </div>
        <div className={divStyles}>
          <Link to="/bookmarks">
            <FontAwesomeIcon
              icon={faBookmark}
              size="xl"
              className={iconStyles}
            />
          </Link>
        </div>
        <div className={divStyles}>
          <Link to="/user">
            <FontAwesomeIcon icon={faUser} size="xl" className={iconStyles} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
