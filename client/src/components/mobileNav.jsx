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
  const iconStyles = "text-gray-500 p-4";

  return (
    <>
      <div className="fixed bottom-0 bg-[white] w-full flex items-center justify-around rounded-t-md md:hidden">
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} size="xl" className={iconStyles} />
        </Link>
        <Link to="/explore">
          <FontAwesomeIcon icon={faCompass} size="xl" className={iconStyles} />
        </Link>
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} size="xl" className={iconStyles} />
        </Link>
        <Link to="/bookmarks">
          <FontAwesomeIcon icon={faBookmark} size="xl" className={iconStyles} />
        </Link>
        <Link to="/user">
          <FontAwesomeIcon icon={faUser} size="xl" className={iconStyles} />
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
