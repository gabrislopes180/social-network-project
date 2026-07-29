import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";
import { CreateGroup } from "../controllers/groupsController.js";

export const groupRouter = express.Router();

groupRouter.post("/create", authTokens, CreateGroup);
