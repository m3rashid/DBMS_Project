const UserTitle = ({ time }) => {
  return (
    <div className="flex items-center w-full py-3 pl-4 shadow-md">
      <img
        className="h-16 w-16 rounded-full"
        src={process.env.REACT_APP_IMG}
        alt=""
      />
      <div className="ml-4 dark:text-gray-200">
        <p className="font-bold">Demo User name</p>
        <p className="">@username {time && `on ${time}`}</p>
      </div>
    </div>
  );
};

export default UserTitle;
