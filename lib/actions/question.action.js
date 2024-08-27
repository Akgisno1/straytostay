"use server";
import { revalidatePath } from "next/cache";
import Question from "../models/Question.model";
import { connectDB } from "../mongoose";

export async function createQuestion({ content, authorId, path }) {
  try {
    await connectDB();
    const newQuestion = await Question.create({
      content,
      authorId,
    });
    console.log(newQuestion);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getQuestions(filter) {
  try {
    await connectDB();

    const pageSize = 10;
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "votes":
        sortOptions = { votesCount: -1 };
        break;
      default:
        // Default to sorting by newest
        break;
    }

    const posts = await Question.aggregate([
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } }, // Ensure likes is treated as an array
          votesCount: {
            $subtract: [
              { $size: { $ifNull: ["$upvotes", []] } }, // Ensure upvotes is treated as an array
              { $size: { $ifNull: ["$downvotes", []] } }, // Ensure downvotes is treated as an array
            ],
          },
        },
      },
      { $sort: sortOptions }, // Sort by the specified option
      { $limit: pageSize },
    ]).exec();

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getTopQuestions() {
  try {
    await connectDB();

    const pageSize = 10;
    let sortOptions = {};

    sortOptions = { votesCount: -1 };

    const posts = await Question.aggregate([
      {
        $addFields: {
          // Ensure likes is treated as an array
          votesCount: {
            $subtract: [
              { $size: { $ifNull: ["$upvotes", []] } }, // Ensure upvotes is treated as an array
              { $size: { $ifNull: ["$downvotes", []] } }, // Ensure downvotes is treated as an array
            ],
          },
        },
      },
      { $sort: sortOptions }, // Sort by the specified option
      { $limit: pageSize },
    ]).exec();

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function toggleVote(questionId, userId, actionType) {
  await connectDB(); // Connect to the database

  // Find the question
  const question = await Question.findById(questionId);

  if (!question) {
    throw new Error("Question not found");
  }

  const hasUpvoted = question.upvotes.includes(userId);
  const hasDownvoted = question.downvotes.includes(userId);

  if (actionType === "upvote") {
    if (hasUpvoted) {
      // Remove upvote
      question.upvotes.pull(userId);
    } else {
      // Add upvote
      question.upvotes.push(userId);
      if (hasDownvoted) {
        // Remove downvote if it exists
        question.downvotes.pull(userId);
      }
    }
  } else if (actionType === "downvote") {
    if (hasDownvoted) {
      // Remove downvote
      question.downvotes.pull(userId);
    } else {
      // Add downvote
      question.downvotes.push(userId);
      if (hasUpvoted) {
        // Remove upvote if it exists
        question.upvotes.pull(userId);
      }
    }
  }

  // Save the updated question document
  await question.save();

  return {
    upvotes: question.upvotes.length,
    downvotes: question.downvotes.length,
    hasUpvoted: question.upvotes.includes(userId),
    hasDownvoted: question.downvotes.includes(userId),
  };
}
export async function getQuestionById(questionId) {
  try {
    await connectDB();
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    return question.toObject();
  } catch (error) {
    throw new Error("Failed to fetch question data");
  }
}

export async function incrementQuestionViews(questionId) {
  try {
    await connectDB();
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true } // Return the updated document
    ).lean();

    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  } catch (error) {
    throw new Error("Failed to increment question views");
  }
}
