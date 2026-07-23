"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import UserPostList from "@/entities/posts/ui/user-posts"
import { useUserPostsQuery } from "@/entities/users/model/useUserPostsQuery"
import { Images } from "lucide-react"

export default function UserPosts({ name, variant = "grid" }: { name: string, variant?: "feed" | "grid" }) {
  const { data, isLoading: isLoadingPosts } = useUserPostsQuery(name)

  if (isLoadingPosts || !data)
    return (
      <div className="mt-24 flex min-h-full items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  if (data?.length < 1) {
    return (
      <div className="my-8 flex flex-col items-center text-xs text-primary/50">
        <Images />
        <p className="mx-5 text-center">
          Esse usuário ainda não compartilhou nenhuma publicação.
        </p>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <UserPostList posts={data} variant={variant} />
    </main>
  )
}
