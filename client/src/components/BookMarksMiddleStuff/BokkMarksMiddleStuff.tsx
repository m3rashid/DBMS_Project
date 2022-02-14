import React from "react";
import "./BookMarksMiddleStuff.css";

const BokkMarksMiddleStuff = () => {
  return (
    <div className="bookmarks">
      <div className="feed">
        <div className="header">
          <div className="user">
            <div className="pfpboi">
              <img
                alt=""
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1"
              />
            </div>
            <div className="userinfo">
              <h3>LAMEOW</h3>
              <small>69 minutes ago</small>
            </div>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-v"></i>
          </span>
        </div>
        <div className="image">
          <img
            alt=""
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1"
          />
        </div>
        <div className="buttons">
          <div className="rightbuttons">
            <span>
              <i className="uil uil-heart"></i>
            </span>
            <span>
              <i className="uil uil-comment"></i>
            </span>
            <span>
              <i className="uil uil-share-alt"></i>
            </span>
          </div>
          <div className="leftbuttons">
            <span>
              <i className="uis uis-bookmark"></i>
            </span>
          </div>
        </div>
        <div className="caption">
          <span>
            <b>LAMEOW</b> Hello People
          </span>
        </div>
        <p className="viewcomments">View all comments</p>
      </div>
    </div>
  );
};

export default BokkMarksMiddleStuff;
