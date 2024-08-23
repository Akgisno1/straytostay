"use client";

import React, { useState, useEffect } from "react";
import { addLike, removeLike } from "../../lib/actions/activity.action"; // Server actions to add/remove likes
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"; // Import heart icons

const LikeButton = ({ activityId, initialLikes, userId }) => {
  // Local state to manage likes count and whether the current user has liked the post
  const [likesCount, setLikesCount] = useState(initialLikes.length);
  const [hasLiked, setHasLiked] = useState(initialLikes.includes(userId));

  useEffect(() => {
    setLikesCount(initialLikes.length); // Update the count if initialLikes changes
    setHasLiked(initialLikes.includes(userId)); // Update the like state for the current user
  }, [initialLikes, userId]);

  const handleLike = async () => {
    if (hasLiked) {
      await removeLike(activityId, userId); // Make the API call to remove a like
      setLikesCount((prev) => prev - 1); // Update the local likes count
      setHasLiked(false); // Set user like state to false
    } else {
      await addLike(activityId, userId); // Make the API call to add a like
      setLikesCount((prev) => prev + 1); // Update the local likes count
      setHasLiked(true); // Set user like state to true
    }
  };

  return (
    <button
      className="flex items-center gap-2 text-green-500" // Change to green text
      onClick={handleLike}
    >
      {hasLiked ? (
        <HeartFilledIcon width={24} height={24} /> // Filled heart when liked
      ) : (
        <HeartIcon width={24} height={24} /> // Unfilled heart when not liked
      )}
      <span>{likesCount}</span> {/* Display updated likes count */}
    </button>
  );
};

export default LikeButton;
