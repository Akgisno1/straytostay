"use client";

import React, { useState, useEffect } from "react";
import { toggleVote } from "../../lib/actions/question.action"; // Use the unified action
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const UpvoteDownvote = ({
  questionId,
  initialUpvotes,
  initialDownvotes,
  userId,
}) => {
  const [upvotesCount, setUpvotesCount] = useState(initialUpvotes.length);
  const [downvotesCount, setDownvotesCount] = useState(initialDownvotes.length);
  const [hasUpvoted, setHasUpvoted] = useState(initialUpvotes.includes(userId));
  const [hasDownvoted, setHasDownvoted] = useState(
    initialDownvotes.includes(userId)
  );

  useEffect(() => {
    setUpvotesCount(initialUpvotes.length);
    setDownvotesCount(initialDownvotes.length);
    setHasUpvoted(initialUpvotes.includes(userId));
    setHasDownvoted(initialDownvotes.includes(userId));
  }, [initialUpvotes, initialDownvotes, userId]);

  const handleVote = async (actionType) => {
    const result = await toggleVote(questionId, userId, actionType);

    // Update local state based on the result
    setUpvotesCount(result.upvotes);
    setDownvotesCount(result.downvotes);
    setHasUpvoted(result.hasUpvoted);
    setHasDownvoted(result.hasDownvoted);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className={`flex items-center gap-2 ${hasUpvoted ? "text-green-500" : "text-gray-500"}`}
        onClick={() => handleVote("upvote")}
      >
        <ChevronUpIcon width={24} height={24} />
        <span>{upvotesCount}</span>
      </button>
      <button
        className={`flex items-center gap-2 ${hasDownvoted ? "text-red-500" : "text-gray-500"}`}
        onClick={() => handleVote("downvote")}
      >
        <ChevronDownIcon width={24} height={24} />
        <span>{downvotesCount}</span>
      </button>
    </div>
  );
};

export default UpvoteDownvote;
