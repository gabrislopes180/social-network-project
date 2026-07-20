"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { IPost } from "../model/interfaces"
import { AvatarProfile } from "@/components/profile-avatar"
import LikeButton from "@/features/likes/ui/like-button"
import { PostCommentsWidget } from "@/widgets/postComments"

interface MyPostListProps {
  posts: IPost[]
}

export default function UserPostList({ posts }: MyPostListProps) {
  return (
    <ul className="my-10">
      {posts.map((post) => (
        <Card key={post._id} className="mb-5 max-w-90 scale-95 p-3">
          <CardHeader className="flex items-center justify-between gap-2 pt-3">
            <div className="flex items-center gap-2">
              <AvatarProfile />
              <span>{post.authorUsername}</span>
            </div>
            {/* <PostOptionsModal post={post} /> */}
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
              <LikeButton post={post} isFromMe={false} />
              <PostCommentsWidget post={post} myComments={true} />
            </div>
            <div className="mt-4 flex items-start gap-3 text-xs">
              <span className="font-medium">{post.authorUsername}</span>
              <span className="text-[10px] text-primary/70">
                {post.content}
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  )
}
