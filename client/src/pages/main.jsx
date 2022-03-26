import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/create";
import PostCard from "../components/postCard";
import { getPosts } from "../store/actions/post.action";
import RightSidebar from "../components/rightSidebar";
import { AuthWrapper } from "../components/authWrapper";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) =>
    Object.values(state.posts.posts).sort((a, b) => b.updatedAt - a.updatedAt)
  );

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <CreatePost />
        <div className="w-full rightSidebarInMainPage">
          <RightSidebar fullWidth />
        </div>
        {posts &&
          posts.map((post) => <PostCard key={post.postID} post={post} />)}
      </div>
    </AuthWrapper>
  );
};

export default Main;
