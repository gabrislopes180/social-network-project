import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"
import { IPost } from "@/entities/posts/model/interfaces"
import { ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useUpdatePost } from "../model/use-update-post"
import { SpinnerCustom } from "@/components/loading-spinner"

interface UpdateModalProps {
  post: IPost
  onClose: () => void
}

export default function UpdatePostModal({ post, onClose }: UpdateModalProps) {
  const [contentValue, setContentValue] = useState(post.content)

  const { mutate: updatePost, isPending, isSuccess } = useUpdatePost()

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])
  return (
    <div className="flex w-full animate-fade-down items-center animate-duration-200">
      <div className="relative">
        <Textarea
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          className="h-5 w-50 text-xs text-primary/70"
        />
        <Button
          variant="default"
          size="icon"
          aria-label="Submit"
          className="absolute right-0 bottom-0 mt-2 flex cursor-pointer self-end"
          disabled={
            contentValue === post.content ||
            contentValue.trim() === "" ||
            isPending
          }
          onClick={() =>
            updatePost({
              postId: post._id,
              newContent: contentValue,
            })
          }
        >
          {isPending ? <SpinnerCustom variant="muted" /> : <ArrowRightIcon />}
        </Button>
      </div>
    </div>
  )
}
