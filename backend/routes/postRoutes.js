import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
import { followRouter } from "./followRoutes.js";
import {
  findMyPosts,
  uploadPost,
  updatePost,
  deletePost,
  findPostsByUser,
} from "../controllers/postController.js";

export const postRouter = express.Router();

postRouter.post("/upload", authTokens, upload.single("image"), uploadPost);
postRouter.get("/me", authTokens, findMyPosts);
postRouter.get("/user/:username", authTokens, findPostsByUser);
postRouter.patch("/:postId", authTokens, updatePost);
postRouter.delete("/:postId", authTokens, deletePost);
