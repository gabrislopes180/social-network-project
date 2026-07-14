import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
import { followRouter } from "./followRoutes.js";
import { findPostsByUser, uploadPost } from "../controllers/postController.js";

export const postRouter = express.Router();

postRouter.post("/:authorId", authTokens, upload.single("image"), uploadPost);
postRouter.get("/me", authTokens, findPostsByUser);
// GET /users/:username/posts
