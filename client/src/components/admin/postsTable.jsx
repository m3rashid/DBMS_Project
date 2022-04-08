import React from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";

import { Table } from "./table";
import usePost from "../../hooks/usePost";
import Button from "../atoms/Button";

export const PostsTable = () => {
  const { deletePost } = usePost();
  const posts = useSelector((state) => state.auth.posts);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell }) => <>{cell.row.original.title.substring(0, 30)}</>,
      },
      {
        Header: "Body",
        accessor: "description",
        Cell: ({ cell }) => (
          <>{cell.row.original.description.substring(0, 30)}</>
        ),
      },
      {
        Header: "Likes",
        accessor: "likes",
        Cell: ({ cell }) => <>{cell.row.original.likes}</>,
      },
      {
        Header: "Comments",
        accessor: "commentsCount",
        Cell: ({ cell }) => <>{cell.row.original.commentsCount}</>,
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
        Cell: ({ cell }) => <ActionButtons postID={cell.row.original.postID} />,
      },
    ],
    []
  );

  const ActionButtons = ({ postID }) => (
    <div className="flex gap-2 items-center">
      <Button
        Icon={<FaTrash />}
        label="Delete"
        classes="bg-red-500"
        onClick={() => {
          deletePost(postID);
        }}
      />
    </div>
  );

  return <Table columns={columns} data={posts} title="Posts" />;
};
