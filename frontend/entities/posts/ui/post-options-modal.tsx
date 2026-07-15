"use client"

import { Edit, Ellipsis, Trash } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IPost } from "../model/interfaces"
import { useDeletePost } from "@/features/posts/delete-post/model/use-delete-post"

export function PostOptionsModal({ post }: { post: IPost }) {
  const { mutate: handleDelete, isPending } = useDeletePost(post._id)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Edit />
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => handleDelete(post._id)}
        >
          <Trash />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
