"use client"

import { PostSkeleton } from "@/components/skeletons/post-skeleton"
import { useFeedQuery } from "@/entities/feed/model/useGetFeedQuery"
import FeedPostsList from "@/entities/feed/ui/feedPostsList"

export default function FeedPosts() {
  const { isLoading, feedPosts, error, isError } = useFeedQuery()

  if (isLoading || !feedPosts) {
    return <PostSkeleton />
  }

  if (isError) {
    return (
      <span className="text-center text-sm text-destructive">
        {error && error?.message}
      </span>
    )
  }

  return <FeedPostsList posts={feedPosts} />
}
