import React from "react";

const Button = ({ classes, onClick, Icon, label }) => {
  return (
    <>
      <div
        className={`flex justify-center bg-blue-500 text-gray-200 rounded-md ${classes}`}
      >
        <button
          className="flex items-center justify-center gap-2 w-full text-xl font-semibold p-2"
          onClick={onClick}
        >
          {Icon && Icon}
          {label}
        </button>
      </div>
    </>
  );
};

export default Button;
