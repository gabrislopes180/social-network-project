import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";

import {
  getUsersSuggestions,
  getUsersBySearch,
  getUserByName,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/suggestions", authTokens, getUsersSuggestions);
userRouter.get("/user-suggestion", authTokens, getUsersBySearch);
userRouter.get("/:username", authTokens, getUserByName);
