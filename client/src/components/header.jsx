import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";

const data =
  "This package provides a single React component The component contains an input field with a drop down menu to pick a possible option based on the current input as a React component Have a look at w3schools.com to see how you can do something similar with pure html, css, and js. For more information about React and the ecosystem see this guide".split(
    " "
  );

const Header = () => {
  const searchRef = React.useRef();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([""]);
  const [searchValue, setSearchValue] = React.useState("");

  const avatarConfig = useSelector((state) => state.auth.avatar);
  const avatarSettings = genConfig(avatarConfig);

  window.addEventListener("click", (e) => {
    if (searchRef.current) {
      if (searchOpen && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
  });

  const handleSearch = (word) => {
    const regex = new RegExp(word, "gi");
    const foundSuggestions = data.filter((item) => item.match(regex));
    if (searchValue.length === 0) {
      setSuggestions([]);
    } else {
      setSuggestions(foundSuggestions);
    }
  };

  // TODO debounce the searches
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    handleSearch(searchValue);
  };

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
            {/* on the basis of current logged in user */}
            <div
              ref={searchRef}
              className={`flex items-start rounded-3xl shadow-md ${
                searchOpen &&
                "absolute md:static top-0 left-0 w-[calc(100%-1rem)] mx-2 md:w-auto z-10 bg-gray-50 dark:bg-gray-700 border-2 dark:border-gray-700"
              }`}
            >
              {searchOpen ? (
                <form className="w-full mx-4">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    onChange={handleChange}
                    className="w-full md:w-auto pl-4 py-2 rounded-3xl outline-0 text-lg bg-gray-50 dark:bg-gray-700 outline-none dark:text-gray-200 font-semibold"
                  />
                  <div className="relative w-full max-h-[300px] bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <ul className="">
                      {suggestions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </form>
              ) : null}
              <FontAwesomeIcon
                className={`rounded-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200 ${
                  searchOpen
                    ? "mr-4 mt-3"
                    : "p-3 hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
                icon={faSearch}
                onClick={() => setSearchOpen(true)}
                size="xl"
              />
            </div>
            <Link to="/user/me">
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
