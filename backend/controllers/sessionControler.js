import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, fullName, username, password } = req.body;

    if (!email || !fullName || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
    }

    const followers = [];
    const following = [];

    const createdAt = new Date();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      email,
      fullName,
      username,
      password: hashedPassword,
      followers,
      following,
      createdAt,
    }).save();
    await user.save();

    res.status(201).json({
      success: true,
      message: "Usuario gerado com sucesso!",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "falha ao criar conta",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email ou senha incorretos.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Email ou senha incorretos.",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1h
    });

    res.status(200).json({
      success: true,
      message: `Você iniciou uma sessão como ${user.username}`,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Falha ao fazer login",
      error: err.message,
    });

    console.log(err);
  }
};

//user/me
export const findSessionUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Usuário não autorizado.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Uusario encontrado`,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "falha ao buscar usuario",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "Logout realizado",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Falha ao fazer logout",
      error: err.message,
    });
  }
};
