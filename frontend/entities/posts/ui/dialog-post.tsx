import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { IPost } from "@/entities/posts/model/interfaces"

import { useState } from "react"
import PostCard from "./post-card"

interface PostDialogProps {
  children: React.ReactNode
  post: IPost
  isFromMe: boolean
}

export function PostDialog({ children, post, isFromMe }: PostDialogProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateState = (value: boolean) => {
    setIsUpdating(value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-140 max-w-90 overflow-auto border-none bg-transparent p-0 shadow-none">
        <PostCard
          post={post}
          isFromMe={isFromMe}
          isUpdating={isUpdating}
          handleState={handleUpdateState}
        />
      </DialogContent>
    </Dialog>
  )
}
