import moment from "moment";
import React from "react";
import Avatar from "react-nice-avatar";

const getToxicityColorCode = (toxicity) => {
  if (!toxicity) {
    return;
  } else if (toxicity < 0.1) {
    return "bg-green-500";
  } else if (toxicity < 0.3) {
    return "bg-yellow-200";
  } else if (toxicity < 0.5) {
    return "bg-yellow-500";
  } else if (toxicity < 0.7) {
    return "bg-orange-500";
  } else {
    return "bg-red-500";
  }
};

const UserTitle = ({ post, user, avatar, classification }) => {
  const [cOpen, setCOpen] = React.useState(false);

  if (!user || !avatar) {
    return null;
  }

  return (
    <div className="flex items-center w-full py-3 pl-4 shadow-md relative">
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
      {post && post.reputation && (
        <>
          <div
            className={`absolute right-6 h-8 w-8 rounded-full ${getToxicityColorCode(
              post.reputation
            )} cursor-pointer`}
            onClick={() => setCOpen(!cOpen)}
          ></div>
          {cOpen && (
            <div
              className="absolute bg-gray-300 dark:bg-gray-600 dark:text-white p-2 rounded-md top-10 right-10"
              onClick={() => setCOpen(!cOpen)}
            >
              {Object.entries(classification).map(([key, value]) => (
                <p key={key}>
                  {key}: {parseFloat(value).toFixed(2)}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTitle;
