import { User } from "../models/User.js";
import { Posts } from "../models/Posts.js";
import { Like } from "../models/Likes.js";
import { Comments } from "../models/Comments.js";
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

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "Este e-mail já está em uso.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "Este nome de usuário já está em uso.",
      });
    }

    const followers = [];
    const following = [];

    const createdAt = new Date();

    const hashedPassword = await bcrypt.hash(password, 10);

    const description = "";

    const preferences = {
      color1: "#000000",
      color2: "#333333",
    };

    const user = await new User({
      email,
      fullName,
      username,
      password: hashedPassword,
      description,
      preferences,
      followers,
      following,
      createdAt,
    }).save();

    res.status(201).json({
      success: true,
      message: "Usuario gerado com sucesso!",
      user,
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];

      return res.status(409).json({
        success: false,
        message:
          field === "email"
            ? "Este e-mail já está em uso."
            : "Este nome de usuário já está em uso.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Houve um erro ao gerar o cadastro",
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
      { expiresIn: "15m" }, // 15 minutos
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // 7 dias
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
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

export const refreshSession = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token ausente.",
      });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Refresh token inválido ou expirado.",
        });
      }

      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" },
      );

      res.cookie("accessToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15 min
      });

      res.status(200).json({
        success: true,
        message: "Sessão renovada",
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Falha ao renovar sessão",
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
    res.clearCookie("refreshToken", {
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

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const { email } = req.body;

    if (email.toLowerCase() !== req.user.email.toLowerCase()) {
      console.log("Email da requisiçao: ", email.toLowerCase());
      console.log("Email do user : ", req.user.email.toLowerCase());

      return res.status(422).json({
        success: false,
        message: "O e-mail informado não corresponde ao da sua conta.",
      });
    }

    const userToDelete = await User.findByIdAndDelete(userId);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    //coisas a mais para apagar do banco
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    await Posts.deleteMany({ authorId: userId });

    await Comments.deleteMany({ userId });

    await Like.deleteMany({ userId });

    await User.updateMany(
      {},
      {
        $pull: {
          followers: userId,
          following: userId,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "Conta deletada com sucesso!",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Houve um erro ao deletar a conta",
      detail: err.message,
    });
  }
};
