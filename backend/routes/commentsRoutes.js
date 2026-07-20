import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/commentsController.js";

export const commentsRouter = express.Router();

commentsRouter.post("/:postId", authTokens, createComment);
commentsRouter.get("/me/:postId", authTokens, getCommentsByPost);
