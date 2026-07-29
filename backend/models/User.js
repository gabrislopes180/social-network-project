import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  description: { type: String },
  preferences: {
    color1: { type: String },
    color2: { type: String },
  },
  postsCount: { type: Number, default: 0 },
  followersCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  hasLeadershipBadge: {
    type: Boolean,
    default: false,
  },
  groupsCreatedCount: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

export const User =
  mongoose.models.User || mongoose.model("User", UserSchema, "users");
