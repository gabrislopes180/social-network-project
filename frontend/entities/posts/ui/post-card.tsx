import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { IPost } from "@/entities/posts/model/interfaces"

import Image from "next/image"
import LikeButton from "@/features/likes/ui/like-button"
import { PostCommentsWidget } from "@/widgets/postComments"
import { AvatarProfile } from "@/components/profile-avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PostOptionsModal } from "./post-options-modal"
import UpdatePostModal from "@/features/posts/update-post/ui/update-modal"
import { useState } from "react"

export function PostDialog({
  children,
  post,
}: {
  children: React.ReactNode
  post: IPost
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-140 max-w-90 overflow-auto border-none bg-transparent p-0 shadow-none">
        <Card className="border-none shadow-none">
          <CardHeader className="flex items-center justify-between gap-2 pt-3">
            <div className="flex items-center gap-2">
              <AvatarProfile
                className="h-8 w-8 border-none"
                wrapperClassName="mt-0"
              />
              <span className="text-sm font-semibold">
                {post.authorUsername}
              </span>
            </div>

            <PostOptionsModal
              post={post}
              onSelectUpdate={() => setIsUpdating(true)}
            />
          </CardHeader>
          <CardContent className="px-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={post.imageUrl}
                fill
                alt="Post image"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex w-full items-center gap-3 text-xs">
              <LikeButton post={post} isFromMe={true} />
              <PostCommentsWidget post={post} />
            </div>
          </CardContent>
          <CardFooter className="flex items-start gap-2 px-5">
            <span className="font-semibold">{post.authorUsername}</span>
            {isUpdating ? (
              <UpdatePostModal
                post={post}
                onClose={() => setIsUpdating(false)}
              />
            ) : (
              <span className="mt-0.5 max-w-9/10 text-xs text-foreground/80">
                {post.content}
              </span>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
