"use client";

import React, { useState, useEffect } from "react";
import { toggleBookmark } from "../../lib/actions/post.action"; // Server action to toggle bookmark
import { BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons"; // Import bookmark icons

const BookmarkButton = ({ postId, initialBookmarked, userId }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const handleBookmarkToggle = async () => {
    try {
      await toggleBookmark(postId, userId); // Call the combined server action
      setIsBookmarked((prev) => !prev); // Toggle local state
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <button
      className={`flex items-center justify-center rounded-full border border-green-500 p-2 ${
        isBookmarked ? "bg-green-500 text-white" : "text-green-500"
      }`}
      onClick={handleBookmarkToggle}
    >
      {isBookmarked ? (
        <BookmarkFilledIcon width={24} height={24} /> // Filled icon when bookmarked
      ) : (
        <BookmarkIcon width={24} height={24} /> // Outline icon when not bookmarked
      )}
    </button>
  );
};

export default BookmarkButton;
