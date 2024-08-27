"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getQuestionById,
  incrementQuestionViews,
} from "../../lib/actions/question.action";
import { getUserById } from "../../lib/actions/user.action";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import UpvoteDownvote from "../icons/UpvoteDownvote";
import CreateAnswerForm from "../forms/CreateAnswerForm";
import { useAuth } from "../../context/AuthContext";
import AllAnswers from "./AllAnswers";

const QuestionInfo = () => {
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const [viewIncremented, setViewIncremented] = useState(false); // State to track if views were incremented
  const { currentNgo, currentUser } = useAuth();
  const isloggedIn = currentUser || currentNgo;
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const fetchedQuestion = await getQuestionById(questionId);
        if (fetchedQuestion) {
          setQuestion(fetchedQuestion);
          console.log(fetchedQuestion);
        } else {
          console.error("Question not found");
        }
      } catch (error) {
        console.error("Failed to fetch question data:", error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (question?.authorId) {
          const fetchedUser = await getUserById(question.authorId);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, [question?.authorId]);

  // Function to increment question views
  const incrementViews = async () => {
    try {
      await incrementQuestionViews(questionId);
      setViewIncremented(true); // Mark as incremented after the call
    } catch (error) {
      console.error("Failed to increment question views:", error);
    }
  };

  useEffect(() => {
    if (questionId && !viewIncremented) {
      // Only increment if not already incremented
      incrementViews();
    }
  }, [questionId, viewIncremented]); // Dependency array includes viewIncremented

  const formattedDate = question ? getTimestamp(question.createdAt) : "";

  return (
    <div className="relative flex size-full flex-col items-start gap-4 overflow-x-hidden rounded-xl bg-secondary p-4 max-sm:p-3">
      <div className="flex w-full flex-col rounded-lg bg-primary-foreground p-4 pt-2 text-card-foreground shadow-md">
        {question && (
          <>
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
                  <UpvoteDownvote
                    questionId={questionId}
                    initialUpvotes={question.upvotes}
                    initialDownvotes={question.downvotes}
                    userId={currentUser?._id || currentNgo?._id}
                  />
                )}
              </div>
            </div>
            <div className="my-2 font-mont text-lg font-bold max-sm:text-sm">
              {question.content}
            </div>
            <div className="flex flex-row items-center gap-6 text-sm max-sm:text-xs">
              <div className="text-gray-500">{question.views} views</div>
              <div className="text-gray-500">{formattedDate}</div>
            </div>

            <div className="flex flex-col">
              <CreateAnswerForm questionId={questionId} />
            </div>
          </>
        )}
      </div>
      <div className="flex w-full flex-col">
        <AllAnswers questionId={questionId} />
      </div>
    </div>
  );
};

export default QuestionInfo;
