import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment";

import Table from "./MaterialTable";
import Button from "../atoms/Button";

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
    render: ({ createdAt }) => moment(createdAt).format("MMMM Do YYYY"),
  },
  {
    title: "Updated",
    field: "",
    sorting: false,
    render: ({ updatedAt }) => moment(updatedAt).format("MMMM Do YYYY"),
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
