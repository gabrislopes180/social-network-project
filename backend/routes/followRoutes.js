import { followUser, unfollowUser } from "../controllers/followController.js";

import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";

export const followRouter = express.Router();

followRouter.post("/:userIdToFollow", authTokens, followUser);
followRouter.delete("/:userIdToUnfollow", authTokens, unfollowUser);
