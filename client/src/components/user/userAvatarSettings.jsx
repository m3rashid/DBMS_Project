import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Avatar, { genConfig } from "react-nice-avatar";
import { toast } from "react-toastify";
import axios from "axios";

import { SERVER_ROOT_URL, tokenConfig } from "../../store/constants";
import Collapse from "../atoms/collapse";
import { colorConfig, data } from "./avatarData";
import { changeAvatar } from "../../store/actions/auth.action";
import { SmallButton } from "./profile";

const UserAvatarSettings = () => {
  const avatarConfig = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();
  const handleConfigChange = ({ value }, { name }) => {
    setAvatarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setAvatarData((prev) => ({ ...prev, [name]: value }));
  };

  const saveToDatabase = async () => {
    const t = toast.loading("Update in progress...");
    try {
      const body = JSON.stringify({ avatar: avatarData });
      await axios.post(
        `${SERVER_ROOT_URL}/user/update-avatar`,
        body,
        tokenConfig()
      );
      dispatch(changeAvatar(avatarData));
      toast.update(t, {
        render: "Avatar updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(t, {
        render: "Error in updating avatar, please try again later",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const [avatarData, setAvatarData] = React.useState({
    sex: avatarConfig.sex,
    earSize: avatarConfig.earSize,
    hairStyle: avatarConfig.hairStyle,
    hatStyle: avatarConfig.hatStyle,
    glassesStyle: avatarConfig.glassesStyle,
    noseStyle: avatarConfig.noseStyle,
    mouthStyle: avatarConfig.mouthStyle,
    shirtStyle: avatarConfig.shirtStyle,
    faceColor: avatarConfig.faceColor,
    hairColor: avatarConfig.hairColor,
    hatColor: avatarConfig.hatColor,
    shirtColor: avatarConfig.shirtColor,
    bgColor: avatarConfig.bgColor,
    avatarID: avatarConfig.avatarID,
    isGradient: avatarConfig.isGradient,
  });

  const avatarSettings = genConfig(avatarData);

  return (
    <Collapse title="Customize your avatar">
      <div className="flex items-center justify-center m-8">
        <Avatar className="h-32 w-32 rounded-full" {...avatarSettings} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col w-full gap-2 my-2">
            <label className="pl-2 text-lg font-medium">{item.label}</label>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  border: "none",
                }),
              }}
              classNamePrefix="bg-gray-200 dark:bg-gray-700 text-black dark:text-white outline-none"
              onChange={handleConfigChange}
              options={item.data}
              name={item.name}
              value={avatarData[item.name]}
              placeholder={avatarData[item.name]}
              defaultValue={avatarData[item.name]}
            />
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-center sm:text-left text-xl mt-8 pl-2 py-2">
        Configure Avatar Colors
      </h3>
      <div className="flex gap-1 items-center justify-center sm:justify-start pb-2 flex-wrap">
        {colorConfig.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 justify-center items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <label className="pl-2 text-lg font-medium">{item.label}</label>
            <input
              onChange={handleColorChange}
              className=""
              type="color"
              name={item.name}
              value={avatarData[item.name]}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full">
        <SmallButton label="Save Avatar" onClick={saveToDatabase} />
      </div>
    </Collapse>
  );
};

export default UserAvatarSettings;
