export interface User {
  _id: string
  email: string
  fullName: string
  username: string
  followers: string[]
  following: string[]
  createdAt: string
}

export interface SignUpResponse {
  success: boolean
  message: string
  user: User | null
}

export interface SignUpPayload {
  email: string
  fullName: string
  username: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SessionResponse {
  success: boolean
  message: string
  user: User
  error: string
}

export interface MeResponse {
  success: boolean
  message: string
  user: User
}
