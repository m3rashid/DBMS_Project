import React from "react";
import Select from "react-select";

import Loader from "../loader";
import UserTitle from "../atoms/userTitle";
import usePost from "../../hooks/usePost";

const CreatePost = () => {
  const {
    state: { text, avatar, user, options, loading },
    handleChange,
    handleSubmit,
    handleTopicChange,
  } = usePost();

  const [topicState, setTopicState] = React.useState([
    { label: "topic", value: "" },
  ]);

  return (
    <>
      <div className="flex flex-col w-full bg-gray-50 dark:bg-gray-900 rounded-md shadow-md">
        <UserTitle user={user} avatar={avatar} />
        {loading && <Loader />}
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 items-end gap-2 p-4 rounded-b-md">
          {!loading && (
            <textarea
              rows="2"
              value={text.title}
              name="title"
              placeholder="Share something interesting"
              onChange={handleChange}
              className="p-2 rounded-md outline-none w-full resize-none bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
            />
          )}

          {!loading && text.title.length > 5 && (
            <>
              <textarea
                style={{ whiteSpace: "pre-wrap" }}
                className="p-2 rounded-lg w-full outline-none min-h-[150px] bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                value={text.body}
                name="body"
                onChange={handleChange}
                placeholder="Describe"
              />
              <div className="flex flex-col w-full gap-2 my-2">
                <div>
                  {!loading && (
                    <Select
                      styles={{
                        control: (base) => ({ ...base, border: "none" }),
                      }}
                      className=""
                      classNamePrefix="bg-gray-200 dark:bg-gray-700 text-black dark:text-white outline-none"
                      placeholder="Select Topic"
                      options={options}
                      name="topicId"
                      onChange={(e) => handleTopicChange(e)}
                      value={topicState[0][text.topicId]}
                    />
                  )}
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-gray-200 rounded-full p-2 px-4 text-lg font-semibold max-w-[200px]"
                    onClick={handleSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
