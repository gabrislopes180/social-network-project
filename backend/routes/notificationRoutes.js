import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import { getNotifications } from "../controllers/notificationController.js";

export const notificationRouter = express.Router();

notificationRouter.get("/me", authTokens, getNotifications, getNotifications);
