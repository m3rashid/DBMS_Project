import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./pages/Loader/Loader";

const App: React.FC = () => {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Explore = lazy(() => import("./pages/Explore/Explore"));
  const Notifications = lazy(
    () => import("./pages/Notifications/Notifications")
  );
  const BookMarks = lazy(() => import("./pages/BookMarks/BookMarks"));
  const Settings = lazy(() => import("./pages/Settings/Settings"));
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
