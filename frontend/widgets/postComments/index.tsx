"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCommentsQuery } from "@/entities/comments/model/use-comments-query"
import CommentsSkeleton from "@/entities/comments/ui/comments-skeleton"
import PostCommentsList from "@/entities/comments/ui/post-comments"
import { IPost } from "@/entities/posts/model/interfaces"
import { CommentsInput } from "@/features/comments/comment-post/ui/comment-modal"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

interface MyPostCommentsListProps {
  post: IPost
}

export function PostCommentsWidget({ post }: MyPostCommentsListProps) {
  const [open, setOpen] = useState(false)

  const { comments, isLoading, error } = useCommentsQuery({
    postId: post._id,
    enableToFetch: open,
  })

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <MessageCircle />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Comentários</DrawerTitle>
          <DrawerDescription>
            Visualize os comentários dessa publicação
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex max-h-85 flex-col items-center justify-center text-xs text-primary/40">
          {isLoading || !comments ? (
            <CommentsSkeleton />
          ) : (
            <>
              {comments.length < 1 ? (
                <div className="flex h-70 items-center">
                  Quer ser o primeiro a comentar nessa publicação?
                </div>
              ) : (
                <PostCommentsList comments={comments} />
              )}
            </>
          )}

          <footer>
            {error && <span className="text-destructive">{error}</span>}
          </footer>
        </div>

        <DrawerFooter>
          <CommentsInput postId={post._id} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
