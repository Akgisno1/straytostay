import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  authorusername: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  urgency: { type: Boolean, default: false }, // Default to false if not urgent
  createdAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);
module.exports = Post;
