import React from "react";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import markDownItClass from "@toycode/markdown-it-class";

import UserTitle from "./atoms/userTitle";
import mapping from "./atoms/mdMapping";

const CreatePost = () => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
  }).use(markDownItClass, mapping);
  const [title, setTitle] = React.useState(
    "jhlj kjhkl jhlkjhkl jhkljhlkjgiljhkjhlkjh lkjhkl hk kjhlkjhlkhlkjhk ljhlkjhhlk yioutyutdgj h jkh"
  );
  const [body, setBody] = React.useState("# hello world");

  const [bodyPreview, setBodyPreview] = React.useState("");
  const [previewMode, setPreviewMode] = React.useState(false);

  const maxTitleLength = 50;
  const maxBodyLength = 1000;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(DOMPurify.sanitize(e.target.value));
  };

  const handlePreview = () => {
    const preview = md.render(body);
    setBodyPreview(preview);
    setPreviewMode(!previewMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > maxTitleLength) {
      toast.error(`Title cannot be more than ${maxTitleLength} characters`);
      return;
    }
    if (body.length > maxBodyLength) {
      toast.error(`Body cannot be more than ${maxBodyLength} characters`);
      return;
    }
    toast.success("Post created successfully");
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-md">
        <UserTitle />
        <div className="flex flex-col bg-gray-100 items-end gap-2 p-4 rounded-b-md">
          {/* create post content */}
          <textarea
            rows="2"
            value={title}
            placeholder="Share something interesting"
            onChange={handleTitleChange}
            className="p-2 rounded-md outline-none w-full resize-none"
          />
          {title.length > maxTitleLength ? (
            <div
              contentEditable={previewMode ? "false" : "true"}
              className="p-2 bg-white rounded-lg w-full outline-none min-h-[150px]"
              dangerouslySetInnerHTML={{
                __html: previewMode ? DOMPurify.sanitize(bodyPreview) : body,
              }}
              data-name="body"
              onChange={handleBodyChange}
              placeholder="Describe"
            />
          ) : null}
          <div className="flex gap-4">
            {title.length > maxTitleLength && body.length > 5 ? (
              <button
                className="bg-green-300 rounded-full p-2 px-4 text-lg font-semibold max-w-[200px]"
                onClick={handlePreview}
              >
                {previewMode ? "Show Text" : "Show Preview"}
              </button>
            ) : null}
            {title.length > 5 ? (
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
