import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Nav from "./components/nav";
import MobileNav from "./components/mobileNav";
import RightSidebar from "./components/rightSidebar";

import Signup from "./components/signup";
import Login from "./components/login";

import Main from "./pages/main";
import Notifications from "./pages/notifications";
import Bookmarks from "./pages/bookmarks";
import User from "./pages/user";
import PostDetail from "./pages/postDetail";
import Test from "./pages/test";
import Chat from "./pages/chat";

const NotificationContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

function App() {
  const userLoggedIn = false;

  if (!userLoggedIn) {
    return (
      <>
        <NotificationContainer />
        <BrowserRouter>
          <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-200 dark:bg-gray-700 relative">
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
              <div className="flex flex-col gap-2 justify-center bg-gray-50 dark:bg-gray-900 rounded-t-2xl md:rounded-xl shadow-md md:max-w-[450px]  md:m-0 md:mb-32 px-4 py-8 md:px-8 md:py-20 w-screen">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      <NotificationContainer />
      <BrowserRouter>
        <div className="bg-gray-300 dark:bg-gray-700 min-h-[100vh] overflow-x-hidden pb-60px flex flex-col items-center pt-[90px] md:pt-[80px] pb-[60px] md:pb-4">
          <Header />
          {/* make t into grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] max-w-[1500px] w-full">
            <Nav />
            <div className="overflow-y-auto md:max-h-[calc(100vh-80px)] hide-scrollbar">
              <Routes>
                <Route path="/home" element={<Main />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Navigate to="/home" />} />
                <Route path="/signup" element={<Navigate to="/home" />} />
                {/* make a 404 page */}
                <Route path="*" element={<h1>Page not found</h1>} />
              </Routes>
            </div>
            <RightSidebar />
          </div>
          <MobileNav />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
