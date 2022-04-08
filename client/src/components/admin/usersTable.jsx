import React from "react";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import moment from "moment";

import { Table } from "./table";
import Button from "../atoms/Button";
import useDeleteUser from "../../hooks/useDeleteUser";

export const UserTable = () => {
  const { deleteUser } = useDeleteUser();
  const users = useSelector((state) => state.auth.users);
  const columns = React.useMemo(
    () => [
      {
        Header: "Username",
        accessor: "userName",
        Cell: ({ cell }) => <>{cell.row.original.userName}</>,
      },
      {
        Header: "Name",
        accessor: "",
        Cell: ({ cell }) => (
          <>{cell.row.original.firstName + " " + cell.row.original.lastName}</>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell }) => <>{cell.row.original.email}</>,
      },
      {
        Header: "Phone",
        accessor: "phNumber",
        Cell: ({ cell }) => <>{cell.row.original.phNumber || "--"}</>,
      },
      {
        Header: "Reputation",
        accessor: "reputation",
        Cell: ({ cell }) => <>{cell.row.original.reputation || "--"}</>,
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
          <ActionButtons
            userID={cell.row.original.userID}
            avatarID={cell.row.original.avatarID}
          />
        ),
      },
    ],
    []
  );

  const ActionButtons = ({ userID, avatarID }) => (
    <div className="flex gap-2 items-center">
      <Button
        Icon={<FaTrash />}
        label="Delete"
        classes="bg-red-500"
        onClick={() => deleteUser(userID, avatarID)}
      />
    </div>
  );

  return <Table columns={columns} data={users} title="Users" />;
};
