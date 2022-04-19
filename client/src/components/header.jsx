import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";

import { SearchBox } from "./searchBox";

const Header = () => {
  const searchRef = React.useRef();
  const [searchOpen, setSearchOpen] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const avatarConfig = auth.avatar;
  const user = auth.user;

  const avatarSettings = genConfig(avatarConfig);

  window.addEventListener("click", (e) => {
    if (searchRef.current) {
      if (searchOpen && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
  });

  return (
    <>
      <header className="bg-gray-50 dark:bg-gray-900 flex justify-center py-3 shadow-md mb-4 w-full fixed z-10 top-0">
        <div className="flex items-center justify-between px-2 w-full max-w-[1500px] relative">
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
          <div className="flex items-center justify-center gap-4">
            <div
              ref={searchRef}
              className={`flex items-start rounded-3xl shadow-md ${
                searchOpen &&
                "absolute md:static top-0 left-0 w-[calc(100%-1rem)] mx-2 md:w-auto z-10 bg-gray-50 dark:bg-gray-700 border-2 dark:border-gray-700"
              }`}
            >
              {searchOpen ? <SearchBox /> : null}
              <span
                className={`rounded-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 ${
                  searchOpen
                    ? "mr-4 mt-3"
                    : "p-3 hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                onClick={() => setSearchOpen(true)}
                size="xl"
              >
                <FaSearch size={20} />
              </span>
            </div>
            <Link to={`/user/${user.userID}`}>
              <div className="">
                <Avatar className="h-12 w-12" {...avatarSettings} />
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
