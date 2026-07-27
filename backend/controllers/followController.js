import { User } from "../models/User.js";
import { Follows } from "../models/Follows.js";
import { createNotification } from "../services/notifications/create-notification.js";

export const followUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { userIdToFollow } = req.params;

    if (loggedInUserId === userIdToFollow) {
      return res.status(400).json({
        success: false,
        message: "Você não pode seguir a si mesmo.",
      });
    }

    // Busca o usuário que será seguido para garantir que ele existe
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    // 1. Verifica se já está seguindo consultando a collection separada
    const existingFollow = await Follows.findOne({
      followerId: loggedInUserId,
      followingId: userIdToFollow,
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "Você já está seguindo este usuário.",
      });
    }

    const follow = await Follows.create({
      followerId: loggedInUserId,
      followingId: userIdToFollow,
    });

    await User.findByIdAndUpdate(loggedInUserId, {
      $inc: { followingCount: 1 },
    });

    await User.findByIdAndUpdate(userIdToFollow, {
      $inc: { followersCount: 1 },
    });

    const isFollowedBy = await Follows.exists({
      followerId: userIdToFollow,
      followingId: loggedInUserId,
    });

    const status = {
      followedBy: !!isFollowedBy,
      isFollowing: true,
      id: follow._id,
      followedUser: {
        _id: userToFollow._id,
        username: userToFollow.username,
      },
    };

    createNotification({
      senderId: loggedInUserId,
      recipientId: userIdToFollow,
      type: "follow",
    });

    console.log({
      success: true,
      message: `Você começou a seguir ${userToFollow.username}`,
      status,
    });

    return res.status(200).json({
      success: true,
      message: `Você começou a seguir ${userToFollow.username}`,
      status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { userIdToUnfollow } = req.params;

    if (!loggedInUserId) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado.",
      });
    }

    if (!userIdToUnfollow) {
      return res.status(400).json({
        success: false,
        message: "ID do usuário a ser deixado de seguir é obrigatório.",
      });
    }

    if (loggedInUserId === userIdToUnfollow) {
      return res.status(400).json({
        success: false,
        message: "Você não pode deixar de seguir a si mesmo.",
      });
    }

    const deletedFollow = await Follows.findOneAndDelete({
      followerId: loggedInUserId,
      followingId: userIdToUnfollow,
    });

    if (!deletedFollow) {
      return res.status(400).json({
        success: false,
        message: "Você não está seguindo este usuário.",
      });
    }

    await User.findByIdAndUpdate(loggedInUserId, {
      $inc: { followingCount: -1 },
    });

    const userToUnfollow = await User.findByIdAndUpdate(
      userIdToUnfollow,
      { $inc: { followersCount: -1 } },
      { new: true }, // Garante que a variável receberá o usuário já com o -1 aplicado
    );

    return res.status(200).json({
      success: true,
      message: `Você deixou de seguir ${userToUnfollow.username}`,
      user: userToUnfollow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
