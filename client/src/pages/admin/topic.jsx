import React from "react";
import AdminWrapper from "../../components/admin/adminWrapper";
const TopicTable = React.lazy(() =>
  import("../../components/admin/topicTable")
);

const AdminTopic = () => {
  return (
    <AdminWrapper>
      <div className="flex flex-col items-center justify-center mb-10">
        <TopicTable />
      </div>
    </AdminWrapper>
  );
};

export default AdminTopic;
