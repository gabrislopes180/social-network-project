import { Like } from "../../models/Likes.js";

export const attachLikedByMePost = async ({ userId, post }) => {
  const like = await Like.findOne({
    userId,
    postId: post._id,
  });

  return {
    ...post.toObject(),
    likedByMe: !!like,
  };
};
