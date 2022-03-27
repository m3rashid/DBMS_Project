import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment";

import Table from "./MaterialTable";
import Button from "../atoms/Button";
import deleteUser from "../../hooks/deleteUser";

const columns = [
  { title: "Username", field: "userName", sorting: false },
  {
    title: "Name",
    field: "",
    sorting: false,
    render: ({ firstName, lastName }) => firstName + " " + lastName,
  },
  { title: "Email", field: "email", sorting: false },
  {
    title: "Phone",
    field: "",
    sorting: false,
    render: ({ phNumber }) => phNumber || "-",
  },
  {
    title: "Reputation",
    field: "",
    sorting: false,
    render: ({ reputation }) => <div>{reputation || "-"}</div>,
  },
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
    render: ({ userID, avatarID }) => (
      <div className="flex gap-2 items-center">
        <Button
          Icon={faTrash}
          label="Delete"
          classes="bg-red-500"
          onClick={() => deleteUser(userID, avatarID)}
        />
      </div>
    ),
  },
];

const UsersTable = () => {
  // TODO make it autorefreshable
  const users = useSelector((state) => state.auth.users);
  return (
    <>
      <Table columns={columns} data={users} Title="Users" />
    </>
  );
};

export default UsersTable;
