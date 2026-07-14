"use client"

import { usePostsQuery } from "@/entities/posts/model/use-posts-query"
import MyPostsList from "@/entities/posts/ui/my-posts"

export default function MyPostsWidget() {
  const { posts, isLoading } = usePostsQuery()

  if (isLoading) {
    return <p>Carregando publicações...</p>
  }

  if (!posts) return <p>Nenhum post</p>

  return <MyPostsList posts={posts} username="gabris123" />
}
