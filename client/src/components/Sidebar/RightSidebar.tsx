import React from "react";
import "./RightSidebar.css";
import { useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="rightsidebar">
      <div className="profile">
        <div className="profile-img">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1"
            alt=""
          />
        </div>
        <div className="stuff">
          <h4>DED</h4>
          <p>@DED</p>
        </div>
      </div>
      <div className="sidebar">
        {window.location.href === "https://Jmi-Nuts.netlify.app/" ? (
          <div className="sidebar-item home-sidebar-active">
            <span>
              <i className="uil uil-home"></i>
            </span>
            <h3>Home</h3>
          </div>
        ) : (
          <div
            className="sidebar-item"
            onClick={() => {
              navigate("/");
            }}
          >
            <span>
              <i className="uil uil-home"></i>
            </span>
            <h3>Home</h3>
          </div>
        )}
        {window.location.href === "https://Jmi-Nuts.netlify.app/explore" ? (
          <div className="sidebar-item explore-sidebar-active">
            <span>
              <i className="uil uil-compass"></i>
            </span>
            <h3>Explore</h3>
          </div>
        ) : (
          <div
            className="sidebar-item"
            onClick={() => {
              navigate("/explore");
            }}
          >
            <span>
              <i className="uil uil-compass"></i>
            </span>
            <h3>Explore</h3>
          </div>
        )}
        {window.location.href ===
        "https://Jmi-Nuts.netlify.app/notifications" ? (
          <div className="sidebar-item notification-sidebar-active">
            <span>
              <i className="uil uil-bell"></i>
            </span>
            <h3>Notifications</h3>
          </div>
        ) : (
          <div
            className="sidebar-item"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <span>
              <i className="uil uil-bell"></i>
            </span>
            <h3>Notifications</h3>
          </div>
        )}
        {window.location.href === "https://Jmi-Nuts.netlify.app/bookmarks" ? (
          <div className="sidebar-item bookmarks-sidebar-active">
            <span>
              <i className="uil uil-bookmark"></i>
            </span>
            <h3>Bookmarks</h3>
          </div>
        ) : (
          <div
            className="sidebar-item"
            onClick={() => {
              navigate("/bookmarks");
            }}
          >
            <span>
              <i className="uil uil-bookmark"></i>
            </span>
            <h3>Bookmarks</h3>
          </div>
        )}
        {window.location.href === "https://Jmi-Nuts.netlify.app/settings" ? (
          <div className="sidebar-item settings-sidebar-active">
            <span>
              <i className="uil uil-setting"></i>
            </span>
            <h3>Settings</h3>
          </div>
        ) : (
          <div
            className="sidebar-item"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <span>
              <i className="uil uil-setting"></i>
            </span>
            <h3>Settings</h3>
          </div>
        )}
      </div>
      <p className="createpostbutton">Create Post</p>
    </div>
  );
};

export default RightSidebar;
