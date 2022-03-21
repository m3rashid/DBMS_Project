import { useSelector } from "react-redux";

const RightSidebar = () => {
  const topics = useSelector((state) => Object.values(state.auth.topics));

  return (
    <>
      <div className="hidden lg:block sticky top-0 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 p-3 rounded-md m-2 h-fit">
        {topics &&
          topics.map((topic) => <p key={topic.topicID}>{topic.name}</p>)}
      </div>
    </>
  );
};

export default RightSidebar;
