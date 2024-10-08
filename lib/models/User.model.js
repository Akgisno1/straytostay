import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  avatar: [{ type: String }],
  bio: { type: String },
  notifications: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema);
module.exports = User;
