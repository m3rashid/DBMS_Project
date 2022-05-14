import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../loader";

const RightSidebar = ({ fullWidth }) => {
  const topics = useSelector((state) => state.auth.topics);

  return (
    <>
      <div
        className={`sticky top-0 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 p-3 rounded-md h-fit ${
          fullWidth ? "w-full" : "hidden lg:block  m-2"
        }`}
      >
        {!topics ? (
          <>
            <Loader />
            Loading Topics . . .
          </>
        ) : (
          <div
            className={`h-[100%] ${
              fullWidth ? "max-h-[250px]" : "max-h-[500px]"
            } overflow-auto`}
          >
            <h3 className="font-bold text-2xl">Topics</h3>
            {topics.map((topic) => (
              <Link to={"/topic/" + topic.topicID} key={topic.topicID}>
                <div className="my-2 py-2 px-2 mr-4 rounded-md font-medium hover:bg-gray-100 hover:dark:bg-gray-700">
                  # {topic.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RightSidebar;
