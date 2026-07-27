import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      // Quem VAI RECEBER a notificação
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      // Quem CAUSOU a ação (seu 'userAction')
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["follow", "like", "comment"],
      required: true,
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", notificationSchema);
