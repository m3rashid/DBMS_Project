import React from "react";

const data =
  "This package provides a single React component The component contains an input field with a drop down menu to pick a possible option based on the current input as a React component Have a look at w3schools.com to see how you can do something similar with pure html, css, and js. For more information about React and the ecosystem see this guide".split(
    " "
  );

export const SearchBox = () => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

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
    if (e.target.value === "") {
      setSuggestions([]);
    }
    handleSearch(searchValue);
  };

  return (
    <form className="w-full mx-4">
      <input
        type="text"
        value={searchValue}
        placeholder="Search people"
        onChange={handleChange}
        className="w-full md:w-auto pl-4 py-2 rounded-3xl outline-0 text-lg bg-gray-50 dark:bg-gray-700 outline-none dark:text-gray-200"
      />
      {suggestions.length > 0 && (
        <div className="relative w-full h-full top-2 -left-4 sm:left-0">
          <ul className="absolute bg-gray-50 dark:bg-gray-800 dark:text-gray-200 rounded-md w-[94vw] sm:w-full p-4 shadow-md dark:shadow-black max-h-[350px] overflow-auto hide-scrollbar">
            {suggestions.map((item, index) => (
              <li
                className="p-1 hover:bg-gray-700 cursor-pointer rounded-md"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
