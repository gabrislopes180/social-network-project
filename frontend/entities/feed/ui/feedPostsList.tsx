import { IPost } from "@/entities/posts/model/interfaces"
import PostCard from "@/entities/posts/ui/post-card"

export default function FeedPostsList({ posts }: { posts: IPost[] }) {
  return (
    <ul className="my-6 flex flex-col items-center">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          isFromMe={false}
          post={post}
          isUpdating={false}
          handleState={() => {}}
        />
      ))}
    </ul>
  )
}
