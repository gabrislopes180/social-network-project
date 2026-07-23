"use client"

import Background from "@/components/background"
import { AvatarProfile } from "@/components/profile-avatar"
import UploadForm from "@/features/posts/upload-post/ui/upload-form"
import { House, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false)
  const pathname = usePathname()

  const shouldRender = 
    pathname.startsWith("/feeds") || 
    pathname.startsWith("/profile") || 
    pathname.startsWith("/user/")

  if (!shouldRender) return null

  return (
    <nav className="fixed bottom-4 left-0 right-0 flex w-full items-center justify-center z-50 pointer-events-none">
      <div className="flex w-11/12 max-w-sm items-center justify-around rounded-full border border-border bg-background p-2.5 shadow-xl pointer-events-auto">
        <Link href={"/feeds"} className="flex flex-col items-center justify-center p-2">
          <House
            className={`${pathname.startsWith("/feeds") ? "text-foreground" : "text-muted-foreground"} transition-all duration-300`}
            size={pathname.startsWith("/feeds") ? "28" : "24"}
          />
        </Link>
        
        <button
          className="cursor-pointer rounded-full bg-foreground p-3 shadow-md hover:scale-105 transition-transform"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="text-background w-6 h-6" />
        </button>
        
        <Link href={"/profile"} className="flex flex-col items-center justify-center p-2">
          <AvatarProfile 
            className={`w-8 h-8 md:w-8 md:h-8 border-2 transition-all duration-300 ${pathname.startsWith("/profile") ? "border-foreground" : "border-transparent"}`} 
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
