import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,

      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,

      ref: "Post",
    },
    commentText: {
      required: true,
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Comments = mongoose.model("Comments", CommentSchema);
