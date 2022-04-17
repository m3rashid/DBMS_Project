import React from "react";

import PostCard from "../components/user/postCard";

const Bookmarks = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookmarks = [];

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        {bookmarks.length > 0 ? (
          <PostCard />
        ) : (
          <h3 className="text-center dark:text-gray-200 font-semibold text-2xl">
            No bookmarks found
          </h3>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
