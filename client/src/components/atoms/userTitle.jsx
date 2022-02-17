import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";

const UserTitle = ({ time }) => {
  const avatarConfig = useSelector((state) => state.avatar);
  const avatarSettings = genConfig(avatarConfig);

  return (
    <div className="flex items-center w-full py-3 pl-4 shadow-md">
      <Avatar className="h-16 w-16" {...avatarSettings} />
      <div className="ml-4 dark:text-gray-200">
        <p className="font-bold">Demo User name</p>
        <p className="">@username {time && `on ${time}`}</p>
      </div>
    </div>
  );
};

export default UserTitle;
