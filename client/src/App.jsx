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
import Explore from "./pages/explore";
import Notifications from "./pages/notifications";
import Bookmarks from "./pages/bookmarks";
import User from "./pages/user";
import PostDetail from "./pages/postDetail";
import Test from "./pages/test";

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
  const userLoggedIn = true;
  if (!userLoggedIn) {
    return (
      <>
        <NotificationContainer />
        <BrowserRouter>
          <div className="flex items-center justify-center h-[100vh] bg-green-200 dark:bg-gray-300">
            <div className="flex flex-col gap-2 justify-center bg-green-300 dark:bg-gray-400 px-8 py-40 rounded-md">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
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
        <div className="bg-green-200 dark:bg-gray-500 min-h-[100vh] overflow-x-hidden pb-60px flex flex-col items-center pt-[90px] md:pt-[80px] pb-[60px] md:pb-4">
          <Header />
          {/* make t into grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr] max-w-[1500px] w-full">
            <Nav />
            <div className="overflow-y-auto md:max-h-[calc(100vh-80px)] hide-scrollbar">
              <Routes>
                <Route path="/home" element={<Main />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/user" element={<User />} />
                <Route path="/post/:postId" element={<PostDetail />} />
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
