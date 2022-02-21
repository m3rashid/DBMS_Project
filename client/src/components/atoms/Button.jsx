import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ classes, onClick, Icon, label }) => {
  return (
    <>
      <div
        className={`flex items-center justify-center gap-2 bg-blue-500 text-gray-200 p-2 rounded-md ${classes}`}
      >
        {Icon && <FontAwesomeIcon icon={Icon} />}
        <button className="text-xl font-semibold" onClick={onClick}>
          {label}
        </button>
      </div>
    </>
  );
};

export default Button;
