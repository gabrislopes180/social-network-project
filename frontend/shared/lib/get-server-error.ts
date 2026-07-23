import axios from "axios"
import { IServerError, ShowErrorParams } from "@/shared/interfaces"

/**
 * Erro customizado que carrega os campos do IServerError.
 * Ao extender Error, garante compatibilidade com os boundaries
 * "use server" do Next.js (que só conseguem serializar instâncias de Error).
 */
export class ServerError extends Error {
  success: boolean
  detail?: string

  constructor(data: IServerError) {
    super(data.message)
    this.name = "ServerError"
    this.success = data.success
    this.detail = data.detail
  }
}

/**
 * Extrai o erro padronizado do backend (IServerError) a partir de um erro do Axios
 * e o lança como um ServerError (instância de Error).
 */
export function getServerError(error: unknown): ServerError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    if (data && typeof data.message === "string") {
      return new ServerError({
        success: false,
        message: data.message,
        detail: data.detail,
      })
    }

    if (!error.response) {
      return new ServerError({
        success: false,
        message: "Sem conexão com o servidor. Verifique sua internet.",
      })
    }
  }

  return new ServerError({
    success: false,
    message: "Ocorreu um erro inesperado. Tente novamente.",
  })
}

export const showError = ({ err, genericMessage }: ShowErrorParams) => {
  if (err instanceof Error) {
    return err.message
  }

  return genericMessage
}
