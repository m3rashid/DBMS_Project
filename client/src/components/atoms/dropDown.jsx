import React from "react";

const DropDown = ({ open, data = [], clicked }) => {
  return (
    <>
      <div
        className={`${
          !open && "hidden"
        } z-10 w-32 text-base list-none bg-gray-300 rounded-md divide-y divide-gray-100 shadow dark:bg-gray-700`}
      >
        <div className="mt-1">
          {data.map((item, index) => {
            return (
              <button
                onClick={clicked}
                key={index}
                className="w-full rounded-md text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DropDown;
