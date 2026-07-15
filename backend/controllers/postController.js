import { Posts } from "../models/Posts.js";
import { User } from "../models/User.js";
import { uploadImage } from "../services/cloudinary/upload-image.js";
import fs from "fs/promises";

export const uploadPost = async (req, res) => {
  try {
    const { authorId } = req.params;
    const { content } = req.body;
    const file = req.file;

    if (!authorId) {
      return res.status(400).json({
        success: false,
        message: "não foi fornecido o id do usuário postador",
      });
    }

    const userFound = await User.findById(authorId);

    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "Não foi encontrado um usuário.",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Nenhuma imagem enviada.",
      });
    }

    //retorna url segura do cloudinary
    const imageUrl = await uploadImage(file.path);

    await fs.unlink(file.path);

    const post = await Posts.create({
      authorId,
      authorUsername: userFound.username,
      content,
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Sua publicação foi carregada com sucesso!",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `houve um erro ao realizar o upload do post: ${err.message}`,
    });
  }
};

export const findMyPosts = async (req, res) => {
  try {
    const posts = await Posts.find({
      authorId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Houve um erro ao listar as publicações: ${err.message}`,
    });
  }
};

export const findPostsByUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const posts = await Posts.find({
      authorId: user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Houve um erro ao listar as publicações: ${err.message}`,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "não foi fornecido o id da publicação",
      });
    }

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post não encontrado.",
      });
    }

    if (post.authorId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Você não tem permissão para excluir este post.",
      });
    }

    await Posts.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "Post excluído com sucesso.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Erro ao excluir o post: ${err.message}`,
    });
  }
};
