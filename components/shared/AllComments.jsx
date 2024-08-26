"use client";
import React, { useState, useEffect } from "react";
import FilterComponent from "./FilterComponent";
import { getComments } from "../../lib/actions/comment.action";
import CommentCard from "../cards/CommentCard";
const AllComments = (activityId) => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "popular"];
  const [comments, setcomments] = useState([]);
  useEffect(() => {
    const fetchcomments = async () => {
      try {
        const fetchedcomments = await getComments({
          activityId: activityId.activityId,
          filter,
        });
        setcomments(fetchedcomments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchcomments();
  }, [filter, activityId]);

  if (!comments || comments.length === 0) {
    return (
      <div className="flex w-full flex-col items-start  overflow-auto rounded-xl bg-secondary ">
        <div className="font-mont text-2xl">No Comments to Show.</div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-4 overflow-auto rounded-xl bg-secondary  ">
      <div className="flex flex-row gap-2 ">
        <h1 className="font-oxo text-3xl font-bold text-primary max-sm:hidden">
          All Answers
        </h1>
        <FilterComponent
          filter={filter}
          setFilter={setFilter}
          filters={filters}
        />
      </div>

      <div className="flex w-full flex-col gap-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            commentId={comment._id}
            content={comment.content}
            authorId={comment.authorId}
            createdAt={comment.createdAt}
            likes={comment.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default AllComments;
