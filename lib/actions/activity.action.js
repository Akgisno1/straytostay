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
