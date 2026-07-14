"use client"

import { Button } from "@/components/ui/button"
import { useHandleLogout } from "../model/use-handle-logout"

export default function LogoutButton() {
  const { mutate: handleLogout, isPending } = useHandleLogout()
  return (
    <Button
      variant={"destructive"}
      onClick={() => handleLogout()}
      disabled={isPending}
    >
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  )
}
