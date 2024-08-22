"use server";

import { cookies } from "next/headers";
import Ngo from "../models/Ngo.model";
import { connectDB } from "../mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createNgo({
  name,
  username,
  password,
  email,

  phoneNumber,
  bio,
  avatar,
  cover,
}) {
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newNGO = await Ngo.create({
      name,
      username,
      password: hashedPassword,
      email,

      phoneNumber,
      bio,
      avatar,
      cover,
    });
    console.log(newNGO);
  } catch (error) {
    throw new Error("Failed to create Ngo");
  }
}

export async function loginNgo({ username, password }) {
  try {
    await connectDB();

    // Find the user by username
    const ngo = await Ngo.findOne({ username }).exec(); // Use exec() to get a plain JS object
    if (!ngo) {
      throw new Error("Ngo not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, ngo.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Create JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      {
        id: ngo._id.toString(), // Convert ObjectId to string
        username: ngo.username,
        name: ngo.name,
        type: "ngo",
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
    const { password: userPassword, ...ngoInfo } = ngo.toObject();
    return JSON.stringify(ngoInfo);
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
}

export async function logoutNgo() {
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

export async function getNgoById(id) {
  try {
    await connectDB();
    const ngo = await Ngo.findById(id);
    if (!ngo) {
      throw new Error("Ngo not found");
    }
    return ngo;
  } catch (error) {
    throw new Error("Failed to get Ngo");
  }
}
