import UserInfo from "@/components/user-info"
import MyPostsWidget from "@/widgets/myPosts"
import { User } from "lucide-react"

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-between">
      <User />
      <UserInfo />

      <MyPostsWidget />
    </div>
  )
}
