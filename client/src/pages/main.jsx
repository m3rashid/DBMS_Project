import React from "react";
import { useSelector } from "react-redux";

import CreatePost from "../components/create";
import PostCard from "../components/postCard";

const Main = () => {
  const posts = useSelector((state) =>
    Object.values(state.posts.posts).sort((a, b) => b.updatedAt - a.updatedAt)
  );

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <CreatePost />
        {posts &&
          posts.map((post) => <PostCard key={post.postID} post={post} />)}
      </div>
    </>
  );
};

export default Main;
