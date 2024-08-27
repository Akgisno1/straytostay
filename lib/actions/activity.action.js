"use server";

import { revalidatePath } from "next/cache";
import Activity from "../models/Activity.model";
import Comment from "../models/Comment.model";
import { connectDB } from "../mongoose";

export async function createActivity({ authorId, title, images, path }) {
  try {
    await connectDB();
    const newActivity = await Activity.create({
      authorId,
      title,
      images,
    });

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
    ]).exec();

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
export async function getActivityById(activityId) {
  try {
    await connectDB();
    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new Error("Activity not found");
    }
    return activity.toObject();
  } catch (error) {
    throw new Error("Failed to fetch activity data");
  }
}
export async function incrementActivityViews(activityId) {
  try {
    await connectDB();
    const activity = await Activity.findByIdAndUpdate(
      activityId,
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true } // Return the updated document
    ).exec();

    if (!activity) {
      throw new Error("Activity not found");
    }
    return activity;
  } catch (error) {
    throw new Error("Failed to increment Activity views");
  }
}
export async function getUserActivities({ userId, filter }) {
  try {
    await connectDB();

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "popular":
        sortOptions = { likesCount: -1 }; // Sort by the number of likes
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // Fetch activities using .find() with the filter by authorId
    let activities = await Activity.find({ authorId: userId })
      .sort(sortOptions)
      .exec();

    // If sorting by 'popular', add the likes count manually
    if (filter === "popular") {
      activities = activities.map((activity) => ({
        ...activity.toObject(),
        likesCount: activity.likes.length,
      }));

      // Sort again by likes count if required
      activities.sort((a, b) => b.likesCount - a.likesCount);
    }

    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error.message); // Log error message
    throw new Error("Failed to fetch user activities"); // Throw a sanitized error message
  }
}
export async function deleteActivity(activityId) {
  try {
    await connectDB();

    // Find and delete the activity
    const activity = await Activity.findByIdAndDelete(activityId);

    if (!activity) {
      return { success: false, message: "Activity not found" };
    }

    // Delete all comments related to this activity
    await Comment.deleteMany({ _id: { $in: activity.comments } });

    return {
      success: true,
      message: "Activity and related comments deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting activity:", error);
    return {
      success: false,
      message: "Error deleting activity",
      error: error.message,
    };
  }
}
