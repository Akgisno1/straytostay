"use client";
import React, { useState, useEffect } from "react";
import { getUserPosts } from "../../lib/actions/post.action";
import UserPostCard from "../cards/UserPostCard";
import FilterComponent from "../shared/FilterComponent";

const UserPosts = (userId) => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "urgent"];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getUserPosts({
          userId: userId.userId,
          filter,
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, [filter]);
  return (
    <div className="flex size-full flex-col rounded-xl bg-secondary  p-1 max-md:justify-center ">
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
        filters={filters}
      />
      <div className="flex size-full flex-wrap items-start gap-6 overflow-auto">
        {posts.map((post) => (
          <UserPostCard
            key={post._id}
            postId={post._id}
            userId={userId.userId}
            title={post.title}
            description={post.description}
            images={post.images}
            urgency={post.urgency}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
