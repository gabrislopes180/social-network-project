"use client"

import { useMutation } from "@tanstack/react-query"
import { UpdatePost } from "../api/update-post"
import { UpdatePayload, UpdateResponse } from "./interfaces"
import { toast } from "sonner"

export const useUpdatePost = () => {
  return useMutation<UpdateResponse, Error, UpdatePayload>({
    mutationFn: async (payload) => {
      console.log("enviando para o body do backend: ", payload.newContent)
      return UpdatePost(payload)
    },

    onSuccess: (data) => {
      toast.success(data.message, {
        description:
          "Caso sua descrição não tenha atualizado, basta dar um refresh!",
      })
    },

    onError: (err) => {
      toast.error(err.message)
    },
  })
}
