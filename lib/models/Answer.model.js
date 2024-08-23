import { Schema, models, model } from "mongoose";

const AnswerSchema = new Schema({
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  questionId: { type: Schema.Types.ObjectId, ref: "Question" },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
