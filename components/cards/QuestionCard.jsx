"use client";

import React, { useState, useEffect } from "react";
import { getUserById } from "../../lib/actions/user.action";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import UpvoteDownvote from "../icons/UpvoteDownvote"; // Import the UpvoteDownvote component
import CreateAnswerForm from "../forms/CreateAnswerForm";

const QuestionCard = ({
  questionId,
  content,
  views,
  upvotes,
  downvotes,
  authorId,
  createdAt,
}) => {
  const [user, setUser] = useState(null);
  const [showCreateAnswerForm, setShowCreateAnswerForm] = useState(false);

  const formattedDate = getTimestamp(createdAt);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(authorId);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, [authorId]);

  return (
    <div className="flex flex-col rounded-lg bg-primary-foreground p-4 pt-2 text-card-foreground shadow-md">
      <div className="flex flex-row items-center justify-between">
        {user && (
          <Link href={`/user/${user._id}`} className="flex flex-row">
            <Avatar>
              <AvatarImage src="/default-avatar.jpg" alt={user.username} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-col justify-center">
              <div className="font-semibold">{user.username}</div>
            </div>
          </Link>
        )}
        <div className="flex items-center gap-4">
          <UpvoteDownvote
            questionId={questionId}
            initialUpvotes={upvotes}
            initialDownvotes={downvotes}
            userId={user?._id}
          />
        </div>
      </div>
      <Link
        href={`/question/${questionId}`}
        className="my-2 font-mont text-lg font-bold max-sm:text-sm"
      >
        {content}
      </Link>
      <div className="flex flex-row items-center gap-6 text-sm max-sm:text-xs">
        <div className="text-gray-500">{views} views</div>
        <div className="text-gray-500">{formattedDate}</div>
        <button
          onClick={() => setShowCreateAnswerForm(!showCreateAnswerForm)}
          className="ml-auto text-blue-500"
        >
          {showCreateAnswerForm ? "Hide" : "Show"} Answers
        </button>
      </div>
      {showCreateAnswerForm && <CreateAnswerForm questionId={questionId} />}
    </div>
  );
};

export default QuestionCard;
