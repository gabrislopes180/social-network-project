import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// impede que um usuário curta o mesmo post duas vezes
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Like =
  mongoose.models.Like || mongoose.model("Like", LikeSchema, "likes");
