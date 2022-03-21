import React from "react";
import { useDispatch } from "react-redux";

import UserTable from "../components/admin/UsersTable";
import PostTable from "../components/admin/PostsTable";
import CreateTopic from "../components/admin/createTopic";
import TopicTable from "../components/admin/topicTable";
import Button from "../components/atoms/Button";
import { logout } from "../store/actions/auth.action";

const Admin = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className="no-scrollbar"
      style={{
        height: "100vh",
        overflow: "auto",
        paddingBottom: "50px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CreateTopic />
      <TopicTable />
      <UserTable />
      <PostTable />
      <Button label="Logout from Admin" onClick={handleLogout} />
    </div>
  );
};

export default Admin;
