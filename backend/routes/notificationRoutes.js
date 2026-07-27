import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

export const notificationRouter = express.Router();

notificationRouter.get("/me", authTokens, getNotifications, getNotifications);
notificationRouter.patch(
  "/markAsViewed/:notificationId",
  markNotificationAsRead,
);
