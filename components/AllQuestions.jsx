"use client";
import React, { useState, useEffect } from "react";
import FilterComponent from "./shared/FilterComponent"; // Import the FilterComponent
import QuestionCard from "./cards/QuestionCard";
import { getQuestions } from "../lib/actions/question.action";

const AllQuestions = () => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "frequent", "votes"];
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions(filter);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };
    fetchQuestions();
  }, [filter]);

  if (questions.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-6 overflow-auto rounded-xl bg-secondary px-6 pb-8 pt-4 max-sm:gap-4 max-sm:p-4">
        <h1 className="font-oxo text-3xl font-bold text-primary">
          All Questions
        </h1>
        <div className="font-mont text-2xl">No Questions to Show.</div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-6 overflow-auto rounded-xl bg-secondary p-4 max-sm:gap-4">
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
        filters={filters}
      />
      <h1 className="font-oxo text-3xl font-bold text-primary max-sm:hidden">
        All Questions
      </h1>
      <div className="flex w-full flex-col gap-6 max-sm:gap-4">
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            questionId={question._id}
            content={question.content}
            views={question.views}
            upvotes={question.upvotes}
            downvotes={question.downvotes}
            authorId={question.authorId}
            createdAt={question.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuestions;
