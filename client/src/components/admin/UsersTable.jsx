import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Table from "./MaterialTable";
import Button from "../atoms/Button";

const demoData = [
  {
    id: 1,
    name: "Raj",
    email: "raj@gmail.com",
    username: "username",
    reputation: "1",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com",
    username: "username",
    reputation: "2",
  },
  {
    id: 3,
    name: "Ritu",
    email: "ritu@gmail.com",
    username: "username",
    reputation: "6",
  },
  {
    id: 4,
    name: "Rashid",
    email: "rahid@user.com",
    username: "username",
    reputation: "9",
  },
  {
    id: 5,
    name: "Shakir",
    email: "shakir@bbbb.com",
    username: "username",
    reputation: "5",
  },
];

const columns = [
  { title: "Username", field: "username", sorting: false },
  { title: "Name", field: "name", sorting: false },
  { title: "Email", field: "email", sorting: false },
  { title: "Reputation", field: "reputation", sorting: false },
  {
    title: "Actions",
    field: "",
    sorting: false,
    render: () => (
      <div className="flex gap-2 items-center">
        <Button
          Icon={faTrash}
          label="Delete"
          classes="bg-red-500"
          onClick={() => {}}
        />
      </div>
    ),
  },
];

const UsersTable = () => {
  return (
    <>
      <Table columns={columns} data={demoData} Title="Current Users" />
    </>
  );
};

export default UsersTable;
