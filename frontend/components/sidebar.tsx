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
import { Image, Settings, Users } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeSwitch } from "./theme-switch"

export function SidebarWidget() {
  const { user } = useSessionQuery()
  return (
    <Sidebar className="">
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
          <Link
            href={"/profile"}
            className="flex items-center gap-1 rounded-lg text-sm transition-all duration-300 hover:bg-foreground/20"
          >
            <Button size={"icon"}>
              <Image size={18} />
            </Button>
            Publicações
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link
            href={"/config"}
            className="flex items-center gap-1 rounded-lg text-sm transition-all duration-300 hover:bg-foreground/20"
          >
            <Button size={"icon"}>
              <Users size={18} />
            </Button>
            Grupos
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link
            href={"/config"}
            className="flex items-center gap-1 rounded-lg text-sm transition-all duration-300 hover:bg-foreground/20"
          >
            <Button size={"icon"}>
              <Settings size={18} />
            </Button>
            Configurações
          </Link>
        </SidebarGroup>

        <SidebarGroup className="flex">
          <ThemeSwitch />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
