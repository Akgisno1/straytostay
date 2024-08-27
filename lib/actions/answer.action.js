"use server";
import { revalidatePath } from "next/cache";
import Answer from "../models/Answer.model";
import Question from "../models/Question.model";
import { connectDB } from "../mongoose";
import mongoose from "mongoose";

export async function createAnswer({ questionId, content, authorId, path }) {
  try {
    await connectDB();

    const newAnswer = await Answer.create({
      questionId,
      content,
      authorId,
    });

    if (!newAnswer) {
      throw new Error("Failed to create answer");
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: newAnswer._id } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedQuestion) {
      throw new Error("Failed to update question with new answer");
    }

    console.log("New Answer Created and Added to Question:", newAnswer);

    revalidatePath(path);
  } catch (error) {
    console.error("Error creating answer or updating question:", error);
  }
}
export async function getAnswers({ questionId, filter }) {
  try {
    await connectDB();

    const pageSize = 10; // Number of answers to fetch per page
    let sortOptions = {};

    // Determine sorting options based on the filter
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 }; // Sort by newest first
        break;
      case "votes":
        sortOptions = { votesCount: -1 }; // Sort by votes count descending
        break;
      default:
        sortOptions = { createdAt: -1 }; // Default to newest
        break;
    }

    // Debug: Log the sortOptions and questionId
    console.log("Sort Options:", sortOptions);
    console.log("Question ID:", questionId);

    // Convert questionId to ObjectId if it is not a string
    const objectIdQuestionId =
      typeof questionId === "string"
        ? new mongoose.Types.ObjectId(questionId)
        : questionId;

    // Use the aggregation pipeline for more complex operations
    const answers = await Answer.aggregate([
      {
        $match: { questionId: objectIdQuestionId }, // Filter by questionId
      },
      {
        $addFields: {
          votesCount: {
            $subtract: [
              { $size: { $ifNull: ["$upvotes", []] } }, // Count the length of the upvotes array
              { $size: { $ifNull: ["$downvotes", []] } }, // Count the length of the downvotes array
            ],
          },
        },
      },
      { $sort: sortOptions }, // Apply sorting based on the computed votes count or creation date
      { $limit: pageSize }, // Limit the results to pageSize
    ]).exec();

    console.log("Fetched Answers:", answers); // Debug: Check if answers are being fetched
    return answers; // Return the fetched answers
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error; // Propagate the error for further handling
  }
}

export async function toggleVoteAnswer(AnswerId, userId, actionType) {
  await connectDB(); // Connect to the database

  // Find the answer
  const answer = await Answer.findById(AnswerId);

  if (!answer) {
    throw new Error("Answer not found");
  }

  const hasUpvoted = answer.upvotes.includes(userId);
  const hasDownvoted = answer.downvotes.includes(userId);

  if (actionType === "upvote") {
    if (hasUpvoted) {
      // Remove upvote
      answer.upvotes.pull(userId);
    } else {
      // Add upvote
      answer.upvotes.push(userId);
      if (hasDownvoted) {
        // Remove downvote if it exists
        answer.downvotes.pull(userId);
      }
    }
  } else if (actionType === "downvote") {
    if (hasDownvoted) {
      // Remove downvote
      answer.downvotes.pull(userId);
    } else {
      // Add downvote
      answer.downvotes.push(userId);
      if (hasUpvoted) {
        // Remove upvote if it exists
        answer.upvotes.pull(userId);
      }
    }
  }

  // Save the updated answer document
  await answer.save();

  return {
    upvotes: answer.upvotes.length,
    downvotes: answer.downvotes.length,
    hasUpvoted: answer.upvotes.includes(userId),
    hasDownvoted: answer.downvotes.includes(userId),
  };
}
