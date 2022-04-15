import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import { changeAvatar } from "../../store/actions/auth.action";

const data = [
  {
    id: "d1",
    name: "sex",
    label: "Gender",
    data: [
      { value: "man", label: "man" },
      { value: "woman", label: "woman" },
    ],
  },
  {
    id: "d2",
    name: "earSize",
    label: "Ear Size",
    data: [
      { value: "small", label: "small" },
      { value: "big", label: "big" },
    ],
  },
  {
    id: "d3",
    name: "hairStyle",
    label: "Hair Style",
    data: [
      { value: "normal", label: "normal" },
      { value: "thick", label: "thick" },
      { value: "mohawk", label: "mohawk" },
      { value: "womanLong", label: "womanLong" },
      { value: "womanShort", label: "womanShort" },
    ],
  },
  {
    id: "d4",
    name: "hatStyle",
    label: "Hat Style",
    data: [
      { value: "none", label: "none" },
      { value: "beanie", label: "beanie" },
      { value: "turban", label: "turban" },
    ],
  },
  {
    id: "d5",
    name: "glassesStyle",
    label: "Glass Style",
    data: [
      { value: "none", label: "none" },
      { value: "round", label: "round" },
      { value: "square", label: "square" },
    ],
  },
  {
    id: "d6",
    name: "noseStyle",
    label: "Nose Style",
    data: [
      { value: "short", label: "short" },
      { value: "long", label: "long" },
      { value: "round", label: "round" },
    ],
  },
  {
    id: "d7",
    name: "mouthStyle",
    label: "Mouth Style",
    data: [
      { value: "laugh", label: "laugh" },
      { value: "smile", label: "smile" },
      { value: "peace", label: "peace" },
    ],
  },
  {
    id: "d8",
    name: "shirtStyle",
    label: "Shirt Style",
    data: [
      { value: "hoody", label: "hoody" },
      { value: "short", label: "short" },
      { value: "polo", label: "polo" },
    ],
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
  const avatarConfig = useSelector((state) => state.auth.avatar);
  const dispatch = useDispatch();

  const handleConfigChange = (label, container) => {
    dispatch(
      changeAvatar(
        setAvatarData((prev) => {
          return {
            ...prev,
            [container.name]: label.value,
          };
        })
      )
    );
    // setAvatarData((prev) => ({
    //   ...prev,
    //   [container.name]: label.value,
    // }));
  };

  const delay = 500;
  const handleColorChange = (e) => {
    // TODO fix the debounce, this shit isnt working properly
    // maybe use a local state for colors, and sync the store at regular intervals
    let timer;
    return (() => {
      clearTimeout(timer);
      timer = setTimeout(
        dispatch(
          changeAvatar({
            [e.target.name]: e.target.value,
          })
        ),
        delay
      );
    })();
  };

  const saveToDatabase = () => {};

  const [avatarData, setAvatarData] = React.useState([
    { label: "sex", value: avatarConfig.sex },
    { label: "earSize", value: avatarConfig.earSize },
    { label: "hairStyle", value: avatarConfig.hairstyle },
    { label: "hatStyle", value: avatarConfig.hatStyle },
    { label: "glassesStyle", value: avatarConfig.glassesStyle },
    { label: "noseStyle", value: avatarConfig.noseStyle },
    { label: "mouthStyle", value: avatarConfig.mouthstyle },
    { label: "shirtStyle", value: avatarConfig.shirtStyle },
  ]);

  //   avatarID: "9f985d34-b59a-41f4-a840-6a524a92f823"
  // bgColor: "#3687dd"
  // createdAt: "2022-03-22T10:30:47.952Z"
  // earSize: "big"
  // faceColor: "#eeea77"
  // glassesStyle: "none"
  // hairColor: "#000000"
  // hairStyle: "thick"
  // hatColor: "#ff0000"
  // hatStyle: "none"
  // isGradient: 0
  // mouthStyle: "laugh"
  // noseStyle: "round"
  // sex: "man"
  // shirtColor: "#ff0000"
  // shirtStyle: "polo"
  // updatedAt: "2022-03-22T10:30:47.952Z"

  const theme = useSelector((state) => state.ui.theme);
  // console.log(avatarData);

  return (
    <>
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
              className=""
              classNamePrefix="bg-gray-200 dark:bg-gray-700 text-black dark:text-white outline-none"
              onChange={handleConfigChange}
              options={item.data}
              name={item.name}
              value={avatarData[0][item.name]}
              // placeholder={`Choose`}
              defaultValue={avatarData[0][item.name]}
              label="Single Select"
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
              value={avatarConfig[item.name]}
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
