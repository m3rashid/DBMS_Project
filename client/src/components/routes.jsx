import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./header";
import Loader from "./loader";
import MobileNav from "./nav/mobileNav";
import Nav from "./nav/nav";
import RightSidebar from "./nav/rightSidebar";

const Admin = React.lazy(() => import("../pages/Admin"));
const Main = React.lazy(() => import("../pages/main"));
const Notifications = React.lazy(() => import("../pages/notifications"));
const Bookmarks = React.lazy(() => import("../pages/bookmarks"));
const User = React.lazy(() => import("../pages/user"));
const PostDetail = React.lazy(() => import("../pages/postDetail"));
const Topic = React.lazy(() => import("../pages/Topic"));
const Chat = React.lazy(() => import("../pages/chat"));
const Login = React.lazy(() => import("./auth/login"));
const Signup = React.lazy(() => import("./auth/signup"));

export const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-200 dark:bg-gray-700 relative ">
      <div className="h-screen w-screen md:w-[50vw] bg-blue-500 md:rounded-br-[100px] px-10 py-20 absolute top-0 left-0 flex flex-col items-center shadow-2xl">
        <img
          className="w-32 md:w-60 -translate-y-16"
          src="/images/logo.png"
          alt=""
        />
        <p className="text-gray-50 font-bold text-3xl md:text-5xl -translate-y-12">
          JMI Connect
        </p>
      </div>
      <div className="h-screen w-screen flex flex-col items-center justify-end md:translate-y-24 z-10 shadow-2xl">
        <div className="flex flex-col gap-3 justify-center bg-gray-50 dark:bg-gray-900 rounded-t-2xl md:rounded-xl shadow-md md:max-w-[450px]  md:m-0 md:mb-32 px-6 py-8 pt-12 md:px-8 md:py-20 w-screen">
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export const AdminPage = () => {
  return (
    <div className="bg-gray-50 min-h-[100vh] overflow-x-hidden flex flex-col items-center">
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </React.Suspense>
    </div>
  );
};

export const UserPage = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-700 min-h-[100vh] overflow-x-hidden pb-60px flex flex-col items-center pt-[90px] md:pt-[80px] pb-[60px] md:pb-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] max-w-[1500px] w-full">
        <Nav />
        <div className="overflow-y-auto md:max-h-[calc(100vh-80px)] hide-scrollbar">
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/home" element={<Main />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/topic/:topicId" element={<Topic />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </React.Suspense>
        </div>
        <div>
          <RightSidebar />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};
