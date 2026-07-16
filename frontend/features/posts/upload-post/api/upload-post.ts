import { api } from "@/shared/api"
import { UploadPayload, UploadResponse } from "../model/interfaces"
// import { IServerError } from "@/shared/interfaces"

export async function uploadPostRequest({
  id,
  formData,
}: UploadPayload): Promise<UploadResponse> {
  try {
    const res = await api.post(`/posts/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
