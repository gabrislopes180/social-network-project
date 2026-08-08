import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import {
  CreateGroup,
  getGroups,
  getGroupById,
  updateGroup,
} from "../controllers/groupsController.js";

export const groupRouter = express.Router();

groupRouter.post("/create", authTokens, CreateGroup);
groupRouter.get("/me", authTokens, getGroups);
groupRouter.get("/:groupId", authTokens, getGroupById);
groupRouter.put("/:groupId", authTokens, updateGroup);
