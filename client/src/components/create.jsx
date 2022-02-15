import React from "react";
import { toast } from "react-toastify";

import UserTitle from "./atoms/userTitle";

const CreatePost = () => {
  const [text, setText] = React.useState({
    title: "",
    body: "",
  });

  const maxTitleLength = 50;
  const maxBodyLength = 1000;

  const inputCharLength = (prop, len) => {
    return text[prop].length > len;
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
      <div className="flex flex-col w-full bg-[white] rounded-md">
        <UserTitle />
        <div className="flex flex-col items-end gap-2 p-4 rounded-b-md">
          {/* create post content */}
          <textarea
            rows="2"
            value={text.title}
            placeholder="Share something interesting"
            onChange={(e) => setText({ ...text, title: e.target.value })}
            className="p-2 rounded-md outline-none w-full resize-none"
          />
          {/* show only if input has text more than 50 characters */}
          {inputCharLength("title", maxTitleLength) ? (
            <textarea
              className="p-2 rounded-lg w-full outline-none"
              value={text.body}
              onChange={(e) => setText({ ...text, body: e.target.value })}
              placeholder="Describe"
              rows="5"
            />
          ) : null}
          {inputCharLength("title", 5) ? (
            <button
              className="bg-green-300 rounded-full p-2 px-4 text-lg font-semibold max-w-[200px]"
              onClick={handleSubmit}
            >
              Create Post
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
