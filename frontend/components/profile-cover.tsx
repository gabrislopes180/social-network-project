import { User } from "@/entities/session/model/types"

interface ProfileCoverProps {
  user: User
}

export function ProfileCover({ user }: ProfileCoverProps) {
  const color1 = user.preferences?.color1
  const color2 = user.preferences?.color2

  return (
    <div
      className="relative z-0 h-32 w-full rounded-t-xl shadow-sm sm:rounded-xl md:h-48"
      style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}
    />
  )
}
