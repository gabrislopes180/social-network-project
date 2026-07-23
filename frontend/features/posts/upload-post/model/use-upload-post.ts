import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { uploadPostRequest } from "../api/upload-post"
import { toast } from "sonner"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { addPostToCache } from "@/entities/posts/lib/update-post-cache"
import { useQueryClient } from "@tanstack/react-query"
import { showError } from "@/shared/lib/get-server-error"

export const useUploadPost = () => {
  const { user } = useSessionQuery()
  const QueryClient = useQueryClient()
  const createPostSchema = z.object({
    content: z.string().max(500).optional(),
    image: z.instanceof(File, {
      message: "Selecione uma imagem.",
    }),
  })

  type CreatePostSchema = z.infer<typeof createPostSchema>

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  })

  const [selectedFile, setSelectedFile] = useState<{
    file: File | null
    preview: string | null
  }>({
    file: null,
    preview: null,
  })

  const upload = async (data: CreatePostSchema) => {
    try {
      const formData = new FormData()
      toast.loading("Sua publicação será compartilhada em alguns instantes.", {
        action: {
          label: "Ok",
          onClick: () => {},
        },
      })

      formData.append("content", data.content ?? "")
      formData.append("image", data.image)

      console.log(data)

      if (!user) return

      const uploadResponse = await uploadPostRequest({
        id: user._id,
        formData,
      })
      if (!uploadResponse.success) {
        toast.error(uploadResponse.message)
      }

      addPostToCache({
        queryClient: QueryClient,
        newPost: uploadResponse.post,
      })

      toast.success(uploadResponse.message)
      reset()
    } catch (err) {
      console.error(err)
      const error = showError({
        err,
        genericMessage: "Houve um erro ao compartilhar a publicação",
      })
      toast.error(error)
    }
  }

  return {
    selectedFile,
    setSelectedFile,
    handleSubmit,
    register,
    setValue,
    reset,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    upload,
  }
}
