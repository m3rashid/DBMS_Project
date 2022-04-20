import React from "react";
import AdminWrapper from "../../components/admin/adminWrapper";
const UserTable = React.lazy(() => import("../../components/admin/usersTable"));

const AdminUser = () => {
  return (
    <AdminWrapper>
      <div className="flex flex-col items-center justify-center mb-10">
        <UserTable />
      </div>
    </AdminWrapper>
  );
};

export default AdminUser;
