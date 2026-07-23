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

export default function UserPostList({ posts, variant = "feed" }: MyPostListProps) {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)

  const renderPostCard = (post: IPost) => (
    <Card key={post._id} className="w-full max-w-[400px] border-none shadow-none md:border md:shadow-sm scale-95 p-3 mx-auto">
      <CardHeader className="flex items-center justify-between gap-2 pt-3">
        <div className="flex items-center gap-2">
          <AvatarProfile className="w-8 h-8 border-none" wrapperClassName="mt-0" />
          <span className="font-semibold text-sm">{post.authorUsername}</span>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted">
          <Image
            src={post.imageUrl}
            fill
            alt="Post image"
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start px-3 pb-3">
        <div className="flex items-center gap-3 text-xs w-full">
          <LikeButton post={post} isFromMe={false} />
          <PostCommentsWidget post={post} myComments={true} />
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
              className="relative aspect-square overflow-hidden cursor-pointer group"
            >
              <Image
                src={post.imageUrl}
                fill
                alt="Post image"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
        
        <PostModal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
          {selectedPost && renderPostCard(selectedPost)}
        </PostModal>
      </>
    )
  }

  return (
    <ul className="my-10 flex flex-col items-center w-full">
      {posts.map((post) => (
        <li key={post._id} className="w-full">
          {renderPostCard(post)}
        </li>
      ))}
    </ul>
  )
}
