import React from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";

import useTopic from "../../hooks/useTopic";
import { Table } from "./table";
import Button from "../atoms/Button";

export const TopicTable = () => {
  const { deleteTopic } = useTopic();
  const topics = useSelector((state) => state.auth.topics);
  const columns = React.useMemo(
    () => [
      {
        Header: "Topic",
        accessor: "name",
        Cell: ({ cell }) => <>{cell.row.original.name}</>,
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: ({ cell }) => (
          <>{moment(cell.row.original.createdAt).format("lll")}</>
        ),
      },
      {
        Header: "Updated",
        accessor: "updatedAt",
        Cell: ({ cell }) => (
          <>{moment(cell.row.original.updatedAt).format("lll")}</>
        ),
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: ({ cell }) => (
          <ActionButtons topicID={cell.row.original.topicID} />
        ),
      },
    ],
    []
  );

  const ActionButtons = ({ topicID }) => (
    <div className="flex gap-2 items-center">
      <Button
        Icon={<FaTrash />}
        label="Delete"
        classes="bg-red-500"
        onClick={() => {
          deleteTopic(topicID);
        }}
      />
      <Button
        Icon={<FaEdit />}
        label="Edit"
        classes="bg-blue-500"
        onClick={() => {}}
      />
    </div>
  );

  return <Table columns={columns} data={topics} title="Topics" />;
};
