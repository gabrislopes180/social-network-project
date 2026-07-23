"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import SearchUser from "@/features/users/search-users"
import { AvatarProfile } from "./profile-avatar"
import { useSessionQuery } from "@/entities/session/model/useSession"
import Link from "next/link"
import { Image, Settings } from "lucide-react"

export function SidebarWidget() {
  const { user } = useSessionQuery()
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center">
        <AvatarProfile />
        <span className="font-semibold">{user?.fullName}</span>
        <span className="text-sm font-light text-foreground/70">
          @{user?.username}
        </span>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SearchUser />
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/profile"} className="flex items-center gap-1 text-sm">
            <Image size={18} />
            Publicações
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link href={"/config"} className="flex items-center gap-1 text-sm">
            <Settings size={18} />
            Configurações
          </Link>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
