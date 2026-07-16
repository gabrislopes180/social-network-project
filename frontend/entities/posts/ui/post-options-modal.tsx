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

interface OptionsModalProps {
  post: IPost
  onUpdate: (id: string) => void
}

export function PostOptionsModal({ post, onUpdate }: OptionsModalProps) {
  const { mutate: handleDelete } = useDeletePost(post._id)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onUpdate(post._id)}>
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
