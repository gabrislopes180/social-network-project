import { ConfigModal } from "@/components/config-modal"
import { AvatarProfile } from "@/components/profile-avatar"
import UserInfo from "@/components/user-info"
import MyPostsWidget from "@/widgets/myPosts"
import { ProfileCover } from "@/components/profile-cover"

export default function Profile() {
  return (
    <div className="flex w-full justify-center pb-20">
      <div className="flex min-h-screen w-full max-w-xl flex-col bg-background">
        <div className="relative w-full">
          <ProfileCover />
          <div className="absolute top-4 right-4 z-20">
            <ConfigModal />
          </div>
          <AvatarProfile className="relative bottom-12 h-30 w-30 border-4 border-background shadow-md md:h-32 md:w-32" />
        </div>

        <UserInfo />

        <div className="my-4 h-px w-full bg-border" />

        <div className="w-full animate-fade-right px-1 animate-duration-200">
          <MyPostsWidget variant="grid" />
        </div>
      </div>
    </div>
  )
}
