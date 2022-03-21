import moment from "moment";
import Avatar from "react-nice-avatar";

const UserTitle = ({ post, user, avatar }) => {
  if (!user || !avatar) {
    return null;
  }
  return (
    <div className="flex items-center w-full py-3 pl-4 shadow-md">
      <Avatar className="h-16 w-16" {...avatar} />
      <div className="ml-4 dark:text-gray-200">
        <p className="font-bold">
          {user.firstName} {user.lastName}
        </p>
        <p className="">
          @{user.userName}{" "}
          {post && "on " + moment(post.updatedAt).format("LLLL")}
        </p>
      </div>
    </div>
  );
};

export default UserTitle;
