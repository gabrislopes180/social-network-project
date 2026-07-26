import mongoose from "mongoose";

const FollowsSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});
export const Follows = mongoose.model("Follows", FollowsSchema);
