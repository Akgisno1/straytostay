// components/UrgentPosts.js

"use client";
import React, { useState, useEffect } from "react";
import { getUrgentPosts } from "../../lib/actions/post.action";
import UrgentPostCard from "../cards/UrgentPostCard"; // Import the PostCard component

const UrgentPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getUrgentPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex size-full flex-col items-start gap-4 overflow-auto rounded-xl bg-secondary px-6 py-4">
      <h1 className="font-oxo text-3xl font-semibold text-red-500">
        Urgent Adoptions
      </h1>
      {posts.map((post) => (
        <UrgentPostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UrgentPosts;
