"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Handshake, MessageCircle, User } from "lucide-react"
import { IPost } from "../model/interfaces"

interface MyPostListProps {
  posts: IPost[]
  username: string
}

export default function MyPostsList({ posts, username }: MyPostListProps) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <Card key={post._id} className="p-3">
            <CardHeader className="flex items-center gap-2">
              <User className="rounded-full border p-1" size={27} />
              <span>{username}</span>
            </CardHeader>
            <CardContent>
              <Image
                src={post.imageUrl}
                width={300}
                height={300}
                alt="Post"
                className="h-[300px] w-[300px] object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="mb-3 flex items-center gap-3 text-xs">
                <button>
                  <Handshake size={18} />
                </button>
                <button>
                  <MessageCircle size={18} />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="font-medium">{username}</span>
                <span className="text-[10px] text-primary/70">
                  {post.content}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  )
}
