"use client"

import { PostSkeleton } from "@/components/skeletons/post-skeleton"
import { useFeedQuery } from "@/entities/feed/model/useGetFeedQuery"
import FeedPostsList from "@/entities/feed/ui/feedPostsList"
import { Image } from "lucide-react"

export default function FeedPosts() {
  const { isLoading, feedPosts, error } = useFeedQuery()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <PostSkeleton />
      </div>
    )
  }

  if (error || !feedPosts) {
    return (
      <span className="text-center text-sm text-destructive">
        {error && error?.message}
      </span>
    )
  }

  if (feedPosts.length < 1) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center space-y-2 text-center text-xs text-foreground/70">
        <Image />
        <p>Siga pessoas para ter sua primeira interação com uma publicação</p>
      </div>
    )
  }

  return <FeedPostsList posts={feedPosts} />
}
