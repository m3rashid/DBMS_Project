import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { MdPerson, MdTag } from "react-icons/md";
import { toast } from "react-toastify";

import { SERVER_ROOT_URL } from "../store/constants";

export const SearchBox = () => {
  const [topics, setTopics] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const handleChange = async (e) => {
    if (e.target.value === "") {
      setTopics([]);
      setUsers([]);
    } else {
      try {
        const res = await axios.post(
          `${SERVER_ROOT_URL}/search`,
          JSON.stringify({ search: e.target.value }),
          { headers: { "Content-Type": "application/json" } }
        );
        const data = await res.data;
        const { topics, users } = data;
        setTopics(topics);
        setUsers(users);
      } catch (err) {
        toast.error("Error searching ...");
      }
    }
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  return (
    <form className="w-full mx-4">
      <input
        type="text"
        placeholder="Search people"
        onChange={debouncedResults}
        className="w-full md:w-auto pl-4 py-2 rounded-3xl outline-0 text-lg bg-gray-50 dark:bg-gray-700 outline-none dark:text-gray-200"
      />
      {(users.length > 0 || topics.length > 0) && (
        <div className="relative w-full h-full top-2 -left-4 sm:left-0">
          <div className="absolute bg-gray-50 dark:bg-gray-800 dark:text-gray-200 rounded-md w-[94vw] sm:w-full p-4 shadow-md dark:shadow-black max-h-[350px] overflow-auto hide-scrollbar">
            {users.length > 0 &&
              users.map(({ userID, userName }) => (
                <Link to={`/user/${userID}`} key={userID}>
                  <p className="flex items-center gap-2 p-1 hover:bg-gray-700 cursor-pointer rounded-md">
                    <MdPerson size={20} />
                    {userName}
                  </p>
                </Link>
              ))}
            {topics.length > 0 &&
              topics.map(({ topicID, name }) => (
                <Link to={`/topic/${topicID}`} key={topicID}>
                  <p className="flex items-center gap-2 p-1 hover:bg-gray-700 cursor-pointer rounded-md">
                    <MdTag size={20} />
                    {name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </form>
  );
};
