import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MongoDB URL not found");
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "StraytoStay",
  });
  isConnected = true;
  console.log("Connected to DB");
};
