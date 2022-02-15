import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const searchRef = React.useRef();

  const [searchOpen, setSearchOpen] = React.useState(false);
  window.addEventListener("click", (e) => {
    if (searchRef.current) {
      if (searchOpen && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
  });

  return (
    <>
      <header className="bg-[white] flex justify-center py-3 shadow-md mb-4 w-full fixed z-10 top-0">
        <div className="flex items-center justify-between px-2 w-full max-w-[1500px] relative">
          <div className="flex justify-center items-center gap-2">
            <img
              className="h-12 w-12 rounded-full"
              src={process.env.REACT_APP_IMG}
              alt=""
            />
            <h1 className="font-bold text-2xl md:text-3xl">JMI Connect</h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* on the basis of current logged in user */}
            <div
              ref={searchRef}
              className={`flex items-center justify-center rounded-3xl shadow-md ${
                searchOpen &&
                "absolute md:static top-0 left-0 w-[calc(100%-1rem)] mx-2 md:w-auto z-10 bg-white border-2"
              }`}
            >
              {searchOpen ? (
                <>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto pl-4 py-2 rounded-3xl outline-0 text-lg"
                  />
                  <div className="placeholder">{/* search suggestions */}</div>
                </>
              ) : null}
              <FontAwesomeIcon
                className={`rounded-full ${
                  searchOpen ? "mr-2" : "p-2 hover:bg-gray-300"
                }`}
                icon={faSearch}
                onClick={() => setSearchOpen(true)}
                size="xl"
              />
            </div>
            <div className="">
              <img
                className="h-12 w-12 rounded-full"
                src={process.env.REACT_APP_IMG}
                alt="name"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
