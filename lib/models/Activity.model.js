import { Schema, models, model } from "mongoose";

const ActivitySchema = new Schema({
  title: { type: String, required: true },
  views: { type: Number, default: 0 },
  images: [{ type: String, required: true }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

const Activity = models.Activity || model("Activity", ActivitySchema);

export default Activity;
