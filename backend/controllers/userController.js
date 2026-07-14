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

export const followUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { userIdToFollow } = req.params;

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
    await loggedInUser.save();

    const status = {
      followedBy: loggedInUserId.following.includes(userIdToFollow),
      following: true,
      id: follow._id,
      followedUser: {
        _id: userToFollow._id,
        username: userToFollow.username,
      },
    };

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
