import { AvatarProfile } from "@/components/profile-avatar"
import { IComment } from "../model/interfaces"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import DeleteButton from "@/features/comments/delete-comment/ui/delete-button"
import Link from "next/link"

export default function PostCommentsList({
  comments,
}: {
  comments: IComment[]
}) {
  const queryClient = useQueryClient()

  return (
    <ul className="flex min-h-70 w-full flex-col items-start overflow-y-auto px-8">
      {comments.map((comment) => {
        const newCommentId = queryClient.getQueryData<string>([
          "new-comment-animation",
          comment.postId,
        ])
        return (
          <li
            key={comment._id}
            className={cn(
              "mb-5 flex w-full items-start gap-2",
              comment._id === newCommentId &&
                "animate-fade-right animate-duration-200"
            )}
          >
            <AvatarProfile className="h-8 w-8" />

            <div className="flex w-full flex-col">
              <Link
                className="font-medium text-foreground"
                href={`/user/${comment.userId.username}`}
              >
                {comment.userId.username}
              </Link>

              <section className="flex w-full items-start justify-between gap-2">
                <span className="max-w-9/10 wrap-break-word text-muted-foreground/80">
                  {comment.commentText}
                </span>

                {comment.isMyComment && <DeleteButton comment={comment} />}
              </section>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
