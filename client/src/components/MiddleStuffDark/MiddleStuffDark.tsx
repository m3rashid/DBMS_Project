import React from "react";
import "./MiddleStuffDark.css";
import FeedDark from "../FeedDark/FeedDark";

const MiddleStuffDark = () => {
  return (
    <div>
      <div className="create-post-div-dark">
        <img
          alt=""
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fetchfind.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F08%2Fcat-2734999_1920-5-common-cat-sounds.jpg&f=1&nofb=1"
        />
        <input type="text" placeholder="Create shitty post ..." />
        <p className="buttonboi">Create</p>
      </div>
      <div className="feeds">
        <FeedDark />
        <FeedDark />
      </div>
    </div>
  );
};

export default MiddleStuffDark;
