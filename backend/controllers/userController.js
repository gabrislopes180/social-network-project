import { User } from "../models/User.js";
import { Follows } from "../models/Follows.js";

export const getUsersSuggestions = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    console.log("ID que veio do Token:", req.user.id);
    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const suggestions = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json({ data: suggestions });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor.",
    });
  }
};

export const getUsersBySearch = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username?.trim()) {
      return res.status(200).json({
        success: true,
        users: [],
      });
    }

    const users = await User.find({
      username: {
        $regex: username,
        $options: "i",
      },
    })
      .select("_id username profilePicture")
      .limit(10);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username?.trim()) {
      return res.status(200).json({
        success: true,
        user: null,
      });
    }

    const user = await User.findOne({
      username: {
        $regex: username,
        $options: "i",
      },
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, username, description, preferences } = req.body;

    const existingUser = await User.findOne({
      username,
      //procura um usuario com esse username e de id diferente do id do usuario logado
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Este nome de usuário já está em uso.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        username,
        description,
        preferences,
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seu perfil foi atualizado com sucesso!",
      user: updatedUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Este nome de usuário já está em uso",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar usuário",
      detail: err.message,
    });
  }
};
