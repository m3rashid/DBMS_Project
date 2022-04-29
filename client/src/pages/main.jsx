import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../store/actions/post.action";
const RightSidebar = React.lazy(() => import("../components/nav/rightSidebar"));
const CreatePost = React.lazy(() => import("../components/user/create"));
const PostCard = React.lazy(() => import("../components/user/postCard"));

const Main = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  React.useEffect(() => {
    dispatch(getPosts(user));
  }, [dispatch, user]);

  let posts = useSelector((state) =>
    Object.values(state.posts.posts).sort((a, b) => b.updatedAt - a.updatedAt)
  );

  //for resolving multiple posts
  const preCompute = () => {
    let bookmarkCount = 1;
    let post = posts[0];
    for (let i = 1; i < posts.length; i++) {
      if (posts[i].postID === post.postID) {
        bookmarkCount++;
      } else {
        break;
      }
    }

    //for bookmarks to be more than 1 , cross product happens
    if (bookmarkCount > 1) {
      const filteredPosts = [];
      let i, j;
      for (i = 0; i < posts.length; i += bookmarkCount) {
        let hasBookmark = false;

        //cross product window
        for (j = 0; j < bookmarkCount; j++) {
          if (posts[i + j].isBookmarked === 1) {
            hasBookmark = true;
            break;
          }
        }
        //filter out posts which have bookmarks out of all the same posts in cross product
        if (hasBookmark) filteredPosts.push(posts[i + j]);
        //if current window has no bookmarks , push 1st post
        else filteredPosts.push(posts[i]);
      }
      posts = filteredPosts;
    }
  };
  preCompute();

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        <CreatePost />
        <div className="w-full rightSidebarInMainPage">
          <RightSidebar fullWidth />
        </div>
        {posts &&
          posts.map((post) => <PostCard key={post.postID} post={post} />)}
      </div>
    </>
  );
};

export default Main;
