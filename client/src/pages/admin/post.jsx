import React from "react";
import AdminWrapper from "../../components/admin/adminWrapper";
const PostsTable = React.lazy(() =>
  import("../../components/admin/postsTable")
);

const AdminPost = () => {
  return (
    <AdminWrapper>
      <div className="flex flex-col items-center justify-center mb-10">
        <PostsTable />
      </div>
    </AdminWrapper>
  );
};

export default AdminPost;
