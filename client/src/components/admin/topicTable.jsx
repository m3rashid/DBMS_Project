import React from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment";

import Table from "./MaterialTable";
import Button from "../atoms/Button";
import deleteTopic from "../../hooks/deleteTopic";

const columns = [
  { title: "Topic", field: "name", sorting: false },
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
    render: ({ topicID }) => (
      <div className="flex gap-2 items-center">
        <Button
          Icon={faTrash}
          label="Delete"
          classes="bg-red-500"
          onClick={() => {deleteTopic(topicID)}}
        />
        <Button
          Icon={faEdit}
          label="Edit"
          classes="bg-blue-500"
          onClick={() => {}}
        />
      </div>
    ),
  },
];

const TopicTable = () => {
  // TODO make it autorefreshable
  const topics = useSelector((state) => state.auth.topics);
  return (
    <>
      <Table columns={columns} data={topics} Title="Topics" />
    </>
  );
};

export default TopicTable;
