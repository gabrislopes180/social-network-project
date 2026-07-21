import { Button } from "@/components/ui/button"
import { IPost } from "@/entities/posts/model/interfaces"
import { Handshake } from "lucide-react"
import { useLikePost } from "../model/use-like-post"
import { SpinnerCustom } from "@/components/loading-spinner"
import { useRemoveLike } from "../model/use-remove-like"

interface LikeButtonProps {
  post: IPost
  isFromMe: boolean
}

export default function LikeButton({ post, isFromMe }: LikeButtonProps) {
  const { likePost, isPending } = useLikePost(isFromMe)
  const { handleRemove, isPending: isRemovingLike } = useRemoveLike(isFromMe)

  if (isPending || isRemovingLike) {
    return (
      <Button
        size={"icon"}
        variant={"outline"}
        disabled={isPending || isRemovingLike}
      >
        <SpinnerCustom variant="foreground" />
      </Button>
    )
  }

  if (post.likedByMe) {
    return (
      <>
        <Button
          size={"icon"}
          className={
            post.likedByMe
              ? "bg-blue-500/20"
              : "border border-accent bg-background"
          }
          onClick={() => handleRemove(post._id)}
        >
          <Handshake size={18} className="text-blue-500" />
        </Button>
        {post.likesCount}
      </>
    )
  }

  return (
    <>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => likePost(post._id)}
      >
        <Handshake size={18} className="text-blue-500" />
      </Button>
      {post.likesCount}
    </>
  )
}
