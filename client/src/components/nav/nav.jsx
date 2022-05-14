import {
  FaHome,
  FaBell,
  FaBookmark,
  FaUser,
  FaRocketchat,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";

const ListItem = ({ link, label, Icon }) => {
  return (
    <Link to={link}>
      <div className="flex flex-row items-center px-2 py-2 mb-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 w-full">
        <Icon className="text-gray-600 dark:text-gray-300 mr-3" size={22} />
        <p className="block font-semibold dark:text-gray-300">{label}</p>
      </div>
    </Link>
  );
};

const Nav = () => {
  const auth = useSelector((state) => state.auth);
  const avatarSettings = genConfig(auth.avatar);
  const user = auth.user;

  return (
    <div className="sticky top-0 h-min">
      <div className="hidden md:flex flex-col rounded-md bg-gray-50 dark:bg-gray-900 m-2 p-2 shadow-md">
        <Avatar
          className="rounded-md h-44 lg:h-56"
          shape="rounded"
          {...avatarSettings}
        />
        <Link to={`/user/${user.userID}`}>
          <div className="mt-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <p className="font-bold text-2xl dark:text-gray-200">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="dark:text-gray-200 text-lg">@{user.userName}</p>
          </div>
        </Link>
      </div>
      <div className="">
        <div className="hidden sticky m-2 md:flex flex-col bg-gray-50 dark:bg-gray-900 rounded-md p-2 h-fit shadow-md mt-4">
          <ListItem link="/home" label="Home" Icon={FaHome} />
          <ListItem link="/notifications" label="Notifications" Icon={FaBell} />
          <ListItem link="/bookmarks" label="Bookmarks" Icon={FaBookmark} />
          <ListItem link="/chat" label="Global Chat" Icon={FaRocketchat} />
          <ListItem
            link={`/user/${user.userID}`}
            label="Profile"
            Icon={FaUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
