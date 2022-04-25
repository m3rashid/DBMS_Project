import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";

import Header from "./header";
import Loader from "./loader";
import MobileNav from "./nav/mobileNav";
import Nav from "./nav/nav";
import RightSidebar from "./nav/rightSidebar";
import { HeaderLink } from "./admin/tableHelpers";
import CommentDetail from "../pages/commentsDetails";

const AdminPost = React.lazy(() => import("../pages/admin/post"));
const AdminTopic = React.lazy(() => import("../pages/admin/topic"));
const AdminUser = React.lazy(() => import("../pages/admin/user"));
const AdminHome = React.lazy(() => import("../pages/admin/home"));
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
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export const AdminPage = () => {
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
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/home" />} />
              <Route path="/admin" element={<Navigate to="/admin/home" />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/users" element={<AdminUser />} />
              <Route path="/admin/topics" element={<AdminTopic />} />
              <Route path="/admin/posts" element={<AdminPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </>
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
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Main />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/comments"element={<CommentDetail />} />
              <Route path="/topic/:topicId" element={<Topic />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
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
