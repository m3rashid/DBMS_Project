import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment";

import Table from "./MaterialTable";
import Button from "../atoms/Button";
import usePost from "../../hooks/usePost";

const ActionButtons = ({ postID }) => {
  const { deletePost } = usePost();
  return (
    <div className="flex gap-2 items-center">
      <Button
        Icon={faTrash}
        label="Delete"
        classes="bg-red-500"
        onClick={() => {
          deletePost(postID);
        }}
      />
    </div>
  );
};

const columns = [
  {
    title: "Title",
    field: "",
    sorting: false,
    render: ({ title }) => title.substring(0, 30),
  },
  {
    title: "Body",
    field: "",
    sorting: false,
    render: ({ description }) =>
      description ? description.substring(0, 30) : "-",
  },
  { title: "Likes", field: "likes", sorting: false },
  { title: "Comments", field: "commentsCount", sorting: false },
  {
    title: "Created",
    field: "",
    sorting: false,
    render: ({ createdAt }) => moment(createdAt).format("lll"),
  },
  {
    title: "Updated",
    field: "",
    sorting: false,
    render: ({ updatedAt }) => moment(updatedAt).format("lll"),
  },
  {
    title: "Actions",
    field: "",
    sorting: false,
    render: ({ postID }) => <ActionButtons postID={postID} />,
  },
];

const PostsTable = () => {
  const posts = useSelector((state) => state.auth.posts);
  return (
    <>
      <Table columns={columns} data={posts} Title="Posts" />
    </>
  );
};

export default PostsTable;
