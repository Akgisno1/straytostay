import React from "react";
import { getTimestamp } from "../../lib/utils";
import ActivityDeleteButton from "../icons/ActivityDeleteButton";

const UserActivityCard = ({
  activityId,
  userId,
  likes,
  views,
  title,
  images,
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
            <div>{likes.length} likes</div>
            <div>{views} views</div>
          </div>
          <ActivityDeleteButton activityId={activityId} userId={userId} />
        </div>
        <div className="my-2 line-clamp-1 text-xl font-semibold">{title}</div>
      </div>
    </div>
  );
};

export default UserActivityCard;
