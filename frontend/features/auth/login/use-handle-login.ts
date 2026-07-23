"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { LoginRequest } from "@/entities/session/api/login"
import { useQueryClient } from "@tanstack/react-query"
import { IServerError } from "@/shared/interfaces"
import { toast } from "sonner"
import { showError } from "@/shared/lib/get-server-error"

const loginSchema = z.object({
  email: z.string().trim().email("Digite um email valido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function useHandleLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null)

    try {
      const loginResponse = await LoginRequest(values)

      if (!loginResponse.success) {
        setError(loginResponse.message || "Falha ao entrar. Tente novamente.")
        return
      }

      queryClient.setQueryData(["session"], loginResponse.user)

      console.log(loginResponse.message)
      toast.success(loginResponse.message)
      router.replace("/feeds")
    } catch (err) {
      const message = showError({
        err,
        genericMessage: "Não foi possível entrar. Tente novamente.",
      })
      setError(message)
    }
  })

  return {
    error,
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}
