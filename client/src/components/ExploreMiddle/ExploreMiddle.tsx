import React from "react";
import "./ExploreMiddle.css";
import Feed from "../Feed/Feed";

const ExploreMiddle = () => {
  return (
    <div>
      <div className="feeds">
        <Feed />
        <Feed />
      </div>
    </div>
  );
};

export default ExploreMiddle;
