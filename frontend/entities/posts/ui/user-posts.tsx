"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { IPost } from "../model/interfaces"
import { AvatarProfile } from "@/components/profile-avatar"
import LikeButton from "@/features/likes/ui/like-button"
import { PostCommentsWidget } from "@/widgets/postComments"
import { useState } from "react"
import { PostModal } from "@/features/posts/post-modal/ui/post-modal"

interface MyPostListProps {
  posts: IPost[]
  variant?: "feed" | "grid"
}

export default function UserPostList({
  posts,
  variant = "feed",
}: MyPostListProps) {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)

  const renderPostCard = (post: IPost) => (
    <Card
      key={post._id}
      className="mx-auto w-full max-w-[400px] scale-95 border-none p-3 shadow-none md:border md:shadow-sm"
    >
      <CardHeader className="flex items-center justify-between gap-2 pt-3">
        <div className="flex items-center gap-2">
          <AvatarProfile
            className="h-8 w-8 border-none"
            wrapperClassName="mt-0"
          />
          <span className="text-sm font-semibold">{post.authorUsername}</span>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={post.imageUrl}
            fill
            alt="Post image"
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-3 pb-3">
        <div className="flex w-full items-center gap-3 text-xs">
          <LikeButton post={post} isFromMe={false} />
          <PostCommentsWidget post={post} />
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm">
          <span className="font-semibold">{post.authorUsername}</span>
          <span className="text-foreground/90">{post.content}</span>
        </div>
      </CardFooter>
    </Card>
  )

  if (variant === "grid") {
    return (
      <>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square cursor-pointer overflow-hidden"
            >
              <Image
                src={post.imageUrl}
                fill
                alt="Post image"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <PostModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        >
          {selectedPost && renderPostCard(selectedPost)}
        </PostModal>
      </>
    )
  }

  return (
    <ul className="my-10 flex w-full flex-col items-center">
      {posts.map((post) => (
        <li key={post._id} className="w-full">
          {renderPostCard(post)}
        </li>
      ))}
    </ul>
  )
}
