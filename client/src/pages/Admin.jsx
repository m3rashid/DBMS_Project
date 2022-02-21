import React from "react";

import UserTable from "../components/admin/UsersTable";
import PostTable from "../components/admin/PostsTable";

const Admin = () => {
  return (
    <>
      <UserTable />
      <PostTable />
    </>
  );
};

export default Admin;
