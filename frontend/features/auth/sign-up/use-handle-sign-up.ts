"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signUpRequest } from "@/entities/session/api/sign-up"
import { SignUpPayload } from "@/entities/session/model/types"
import { LoginRequest } from "@/entities/session/api/login"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const signUpSchema = z.object({
  email: z.string().trim().email("Digite um email valido"),
  fullName: z.string().trim().min(3, "Digite seu nome completo"),
  username: z
    .string()
    .trim()
    .min(3, "O username precisa ter pelo menos 3 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Use apenas letras, numeros e underline no username"
    ),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export function useHandleSignUp() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      password: "",
    },
  })

  const onSubmit = form.handleSubmit(async (values: SignUpPayload) => {
    setError(null)

    try {
      const response = await signUpRequest(values)

      if (!response.user) return

      const session = await LoginRequest({
        email: response.user.email,
        password: values.password,
      })

      console.log("Sessão criada:", session)

      queryClient.setQueryData(["session"], session.user)
      toast.success(`Bem-vindo, ${session.user.fullName}!`, {
        description: "Clique para prosseguir e personalizar seu perfil",
        action: { label: "Ir", onClick: () => router.push("/config/data") },
      })
      router.replace("/")
    } catch (err: Error) {
      console.error(err)
      if (err?.status === 409) setError("Esse nome de usuário já está em uso")
    }
  })

  return {
    error,
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}
