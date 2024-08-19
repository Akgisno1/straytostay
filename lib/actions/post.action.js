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
