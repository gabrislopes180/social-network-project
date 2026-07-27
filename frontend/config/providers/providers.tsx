"use client"

import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/widgets/navigation-bar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { GlobalNotificationObserver } from "./notifications-observer"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalNotificationObserver />
        <Toaster />
        <NavBar />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
