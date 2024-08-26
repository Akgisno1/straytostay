import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema({
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  authorId: { type: Schema.Types.ObjectId, ref: "Ngo" },
  activityId: { type: Schema.Types.ObjectId, ref: "Activity" },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
