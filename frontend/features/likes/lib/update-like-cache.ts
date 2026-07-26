import { IPost } from "@/entities/posts/model/interfaces"
import { ToggleLikeCacheProps } from "../model/interfaces"

export const toggleLikeInCache = ({
  postId,
  queryClient,
  isFromMe,
  action,
}: ToggleLikeCacheProps) => {
  const QUERY_KEY = isFromMe ? ["posts"] : ["user-posts"]

  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return oldData

    return oldData.map((currentPost) => {
      if (currentPost._id === postId) {
        return {
          ...currentPost,
          likedByMe: action === "like",
          likesCount:
            action === "like"
              ? currentPost.likesCount + 1
              : Math.max(0, currentPost.likesCount - 1),
        }
      }
      return currentPost
    })
  })
}
