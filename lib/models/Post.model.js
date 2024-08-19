import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  authorusername: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  urgency: { type: Boolean },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const Post = models?.Post || model("Post", PostSchema);
module.exports = Post;
