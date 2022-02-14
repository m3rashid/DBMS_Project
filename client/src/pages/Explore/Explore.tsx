import React, { useEffect, useState } from "react";
import LeftSidebarDark from "../../components/LeftSidebarDark/LeftSidebarDark";
import Navbar from "../../components/Navbar/Navbar";
import NavbarDark from "../../components/NavbarDark/NavbarDark";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import "./Explore.css";
import RightSidebarDark from "../../components/RightSidebarDark/RightSidebarDark";
import ExploreMiddle from "../../components/ExploreMiddle/ExploreMiddle";
import ExploreMiddleDark from "../../components/ExploreMiddleDark/ExploreMiddleDark";

const Explore = () => {
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
    document.title = "JMI Connect - Explore";
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
          {theme === "dark" ? <ExploreMiddleDark /> : <ExploreMiddle />}
          {theme === "dark" ? <LeftSidebarDark /> : <LeftSidebar />}
        </div>
      </main>
    </div>
  );
};

export default Explore;
