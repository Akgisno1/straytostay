"use client";
import React, { useState, useEffect } from "react";
import FilterComponent from "./FilterComponent";
import { getAnswers } from "../../lib/actions/answer.action";
import AnswerCard from "../cards/AnswerCard";

const AllAnswers = (questionId) => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "votes"];
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const fetchedAnswers = await getAnswers({
          questionId: questionId.questionId,
          filter,
        });
        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error("Failed to fetch answers", error);
      }
    };
    fetchAnswers();
  }, [filter, questionId]); // Include questionId in the dependency array

  if (!answers || answers.length === 0) {
    return (
      <div className="flex w-full flex-col items-start  overflow-auto rounded-xl bg-secondary ">
        <div className="font-mont text-2xl">No Answers to Show.</div>
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
        {answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            AnswerId={answer._id}
            content={answer.content}
            upvotes={answer.upvotes}
            downvotes={answer.downvotes}
            authorId={answer.authorId}
            createdAt={answer.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
