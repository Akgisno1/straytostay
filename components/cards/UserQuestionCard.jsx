import React from "react";
import { getTimestamp } from "../../lib/utils";
import QuestionDeleteButton from "../icons/QuestionDeleteButton";

const UserActivityCard = ({
  userId,
  questionId,
  views,
  content,
  createdAt,
}) => {
  const formattedDate = getTimestamp(createdAt);
  return (
    <div className=" flex  w-full flex-row rounded-lg bg-primary-foreground text-card-foreground shadow-md  max-md:flex-col ">
      <div className="w-full flex-col p-2">
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row gap-2 ">
            <div>{formattedDate}</div>

            <div>{views} views</div>
          </div>
          <QuestionDeleteButton questionIdId={questionId} authorId={userId} />
        </div>
        <div className="my-2 line-clamp-1 text-xl font-semibold">{content}</div>
      </div>
    </div>
  );
};

export default UserActivityCard;
