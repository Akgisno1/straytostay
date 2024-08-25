"use client";
import React, { useState, useEffect } from "react";
import { getPosts } from "../lib/actions/post.action";
import PostCard from "../components/cards/PostCard";
import FilterComponent from "./shared/FilterComponent"; // Import the FilterComponent

const AllPosts = () => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "frequent", "urgent"];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts({
          filter, // Use the current filter state
          page: 1,
          pageSize: 10,
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, [filter]);

  return (
    <div className="flex size-full flex-col rounded-xl bg-secondary p-4 max-md:justify-center max-sm:p-3">
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
        filters={filters}
      />
      <div className="flex size-full flex-wrap items-start gap-6 overflow-auto">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            authorusername={post.authorusername}
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

export default AllPosts;
