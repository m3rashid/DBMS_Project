import React from "react";
import { AuthWrapper } from "../components/authWrapper";

import PostCard from "../components/postCard";

const Bookmarks = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <PostCard />
      </div>
    </AuthWrapper>
  );
};

export default Bookmarks;
