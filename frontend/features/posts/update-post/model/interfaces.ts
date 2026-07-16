import { IPost } from "@/entities/posts/model/interfaces"
import { IResponse } from "@/shared/interfaces"

export interface UpdatePayload {
  postId: string
  newContent: string
}

export interface UpdateResponse extends IResponse {
  post: IPost
}
