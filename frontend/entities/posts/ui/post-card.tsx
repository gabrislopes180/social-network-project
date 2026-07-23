import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { IPost } from "../model/interfaces"
import { AvatarProfile } from "@/components/profile-avatar"
import { PostOptionsModal } from "./post-options-modal"
import Image from "next/image"
import LikeButton from "@/features/likes/ui/like-button"
import { PostCommentsWidget } from "@/widgets/postComments"
import UpdatePostModal from "@/features/posts/update-post/ui/update-modal"
import Link from "next/link"

interface PostCardProps {
  post: IPost
  isFromMe: boolean
  isUpdating?: boolean
  handleState: (value: boolean) => void
}

export default function PostCard({
  post,
  isFromMe,
  isUpdating,
  handleState,
}: PostCardProps) {
  return (
    <Card className="mb-10 w-full border-none shadow-none">
      <CardHeader className="flex items-center justify-between gap-2 pt-3">
        <Link
          className="flex items-center gap-2"
          href={`/user/${post.author.username}`}
        >
          <AvatarProfile
            className="h-8 w-8 border-none"
            wrapperClassName="mt-0"
          />
          <span className="text-sm font-semibold">{post.author.username}</span>
        </Link>

        {isFromMe && (
          <PostOptionsModal
            post={post}
            onSelectUpdate={() => handleState(true)}
          />
        )}
      </CardHeader>
      <CardContent className="px-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={post.imageUrl}
            fill
            alt="Post image"
            className="object-cover"
          />
        </div>
        <div className="mt-4 flex w-full items-center gap-3 text-xs">
          <LikeButton post={post} isFromMe={true} />
          <PostCommentsWidget post={post} />
        </div>
      </CardContent>
      <CardFooter className="flex items-start gap-2 px-5">
        <span className="font-semibold">{post.author.username}</span>
        {isUpdating && isFromMe ? (
          <UpdatePostModal post={post} onClose={() => handleState(false)} />
        ) : (
          <span className="mt-0.5 max-w-9/10 text-xs text-foreground/80">
            {post.content}
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
