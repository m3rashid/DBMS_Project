import React from "react";

import PostCard from "../components/postCard";

const Explore = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
};

export default Explore;
