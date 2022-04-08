import React from "react";

import { UserTable } from "../components/admin/usersTable";
import { PostsTable } from "../components/admin/postsTable";
import CreateTopic from "../components/admin/createTopic";
import { TopicTable } from "../components/admin/topicTable";
import Button from "../components/atoms/Button";
import { AuthWrapper } from "../components/authWrapper";
import useAdmin from "../hooks/useAdmin";

const Admin = () => {
  const { handleLogout } = useAdmin();

  return (
    <AuthWrapper>
      <div
        className="hide-scrollbar dark:bg-gray-800"
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
        <br />
        <UserTable />
        <br />
        <PostsTable />
        <br />
        <br />
        <Button label="Logout from Admin" onClick={handleLogout} />
      </div>
    </AuthWrapper>
  );
};

export default Admin;
