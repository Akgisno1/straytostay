"use client";

import React, { useState, useEffect } from "react";
import { getUserById } from "../../lib/actions/user.action";
import { getTimestamp } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import LikeCommentButton from "../icons/LikeCommentButton";

const CommentCard = ({ commentId, content, likes, authorId, createdAt }) => {
  const [user, setUser] = useState(null);
  const { currentNgo, currentUser } = useAuth();
  const isloggedIn = currentUser || currentNgo;

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
    <div className="flex w-full flex-col rounded-lg bg-primary-foreground p-4 pt-2 text-card-foreground shadow-md">
      <div className="flex flex-row items-center justify-between">
        {user && (
          <Link href={`/user/${user._id}`} className="flex flex-row">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.username} />
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
          {isloggedIn && (
            <LikeCommentButton
              commentId={commentId}
              initialLikes={likes}
              userId={currentNgo?._id || currentUser?._id}
            />
          )}
        </div>
      </div>
      <div className="my-2 font-mont text-lg font-bold max-sm:text-sm">
        {content}
      </div>
      <div className="flex flex-row items-center gap-6 text-sm max-sm:text-xs">
        <div className="text-gray-500">{formattedDate}</div>
      </div>
    </div>
  );
};

export default CommentCard;
