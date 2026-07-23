import { User } from "@/entities/session/model/types"
import { ReactNode } from "react"
import { HeaderSkeleton } from "../skeletons/profile-header-skeleton"

export interface UserProfileHeaderProps {
  user: User
  actions?: ReactNode
}

export function UserProfileHeader({ user, actions }: UserProfileHeaderProps) {
  return (
    <section className="mt-2 flex w-full flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold">{user.fullName}</h1>
      <p className="text-muted-foreground">@{user.username}</p>
      <p className="mt-2 max-w-70 text-center text-sm text-foreground/80">
        {!user.description || user.description.trim() === ""
          ? "Clique abaixo para editar seu perfil e adicionar uma descrição"
          : user.description}
      </p>

      {/* Stats */}
      <div className="mt-6 flex w-full items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold">
            {user.followers?.length || 0}
          </span>
          <span className="text-xs tracking-wider text-muted-foreground">
            Seguidores
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold">
            {user.following?.length || 0}
          </span>
          <span className="text-xs tracking-wider text-muted-foreground">
            Seguindo
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold">166</span>
          <span className="text-xs tracking-wider text-muted-foreground">
            Posts
          </span>
        </div>
      </div>

      {/* Actions */}
      {actions && (
        <div className="mt-6 mb-2 flex items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </section>
  )
}
