import jwt from "jsonwebtoken";

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
    res.clearCookie("accessToken");

    return res.status(401).json({
      success: false,
      message: "Token de acesso invalido ou expirado.",
    });
  }
};
