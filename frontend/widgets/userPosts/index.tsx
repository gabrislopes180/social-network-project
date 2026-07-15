"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { useUserPostsQuery } from "@/entities/users/model/useUserPostsQuery"
import { Images } from "lucide-react"

export default function UserPosts({ name }: { name: string }) {
  const { data, isLoading: isLoadingPosts, error } = useUserPostsQuery(name)
  console.log(data)

  if (isLoadingPosts)
    return (
      <div className="mt-24 flex min-h-full items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  return (
    <div className="my-8 flex flex-col items-center text-xs text-primary/50">
      <Images />
      <p className="mx-5 text-center">
        Esse usuário ainda não compartilhou nenhuma publicação.
      </p>
    </div>
  )
}
