import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Admin from "./pages/Admin";
import { loadUser } from "./store/actions/auth.action";

import Signup from "./components/signup";
import Login from "./components/login";

import Main from "./pages/main";
import Notifications from "./pages/notifications";
import Bookmarks from "./pages/bookmarks";
import User from "./pages/user";
import PostDetail from "./pages/postDetail";
import Topic from "./pages/Topic";
import Chat from "./pages/chat";
import { NotFound } from "./pages/404";

const App = () => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
        theme={theme}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/home" element={<Main />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/topic/:topicId" element={<Topic />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/" element={} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
