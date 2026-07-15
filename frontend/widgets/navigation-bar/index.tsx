"use client"

import Background from "@/components/background"
import UploadForm from "@/features/posts/upload-post/ui/upload-form"
import { House, Plus, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <nav className="fixed bottom-0 flex h-24 w-full items-center justify-center">
      <div className="z-60 flex w-4/5 items-center justify-around rounded-full border border-border p-2 shadow backdrop-blur-lg md:w-3/5 lg:w-2/5">
        <Link href={"/feeds"}>
          <House />
        </Link>
        <button className="cursor-pointer" onClick={() => setOpenModal(true)}>
          <Plus />
        </button>
        <Link href={"/profile"}>
          <User />
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
