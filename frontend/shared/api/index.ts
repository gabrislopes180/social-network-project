import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})

apiServer.interceptors.request.use(async (config) => {
  try {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const allCookies = cookieStore.toString()

    if (allCookies) {
      config.headers.Cookie = allCookies
    }
  } catch (error) {
    console.warn("Não foi possível injetar os cookies no servidor:", error)
  }

  return config
})
