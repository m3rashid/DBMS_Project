import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Collapse from "../atoms/collapse";
import Input from "../atoms/input";
import { SmallButton } from "./profile";
import { SERVER_ROOT_URL, tokenConfig } from "../../store/constants";

export const LabelContainer = ({ label, children }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-3">
      <label className="flex-shrink-0">{label}</label>
      {children}
    </div>
  );
};

const ChangePassword = () => {
  const [password, setPassword] = React.useState({
    newPassword: "",
    oldPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const changePassword = async () => {
    if (password.newPassword === password.oldPassword) {
      toast.warn("New password cannot be same as old password");
      return;
    }
    const t2 = toast.loading("Password update in progress...");
    try {
      const body = JSON.stringify({
        newPassword: password.newPassword,
        oldPassword: password.oldPassword,
      });
      await axios.post(
        `${SERVER_ROOT_URL}/user/update-password`,
        body,
        tokenConfig()
      );
      toast.update(t2, {
        render: "Password updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setPassword({ newPassword: "", oldPassword: "" });
    } catch (err) {
      toast.update(t2, {
        render: "Error in updating password, please try again later",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <Collapse title="Update Password">
      <div className="flex flex-col gap-2 w-full items-end py-3 px-1">
        <LabelContainer label="Current: ">
          <Input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={password.oldPassword}
            setValue={handleChange}
            className="p-[5px] w-full"
          />
        </LabelContainer>
        <LabelContainer label="Desired: ">
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={password.newPassword}
            setValue={handleChange}
            className="p-[5px] w-full"
          />
        </LabelContainer>
        <SmallButton label="Change Password" onClick={changePassword} />
      </div>
    </Collapse>
  );
};

export default ChangePassword;
