import { IPost } from "@/entities/posts/model/interfaces"
import { IResponse } from "@/shared/interfaces"

export interface UploadPayload {
  id: string
  formData: FormData
}

export interface UploadResponse extends IResponse {
  post: IPost
}
