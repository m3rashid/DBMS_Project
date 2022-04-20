import React from "react";
const PostsTable = React.lazy(() =>
  import("../../components/admin/postsTable")
);

const AdminPost = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <PostsTable />
    </div>
  );
};

export default AdminPost;
