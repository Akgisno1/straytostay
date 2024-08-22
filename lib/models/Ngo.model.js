import { Schema, models, model } from "mongoose";

const NgoSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  avatar: { type: String },
  cover: { type: String },
  bio: { type: String },
  notifications: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Ngo = models?.Ngo || model("Ngo", NgoSchema);
module.exports = Ngo;
