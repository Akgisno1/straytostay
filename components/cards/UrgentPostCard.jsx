// components/cards/PostCard.js

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUserByName } from "../../lib/actions/user.action"; // Adjust import as needed

const PostCard = ({ post }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const fetchedAuthor = await getUserByName(post.authorusername);
        setAuthor(fetchedAuthor);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchAuthor();
  }, [post.authorusername]);

  if (!author) return null; // Skip rendering if author data is not available

  return (
    <Link
      href={`/user/${author._id}`}
      key={post._id}
      className="flex h-[180px] w-full flex-col rounded-lg bg-primary-foreground text-card-foreground shadow-md hover:bg-destructive max-md:w-[96%]"
    >
      <img
        src={post.images[0]}
        className="h-32 w-full rounded-t-lg object-cover"
        alt={post.title}
      />
      <div className="truncate whitespace-nowrap p-2 text-xl font-semibold">
        {post.title}
      </div>
    </Link>
  );
};

export default PostCard;
