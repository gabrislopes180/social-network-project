"use client"

import { SidebarWidget } from "@/components/sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Evita carregar o Sidebar (e a query de sessão) nas telas de login/cadastro
  if (pathname === "/" || pathname === "/register") {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <SidebarWidget />
      <main className="flex flex-1 flex-col w-full overflow-x-hidden min-h-screen">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        <div className="flex-1 relative">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
