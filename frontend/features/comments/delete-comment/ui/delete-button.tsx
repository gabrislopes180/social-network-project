import { Trash } from "lucide-react"
import { useDeleteComment } from "../model/use-delete-comment"
import { SpinnerCustom } from "@/components/loading-spinner"
import { IComment } from "@/entities/comments/model/interfaces"

export default function DeleteButton({ comment }: { comment: IComment }) {
  const { mutate, isPending } = useDeleteComment()

  if (isPending) {
    return <SpinnerCustom variant="destructive" />
  }
  return (
    <Trash
      size={14}
      className="mt-1 shrink-0 text-destructive"
      onClick={() => mutate({ commentId: comment._id, postId: comment.postId })}
    />
  )
}
