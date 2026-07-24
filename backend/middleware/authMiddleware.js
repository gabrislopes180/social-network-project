import jwt from "jsonwebtoken";
import { authCookieOptions } from "../config/cookies.js";

export const authTokens = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Usuario nao autenticado. Token de acesso ausente.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch {
    res.clearCookie("accessToken", authCookieOptions);

    return res.status(401).json({
      success: false,
      message: "Token de acesso invalido ou expirado.",
    });
  }
};
