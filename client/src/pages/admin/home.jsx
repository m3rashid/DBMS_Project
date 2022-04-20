import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminWrapper from "../../components/admin/adminWrapper";
import Button from "../../components/atoms/Button";
import useAdmin from "../../hooks/useAdmin";
import { darkMode, lightMode } from "../../store/actions/ui.action";
const CreateTopic = React.lazy(() =>
  import("../../components/admin/createTopic")
);

const AdminHome = () => {
  const { handleLogout } = useAdmin();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleThemeChange = () => {
    theme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };

  return (
    <AdminWrapper>
      <div className="flex flex-col items-center">
        <div className="">
          <CreateTopic />
          <div className="flex items-center gap-4">
            <Button
              label={theme === "dark" ? "Use Light Theme" : "Use Dark Theme"}
              onClick={handleThemeChange}
            />
            <Button label="Logout from Admin" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminHome;
