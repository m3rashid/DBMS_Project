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
          <div className="text-2xl mt-10">No bookmarks found</div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
