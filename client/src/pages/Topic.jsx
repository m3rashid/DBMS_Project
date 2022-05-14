import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PostCard from "../components/user/postCard";
import { SERVER_ROOT_URL } from "../store/constants";
import { headers } from "../hooks/globals";
import RightSidebar from "../components/nav/rightSidebar";
import { useSelector } from "react-redux";
import Loader from "../components/loader";

const Topic = () => {
  const auth = useSelector((state) => state.auth);
  const loggedUser = auth.user;

  const { topicId } = useParams();
  const { userID: userId } = loggedUser;
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const topics = useSelector((state) => state.auth.topics);

  const pageTopic = topics.filter((t) => t.topicID === topicId)[0];

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${SERVER_ROOT_URL}/post/fromTopic`,
        JSON.stringify({ topicId, userId }),
        { headers }
      )
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => toast.error("Error Loading Posts"));
  }, [topicId, userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
      <div className="w-full rightSidebarInMainPage">
        <RightSidebar fullWidth />
      </div>
      {!posts.length > 0 ? (
        <h3 className="text-center dark:text-gray-200 font-semibold text-2xl">
          No Posts found for {pageTopic.name}
        </h3>
      ) : (
        <>
          <h3 className="text-center dark:text-gray-200 font-semibold text-2xl">
            Posts found for &nbsp; # {pageTopic.name}
          </h3>
          {posts &&
            posts.map((post) => (
              <PostCard key={post.postID} post={post} loggedUser={loggedUser} />
            ))}
        </>
      )}
    </div>
  );
};

export default Topic;
