import express from "express";
import { authTokens } from "../middleware/authMiddleware.js";

export const authRouter = express.Router();

import {
  signUp,
  login,
  findSessionUser,
  logout,
  refreshSession,
} from "../controllers/sessionControler.js";

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshSession);
authRouter.post("/logout", logout);
authRouter.get("/me", authTokens, findSessionUser);
