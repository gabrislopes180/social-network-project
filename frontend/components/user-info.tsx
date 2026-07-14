"use client"

import { useSessionQuery } from "@/entities/session/model/useSession"
import LogoutButton from "@/features/auth/logout/ui/logoutButton"

export default function UserInfo() {
  const { user, isLoading, error } = useSessionQuery()

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Carregando usuario...</p>
    )
  }

  if (!user || error) {
    return (
      <>
        <p className="text-sm text-muted-foreground">Usuario nao logado.</p>
      </>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center gap-1 text-sm">
      <strong>{user.fullName}</strong>
      <span className="text-muted-foreground">@{user.username}</span>
      <footer className="my-2 flex items-center gap-2">
        <span>Seguidores: {user.followers.length}</span>
        <span>Seguindo: {user.following.length}</span>
      </footer>
      <LogoutButton />
    </section>
  )
}
