"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { usePostsQuery } from "@/entities/posts/model/use-posts-query"
import MyPostsList from "@/entities/posts/ui/my-posts"

export default function MyPostsWidget() {
  const { posts, isLoading } = usePostsQuery()

  if (isLoading) {
    return (
      <Skeleton className="flex h-120 w-85 flex-col items-center justify-center rounded-lg">
        <div className="w-75">
          <div className="mb-4 h-7 w-7 items-start self-start rounded-full bg-primary/10"></div>
          <div className="h-90 w-full rounded-lg bg-primary/10"></div>
          <div className="mt-4 mb-4 h-2 w-24 items-start self-start rounded-full bg-primary/10"></div>
        </div>
      </Skeleton>
    )
  }

  if (!posts) return <p>Nenhum post</p>

  return <MyPostsList posts={posts} username="gabris123" />
}
