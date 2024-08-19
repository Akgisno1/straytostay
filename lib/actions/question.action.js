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
