import React from "react";
import { getTopQuestions } from "../../lib/actions/question.action";
import Link from "next/link";

const TopQuestions = async () => {
  const result = await getTopQuestions();
  if (result.length === 0) {
    return (
      <div className=" flex w-full flex-col  gap-4 mt-4 overflow-auto">
        <h1 className="font-oxo text-3xl font-semibold text-primary max-lg:text-xl">
          Top Questions
        </h1>
        <div className="text-2xl font-mono">No top Question</div>
      </div>
    );
  }
  return (
    <div className=" flex w-full flex-col  gap-4 mt-4 max-sm:mt-0 overflow-auto">
      <h1 className="font-oxo text-3xl font-semibold text-primary max-lg:text-xl">
        Top Questions
      </h1>

      {result.map((question) => (
        <Link
          href={`/question/${question._id}`}
          key={question._id}
          className="text-lg font-mont line-clamp-1  max-lg:text-base text-gray-500 hover:text-primary"
        >
          {question.content}
        </Link>
      ))}
    </div>
  );
};

export default TopQuestions;
