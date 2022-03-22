import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "../store/actions/auth.action";

const RightSidebar = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const topics = useSelector((state) => state.auth.topics);

  return (
    <>
      <div className="hidden lg:block sticky top-0 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 p-3 rounded-md m-2 h-fit">
        {!topics ? (
          "Loading Topics . . . "
        ) : (
          <>
            <h3 className="font-bold text-2xl">Topics</h3>
            {topics.map((topic, index) => (
              <div className="py-1 font-medium" key={index}>
                # {topic.name}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default RightSidebar;
