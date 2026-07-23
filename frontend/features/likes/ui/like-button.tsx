import { Button } from "@/components/ui/button"
import { IPost } from "@/entities/posts/model/interfaces"
import { HandHeart, Handshake } from "lucide-react"
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
              ? "animate-jump bg-like/20 animate-duration-200"
              : "border border-accent bg-background"
          }
          onClick={() => handleRemove(post._id)}
        >
          <HandHeart size={18} className="text-like" />
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
        <HandHeart size={18} className="text-like" />
      </Button>
      {post.likesCount}
    </>
  )
}
