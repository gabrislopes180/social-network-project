import { Like } from "../models/Likes.js";
import { Posts } from "../models/Posts.js";
import { attachLikedByMePost } from "../services/posts/attachLikedByMePost.js";

export const CreateLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const alreadyLiked = await Like.findOne({
      userId,
      postId,
    });

    if (alreadyLiked) {
      return res.status(409).json({
        success: false,
        message: "Você já curtiu este post.",
      });
    }

    await Like.create({
      userId,
      postId,
    });

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      {
        $inc: {
          likesCount: 1,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post não encontrado.",
      });
    }

    const finalPost = await attachLikedByMePost({
      userId,
      post: updatedPost,
    });

    console.log(finalPost);

    return res.status(201).json({
      success: true,
      message: "Publicação curtida com sucesso.",
      post: finalPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao curtir a publicação",
      detail: err.message,
    });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const like = await Like.findOne({
      userId,
      postId,
    });

    if (!like) {
      return res.status(409).json({
        success: false,
        message: "Você ainda não curtiu este post.",
      });
    }
    await Like.deleteOne({
      userId,
      postId,
    });

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      {
        $inc: {
          likesCount: -1,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post não encontrado.",
      });
    }

    const finalPost = await attachLikedByMePost({
      userId,
      post: updatedPost,
    });

    console.log(finalPost);

    return res.status(201).json({
      success: true,
      message: "Publicação descurtida com sucesso.",
      post: finalPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao descurtir a publicação",
      detail: err.message,
    });
  }
};
