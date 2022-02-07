import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import "./BookMarks.css";
import BookMarksMiddleStuff from "../../components/BookMarksMiddleStuff/BokkMarksMiddleStuff";
import NavbarDark from "../../components/NavbarDark/NavbarDark";
import LeftSidebarDark from "../../components/LeftSidebarDark/LeftSidebarDark";
import RightSidebarDark from "../../components/RightSidebarDark/RightSidebarDark";
import BookMarksDark from "../../components/BookMarksDark/BookMarksDark";

const BookMarks = () => {
  const [theme, setTheme] = useState<string>("");
  console.log(theme === "dark");
  useEffect(() => {
    const themeboi = localStorage.getItem("theme");
    if (!themeboi) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme(themeboi);
    }
  }, []);
  useEffect(() => {
    document.title = "Jmi-Nuts - BookMarks";
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#272729" : "#dae0e6";
  }, [theme]);
  return (
    <div>
      {theme === "dark" ? <NavbarDark /> : <Navbar />}
      <main>
        <div className="container">
          {theme === "dark" ? <RightSidebarDark /> : <RightSidebar />}
          {theme === "dark" ? <BookMarksDark /> : <BookMarksMiddleStuff />}
          {theme === "dark" ? <LeftSidebarDark /> : <LeftSidebar />}
        </div>
      </main>
    </div>
  );
};

export default BookMarks;
