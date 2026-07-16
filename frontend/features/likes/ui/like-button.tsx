import { Button } from "@/components/ui/button"
import { IPost } from "@/entities/posts/model/interfaces"
import { Handshake } from "lucide-react"
import { useLikePost } from "../model/use-like-post"
import { SpinnerCustom } from "@/components/loading-spinner"

interface LikeButtonProps {
  post: IPost
  isFromMe: boolean
}

export default function LikeButton({ post, isFromMe }: LikeButtonProps) {
  const { likePost, isPending } = useLikePost(isFromMe)

  return (
    <>
      <Button
        size={"icon"}
        className={
          post.likedByMe
            ? "bg-blue-500/20"
            : "border border-accent bg-background"
        }
        onClick={() => likePost(post._id)}
      >
        {isPending ? (
          <SpinnerCustom />
        ) : (
          <Handshake size={18} className="text-blue-500" />
        )}
      </Button>
      {post.likesCount}
    </>
  )
}
