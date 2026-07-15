"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { usePostsQuery } from "@/entities/posts/model/use-posts-query"
import MyPostsList from "@/entities/posts/ui/my-posts"
import { Images } from "lucide-react"

export default function MyPostsWidget() {
  const { posts, isLoading } = usePostsQuery()

  if (isLoading) {
    return (
      <Skeleton className="mt-24 flex h-120 w-85 flex-col items-center justify-center rounded-lg">
        <div className="w-75">
          <div className="mb-4 h-7 w-7 items-start self-start rounded-full bg-primary/10"></div>
          <div className="h-90 w-full rounded-lg bg-primary/10"></div>
          <div className="mt-4 mb-4 h-2 w-24 items-start self-start rounded-full bg-primary/10"></div>
        </div>
      </Skeleton>
    )
  }

  if (!posts) return

  if (posts?.length < 1)
    return (
      <div className="my-8 flex flex-col items-center text-xs text-primary/50">
        <Images />
        <p className="mx-5 text-center">
          O que você tem a oferecer ao mundo? Compartilhe sua primeira
          publicação
        </p>
      </div>
    )

  return <MyPostsList posts={posts} />
}
