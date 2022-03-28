import React from "react";

import UserTable from "../components/admin/UsersTable";
import PostTable from "../components/admin/PostsTable";
import CreateTopic from "../components/admin/createTopic";
import TopicTable from "../components/admin/topicTable";
import Button from "../components/atoms/Button";
import { AuthWrapper } from "../components/authWrapper";
import useAdmin from "../hooks/useAdmin";

const Admin = () => {
  const { handleLogout } = useAdmin();

  return (
    <AuthWrapper>
      <div
        className="hide-scrollbar"
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
    </AuthWrapper>
  );
};

export default Admin;
