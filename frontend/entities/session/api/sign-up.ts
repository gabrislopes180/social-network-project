"use server"

import { api } from "@/shared/api"
import { SignUpPayload, SignUpResponse } from "../model/types"

export async function signUpRequest(
  payload: SignUpPayload
): Promise<SignUpResponse> {
  try {
    const res = await api.post("/auth/signUp", payload)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
