"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { usePostsQuery } from "@/entities/posts/model/use-posts-query"
import MyPostsList from "@/entities/posts/ui/my-posts"
import UserPostList from "@/entities/posts/ui/user-posts"
import { AlertCircle, Images } from "lucide-react"

export default function UserPosts({
  name,
  isFromMe,
}: {
  name: string
  isFromMe: boolean
}) {
  const { posts, loading, error } = usePostsQuery({
    username: name,
    isFromMe,
  })

  if (loading)
    return (
      <div className="mt-24 flex min-h-full items-center justify-center">
        <SpinnerCustom />
      </div>
    )

  if (!posts || error) {
    return (
      <div className="flex flex-col items-center justify-center text-xs tracking-tight text-foreground/80">
        <AlertCircle />
        <p>Houve um erro ao carregar as publicações</p>
      </div>
    )
  }
  if (posts.length < 1) {
    return (
      <div className="my-8 flex flex-col items-center text-xs text-primary/50">
        <Images />
        <p className="mx-5 text-center">
          {isFromMe
            ? "Gostaria de compartilhar com o mundo sua primeira publicação?"
            : "Esse usuário ainda não compartilhou nenhuma publicação."}
        </p>
      </div>
    )
  }

  if (isFromMe) {
    return <MyPostsList posts={posts} />
  }

  return <UserPostList posts={posts} variant="grid" />
}
