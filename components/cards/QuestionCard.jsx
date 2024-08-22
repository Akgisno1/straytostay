import React from "react";
import { getUserById } from "../../lib/actions/user.action";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
const QuestionCard = async ({
  questionId,
  content,
  views,
  upvotes,
  downvotes,
  authorId,
  createdAt,
}) => {
  const user = await getUserById(authorId);
  const formattedDate = getTimestamp(createdAt);

  return (
    <div className="flex  flex-col rounded-lg bg-primary-foreground p-4 pt-2 text-card-foreground shadow-md">
      <div className="flex-row flex justify-between items-center">
        <Link href={`/user/${user._id}`} className="flex flex-row">
          <Avatar>
            <AvatarImage src="/default-avatar.jpg" alt={user.username} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex flex-col justify-center ">
            <div className="font-semibold">{user.username}</div>
          </div>
        </Link>
        <div>icons</div>
      </div>
      <Link
        href={`/question/${questionId}`}
        className="font-mont font-lg ml-12"
      >
        {content}
      </Link>
      <div className="flex flex-row items-center ml-12 gap-6">
        <div className="text-sm text-gray-500">{views} views</div>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </div>
    </div>
  );
};

export default QuestionCard;
