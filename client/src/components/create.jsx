import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import UserTitle from "./atoms/userTitle";

const CreatePost = () => {
  const theme = useSelector((state) => state.ui.theme);
  const [text, setText] = React.useState({
    title: "",
    body: "",
  });

  const maxTitleLength = 50;
  const maxBodyLength = 1000;

  const handleChange = (e) => {
    setText((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
    toast.success("Post created successfully");
  };

  return (
    <>
      <div className={`flex flex-col w-full bg-${theme.l3} rounded-md`}>
        <UserTitle />
        <div
          className={`flex flex-col bg-${theme.l2} items-end gap-2 p-4 rounded-b-md`}
        >
          <textarea
            rows="2"
            value={text.title}
            name="title"
            placeholder="Share something interesting"
            onChange={handleChange}
            className={`p-2 rounded-md outline-none w-full resize-none bg-${theme.l1}`}
          />
          {text.title.length > maxTitleLength ? (
            <textarea
              style={{ whiteSpace: "pre-wrap" }}
              className={`p-2 rounded-lg w-full outline-none min-h-[150px] bg-${theme.l1}`}
              value={text.body}
              name="body"
              onChange={handleChange}
              placeholder="Describe"
            />
          ) : null}
          <div className="flex gap-4">
            {text.title.length > 5 ? (
              <button
                className="bg-green-300 rounded-full p-2 px-4 text-lg font-semibold max-w-[200px]"
                onClick={handleSubmit}
              >
                Post
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
