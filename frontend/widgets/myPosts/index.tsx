"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { usePostsQuery } from "@/entities/posts/model/use-posts-query"
import MyPostsList from "@/entities/posts/ui/my-posts"
import { Images } from "lucide-react"

export default function MyPostsWidget({
  variant = "feed",
}: {
  variant?: "feed" | "grid"
}) {
  const { posts, isLoading } = usePostsQuery()
  console.log(posts)

  if (isLoading || !posts) {
    return (
      <div className="mt-20 flex flex-col items-center">
        <SpinnerCustom />
      </div>
    )
  }

  if (posts.length < 1)
    return (
      <div className="my-8 flex flex-col items-center text-xs text-primary/50">
        <Images />
        <p className="mx-5 text-center">
          O que você tem a oferecer ao mundo? Compartilhe sua primeira
          publicação
        </p>
      </div>
    )

  return <MyPostsList posts={posts} variant={variant} />
}
