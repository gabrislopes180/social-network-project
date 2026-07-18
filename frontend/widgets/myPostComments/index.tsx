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
import { Skeleton } from "@/components/ui/skeleton"
import MyPostCommentsList from "@/entities/comments/ui/my-post-comments"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { CommentsModal } from "@/features/comments/comment-post/ui/comment-modal"

export function MyPostCommentsWidget() {
  const { user, isLoading } = useSessionQuery()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Comentários</DrawerTitle>
          <DrawerDescription>
            Visualize os comentários dessa publicação
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex min-h-70 flex-col items-center justify-center text-xs text-primary/40">
          {isLoading ? (
            <>
              <section className="lex w-full flex-col items-start px-8">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-2 w-15 rounded" />
                    <Skeleton className="h-2 w-30 rounded" />
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <MyPostCommentsList user={user!} />
            </>
          )}
        </div>

        <DrawerFooter>
          {/* <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose> */}
          <CommentsModal />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
