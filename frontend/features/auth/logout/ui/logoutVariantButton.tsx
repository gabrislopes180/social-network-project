import { LogOutIcon, SettingsIcon } from "lucide-react"
import { useHandleLogout } from "../model/use-handle-logout"
import { Button } from "@/components/ui/button"

export default function LogoutVariantButton() {
  const { mutate: handleLogout, isPending } = useHandleLogout()

  return (
    <Button
      variant={"ghost"}
      onClick={() => handleLogout()}
      disabled={isPending}
    >
      <LogOutIcon />
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  )
}
