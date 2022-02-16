import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Nav from "./components/nav";
import MobileNav from "./components/mobileNav";
import RightSidebar from "./components/rightSidebar";

import Main from "./pages/main";
import Explore from "./pages/explore";
import Notifications from "./pages/notifications";
import Bookmarks from "./pages/bookmarks";
import User from "./pages/user";
import PostDetail from "./pages/postDetail";

function App() {
  return (
    <>
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
      <BrowserRouter>
        <div className="bg-gray-300 min-h-[100vh] overflow-x-hidden pb-60px flex flex-col items-center pt-[90px] md:pt-[80px] pb-[60px] md:pb-4">
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
                <Route path="/" element={<Navigate to="/home" />} />
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
