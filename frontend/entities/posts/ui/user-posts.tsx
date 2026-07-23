"use client"

import Image from "next/image"
import { IPost } from "../model/interfaces"
import { PostDialog } from "./dialog-post"

interface MyPostListProps {
  posts: IPost[]
  variant?: "feed" | "grid"
}

export default function UserPostList({ posts }: MyPostListProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <PostDialog key={post._id} post={post} isFromMe={false}>
          <div className="group relative aspect-square cursor-pointer overflow-hidden">
            <Image
              src={post.imageUrl}
              fill
              alt="Post image"
              className="rounded-lg object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </PostDialog>
      ))}
    </div>
  )
}
