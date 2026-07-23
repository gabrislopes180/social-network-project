"use server"

import { api } from "@/shared/api"
import { SignUpPayload, SignUpResponse } from "../model/types"
import { getServerError } from "@/shared/lib/get-server-error"

export async function signUpRequest(
  payload: SignUpPayload
): Promise<SignUpResponse> {
  try {
    const res = await api.post("/auth/signUp", payload)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
