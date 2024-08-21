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

// Adjust the path according to your project structure

export async function getPosts(params = {}) {
  try {
    await connectDB();

    const { filter = "newest", page = 1, pageSize = 10 } = params;

    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

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

    const posts = await Post.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" }, // Add a field that counts the number of likes
        },
      },
      { $sort: sortOptions },
      { $skip: skipAmount },
      { $limit: pageSize },
    ]);

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
