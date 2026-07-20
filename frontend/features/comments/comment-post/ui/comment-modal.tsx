"use client"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useSendComment } from "../model/use-send-comment"
import { SpinnerCustom } from "@/components/loading-spinner"

export function CommentsInput({ postId }: { postId: string }) {
  const [commentValue, setCommentValue] = useState("")

  const { sendComment, isPending, isSuccess } = useSendComment()

  useEffect(() => {
    if (isSuccess) {
      setCommentValue("")
    }
  }, [isSuccess])
  return (
    <div className="relative z-70">
      <Input
        placeholder="Adicione um comentário"
        className="border-none pr-10"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <Button
        variant={"default"}
        size={"icon-sm"}
        className="absolute top-0.5 right-1"
        onClick={() =>
          sendComment({
            postId,
            commentText: commentValue,
          })
        }
        disabled={isPending || !commentValue.trim()}
      >
        {isPending ? <SpinnerCustom variant="muted" /> : <ArrowUp />}
      </Button>
    </div>
  )
}
