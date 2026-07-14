import { User } from "../models/User.js";
import { Follows } from "../models/Follows.js";

export const followUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { userIdToFollow } = req.params;

    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário logado não encontrado.",
      });
    }

    // Find the user to follow
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    // Check if the user is already being followed
    if (loggedInUser.following.includes(userIdToFollow)) {
      return res.status(400).json({
        success: false,
        message: "Você já está seguindo este usuário.",
      });
    }

    // Add the user to the following list
    const follow = await Follows.create({
      followId: crypto.randomUUID(),
      followerId: loggedInUserId,
      followingId: userIdToFollow,
    });

    loggedInUser.following.push(userIdToFollow);
    userToFollow.followers.push(loggedInUserId);
    await loggedInUser.save();
    await userToFollow.save();

    const status = {
      followedBy: loggedInUser.followers.includes(userIdToFollow),
      isFollowing: true,
      id: follow._id,
      followedUser: {
        _id: userToFollow._id,
        username: userToFollow.username,
      },
    };

    return res.status(200).json({
      success: true,
      message: `Você começou a seguir ${userToFollow.username}`,
      user: userToFollow,
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

    // Find the user to unfollow
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário logado não encontrado.",
      });
    }

    // Check if the user is currently being followed
    if (!userToUnfollow.followers.includes(loggedInUserId)) {
      return res.status(400).json({
        success: false,
        message: "Você não está seguindo este usuário.",
      });
    }

    // Remove the user from the following list
    await Follows.findOneAndDelete({
      followerId: loggedInUserId,
      followingId: userIdToUnfollow,
    });

    loggedInUser.following = loggedInUser.following.filter(
      (id) => id.toString() !== userIdToUnfollow,
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== loggedInUserId,
    );
    await loggedInUser.save();
    await userToUnfollow.save();

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
