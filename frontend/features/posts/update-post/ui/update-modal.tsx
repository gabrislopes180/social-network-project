import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IPost } from "@/entities/posts/model/interfaces"
import { ArrowRightIcon, X } from "lucide-react"
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
    <Card className="min-w-75">
      <X
        className="absolute top-2 right-2 text-primary/70"
        size={16}
        cursor={"pointer"}
        onClick={onClose}
      />
      <CardContent className="flex items-start gap-3 p-3 text-xs">
        <div className="flex w-full flex-col">
          <Label className="my-3 font-medium">{post.authorUsername}</Label>
          <Textarea
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            className="text-primary/70"
          />
          <Button
            variant="default"
            size="icon"
            aria-label="Submit"
            className="mt-2 flex cursor-pointer self-end"
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
            {isPending ? <SpinnerCustom /> : <ArrowRightIcon />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
