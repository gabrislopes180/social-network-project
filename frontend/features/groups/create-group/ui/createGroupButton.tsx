"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { Plus } from "lucide-react"

export default function CreateGroupButton() {
  const { user, isLoading } = useSessionQuery()

  if (!user || isLoading) return <Skeleton className="h-10 w-20 rounded-lg" />
  return (
    <section className="flex flex-col items-center">
      <Button disabled={!user.hasLeadershipBadge}>
        Criar um <Plus />
      </Button>
      {!user.hasLeadershipBadge && (
        <p>Você ainda não possui o selo de liderança para criar um grupo</p>
      )}
    </section>
  )
}
