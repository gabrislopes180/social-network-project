import { AvatarProfile } from "@/components/profile-avatar"
import { IComment } from "../model/interfaces"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import DeleteButton from "@/features/comments/delete-comment/ui/delete-button"

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
              "flex w-full items-start gap-2",
              comment._id === newCommentId &&
                "animate-in duration-200 fade-in slide-in-from-left-4"
            )}
          >
            <AvatarProfile />

            <div className="mt-4 flex w-full flex-col">
              <span className="font-medium text-foreground">
                {comment.userId.username}
              </span>

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
