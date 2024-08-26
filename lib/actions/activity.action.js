"use server";
import { revalidatePath } from "next/cache";
import Activity from "../models/Activity.model";
import { connectDB } from "../mongoose";

export async function createActivity({ authorId, title, images, path }) {
  try {
    await connectDB();
    const newActivity = await Activity.create({
      authorId,
      title,
      images,
    });
    console.log(newActivity);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getActivities(filter) {
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
      case "popular":
        sortOptions = { likesCount: -1 };
        break;
      default:
        // Fallback to sorting by newest
        break;
    }

    const activities = await Activity.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      { $sort: sortOptions },

      { $limit: pageSize },
    ]);

    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}
export async function addLike(activityId, userId) {
  await connectDB();
  await Activity.updateOne(
    { _id: activityId },
    { $addToSet: { likes: userId } } // Add userId to likes array if not already present
  );
}

export async function removeLike(activityId, userId) {
  await connectDB();
  await Activity.updateOne(
    { _id: activityId },
    { $pull: { likes: userId } } // Remove userId from likes array if present
  );
}
