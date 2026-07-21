"use client"

import Background from "@/components/background"
import { AvatarProfile } from "@/components/profile-avatar"
import UploadForm from "@/features/posts/upload-post/ui/upload-form"
import { House, Plus, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false)
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-3 flex h-24 w-full items-center justify-center">
      <div className="z-60 flex w-9/10 items-center justify-around rounded-full border border-border bg-background p-1.5 shadow md:w-3/5 lg:w-2/5">
        <Link href={"/feeds"}>
          <House
            className={`${pathname.startsWith("/feeds") && "rounded-full bg-foreground/20 p-1"} transition-all duration-300`}
            size={pathname.startsWith("/feeds") ? "28" : "20"}
          />
        </Link>
        <button
          className="cursor-pointer rounded-full bg-foreground p-1"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="text-background" />
        </button>
        <Link href={"/profile"}>
          {/* <User
            className={`${pathname.startsWith("/profile") && "rounded-full bg-foreground/20 p-1"} transition-all duration-300`}
            size={pathname.startsWith("/profile") ? "28" : "20"}
          /> */}
          <AvatarProfile />
        </Link>
      </div>
      {openModal && (
        <Background>
          <UploadForm click={() => setOpenModal(false)} />
        </Background>
      )}
    </nav>
  )
}
