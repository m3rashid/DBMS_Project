import {
  FaHome,
  FaBell,
  FaBookmark,
  FaUser,
  FaRocketchat,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListItem = ({ link, Icon }) => {
  return (
    <Link to={link}>
      <div className="rounded-md px-4 py-3 my-1 hover:bg-gray-200 dark:hover:bg-gray-700">
        <Icon className="text-gray-600 dark:text-gray-300" size={26} />
      </div>
    </Link>
  );
};

const MobileNav = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="fixed bottom-0 bg-gray-50 dark:bg-gray-900 w-full flex items-center justify-around rounded-t-md md:hidden">
        <ListItem link="/home" Icon={FaHome} />
        <ListItem link="/notifications" Icon={FaBell} />
        <ListItem link="/bookmarks" Icon={FaBookmark} />
        <ListItem link="/chat" Icon={FaRocketchat} />
        <ListItem link={`/user/${user.userID}`} Icon={FaUser} />
      </div>
    </>
  );
};

export default MobileNav;
