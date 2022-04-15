import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PostCard from "../components/user/postCard";
import { SERVER_ROOT_URL } from "../store/constants";
import { headers } from "../hooks/globals";
import RightSidebar from "../components/nav/rightSidebar";

const Topic = () => {
  const { topicId } = useParams();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`${SERVER_ROOT_URL}/post/fromTopic`, JSON.stringify({ topicId }), {
        headers,
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        toast.error("Error Loading Posts");
      });
  }, [topicId]);

  return (
    <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
      <div className="w-full rightSidebarInMainPage">
        <RightSidebar fullWidth />
      </div>
      {!posts.length > 0 ? (
        <div className="text-2xl mt-10">No Posts found</div>
      ) : (
        posts && posts.map((post) => <PostCard key={post.postID} post={post} />)
      )}
    </div>
  );
};

export default Topic;
