import React from "react";

const DropDown = ({ label, data = [] }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="font-semibold bg-blue-500 text-gray-200 p-2 rounded-full"
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      <div
        className={`${
          !open && "hidden"
        } z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
      >
        <div className="">
          {data.map((item, index) => {
            return (
              <p
                key={index}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DropDown;
