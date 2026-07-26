"use client"

import Background from "@/components/background"
import { AvatarProfile } from "@/components/profile-avatar"
import { useSessionQuery } from "@/entities/session/model/useSession"
import UploadForm from "@/features/posts/upload-post/ui/upload-form"
import { House, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false)
  const pathname = usePathname()
  const { user } = useSessionQuery()

  const shouldRender =
    pathname.startsWith("/feeds") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/user/")

  if (!shouldRender) return null

  return (
    <nav className="pointer-events-none fixed right-0 bottom-4 left-0 z-50 flex w-full items-center justify-center">
      <div className="pointer-events-auto flex w-11/12 max-w-sm items-center justify-around rounded-full border border-border bg-background p-2.5 shadow-xl">
        <Link
          href={"/feeds"}
          className="flex flex-col items-center justify-center p-2"
        >
          <House
            className={`${pathname.startsWith("/feeds") ? "text-foreground" : "text-muted-foreground"} transition-all duration-300`}
            size={pathname.startsWith("/feeds") ? "28" : "24"}
          />
        </Link>

        <button
          className="cursor-pointer rounded-full bg-foreground p-3 shadow-md transition-transform hover:scale-105"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="h-6 w-6 text-background" />
        </button>

        <Link
          href={`/user/${user?.username}`}
          className="flex flex-col items-center justify-center p-2"
        >
          <AvatarProfile
            className={`h-8 w-8 border-2 transition-all duration-300 md:h-8 md:w-8 ${pathname.startsWith("/profile") ? "border-foreground" : "border-transparent"}`}
            wrapperClassName="m-0"
          />
        </Link>
      </div>

      {openModal && (
        <div className="pointer-events-auto">
          <Background>
            <UploadForm click={() => setOpenModal(false)} />
          </Background>
        </div>
      )}
    </nav>
  )
}
