import React, { useState } from "react";
import "./SettingsDark.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useNavigate } from "react-router-dom";

type Shit = {
  theme: string;
};

const SettingsDark = (props: Shit) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(props?.theme === "dark");
  const onChecked = () => {
    setChecked(!checked);
    checked === true
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
    navigate("/");
  };
  return (
    <div className="settingmiddlestuff">
      <div className="settingsboidark">
        <div className="abouttop">
          <p className="abouttext">ABOUT</p>
          <div className="editboi">
            <i className="uil uil-edit-alt"></i>
            <p>Edit</p>
          </div>
        </div>
        <div className="skillstop">
          <p className="skilltext">SKILLS</p>
          <div className="editboi">
            <i className="uil uil-edit-alt"></i>
            <p>Edit</p>
          </div>
        </div>
        <div className="darkthemestuff">
          <div className="top">
            <p>DARK THEME ({checked ? "ENABLED" : "DISBALED"})</p>
          </div>
          <Toggle defaultChecked={checked} icons={false} onChange={onChecked} />
        </div>
        <div className="dangerzone">
          <div className="top">
            <p>DANGER ZONE</p>
          </div>
          <p className="deletebutton">Delete Account</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsDark;
