import React, { useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  useEffect(() => {
    document.title = "Jmi-Nuts - Loading";
  }, []);
  return (
    <div className="loaderboi">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2Fimages%2Fdf51cc9619b2afefd0fe34e697060ca8%2Ftenor.gif&f=1&nofb=1"
        alt=""
      />
    </div>
  );
};

export default Loader;
