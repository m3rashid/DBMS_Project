import React from "react";
const TopicTable = React.lazy(() =>
  import("../../components/admin/topicTable")
);

const AdminTopic = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <TopicTable />
    </div>
  );
};

export default AdminTopic;
