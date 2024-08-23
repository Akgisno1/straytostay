"use server";
import { revalidatePath } from "next/cache";
import Answer from "../models/Answer.model";
// import Question from "../models/Question.model";
import { connectDB } from "../mongoose";

export async function createAnswer({ questionId, content, authorId, path }) {
  try {
    await connectDB();

    const newAnswer = await Answer.create({
      questionId,
      content,
      authorId,
    });

    // if (!newAnswer) {
    //   throw new Error("Failed to create answer");
    // }

    // const updatedQuestion = await Question.findByIdAndUpdate(
    //   questionId,
    //   { $push: { answers: newAnswer._id } },
    //   { new: true, useFindAndModify: false }
    // );

    // if (!updatedQuestion) {
    //   throw new Error("Failed to update question with new answer");
    // }

    console.log("New Answer Created and Added to Question:", newAnswer);

    revalidatePath(path);
  } catch (error) {
    console.error("Error creating answer or updating question:", error);
  }
}
