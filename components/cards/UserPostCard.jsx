import React from "react";
import { getTimestamp } from "../../lib/utils";
import PostDeleteButton from "../icons/PostDeleteButton"; // Import the delete button

const UserPostCard = ({
  postId,
  userId, // Pass the userId to PostDeleteButton
  title,
  description,
  images,
  urgency,
  createdAt,
}) => {
  const formattedDate = getTimestamp(createdAt);
  return (
    <div className=" flex  w-full flex-row rounded-lg bg-primary-foreground text-card-foreground shadow-md  max-md:flex-col ">
      <img
        src={images[0]}
        className="h-28 w-52 rounded-lg object-cover pr-4 max-md:w-full max-md:p-2"
      />

      <div className="w-full flex-col p-2">
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row gap-2 ">
            <div>{formattedDate}</div>
            {urgency && (
              <div className="rounded-lg text-center text-base font-bold text-red-500 max-lg:text-sm">
                Urgent
              </div>
            )}
          </div>
          <PostDeleteButton postId={postId} userId={userId} />
        </div>
        <div className="my-2 line-clamp-1 text-xl font-semibold">{title}</div>
        <div className="mt-1 line-clamp-2 overflow-hidden">{description}</div>
      </div>
    </div>
  );
};

export default UserPostCard;
