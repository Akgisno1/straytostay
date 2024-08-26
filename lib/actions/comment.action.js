"use server";
import { revalidatePath } from "next/cache";
import Comment from "../models/Comment.model";
import Activity from "../models/Activity.model";
import { connectDB } from "../mongoose";

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
