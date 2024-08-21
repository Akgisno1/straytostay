import React from "react";
import { getPosts } from "../lib/actions/post.action";
import PostCard from "../components/cards/PostCard";

const AllPosts = async () => {
  const posts = await getPosts({
    filter: "popular",
    page: 1,
    pageSize: 10,
  });

  return (
    <div className="flex size-full flex-wrap items-start justify-center gap-6 overflow-auto  rounded-xl bg-secondary px-6 py-8">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          postId={post._id}
          authorusername={post.authorusername}
          title={post.title}
          description={post.description}
          images={post.images}
          urgency={post.urgency}
          likes={post.likes}
          createdAt={post.createdAt}
          views={post.views}
        />
      ))}
    </div>
  );
};

export default AllPosts;
