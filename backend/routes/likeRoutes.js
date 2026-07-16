import express from "express";
import { CreateLike } from "../controllers/likeController.js";
import { authTokens } from "../middleware/authMiddleware.js";

export const likesRouter = express.Router();

likesRouter.post("/:postId", authTokens, CreateLike);
