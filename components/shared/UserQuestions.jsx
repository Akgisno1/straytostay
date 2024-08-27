"use client";
import React, { useState, useEffect } from "react";
import { getUserQuestions } from "../../lib/actions/question.action";
import UserQuestionCard from "../cards/UserQuestionCard";
import FilterComponent from "../shared/FilterComponent";

const UserQuestions = (userId) => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "frequent", "votes"];
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getUserQuestions({
          userId: userId.userId,
          filter,
        });
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };
    fetchQuestions();
  }, [filter]);

  if (questions.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-6 overflow-auto rounded-xl bg-secondary p-4 max-sm:gap-4 ">
        <div className="font-mont text-2xl">No Questions to Show.</div>
      </div>
    );
  }
  return (
    <div className="flex size-full flex-col rounded-xl bg-secondary  p-1 max-md:justify-center ">
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
        filters={filters}
      />
      <div className="flex size-full flex-wrap items-start gap-6 overflow-auto">
        {questions.map((post) => (
          <UserQuestionCard
            key={post._id}
            userId={userId.userId}
            questionId={post._id}
            views={post.views}
            content={post.content}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default UserQuestions;
