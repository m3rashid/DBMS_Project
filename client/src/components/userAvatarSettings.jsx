import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeAvatar } from "../store/actions/avatar.acion";

const data = [
  { id: "d1", name: "sex", label: "Avatar Gender", data: ["man", "woman"] },
  { id: "d2", name: "earSize", label: "Ear Size", data: ["small", "big"] },
  {
    id: "d3",
    name: "hairStyle",
    label: "Hair Style",
    data: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
  },
  {
    id: "d4",
    name: "hatStyle",
    label: "Hat Style",
    data: ["none", "beanie", "turban"],
  },
  {
    id: "d5",
    name: "glassesStyle",
    label: "Glass Style",
    data: ["none", "round", "square"],
  },
  {
    id: "d6",
    name: "noseStyle",
    label: "Nose Style",
    data: ["short", "long", "round"],
  },
  {
    id: "d7",
    name: "mouthStyle",
    label: "Mouth Style",
    data: ["laugh", "smile", "peace"],
  },
  {
    id: "d8",
    name: "shirtStyle",
    label: "Shirt Style",
    data: ["hoody", "short", "polo"],
  },
];

const colorConfig = [
  { id: "c1", label: "Face", name: "faceColor" },
  { id: "c2", label: "Hair", name: "hairColor" },
  { id: "c3", label: "Hat", name: "hatColor" },
  { id: "c4", label: "Shirt", name: "shirtColor" },
  { id: "c5", label: "Back", name: "bgColor" },
];

const UserAvatarSettings = () => {
  const avatarConfig = useSelector((state) => state.avatar);
  const dispatch = useDispatch();

  const handleConfigChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(changeAvatar({ [name]: value }));
  };

  const saveToDatabase = () => {};
  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col w-full gap-2 my-2">
            <label className="pl-2 text-lg font-medium">{item.label}</label>
            <select
              onChange={handleConfigChange}
              className="bg-gray-200 dark:bg-gray-800 outline-none p-2 px-3 rounded-md"
              name="sex"
              id=""
              value={avatarConfig[item.name]}
            >
              {item.data.map((singleItem, index) => (
                <option
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 outline-none"
                  value={singleItem}
                >
                  {singleItem}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-xl mt-8 pl-2 py-2">
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
              onChange={handleConfigChange}
              className=""
              type="color"
              name={item.name}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full">
        <button
          className="bg-blue-500 text-gray-200 py-2 mt-3 px-4 rounded-full font-semibold"
          onClick={saveToDatabase}
        >
          Save Avatar
        </button>
      </div>
    </>
  );
};

export default UserAvatarSettings;
