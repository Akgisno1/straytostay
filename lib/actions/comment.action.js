"use server";
import { revalidatePath } from "next/cache";
import Comment from "../models/Comment.model";
import Activity from "../models/Activity.model";
import { connectDB } from "../mongoose";
import mongoose from "mongoose";

export async function createComment({ activityId, content, authorId, path }) {
  try {
    await connectDB();

    const newComment = await Comment.create({
      activityId,
      content,
      authorId,
    });

    if (!newComment) {
      console.log("Failed to create comment");
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { $push: { comments: newComment._id } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedActivity) {
      console.log("Failed to update activity with new comment");
    }

    console.log("New comment Created and Added to activity:", newComment);

    revalidatePath(path);
  } catch (error) {
    console.log("Error creating comment or updating activity:", error);
  }
}
export async function getComments({ activityId, filter }) {
  try {
    await connectDB();

    const pageSize = 10;
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;

      case "popular":
        sortOptions = { likesCount: -1 };
        break;
      default:
        // Fallback to sorting by newest
        break;
    }

    const objectIdActivityId =
      typeof activityId === "string"
        ? new mongoose.Types.ObjectId(activityId)
        : activityId;

    // Use the aggregation pipeline for more complex operations
    const comments = await Comment.aggregate([
      {
        $match: { activityId: objectIdActivityId }, // Filter by questionId
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      { $sort: sortOptions }, // Apply sorting based on the computed votes count or creation date
      { $limit: pageSize }, // Limit the results to pageSize
    ]).exec();

    console.log("Fetched Comments:", comments); // Debug: Check if answers are being fetched
    return comments; // Return the fetched answers
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Propagate the error for further handling
  }
}
export async function addCommentLike(commentId, userId) {
  await connectDB();
  await Comment.updateOne(
    { _id: commentId },
    { $addToSet: { likes: userId } } // Add userId to likes array if not already present
  );
}

export async function removeCommentLike(commentId, userId) {
  await connectDB();
  await Comment.updateOne(
    { _id: commentId },
    { $pull: { likes: userId } } // Remove userId from likes array if present
  );
}
