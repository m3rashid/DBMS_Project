import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";

// to be stored in the database
import DropDown from "../components/atoms/dropDown";
import { darkMode, lightMode } from "../store/actions/ui.action";
import { changeAvatar } from "../store/actions/avatar.acion";

const User = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const avatarConfig = useSelector((state) => state.avatar);
  const [config, setConfig] = React.useState(avatarConfig);
  const avatarSettings = genConfig(config);

  // const [open, setOpen] = React.useState({
  //   sex: false,
  //   faceColor: false,
  //   earSize: false,
  //   hairColor: false,
  //   hairStyle: false,
  //   hatColor: false,
  //   hatStyle: false,
  //   glassesStyle: false,
  //   noseStyle: false,
  //   mouthStyle: false,
  //   shirtStyle: false,
  //   shirtColor: false,
  //   bgColor: false,
  //   isGradient: false,
  // });

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch(lightMode());
    } else if (theme === "light") {
      dispatch(darkMode());
    }
  };
  const commons = `bg-${theme.l2} p-2 rounded-md relative`;

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <div className={`${commons}`}>
          <div className="w-full h-28 bg-green-900 dark:bg-gray-900 z-0 rounded-t-md flex items-start"></div>
          <div className="flex items-center justify-center relative -top-16">
            <Avatar className="h-32 w-32 rounded-full" {...avatarSettings} />
          </div>
          {/* <div className="details">
            <p className="">@Username</p>
          </div> */}
        </div>
        <div className={`${commons}`}>
          <div className="">
            <h3 className="">Customize your avatar</h3>
            <div className="customizations">
              <DropDown label="Gender" data={["man", "woman"]} />
            </div>
          </div>
        </div>
        <div className={`${commons}`}>
          <button
            onClick={handleThemeChange}
            className="bg-green-500 p-3 rounded-full"
          >
            Change theme
          </button>
        </div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
      </div>
    </>
  );
};

export default User;
