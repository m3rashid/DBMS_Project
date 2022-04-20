import React from "react";
const UserTable = React.lazy(() => import("../../components/admin/usersTable"));

const AdminUser = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <UserTable />
    </div>
  );
};

export default AdminUser;
