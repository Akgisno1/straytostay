"use server";
import { connectDB } from "../mongoose";
import Post from "../models/Post.model";

export async function createPost({
  authorusername,
  title,
  description,
  images,
  urgency,
}) {
  try {
    await connectDB();
    const newPost = await Post.create({
      authorusername,
      title,
      description,
      images,
      urgency,
    });
    console.log(newPost);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Post");
  }
}

export async function getPosts(params = {}) {
  try {
    await connectDB();

    const { filter = "newest", page = 1, pageSize = 10 } = params;

    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};
    let filterOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "urgent":
        // Filter by urgent posts
        filterOptions = { urgent: true };
        break;
      default:
        // Fallback to sorting by newest
        sortOptions = { createdAt: -1 };
        break;
    }

    const posts = await Post.find(filterOptions) // Apply the filter options here
      .sort(sortOptions) // Apply the sort options here
      .skip(skipAmount)
      .limit(pageSize)
      .lean();

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getUrgentPosts() {
  try {
    await connectDB();
    const pageSize = 5;
    const urgentPosts = await Post.find({ urgency: true })
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return urgentPosts;
  } catch (error) {
    console.error("Error fetching urgent posts:", error);
    throw error;
  }
}

export const toggleBookmark = async (postId, userId) => {
  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the user or NGO has already bookmarked the post
    const isBookmarked = post.bookmarkedBy.includes(userId);

    if (isBookmarked) {
      // If already bookmarked, remove the user/NGO ID
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { bookmarkedBy: userId } },
        { new: true }
      );
    } else {
      // If not bookmarked, add the user/NGO ID
      await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { bookmarkedBy: userId } },
        { new: true }
      );
    }
  } catch (error) {
    console.error("Failed to toggle bookmark:", error);
    throw error;
  }
};
