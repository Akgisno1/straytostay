"use server";

import { cookies } from "next/headers";
import User from "../models/User.model";
import Ngo from "../models/Ngo.model";
import { connectDB } from "../mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { revalidatePath } from "next/cache";

export async function createUser({
  name,
  username,
  password,
  email,

  phoneNumber,
  bio,
  avatar,
}) {
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,

      phoneNumber,
      bio,
      avatar,
    });
    console.log(newUser);
  } catch (error) {
    throw new Error("Failed to create User");
  }
}

export async function loginUser({ username, password }) {
  try {
    await connectDB();

    // Find the user by username
    const user = await User.findOne({ username }).exec(); // Use exec() to get a plain JS object
    if (!user) {
      throw new Error("User not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Create JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      {
        id: user._id.toString(), // Convert ObjectId to string
        username: user.username,
        name: user.name,
        type: "user",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // Prepare cookies
    const cookiesList = cookies();
    cookiesList.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: age,
      sameSite: "strict",
      path: "/",
    });

    // Return only plain user data
    const { password: userPassword, ...userInfo } = user.toObject();
    return JSON.stringify(userInfo);
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
}

export async function logoutUser() {
  try {
    const cookiesList = cookies();
    cookiesList.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    throw new Error("Failed to logout");
  }
}

export async function getUserById(id) {
  try {
    await connectDB();
    // Ensure id is a valid MongoDB ObjectId

    let user = await User.findById(id);
    if (!user) {
      // If not found, attempt to find in the Ngo model
      user = await Ngo.findById(id);
    }
    if (!user) {
      throw new Error("User not found");
    }

    return user.toObject();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}
export async function getUserByName(authorusername) {
  try {
    await connectDB();
    let user = await User.findOne({ username: authorusername }).lean();
    if (!user) {
      user = await Ngo.findOne({ username: authorusername }).lean();
    }
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
}
