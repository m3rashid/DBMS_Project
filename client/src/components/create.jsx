import React from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import UserTitle from "./atoms/userTitle";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const theme = useSelector((state) => state.ui.theme);
  const topics = useSelector((state) => state.auth.topics);
  const [text, setText] = React.useState({
    title: "",
    body: "",
    topicId: "",
  });

  const handleTopicChange = ({ value }) => {
    setText((prev) => ({
      ...prev,
      topicId: value,
    }));
  };

  const maxTitleLength = 50;
  const maxBodyLength = 1000;

  const handleChange = (e) => {
    setText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const options = React.useMemo(() => {
    return topics.reduce((acc, curr) => {
      return [...acc, { value: curr.topicID, label: curr.name }];
    }, []);
  }, [topics]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.title.length > maxTitleLength) {
      toast.error(`Title cannot be more than ${maxTitleLength} characters`);
      return;
    }
    if (text.body.length > maxBodyLength) {
      toast.error(`Body cannot be more than ${maxBodyLength} characters`);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col w-full bg-gray-50 dark:bg-gray-900 rounded-md shadow-md">
        <UserTitle />
        <div className="flex flex-col bg-gray-200 dark:bg-gray-800 items-end gap-2 p-4 rounded-b-md">
          <textarea
            rows="2"
            value={text.title}
            name="title"
            placeholder="Share something interesting"
            onChange={handleChange}
            className="p-2 rounded-md outline-none w-full resize-none bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
          />
          {text.title.length > maxTitleLength ? (
            <textarea
              style={{ whiteSpace: "pre-wrap" }}
              className="p-2 rounded-lg w-full outline-none min-h-[150px] bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              value={text.body}
              name="body"
              onChange={handleChange}
              placeholder="Describe"
            />
          ) : null}
          <div className="flex gap-4">
            {text.title.length > 5 ? (
              <>
                <Select
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      color: theme === "dark" ? "white" : "black",
                    }),
                    container: (base) => ({
                      ...base,
                      color: theme === "dark" ? "white" : "black",
                    }),
                  }}
                  className=""
                  placeholder="Select Topic"
                  options={options}
                  name="topicId"
                  onChange={handleTopicChange}
                  value={text.topicId}
                />
                <button
                  className="bg-blue-500 text-gray-200 rounded-full p-2 px-4 text-lg font-semibold max-w-[200px]"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
