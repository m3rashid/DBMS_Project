import React from "react";

import Button from "../components/atoms/Button";
import Loader from "../components/loader";
import useAdmin from "../hooks/useAdmin";
const UserTable = React.lazy(() => import("../components/admin/usersTable"));
const PostsTable = React.lazy(() => import("../components/admin/postsTable"));
const CreateTopic = React.lazy(() => import("../components/admin/createTopic"));
const TopicTable = React.lazy(() => import("../components/admin/topicTable"));
const Modal = React.lazy(() => import("../components/admin/dialog"));

const Admin = () => {
  const { handleLogout } = useAdmin();

  return (
    <>
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
        <React.Suspense fallback={<Loader />}>
          <CreateTopic />
          <div className="flex flex-col items-center justify-center mb-10">
            <TopicTable />
            <UserTable />
            <PostsTable />
          </div>
        </React.Suspense>
        <Button label="Logout from Admin" onClick={handleLogout} />
      </div>
    </>
  );
};

export default Admin;
