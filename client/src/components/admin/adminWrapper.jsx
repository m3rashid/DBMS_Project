import React from "react";
import { Link } from "react-router-dom";
import Loader from "../loader";

const HeaderLink = ({ to, children }) => {
  return (
    <div className="dark:text-gray-50 font-semibold">
      <Link to={to}>{children}</Link>
    </div>
  );
};

const AdminWrapper = ({ children }) => {
  return (
    <>
      <header className="bg-gray-50 dark:bg-gray-900 flex justify-center py-3 shadow-md w-full z-10 top-0">
        <div className="flex items-center justify-between px-2 w-full max-w-[1500px]">
          <div className="flex justify-center items-center gap-2">
            <img
              className="h-12 w-12 rounded-full"
              src="/images/logo.png"
              alt=""
            />
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl dark:text-gray-200">
              JMI Connect
            </h1>
          </div>
          <div className="font-semibold pr-2 dark:text-gray-50">ADMIN</div>
        </div>
      </header>

      <div className="bg-gray-100 dark:bg-gray-700 dark:text-gray-50 flex items-center justify-center py-4 gap-4 shadow-md">
        <HeaderLink to="/admin/home">Home</HeaderLink>
        <HeaderLink to="/admin/users">Users</HeaderLink>
        <HeaderLink to="/admin/posts">Posts</HeaderLink>
        <HeaderLink to="/admin/topics">Topics</HeaderLink>
      </div>

      <div className="bg-gray-50 min-h-[calc(100vh-128px)] overflow-x-hidden flex flex-col items-center">
        <div className="hide-scrollbar dark:bg-gray-800 h-[calc(100vh-128px)] overflow-auto py-[50px] flex w-full flex-col ">
          <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
