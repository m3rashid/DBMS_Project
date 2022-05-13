import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "../components/user/postCard";
import { getAllBookmarks } from "../store/actions/post.action";
// import Loader from "../components/loader";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllBookmarks(user));
  }, [dispatch, user, refresh]);

  const Reload = () => {
    setRefresh(!refresh);
  };

  const bookmarks = useSelector((state) =>
    Object.values(state.posts.bookmarks).sort(
      (a, b) => b.updatedAt - a.updatedAt
    )
  );

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <PostCard
              key={bookmark.bookmarkID}
              post={bookmark}
              loggedUser={user}
              reload={Reload}
            />
          ))
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
