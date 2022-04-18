import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

const Collapse = ({ title, children }) => {
  const [open, setopen] = React.useState(false);

  return (
    <>
      <button
        className="font-bold text-xl ml-1 my-3 text-center sm:text-left w-full hover:text-blue-500 flex items-center justify-between pr-4"
        onClick={() => setopen(!open)}
      >
        {title}
        <MdArrowBackIosNew className={open ? "rotate-90" : "-rotate-90"} />
      </button>
      {open && children}
    </>
  );
};

export default Collapse;
