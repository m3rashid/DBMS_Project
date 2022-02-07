import "./NavbarDark.css";
import React from "react";

const NavbarDark: React.FC = () => {
  return (
    <nav className="navbarboidark">
      <div className="containerdark">
        <h2 className="logodark">Jmi-Nuts</h2>
        <div className="searchbar">
          <i className="uil uil-search"></i>
          <input type="text" placeholder="Search shit ..." />
        </div>
        <div className="leftstuffdark">
          <p className="create-btn">Create</p>
          <img
            alt=""
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1"
            className="pfp"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarDark;
