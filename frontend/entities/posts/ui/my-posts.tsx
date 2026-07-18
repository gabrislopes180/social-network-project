"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { IPost } from "../model/interfaces"
import { AvatarProfile } from "@/components/profile-avatar"
import { PostOptionsModal } from "./post-options-modal"
import Background from "@/components/background"
import { useState } from "react"
import UpdatePostModal from "@/features/posts/update-post/ui/update-modal"
import LikeButton from "@/features/likes/ui/like-button"
import { CommentsModal } from "@/features/comments/comment-post/ui/comment-modal"

interface MyPostListProps {
  posts: IPost[]
}

export default function MyPostsList({ posts }: MyPostListProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  return (
    <ul className="my-10">
      {posts.map((post) => (
        <Card key={post._id} className="mb-5 max-w-90 p-3">
          <CardHeader className="flex items-center justify-between gap-2 py-1">
            <div className="flex items-center gap-2">
              <AvatarProfile />
              <span>{post.authorUsername}</span>
            </div>
            <PostOptionsModal
              post={post}
              onUpdate={(id) => setIsUpdating(id)}
            />
          </CardHeader>
          <CardContent>
            <Image
              src={post.imageUrl}
              width={300}
              height={300}
              alt="Post"
              className="h-75 w-75 rounded object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="flex items-center gap-3 text-xs">
              <LikeButton post={post} isFromMe={true} />
              <CommentsModal />
            </div>
            {isUpdating === post._id ? (
              <Background>
                <UpdatePostModal
                  post={post}
                  onClose={() => setIsUpdating(null)}
                />
              </Background>
            ) : (
              <div className="mt-4 flex items-start gap-3 p-3 text-xs">
                <span className="font-medium">{post.authorUsername}</span>
                <span className="text-xs text-primary/70">{post.content}</span>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </ul>
  )
}
