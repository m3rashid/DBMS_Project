import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Header from "./header";
import MobileNav from "./mobileNav";
import Nav from "./nav";
import RightSidebar from "./rightSidebar";
import { NotFound } from "../pages/404";

export const AuthWrapper = ({ children }) => {
  const { pathname: route } = useLocation();

  const userLoggedIn = useSelector((state) => state.auth.isAuthUser);
  const adminLoggedIn = useSelector((state) => state.auth.isAuthAdmin);

  console.log({ userLoggedIn, adminLoggedIn });

  const LoginPage = (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-200 dark:bg-gray-700 relative ">
      <div className="h-screen w-screen md:w-[50vw] bg-blue-500 md:rounded-br-[100px] px-10 py-20 absolute top-0 left-0 flex flex-col items-center shadow-2xl">
        <img
          className="w-32 md:w-60 -translate-y-2"
          src="/images/logo.png"
          alt=""
        />
        <p className="text-gray-50 font-bold text-3xl md:text-5xl">
          JMI Connect
        </p>
      </div>
      <div className="h-screen w-screen flex flex-col items-center justify-end md:translate-y-0 z-10 shadow-2xl">
        <div className="flex flex-col gap-3 justify-center bg-gray-50 dark:bg-gray-900 rounded-t-2xl md:rounded-xl shadow-md md:max-w-[450px]  md:m-0 md:mb-32 px-6 py-8 pt-12 md:px-8 md:py-20 w-screen">
          {route === "/login" || route === "/signup" ? children : null}
        </div>
      </div>
    </div>
  );

  const AdminPage = (
    <div className="bg-gray-50 min-h-[100vh] overflow-x-hidden flex flex-col items-center">
      {route === "/admin" ? children : <NotFound />}
    </div>
  );

  const UserPage = (
    <div className="bg-gray-300 dark:bg-gray-700 min-h-[100vh] overflow-x-hidden pb-60px flex flex-col items-center pt-[90px] md:pt-[80px] pb-[60px] md:pb-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] max-w-[1500px] w-full">
        <Nav />
        <div className="overflow-y-auto md:max-h-[calc(100vh-80px)] hide-scrollbar">
          {route !== "/login" && route !== "/signup" && route !== "/admin" ? (
            children
          ) : (
            <NotFound />
          )}
        </div>
        <div>
          <RightSidebar />
        </div>
      </div>
      <MobileNav />
    </div>
  );

  if (userLoggedIn) {
    if (!adminLoggedIn) {
      return UserPage;
    } else {
      return <NotFound />;
    }
  } else {
    if (!adminLoggedIn) {
      return LoginPage;
    } else {
      return AdminPage;
    }
  }
};
