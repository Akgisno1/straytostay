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
    ]);

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
    ]);

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
