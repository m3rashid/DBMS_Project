import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[100vh] dark:text-gray-200">
      <h1 className="text-4xl text-center">
        404 <br /> Page Not Found
      </h1>
      <Link to="/">
        <h2 className="text-2xl text-blue-500">Go back Home</h2>
      </Link>
    </div>
  );
};

export default NotFound;
