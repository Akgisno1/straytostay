import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(3, "Name is required."),
  username: z.string().min(6, "Username is required."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});
export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export const userOnboardingSchema = z.object({
  name: z.string().min(3, "Name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  phoneNumber: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  onboardingCompleted: z.boolean().default(false),
  notifications: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});

export const createPostSchema = z.object({
  title: z.string().min(10, "Title needs to longer"),
  description: z.string().min(30, "Description needs to be longer"),
  urgency: z.boolean(),
});

export const createQuestionSchema = z.object({
  content: z.string().min(30, "Content needs to be longer"),
});

export const createActivitySchema = z.object({
  title: z.string().min(10, "Title needs to longer"),
});
