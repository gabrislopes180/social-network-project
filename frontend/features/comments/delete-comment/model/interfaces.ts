import { IComment } from "@/entities/comments/model/interfaces"
import { IResponse } from "@/shared/interfaces"

export interface DeleteRequest {
  commentId: string
  postId: string
}
export interface DeleteCommentResponse extends IResponse {
  comment: IComment
}
