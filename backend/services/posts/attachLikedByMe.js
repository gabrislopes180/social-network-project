import { Like } from "../../models/Likes.js";

export const attachLikedByMe = async ({ userId, posts }) => {
  if (posts.length === 0) {
    return [];
  }

  const likes = await Like.find({
    userId: userId,
    postId: {
      $in: posts.map((post) => post._id),
    },
  });

  const likedPosts = new Set(likes.map((like) => like.postId.toString()));

  return posts.map((post) => ({
    ...post.toObject(),
    likedByMe: likedPosts.has(post._id.toString()),
  }));
};
