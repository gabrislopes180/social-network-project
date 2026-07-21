import { ConfigModal } from "@/components/config-modal"
import { AvatarProfile } from "@/components/profile-avatar"
import UserInfo from "@/components/user-info"
import MyPostsWidget from "@/widgets/myPosts"

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-between">
      <article className="absolute top-4 right-4">
        <ConfigModal />
      </article>
      <section className="mt-8">
        <AvatarProfile />
      </section>
      <UserInfo />

      <MyPostsWidget />
    </div>
  )
}
