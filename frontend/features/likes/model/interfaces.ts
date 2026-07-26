import { IPost } from "@/entities/posts/model/interfaces"
import { IResponse } from "@/shared/interfaces"
import { QueryClient } from "@tanstack/react-query"

export interface LikeResponse extends IResponse {
  post: IPost
}

export interface ToggleLikeCacheProps {
  postId: string
  queryClient: QueryClient
  isFromMe: boolean
  action: "like" | "unlike"
}
