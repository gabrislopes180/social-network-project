"use client"

import { Settings, SettingsIcon, UserIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSwitch } from "./theme-switch"
import LogoutVariantButton from "@/features/auth/logout/ui/logoutVariantButton"
import Link from "next/link"

export function ConfigModal() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeSwitch />
          Tema
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/config"}>
            <SettingsIcon />
            Config.
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogoutVariantButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
