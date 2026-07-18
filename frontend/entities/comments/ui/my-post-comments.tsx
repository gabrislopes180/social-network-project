import { AvatarProfile } from "@/components/profile-avatar"
import { User } from "@/entities/session/model/types"

export default function MyPostCommentsList({ user }: { user: User }) {
  return (
    <section className="lex w-full flex-col items-start px-8">
      <div className="flex items-center gap-2">
        <AvatarProfile />
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{user?.username}</span>
          <span className="text-muted-foreground/80">
            comenatiorio meu aqui
          </span>
        </div>
      </div>
    </section>
  )
}
