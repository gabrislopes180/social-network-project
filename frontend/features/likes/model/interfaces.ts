import { IPost } from "@/entities/posts/model/interfaces"
import { IResponse } from "@/shared/interfaces"

export interface LikeResponse extends IResponse {
  post: IPost
}
