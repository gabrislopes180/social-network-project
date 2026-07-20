import { Comments } from "../models/Comments.js";
import { Posts } from "../models/Posts.js";

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { commentText } = req.body;

    const post = await Posts.findById(postId);

    if (!postId) {
      return res.status(404).json({
        success: false,
        message: "Post não encontrado",
      });
    }

    if (!commentText) {
      return res.status(400).json({
        success: false,
        message: "Comentário é obrigatório",
      });
    }

    const comment = await Comments.create({
      userId,
      postId,
      commentText: commentText.trim(),
    });

    await Posts.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    await comment.populate("userId", "username fullName");

    const finalComment = {
      ...comment.toObject(),
      isMyComment: comment.userId._id.toString() === req.user.id,
    };

    return res.status(201).json({
      success: true,
      message: "Comentário criado com sucesso.",
      comment: finalComment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Houve um erro ao compartilhar o comentário`,
      detail: err.message,
    });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Não foi fornecido o id da publicação",
      });
    }

    const comments = await Comments.find({
      postId,
    })
      .populate("userId", "username fullName")
      .sort({ createdAt: -1 });

    //busca por userId por conta do definido no mongoose
    const finalComments = comments.map((comment) => {
      const obj = comment.toObject();

      return {
        ...obj,
        isMyComment: comment.userId._id.toString() === req.user.id,
      };
    });

    return res.status(200).json({
      success: true,
      comments: finalComments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao buscar os comentários",
      detail: err.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;

    console.log("Id do comentario:", commentId);

    if (!commentId || !postId) {
      return res.status(400).json({
        success: false,
        message: "Id do comentário ou do post não foi fornecido",
      });
    }

    const postToDelete = await Comments.findByIdAndDelete(commentId);

    if (!postToDelete) {
      return res.status(404).json({
        success: false,
        message: "Não foi possível encontrar o comentário para deletar",
      });
    }

    await Posts.findByIdAndUpdate(postId, {
      $inc: { commentsCount: -1 },
    });

    return res.status(200).json({
      success: true,
      message: "Comentário deletado com sucesso!",
      comment: postToDelete,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao deletar o comentário",
      detail: err.message,
    });
  }
};
